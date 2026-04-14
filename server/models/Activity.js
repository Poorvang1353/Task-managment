import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    message: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    createdAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
