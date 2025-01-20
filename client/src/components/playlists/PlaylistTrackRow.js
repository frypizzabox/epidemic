import styles from "./PlaylistTrackRow.module.css";
import playIcon from "../../assets/play.svg";

function PlaylistTrackRow({
  track,
  playlistId,
  handlePlay,
  onRemoveTrackFromPlaylist,
}) {
  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <img src={playIcon} alt="Play" width="24" height="24" />
      </button>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists && track.main_artists.join(", ")}
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemoveTrackFromPlaylist(track, playlistId);
        }}
        aria-label="Remove track from playlist"
      >
        ✕
      </button>
    </div>
  );
}

export default PlaylistTrackRow;
