import { useState, useEffect } from "react";

export function useTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return { tracks };
}
