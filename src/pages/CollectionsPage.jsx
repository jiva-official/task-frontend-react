import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCollections, createCollection } from '../api/api';

const CollectionsPage = () => {
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [error, setError] = useState(null);

    // Fetch collections on component mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (err) {
        setError("Failed to load collections.");
      }
    };
    fetchCollections();
  }, []);

   // Handle collection creation
   const handleCreateCollection = async () => {
    try {
      const newCollection = await createCollection(newCollectionName);
      setCollections([...collections, newCollection]);
      setNewCollectionName(''); // Clear input
    } catch (err) {
      setError("Error creating collection. Please try again.");
    }
  };

  return (
    <div>
      <h1>Collections</h1>

      <input
        type="text"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
        placeholder="New Collection Name"
      />
      <button onClick={handleCreateCollection}>Add Collection</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collection/${collection.id}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default CollectionsPage;