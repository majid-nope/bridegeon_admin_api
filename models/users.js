const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema(
  {
    phone: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    attendance: [
      {
        reason: String,
        data: String,
      },
    ],
    batch: String,
    progress: [
      {
        course: {
          id: String,
          title: {
            type: String,
          },
        },
        day: {
          type: Number,
          default: 0,
        },
        learningStatus: {
          enum: ["onGoing", "end"],
          type: String,
          default: "onGoing",
        },

        chapter: [
          {
            day: Number,
            status: {
              type: String,
              enum: ["done", "pending", "locked"],
              default: "locked",
            },
            score: Number,
            topics: [
              {
                title: String,
                _id: mongoose.SchemaTypes.ObjectId,
                status: {
                  type: String,
                  enum: ["done", "pending", "locked"],
                  default: "locked",
                },
                tasks: [
                  {
                    title: String,
                    _id: mongoose.SchemaTypes.ObjectId,
                    file: String,
                  },
                ],
              },
            ],
          },
        ],

        score: {
          type: Number,
          default: 0,
        },
        assignment: {
          score: Number,
          created: Date,
          path: String,
          reviewedBy: String,
        },
      },
    ],
    performance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userModel, "users");
