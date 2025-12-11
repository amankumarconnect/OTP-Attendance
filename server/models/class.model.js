import mongoose from "mongoose";

// create schema for class which have classID, classTeacher, classStudents and present/absent status for all days

const classSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    facultyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendanceDate: {
      type: Date,
    },
    attendanceCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Class = mongoose.model("Class", classSchema);

export default Class;
