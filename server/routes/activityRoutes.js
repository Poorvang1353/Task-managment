import { Router } from "express";
import Activity from "../models/Activity.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const activities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
