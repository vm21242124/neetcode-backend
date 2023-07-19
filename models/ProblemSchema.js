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
    type: [
      {
        input: String,
        output: String,
        explanation:String
      },
    ],
    required: [true, "example is required"],
  },
  testcases: {
    type: [
      {
        input_data: String,
        expected_output: String,
      },
    ],
  },
  constraint: {
    type: [{
        con:String
    }],
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
