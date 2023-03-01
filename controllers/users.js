const users = require("../models/users");

const user = {
  getAll(req, res) {
    users
      .find(
        {},
        {
          name: 1,
          email: 1,
          attendance: 1,
          performance: 1,
          batch: 1,
        }
      )
      .limit(req.query.limit)
      .skip(req.query.limit * req.query.page)
      .then((data) => {
        res.json(data);
      });
  },
  getOne() {},
  delete(req, res) {},
  updateOne() {},
  updateMany() {},
};

module.exports = user;
