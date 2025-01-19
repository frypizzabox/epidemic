import styles from './Playlists.module.css';

const PlaylistRow = ({ playlist }) => {
  return (
    <div className={styles.playlistRow}>
      <div className={styles.playlistTitle}>{playlist.name}</div>
      <div className={styles.playlistTracks}>{playlist.tracks?.length || 0} tracks</div>
    </div>
  );
};

export default PlaylistRow;
