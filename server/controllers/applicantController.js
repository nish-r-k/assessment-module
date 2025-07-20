import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Applicant } from "../models/applicantModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerApplicant = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Applicant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const applicant = await Applicant.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(applicant._id);
    res.status(201).json({ message: "Registration successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginApplicant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const applicant = await Applicant.findOne({ email });
    if (!applicant) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, applicant.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(applicant._id);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get total number of registered applicants
export const getApplicantCount = async (req, res) => {
  try {
    const count = await Applicant.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to get applicant count" });
  }
};
