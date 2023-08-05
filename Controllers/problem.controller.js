import { getfromjudge, sendTojuge } from "../config/Judge0api.js";
import { ProblemModel } from "../models/ProblemSchema.js";

export const createProblem = async (req, res) => {
  const { title, description, examples, constraint, level, stdin, stdout } =
    req.body;

  try {
    const problem = new ProblemModel({
      title,
      description,
      examples,
      constraint,
      level,
      stdin,
      stdout,
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
    } else {
      res.status(200).json(problem);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const submitCode = async (req, res) => {
  const { id } = req.params;
  const { code, stdin, lang } = req.body;

  let langid;
  if (lang === "python") langid = 71;
  else if (lang == "cpp") langid = 54;
  else langid = 62;
  try {
    const r = await sendTojuge(code, stdin, langid);
    return res.status(200).json(r);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getOutput = async (req, res) => {
  const { token } = req.params;
  try {
    const response = await getfromjudge(token);
    if (!response.err) {
      return res.status(200).json(response);
    } else {
      res.status(400).json({
        msg: "compilation error",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An internal error occurred",
    });
  }
};
