// controller to get class title by class ID
import Class from "../models/class.model.js";

export const getClassTitle = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ classTitle: classData.classTitle });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
