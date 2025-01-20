import React from "react";
import PlaylistsForm from "./PlaylistsForm";
import PlaylistRow from "./PlaylistRow";

function PlaylistsPage({ playlists, onCreatePlaylist, onDeletePlaylist }) {
  return (
    <>
      <PlaylistsForm onSubmit={onCreatePlaylist} />
      {playlists.map((playlist, ix) => (
        <PlaylistRow key={ix} playlist={playlist} onDelete={onDeletePlaylist} />
      ))}
    </>
  );
}

export default PlaylistsPage;
