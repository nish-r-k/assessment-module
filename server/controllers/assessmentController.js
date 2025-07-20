import Assessment from "../models/Assessment.js";


export const createAssessment = async (req, res) => {
  try {
    //console.log("Received data:", req.body); // <---- Add this line

    const assessment = new Assessment(req.body);
    await assessment.save();

    res.status(201).json(assessment);
  } catch (error) {
    console.error("Save error:", error); // <--- log error if any
    res.status(500).json({ message: "Failed to save", error });
  }
};

export const getAllAssessments = async (req, res) => {
  const assessments = await Assessment.find();
  res.json(assessments);
};
export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteAssessment = async (req, res) => {
  await Assessment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const bulkUpload = async (req, res) => {
  try {
    await Assessment.insertMany(req.body); // expects array
    res.json({ message: "Bulk upload successful" });
  } catch (error) {
    res.status(400).json({ message: "Upload failed", error });
  }
};

// import Assessment from "../models/Assessment.js";

// export const createAssessment = async (req, res) => {
//   try {
//     const { title, description, duration } = req.body;

//     if (!title || !description || !duration) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newAssessment = new Assessment({ title, description, duration });
//     const saved = await newAssessment.save();

//     res.status(201).json(saved);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
