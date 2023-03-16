const { bcryptTool } = require("../lib/bcrypt");
const courses = require("../models/courses");
const users = require("../models/users");

const user = {
  add(req, res) {
    const user = req.body;
    const fields = {
      email: "Email",
      password: "Password",
      phone: "Phone",
      name: "Your name",
      batch: "Batch",
    };
    req.body.forEach((el) => {
      switch (el.title) {
        case fields.name:
          user.name = el.value;
          break;

        case fields.password:
          user.password = el.value;
          break;
        case fields.email:
          user.email = el.value;
          break;
        case fields.phone:
          user.phone = el.value;
          break;
        case fields.batch:
          user.batch = el.value;
        default:
          break;
      }
    });
    console.log(user);
    if (user.password) {
      bcryptTool.GenHash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;

        courses.findOne({ title: "Web Development" }).then((course) => {
          course.chapter[0].topics[0].status = "pending";

          course.chapter[0].status = "pending";
          console.log(course.chapter[0].topics);
          const Chapters = course.chapter;

          console.log(course);
          userModel
            .create({
              ...user,
              progress: [
                {
                  course: { id: course._id, title: course.title },
                  chapter: [...Chapters],
                },
              ],
            })
            .then((el) => {
              res.status(200).json({ data: true });
            })
            .catch((err) => {
              res.status(400).json({
                data: err,
              });
            });
        });
      });
    } else {
      res.status(400).json({
        data: "Some field are missing ",
      });
    }
  },
  getAll(req, res) {
    console.log(req.query);
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const batch = Number(req.query.batch);

    users
      .find(
        { batch: batch },
        {
          name: 1,
          email: 1,
          attendance: 1,
          performance: 1,
          batch: 1,
        }
      )
      .limit(limit)
      .skip(limit * page)
      .then((data) => {
        users.count({ batch }).then((count) => {
          res.json({
            data,
            total: Math.floor(count / limit),
          });
        });
      });
  },
  getOne() {},
  delete(req, res) {},
  updateOne() {},
  attendance(req, res) {
    // req.body.forEach()
    const bulkAttendance = req.body.map((el) => {
      console.log(el);
      const { id, attendance } = el;
      return {
        updateOne: {
          filter: {
            _id: el.id,
            "attendance.date": { $ne: attendance.date, $ne: attendance.reason },
          },
          update: { $addToSet: { attendance } },
        },
      };
    });

    users.bulkWrite(bulkAttendance).then((data) => {
      console.log(data);
      res.status(200).send("successfully updated");
    });
    console.log(req.body);
  },
};

module.exports = user;
