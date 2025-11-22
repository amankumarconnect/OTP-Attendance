import mongoose from "mongoose";

// create schema for class which have classID, classTeacher, classStudents and present/absent status for all days

const classSchema = mongoose.Schema(
  {
    facultyID: {
      type: String,
      required: true,
    },
    students: [
      {
        _id: false,
        studentID: {
          type: String,
          required: true,
        },
      },
    ],
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        students: [
          {
            _id: false,
            studentID: {
              type: String,
              required: true,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        ],
      },
    ],
    code: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;