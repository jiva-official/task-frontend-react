import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CollectionsPage from './pages/CollectionsPage';
import CollectionDetailsPage from './pages/CollectionDetailsPage';
import './App.css';
import TaskPage from './pages/TaskPage';
import AddTaskPage from './pages/AddTaskPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollectionsPage />} />
        <Route path="/collection/:collectionId" element={<CollectionDetailsPage />} />
        <Route path="/task/:taskId" element={<TaskPage />} /> {/* Route for TaskPage */}
        <Route path="/add-task/:collectionId" element={<AddTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;