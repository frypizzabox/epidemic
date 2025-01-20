import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import TracksPage from "./components/tracks/TracksPage";
import PlaylistsPage from "./components/playlists/PlaylistsPage";
import AudioPlayer from "./components/audioplayer/AudioPlayer";

function App() {
  const [currentTrack, setCurrentTrack] = useState();
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || "/tracks"
  );
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const navigate = (path, e) => {
    e.preventDefault();
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

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
        setPlaylists(
          playlists.filter((playlist) => playlist.id !== playlistId)
        );
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
      });
  };

  const handleAddTrackToPlaylist = (track, playlistId) => {
    fetch(`http://0.0.0.0:8000/playlists/${playlistId}/add_track/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ track_id: track.id }),
    })
      .then(() => {
        setPlaylists(
          playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist
          )
        );
      })
      .catch((error) => {
        console.error("Error adding track to playlist:", error);
      });
  };

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a
                href="/tracks"
                onClick={(e) => navigate("/tracks", e)}
                className={currentPath === "/tracks" ? styles.active : ""}
              >
                Tracks
              </a>
            </li>
            <li>
              <a
                href="/playlists"
                onClick={(e) => navigate("/playlists", e)}
                className={currentPath === "/playlists" ? styles.active : ""}
              >
                Playlists
              </a>
            </li>
          </ul>
        </nav>
        {currentPath === "/tracks" && (
          <TracksPage
            handlePlay={setCurrentTrack}
            tracks={tracks}
            playlists={playlists}
            onAddToPlaylist={handleAddTrackToPlaylist}
          />
        )}
        {currentPath === "/playlists" && (
          <PlaylistsPage
            playlists={playlists}
            onCreatePlaylist={handleCreatePlaylist}
            onDeletePlaylist={handleDeletePlaylist}
          />
        )}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
