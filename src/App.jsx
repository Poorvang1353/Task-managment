import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { io } from "socket.io-client";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ActivityFeed from "./components/ActivityFeed";
import StatsBar from "./components/StatsBar";

const socket = io("http://localhost:3000");

function App() {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  }, []);

  const fetchActivities = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/activities");
      setActivities(data);
    } catch (err) {
      console.error("Failed to fetch activities", err);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/stats");
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  }, []);

  const refreshAll = useCallback(() => {
    fetchTasks();
    fetchActivities();
    fetchStats();
  }, [fetchTasks, fetchActivities, fetchStats]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    socket.on("taskCreated", () => refreshAll());
    socket.on("taskUpdated", () => refreshAll());
    socket.on("activityCreated", () => {
      fetchActivities();
      fetchStats();
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("activityCreated");
    };
  }, [refreshAll, fetchActivities, fetchStats]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Container fluid className="py-4 px-3 px-md-5">
        <h2 className="text-center mb-4 fw-bold">Task Manager</h2>

        <StatsBar stats={stats} />

        <Row>
          <Col lg={8}>
            <TaskForm onTaskCreated={refreshAll} />
            <TaskList tasks={tasks} />
          </Col>

          <Col lg={4}>
            <ActivityFeed activities={activities} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;