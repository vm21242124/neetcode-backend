import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    maxLength: [50, "max length is reached"],
    trime: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  examples: {
    type:String,
    required: [true, "example is required"],
  },
  stdin: {
    type:String,
    required:true
  },
  stdout: {
    type:String,
    required:true
  },
  constraint: {
    type: String,
    required: [true, "example is required"],
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
}
,{
    timestamps:true
});
export const ProblemModel = mongoose.model("problems", schema);
