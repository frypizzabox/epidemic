import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import TracksPage from "./components/tracks/TracksPage";
import PlaylistsPage from "./components/playlists/PlaylistsPage";
import AudioPlayer from "./components/audioplayer/AudioPlayer";
import { usePlaylists } from "./hooks/usePlaylists";
import { useTracks } from "./hooks/useTracks";

function App() {
  const [currentTrack, setCurrentTrack] = useState();
  const [currentPath, setCurrentPath] = useState("/tracks");

  const { tracks } = useTracks();
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  } = usePlaylists();

  const navigate = (path, e) => {
    e.preventDefault();
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/playlists") {
      setCurrentPath(path);
    }
  }, []);

  if (!tracks || !playlists) return <div>Loading...</div>;

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
            onAddToPlaylist={addTrackToPlaylist}
          />
        )}
        {currentPath === "/playlists" && (
          <PlaylistsPage
            playlists={playlists}
            onCreatePlaylist={createPlaylist}
            onDeletePlaylist={deletePlaylist}
            onRemoveTrackFromPlaylist={removeTrackFromPlaylist}
            handlePlay={setCurrentTrack}
          />
        )}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
