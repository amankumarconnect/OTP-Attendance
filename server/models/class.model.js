import mongoose from "mongoose";

// create schema for class which have classID, classTeacher, classStudents and present/absent status for all days

const classSchema = mongoose.Schema(
  {
    classTitle: {
      type: String,
      required: true,
    },
    facultyID: {
      type: String,
      required: true,
    },
    students: [
      {
        type: String,
        required: true,
      },
    ],
    attendance: [
      {
        date: {
          type: String,
          required: true,
        },
        presentStudents: [
          {
            type: String,
            required: true,
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
  },
);

const Class = mongoose.model("Class", classSchema);

export default Class;
