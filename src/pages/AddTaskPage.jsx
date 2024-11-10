import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addTask } from '../api/api';

const AddTaskPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { task, description, status };

    try {
      await addTask(collectionId, newTask);  // Make API call to add the task
      navigate(`/collection/${collectionId}`);  // Redirect to collection page
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task.');
    }
  };

  return (
    <div>
      <h1>Add Task to Collection</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="DE_SCOPED">DE_SCOPED</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
