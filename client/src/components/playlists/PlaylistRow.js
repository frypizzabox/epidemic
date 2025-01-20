import styles from "./Playlists.module.css";

const PlaylistRow = ({ playlist, onDelete }) => {
  return (
    <div className={styles.playlistRow}>
      <div className={styles.playlistTitle}>{playlist.name}</div>
      <div className={styles.playlistTracks}>
        {playlist.tracks?.length || 0} tracks
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(playlist.id)}
        aria-label="Delete playlist"
      >
        ✕
      </button>
    </div>
  );
};

export default PlaylistRow;
