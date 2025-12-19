import Class from "../models/class.model.js";
import Attendance from "../models/attendance.model.js";

// Controller to create a new class
export const createClass = async (req, res) => {
  try {
    const { title, facultyID, students } = req.body;
    const newClass = new Class({ title, facultyID, students });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for a GET request to get classes for a specific faculty using facultyID
export const getClasses = async (req, res) => {
  try {
    const { facultyID } = req.params;
    const classes = await Class.find({ facultyID });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for a GET request to get dates for a specific class using classID
export const getClassByID = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to update Code for a specific class
export const takeAttendance = async (req, res) => {
  try {
    const { classID, attendanceDate } = req.params;
    const { attendanceCode } = req.body;
    const classData = await Class.findByIdAndUpdate(
      classID,
      { attendanceDate, attendanceCode },
      { new: true },
    );
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res
      .status(200)
      .json({ message: "Attendance Date and Code updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all attendance for a specific class
export const getAttendances = async (req, res) => {
  try {
    const { classID } = req.params;
    const attendanceData = await Attendance.find({ classID });
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to get attendance for a specific class on a specific date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { classID, date } = req.params;
    const attendanceObject = await Attendance.findOne({ classID, date });
    return res.status(200).json(attendanceObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to change attendance status of a student for a specific date
export const changeStatus = async (req, res) => {
  try {
    const { classID, date, studentID } = req.params;
    const attendanceData = await Attendance.findOne({ classID, date });
    if (!attendanceData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const isPresent = attendanceData.presentStudents.includes(studentID);
    if (isPresent) {
      attendanceData.presentStudents = attendanceData.presentStudents.filter(
        (id) => id !== studentID,
      );
    } else {
      attendanceData.presentStudents.push(studentID);
    }

    await attendanceData.save();
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a student to a class
export const addStudent = async (req, res) => {
  try {
    const { classID } = req.params;
    const { studentID } = req.body;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    if (!classData.students.includes(studentID)) {
      classData.students.push(studentID);
      await classData.save();
    }
    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a student from a class
export const deleteStudent = async (req, res) => {
  try {
    const { classID } = req.params;
    const { studentID } = req.body;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    classData.students = classData.students.filter((id) => id !== studentID);
    await classData.save();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to update class title for a classID
export const updateClassTitle = async (req, res) => {
  try {
    const { classID } = req.params;
    const { classTitle } = req.body;

    const classData = await Class.findByIdAndUpdate(
      classID,
      { title: classTitle },
      { new: true },
    );

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class title updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
