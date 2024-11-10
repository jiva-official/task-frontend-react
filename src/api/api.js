import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Get all collections
export const getCollections = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allCollections`);
      return response.data;
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  };

  // Create a new collection
export const createCollection = async (name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addcollection`, null, {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  };


  // Get all tasks for a specific collection
export const getTasksForCollection = async (collectionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/${collectionId}/tasks`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks for collection:", error);
      throw error;
    }
  };

  export const getCollectionDetails = async (collectionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/${collectionId}`);
      return response.data;  // Axios response data is in the 'data' field
    } catch (error) {
      // Handle error by throwing or logging it
      console.error("Error fetching collection details:", error);
      throw new Error("Failed to fetch collection details");
    }
  };
  

  //for tasks.....

  // Fetch task by ID
export const getTaskById = async (taskId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${taskId}`);
      return response.data;  // Axios response data is in 'data' field
    } catch (error) {
      console.error("Error fetching task:", error);
      throw new Error('Failed to fetch task details');
    }
  };
  
  // Update task
  export const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/task/${taskId}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error('Failed to update task');
    }
  };

  export const addTask = async (collectionId, task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/collections/${collectionId}/tasks`, task);  // POST request to add task
      return response.data;
    } catch (error) {
      throw new Error('Error adding task');
    }
  };