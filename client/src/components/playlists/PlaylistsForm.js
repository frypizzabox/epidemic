import React, { useState } from 'react';

function PlaylistsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '' }); // Reset form after submission
  };

  return (
    <div className="playlist-form">
      <h2>Create New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Playlist Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}

export default PlaylistsForm;
