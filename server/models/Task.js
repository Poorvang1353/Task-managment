import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Done"],
            default: "To Do",
        },
        tags: [{ type: String, trim: true }],
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
