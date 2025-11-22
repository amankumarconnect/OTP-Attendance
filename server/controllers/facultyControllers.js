import Class from "../models/class.model.js";

// Controller to create a new class
export const createClass = async (req, res) => {
  try {
    const { facultyID, students } = req.body;
    const newClass = new Class({ facultyID, students });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for a GET request to get classes for a specific faculty using facultyID
export const getClasses = async (req, res) => {
  try {
    const { facultyID } = req.params;
    const classes = await Class.find({ facultyID });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for a GET request to get dates for a specific class using classID
export const getDates = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    const dates = classData.attendance.map(entry => entry.date);
    res.status(200).json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

// Controller for a GET request to get attendance for a specific class on a specific date
export const getDay = async (req, res) => {
  try {
    const { classID, date } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    const attendanceForDate = classData.attendance.find(entry => entry.date.getTime() === new Date(date).getTime());
    if (!attendanceForDate) {
      return res.status(404).json({ message: "Attendance for the specified date not found" });
    }
    res.status(200).json(attendanceForDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller to update Code for a specific class
export const updateCode = async (req, res) => {
  try {
    const { classID } = req.params;
    const { code } = req.body;
    const classData = await Class.findByIdAndUpdate(classID, { code }, { new: true });
    console.log(code);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}