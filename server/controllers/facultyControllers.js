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