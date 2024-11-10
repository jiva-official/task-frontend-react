import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollectionDetails, getTasksForCollection } from '../api/api';

const CollectionDetailsPage = () => {
  const { collectionId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [error, setError] = useState(null);

  // Fetch collection and task details
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const collectionData = await getCollectionDetails(collectionId);
        setCollectionName(collectionData.name);
        const taskData = await getTasksForCollection(collectionId);
        setTasks(taskData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load collection details or tasks.');
      }
    };

    fetchCollectionDetails();
  }, [collectionId]);

  // Function to get the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'grey';
      case 'IN_PROGRESS':
        return 'green';
      case 'COMPLETED':
        return 'blue';
      case 'DE_SCOPED':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="collection-details-container">
      <h1>Tasks for Collection: {collectionName || 'Loading...'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <Link to={`/task/${task.id}`}>
              <h3>{task.task}</h3>
            </Link>
            <p>{task.description}</p>
            <div
              style={{
                color: getStatusColor(task.status),
                textDecoration: task.status === 'DE_SCOPED' ? 'line-through' : 'none',
              }}
            >
              <strong>Status: {task.status}</strong>
            </div>
          </div>
        ))}
      </div>
      {/* Option to add new task */}
      <Link to={`/add-task/${collectionId}`} className="add-task-button">Add New Task</Link>
    </div>
  );
};

export default CollectionDetailsPage;
