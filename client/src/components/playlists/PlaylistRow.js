import { useState } from "react";
import styles from "./Playlists.module.css";
import TrackRow from "../tracks/TrackRow";

const PlaylistRow = ({ playlist, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={`${styles.playlistRow} ${isExpanded ? styles.expanded : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.arrow}></span>
        <div className={styles.playlistTitle}>{playlist.name}</div>
        <div className={styles.playlistTracks}>
          {playlist.tracks?.length || 0} tracks
        </div>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(playlist.id);
          }}
          aria-label="Delete playlist"
        >
          ✕
        </button>
      </div>
      {isExpanded && (
        <div className={styles.tracksList}>
          {playlist.tracks?.map((track) => (
            <TrackRow key={track.id} track={track} />
          ))}
        </div>
      )}
    </>
  );
};

export default PlaylistRow;
