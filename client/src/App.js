import React, { useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import TracksPage from "./components/tracks/TracksPage";
import PlaylistsPage from "./components/playlists/PlaylistsPage";
import AudioPlayer from "./components/audioplayer/AudioPlayer";

function App() {
  const [currentTrack, setCurrentTrack] = useState();
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/tracks');

  const navigate = (path, e) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentPath(path);
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
                onClick={(e) => navigate('/tracks', e)}
                className={currentPath === '/tracks' ? styles.active : ''}
              >
                Tracks
              </a>
            </li>
            <li>
              <a 
                href="/playlists"
                onClick={(e) => navigate('/playlists', e)}
                className={currentPath === '/playlists' ? styles.active : ''}
              >
                Playlists
              </a>
            </li>
          </ul>
        </nav>
        {currentPath === '/tracks' && <TracksPage handlePlay={setCurrentTrack} />}
        {currentPath === '/playlists' && <PlaylistsPage />}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
