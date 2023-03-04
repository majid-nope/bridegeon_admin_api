const users = require("../models/users");

const user = {
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
