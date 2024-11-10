import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../api/api';

const TaskPage = () => {
  const { taskId } = useParams(); // Get the task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  // Fetch task details when the component mounts
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskData = await getTaskById(taskId);  // Fetch task details by ID
        setTask(taskData);
      } catch (err) {
        console.error('Error fetching task data:', err);  // Log the error
        setError('Failed to load task details.');  // Set the error state
      }
    };

    fetchTaskDetails();
  }, [taskId]); // Re-fetch when taskId changes

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    const updatedTask = { ...task, status: newStatus };

    try {
      await updateTask(taskId, updatedTask);  // API call to update the task
      setTask(updatedTask);  // Update the task state locally
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task status.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <h3>{task.task}</h3>
      <p>{task.description}</p>

      <div>
        <label>Status: </label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="DE_SCOPED">DE_SCOPED</option>
        </select>
      </div>

      {/* <button onClick={() => navigate(`/collection/${task.collectionId}`)}>
        Back to Collection
      </button> */}
    </div>
  );
};

export default TaskPage;
