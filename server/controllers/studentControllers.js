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

    let studentPresent = attendanceForDate.presentStudents.find(
      (p) => p.studentID === studentID
    );
    if (!studentPresent) {
      attendanceForDate.presentStudents.push({ studentID });
    }

    await classData.save();
    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Attendance model schema reference
// const classSchema = mongoose.Schema(
//   {
//     facultyID: {
//       type: String,
//       required: true,
//     },
//     students: [
//       {
//         _id: false,
//         studentID: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//     attendance: [
//       {
//         date: {
//           type: String,
//           required: true,
//         },
//         presentStudents: [
//           {
//             _id: false,
//             studentID: {
//               type: String,
//               required: true,
//             },
//           },
//         ],
//       },
//     ],
//     code: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
