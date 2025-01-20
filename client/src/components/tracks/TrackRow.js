import React, { useState } from "react";
import styles from "./Tracks.module.css";
import playIcon from "../../assets/play.svg";
import addIcon from "../../assets/add.svg";

function TrackRow({ track, handlePlay, playlists = [], onAddToPlaylist }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleAddToPlaylist = (playlistId) => {
    if (onAddToPlaylist) {
      onAddToPlaylist(track, playlistId);
      setShowMenu(false);
    }
  };

  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <img src={playIcon} alt="Play" width="24" height="24" />
      </button>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>
      {onAddToPlaylist && (
        <div className={styles.playlistMenuContainer}>
          <button
            className={styles.playlistMenuButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            <img src={addIcon} alt="Add to playlist" width="24" height="24" />
          </button>
          {showMenu && (
            <div className={styles.playlistMenu}>
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className={styles.playlistMenuItem}
                  >
                    {playlist.name}
                  </div>
                ))
              ) : (
                <div className={styles.playlistMenuItem}>
                  No playlists available
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TrackRow;
