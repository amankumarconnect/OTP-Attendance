import Class from "../models/class.model.js";

// Controller to get Code for a specific class

export const getCode = async (req, res) => {
  try {
    const { classID } = req.params;
    const classData = await Class.findById(classID);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ code: classData.code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}