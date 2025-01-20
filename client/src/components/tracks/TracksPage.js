import React from "react";
import TrackRow from "./TrackRow";
import styles from "./TracksPage.module.css";

function TracksPage({ handlePlay, tracks, playlists, onAddToPlaylist }) {
  return (
    <>
      {tracks.length === 0 ? (
        <div className={styles.noTracks}>No tracks available.</div>
      ) : (
        tracks.map((track, ix) => (
          <TrackRow
            key={ix}
            track={track}
            handlePlay={handlePlay}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
          />
        ))
      )}
    </>
  );
}

export default TracksPage;
