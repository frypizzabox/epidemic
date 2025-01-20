import React from "react";
import PlaylistsForm from "./PlaylistsForm";
import PlaylistRow from "./PlaylistRow";
import styles from "./Playlists.module.css";

function PlaylistsPage({ playlists, onCreatePlaylist, onDeletePlaylist }) {
  return (
    <>
      <PlaylistsForm onSubmit={onCreatePlaylist} />
      {playlists.length === 0 ? (
        <div className={styles.noPlaylists}>No playlists found.</div>
      ) : (
        playlists.map((playlist, ix) => (
          <PlaylistRow
            key={ix}
            playlist={playlist}
            onDelete={onDeletePlaylist}
          />
        ))
      )}
    </>
  );
}

export default PlaylistsPage;
