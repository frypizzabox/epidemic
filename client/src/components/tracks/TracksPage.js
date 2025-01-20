import React from "react";
import TrackRow from "./TrackRow";

function TracksPage({ handlePlay, tracks, playlists, onAddToPlaylist }) {
  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow
          key={ix}
          track={track}
          handlePlay={handlePlay}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
    </>
  );
}

export default TracksPage;
