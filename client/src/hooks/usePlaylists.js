import { useState, useEffect } from "react";

export function usePlaylists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  const createPlaylist = (playlist) => {
    return fetch("http://0.0.0.0:8000/playlists/", {
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
        return newPlaylist;
      });
  };

  const deletePlaylist = (playlistId) => {
    return fetch(`http://0.0.0.0:8000/playlists/${playlistId}`, {
      method: "DELETE",
      mode: "cors",
    }).then(() => {
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    });
  };

  const addTrackToPlaylist = (track, playlistId) => {
    return fetch(`http://0.0.0.0:8000/playlists/${playlistId}/add_track/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ track_id: track.id }),
    })
      .then(() =>
        fetch(`http://0.0.0.0:8000/playlists/${playlistId}/`, { mode: "cors" })
      )
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(
          playlists.map((playlist) =>
            playlist.id === playlistId ? data : playlist
          )
        );
      });
  };

  const removeTrackFromPlaylist = (track, playlistId) => {
    return fetch(`http://0.0.0.0:8000/playlists/${playlistId}/remove_track/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ track_id: track.id }),
    }).then(() => {
      setPlaylists(
        playlists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                tracks: playlist.tracks.filter((t) => t.id !== track.id),
              }
            : playlist
        )
      );
    });
  };

  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };
}
