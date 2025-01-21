import React, { useState } from "react";
import styles from "./PlaylistsForm.module.css";

function PlaylistsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "" }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className={styles.playlistForm}>
      <div className={styles.fields}>
        <label htmlFor="name">Playlist Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default PlaylistsForm;
