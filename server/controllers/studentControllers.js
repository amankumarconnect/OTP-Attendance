import Class from "../models/class.model.js";

// Controller to update attendance status for a studentID in a specific class on a specific date

export const updateAttendance = async (req, res) => {
  try {
    const { classID, date, studentID, code } = req.body;

    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classData.code !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    let attendanceForDate = classData.attendance.find(
      (att) => att.date === date
    );
    if (!attendanceForDate) {
      classData.attendance.push({ date: date, students: [] });
      // Get the newly added attendance record
      attendanceForDate = classData.attendance[classData.attendance.length - 1];
    }

    let studentPresent = attendanceForDate.presentStudents.find(studentID);
    if (!studentPresent) {
      attendanceForDate.presentStudents.push(studentID);
    }

    await classData.save();
    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get classes for a specific studentID
export const getClassses = async (req, res) => {
  try {
    const { studentID } = req.params;
    const classes = await Class.find({ students: studentID });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};