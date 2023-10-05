import React, { useState } from 'react';
import MODELS from './Models'; // Update the path to models
import './App.css';

const VehicleForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [badge, setBadge] = useState('');
  const [logBook, setLogBook] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      make,
      model,
      badge,
      logBook,
    };

    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="make">Make:</label>
      <select
        id="make"
        value={make}
        onChange={(e) => {
          setMake(e.target.value);
          setModel('');
          setBadge('');
        }}
      >
        <option value="">Select Make</option>
        <option value="ford">Ford</option>
        <option value="bmw">BMW</option>
        <option value="tesla">Tesla</option>
      </select>

      <label htmlFor="model">Model:</label>
      <select
        id="model"
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
          setBadge('');
        }}
        disabled={!make}
      >
        <option value="">Select Model</option>
        {make &&
          Object.keys(MODELS[make]).map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
      </select>

      <label htmlFor="badge">Badge:</label>
      <select
        id="badge"
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
        disabled={!model}
      >
        <option value="">Select Badge</option>
        {model &&
          MODELS[make][model].map((badgeOption) => (
            <option key={badgeOption} value={badgeOption}>
              {badgeOption}
            </option>
          ))}
      </select>

      <label htmlFor="logBook">Upload Logbook:</label>
      <input
        type="file"
        id="logBook"
        accept=".txt"
        onChange={(e) => setLogBook(e.target.files[0])}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default VehicleForm;
