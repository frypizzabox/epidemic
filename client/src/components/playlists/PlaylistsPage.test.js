import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistsPage from "./PlaylistsPage";

// Mock child components to isolate PlaylistsPage testing
jest.mock("./PlaylistsForm", () => {
  return function MockPlaylistsForm({ onSubmit }) {
    return (
      <div data-testid="playlists-form" onClick={onSubmit}>
        Playlists Form
      </div>
    );
  };
});

jest.mock("./PlaylistRow", () => {
  return function MockPlaylistRow({ playlist, onDelete }) {
    return (
      <div data-testid="playlist-row" onClick={() => onDelete(playlist.id)}>
        {playlist.name}
      </div>
    );
  };
});

describe("PlaylistsPage", () => {
  const mockProps = {
    playlists: [],
    onCreatePlaylist: jest.fn(),
    onDeletePlaylist: jest.fn(),
    onRemoveTrackFromPlaylist: jest.fn(),
    handlePlay: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No playlists found" message when playlists array is empty', () => {
    render(<PlaylistsPage {...mockProps} />);
    expect(screen.getByText("No playlists found.")).toBeInTheDocument();
  });

  it("renders PlaylistsForm component", () => {
    render(<PlaylistsPage {...mockProps} />);
    expect(screen.getByTestId("playlists-form")).toBeInTheDocument();
  });

  it("renders playlist rows when playlists exist", () => {
    const playlistsWithData = {
      ...mockProps,
      playlists: [
        { id: 1, name: "Playlist 1" },
        { id: 2, name: "Playlist 2" },
      ],
    };

    render(<PlaylistsPage {...playlistsWithData} />);

    expect(screen.queryByText("No playlists found.")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("playlist-row")).toHaveLength(2);
    expect(screen.getByText("Playlist 1")).toBeInTheDocument();
    expect(screen.getByText("Playlist 2")).toBeInTheDocument();
  });

  it("calls onCreatePlaylist when PlaylistsForm is submitted", () => {
    render(<PlaylistsPage {...mockProps} />);
    fireEvent.click(screen.getByTestId("playlists-form"));
    expect(mockProps.onCreatePlaylist).toHaveBeenCalled();
  });

  it("calls onDeletePlaylist when delete is triggered on a playlist row", () => {
    const playlistsWithData = {
      ...mockProps,
      playlists: [{ id: 1, name: "Playlist 1" }],
    };

    render(<PlaylistsPage {...playlistsWithData} />);
    fireEvent.click(screen.getByTestId("playlist-row"));
    expect(mockProps.onDeletePlaylist).toHaveBeenCalledWith(1);
  });
});
