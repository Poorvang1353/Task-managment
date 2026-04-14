import { Router } from "express";
import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

const router = Router();

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create task
router.post("/", async (req, res) => {
    try {
        const { title, description, status, tags } = req.body;
        const task = await Task.create({ title, description, status, tags });

        // Log activity
        const activity = await Activity.create({
            message: `Task "${task.title}" was created with status "${task.status}"`,
            taskId: task._id,
        });

        // Emit via Socket.IO
        const io = req.app.get("io");
        io.emit("taskCreated", task);
        io.emit("activityCreated", activity);

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PATCH update task
router.patch("/:id", async (req, res) => {
    try {
        const oldTask = await Task.findById(req.params.id);
        if (!oldTask) return res.status(404).json({ error: "Task not found" });

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // Build activity message
        const changes = [];
        if (req.body.status && req.body.status !== oldTask.status) {
            changes.push(`status changed from "${oldTask.status}" to "${req.body.status}"`);
        }
        if (req.body.title && req.body.title !== oldTask.title) {
            changes.push(`title updated to "${req.body.title}"`);
        }
        const activityMsg = changes.length
            ? `Task "${updatedTask.title}": ${changes.join(", ")}`
            : `Task "${updatedTask.title}" was updated`;

        const activity = await Activity.create({
            message: activityMsg,
            taskId: updatedTask._id,
        });

        // Emit via Socket.IO
        const io = req.app.get("io");
        io.emit("taskUpdated", updatedTask);
        io.emit("activityCreated", activity);

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
