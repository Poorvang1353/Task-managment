import React, { useState } from "react";
import { Form, Button, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const TaskForm = ({ onTaskCreated }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "To Do",
        tagInput: "",
        tags: [],
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addTag = () => {
        const tag = form.tagInput.trim();
        if (tag && !form.tags.includes(tag)) {
            setForm({ ...form, tags: [...form.tags, tag], tagInput: "" });
        }
    };

    const removeTag = (tagToRemove) => {
        setForm({ ...form, tags: form.tags.filter((t) => t !== tagToRemove) });
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            toast.warning("Title is required");
            return;
        }
        setLoading(true);
        try {
            const { tagInput, ...payload } = form;
            await axios.post("/api/tasks", payload);
            toast.success("Task created!");
            setForm({ title: "", description: "", status: "To Do", tagInput: "", tags: [] });
            if (onTaskCreated) onTaskCreated();
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Create New Task</h5>
            </div>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Title *</Form.Label>
                                <Form.Control
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Task title"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status" value={form.status} onChange={handleChange}>
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Done</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Task description (optional)"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Control
                                name="tagInput"
                                value={form.tagInput}
                                onChange={handleChange}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Type a tag and press Enter"
                            />
                            <Button variant="outline-secondary" type="button" onClick={addTag}>
                                Add
                            </Button>
                        </div>
                        <div className="mt-2 d-flex flex-wrap gap-1">
                            {form.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    bg="info"
                                    className="d-flex align-items-center gap-1"
                                    style={{ cursor: "pointer", fontSize: "0.85rem" }}
                                    onClick={() => removeTag(tag)}
                                >
                                    {tag} &times;
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Creating…" : "Create Task"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default TaskForm;
