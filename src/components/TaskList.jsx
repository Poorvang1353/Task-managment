import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const statusColors = {
    "To Do": "secondary",
    "In Progress": "warning",
    "Done": "success",
};

const TaskList = ({ tasks }) => {
    const [updatingId, setUpdatingId] = useState(null);

    const handleStatusChange = async (taskId, newStatus) => {
        setUpdatingId(taskId);
        try {
            await axios.patch(`/api/tasks/${taskId}`, { status: newStatus });
            toast.success("Status updated!");
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    if (!tasks.length) {
        return (
            <div className="text-center text-muted py-4">
                <p className="mb-0">No tasks yet. Create one above!</p>
            </div>
        );
    }

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">All Tasks</h5>
            </div>
            <div className="list-group list-group-flush">
                {tasks.map((task) => (
                    <div key={task._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <h6 className="mb-1 fw-bold">{task.title}</h6>
                                {task.description && (
                                    <p className="mb-1 text-muted small">{task.description}</p>
                                )}
                                <div className="d-flex flex-wrap gap-1 mt-1">
                                    {task.tags?.map((tag) => (
                                        <Badge key={tag} bg="info" className="fw-normal">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="ms-3 text-end" style={{ minWidth: "140px" }}>
                                <Badge bg={statusColors[task.status]} className="mb-2 d-block">
                                    {task.status}
                                </Badge>
                                <select
                                    className="form-select form-select-sm"
                                    value={task.status}
                                    disabled={updatingId === task._id}
                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                >
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
