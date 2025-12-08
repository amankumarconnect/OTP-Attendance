import e from "express";
import Class from "../models/class.model.js";

// Controller to create a new class
export const createClass = async (req, res) => {
  try {
    const { facultyID, classTitle, students } = req.body;
    const newClass = new Class({ classTitle, facultyID, students });
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
    // send classID and classTitle only
    const simplifiedClasses = classes.map(({ _id, classTitle }) => ({
      _id,
      classTitle,
    }));
    res.status(200).json(simplifiedClasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller for a GET request to get dates for a specific class using classID
export const getDates = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    const dates = classData.attendance.map((entry) => entry.date);
    res.status(200).json(dates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to Send array of objects with studentID and status for the given date for all students of the given class
export const getDay = async (req, res) => {
  try {
    const { classID, date } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    // find attendance entry for the requested date (exact string match)
    const attendanceEntry = classData.attendance.find(
      (entry) => entry.date === date,
    );
    const presentSet = new Set(
      attendanceEntry ? attendanceEntry.presentStudents : [],
    );

    // map every student to an object with their status for that date
    const dayStatus = classData.students.map((studentID) => ({
      studentID,
      status: presentSet.has(studentID) ? "present" : "absent",
    }));

    return res.status(200).json(dayStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to update Code for a specific class
export const takeAttendance = async (req, res) => {
  try {
    const { classID, date } = req.params;
    const { code } = req.body;
    const classData = await Class.findByIdAndUpdate(
      classID,
      { code, attendanceDate: date },
      { new: true },
    );
    console.log(code);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to change attendance status of a student for a specific date
export const changeStatus = async (req, res) => {
  try {
    const { classID, date, studentID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    // find attendance entry for the requested date
    let attendanceEntry = classData.attendance.find(
      (entry) => entry.date === date,
    );

    // toggle student's attendance status
    const index = attendanceEntry.presentStudents.indexOf(studentID);
    if (index === -1) {
      attendanceEntry.presentStudents.push(studentID);
    } else {
      attendanceEntry.presentStudents.splice(index, 1);
    }

    await classData.save();

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to get students of a class
export const getStudents = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData.students);
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
    // check if student already exists
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
    const { classID, studentID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    // remove student from students array
    classData.students = classData.students.filter((id) => id !== studentID);
    await classData.save();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateClassTitle = async (req, res) => {
  try {
    const { classID } = req.params;
    const { classTitle } = req.body;

    const classData = await Class.findByIdAndUpdate(
      classID,
      { classTitle },
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

export const deleteClass = async (req, res) => {
  try {
    const { classID } = req.params;

    const classData = await Class.findByIdAndDelete(classID);

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
