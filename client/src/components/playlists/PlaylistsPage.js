import React, { useState, useEffect } from "react";
import PlaylistsForm from "./PlaylistsForm";
import PlaylistRow from './PlaylistRow';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handleCreatePlaylist = (playlist) => {
    fetch("http://0.0.0.0:8000/playlists/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(playlist),
    })
      .then((res) => res.json())
      .then((newPlaylist) => {
        setPlaylists([...playlists, newPlaylist]);
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
      });
  };

  const handleDeletePlaylist = (playlistId) => {
    fetch(`http://0.0.0.0:8000/playlists/${playlistId}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then(() => {
        setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
      });
  };

  return (
    <>
      <PlaylistsForm onSubmit={handleCreatePlaylist} />
      {playlists.map((playlist, ix) => (
        <PlaylistRow 
          key={ix} 
          playlist={playlist} 
          onDelete={handleDeletePlaylist}
        />
      ))}
    </>
  );
}

export default PlaylistsPage;
