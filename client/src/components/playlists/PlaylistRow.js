import { useState } from "react";
import styles from "./PlaylistRow.module.css";
import PlaylistTrackRow from "./PlaylistTrackRow";

const PlaylistRow = ({
  playlist,
  onDelete,
  onRemoveTrackFromPlaylist,
  handlePlay,
}) => {
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
          {playlist.tracks?.length > 0 ? (
            playlist.tracks.map((track) => (
              <PlaylistTrackRow
                key={track.id}
                track={track}
                playlistId={playlist.id}
                onRemoveTrackFromPlaylist={onRemoveTrackFromPlaylist}
                handlePlay={handlePlay}
              />
            ))
          ) : (
            <div className={styles.noTracks}>No tracks in this playlist.</div>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistRow;
