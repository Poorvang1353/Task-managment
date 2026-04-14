import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

// GET stats: total tasks, count by status, most common tag
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        const total = tasks.length;

        // Count by status
        const byStatus = { "To Do": 0, "In Progress": 0, Done: 0 };
        const tagCount = {};

        tasks.forEach((task) => {
            byStatus[task.status] = (byStatus[task.status] || 0) + 1;
            task.tags.forEach((tag) => {
                if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });

        // Most common tag
        let mostCommonTag = null;
        let maxCount = 0;
        for (const [tag, count] of Object.entries(tagCount)) {
            if (count > maxCount) {
                mostCommonTag = tag;
                maxCount = count;
            }
        }

        res.json({ total, byStatus, mostCommonTag });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
