import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistRow from "./PlaylistRow";

describe("PlaylistRow", () => {
  const mockPlaylist = {
    id: "1",
    name: "Test Playlist",
    tracks: [
      { id: "track1", title: "Track 1", artist: "Artist 1" },
      { id: "track2", title: "Track 2", artist: "Artist 2" },
    ],
  };

  const mockHandlers = {
    onDelete: jest.fn(),
    onRemoveTrackFromPlaylist: jest.fn(),
    handlePlay: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders playlist name and track count", () => {
    render(<PlaylistRow playlist={mockPlaylist} {...mockHandlers} />);

    expect(screen.getByText("Test Playlist")).toBeInTheDocument();
    expect(screen.getByText("2 tracks")).toBeInTheDocument();
  });

  it("expands and shows tracks when clicked", () => {
    render(<PlaylistRow playlist={mockPlaylist} {...mockHandlers} />);

    // Initially tracks should not be visible
    expect(screen.queryByText("Track 1")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText("Test Playlist"));

    // Tracks should now be visible
    expect(screen.getByText("Track 1")).toBeInTheDocument();
    expect(screen.getByText("Track 2")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<PlaylistRow playlist={mockPlaylist} {...mockHandlers} />);

    const deleteButton = screen.getByLabelText("Delete playlist");
    fireEvent.click(deleteButton);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockPlaylist.id);
  });

  it("shows 'No tracks' message for empty playlist", () => {
    const emptyPlaylist = { ...mockPlaylist, tracks: [] };
    render(<PlaylistRow playlist={emptyPlaylist} {...mockHandlers} />);

    // Expand the playlist
    fireEvent.click(screen.getByText("Test Playlist"));

    expect(screen.getByText("No tracks in this playlist.")).toBeInTheDocument();
  });

  it("prevents playlist expansion when clicking delete button", () => {
    render(<PlaylistRow playlist={mockPlaylist} {...mockHandlers} />);

    const deleteButton = screen.getByLabelText("Delete playlist");
    fireEvent.click(deleteButton);

    // Tracks should not be visible after clicking delete
    expect(screen.queryByText("Track 1")).not.toBeInTheDocument();
  });
});
