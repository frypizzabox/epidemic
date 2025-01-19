import React, { useState, useEffect } from "react";
import TrackRow from "./TrackRow";

function TracksPage({ handlePlay }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}
    </>
  );
}

export default TracksPage;
