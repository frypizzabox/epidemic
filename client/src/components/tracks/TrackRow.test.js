import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TrackRow from "./TrackRow";

describe("TrackRow", () => {
  const mockTrack = {
    title: "Test Song",
    main_artists: ["Artist 1", "Artist 2"],
  };

  const mockPlaylists = [
    { id: "1", name: "Playlist 1" },
    { id: "2", name: "Playlist 2" },
  ];

  const mockHandlePlay = jest.fn();
  const mockOnAddToPlaylist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders track information correctly", () => {
    render(<TrackRow track={mockTrack} handlePlay={mockHandlePlay} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Artist 1, Artist 2")).toBeInTheDocument();
    expect(screen.getByAltText("Play")).toBeInTheDocument();
  });

  it("calls handlePlay when play button is clicked", () => {
    render(<TrackRow track={mockTrack} handlePlay={mockHandlePlay} />);

    fireEvent.click(screen.getByAltText("Play"));
    expect(mockHandlePlay).toHaveBeenCalledWith(mockTrack);
  });

  it("shows playlist menu when add button is clicked", () => {
    render(
      <TrackRow
        track={mockTrack}
        handlePlay={mockHandlePlay}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    fireEvent.click(screen.getByAltText("Add to playlist"));
    expect(screen.getByText("Playlist 1")).toBeInTheDocument();
    expect(screen.getByText("Playlist 2")).toBeInTheDocument();
  });

  it("calls onAddToPlaylist when a playlist is selected", () => {
    render(
      <TrackRow
        track={mockTrack}
        handlePlay={mockHandlePlay}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    fireEvent.click(screen.getByAltText("Add to playlist"));
    fireEvent.click(screen.getByText("Playlist 1"));

    expect(mockOnAddToPlaylist).toHaveBeenCalledWith(mockTrack, "1");
  });

  it('shows "No playlists available" when playlists array is empty', () => {
    render(
      <TrackRow
        track={mockTrack}
        handlePlay={mockHandlePlay}
        playlists={[]}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    fireEvent.click(screen.getByAltText("Add to playlist"));
    expect(screen.getByText("No playlists available")).toBeInTheDocument();
  });

  it("does not render add to playlist button when onAddToPlaylist is not provided", () => {
    render(<TrackRow track={mockTrack} handlePlay={mockHandlePlay} />);

    expect(screen.queryByAltText("Add to playlist")).not.toBeInTheDocument();
  });
});
