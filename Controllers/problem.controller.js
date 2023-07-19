import { ProblemModel } from "../models/ProblemSchema.js";

export const createProblem = async (req, res) => {
  const { title, description, examples, testcases, constraint, level } =
    req.body;
  try {
    const problem = new ProblemModel({
      title,
      description,
      examples,
      testcases,
      constraint,
      level,
    });
    await problem.save();
    res.status(201).json({
      message: "problem created successfully",
      problem,
    });
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};
export const getAllProblems = async (req, res) => {
  try {
    const problems = await ProblemModel.find({});
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteAProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await ProblemModel.findByIdAndDelete(id);
    if (!problem) {
      return res.status(401).json("the problem is not exits in db");
    } else {
      res.status(200).json("problem deleted successfully");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const getAproblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await ProblemModel.findById(id);
    if (!problem) {
      return res.status(401).json("the problem is not exits in db");
    }else{
        res.status(200).json(problem)
    }
  } catch (error) {}
};
