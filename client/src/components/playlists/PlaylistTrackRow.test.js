import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistTrackRow from "./PlaylistTrackRow";

describe("PlaylistTrackRow", () => {
  const mockTrack = {
    title: "Test Song",
    main_artists: ["Test Artist 1", "Test Artist 2"],
  };

  const mockProps = {
    track: mockTrack,
    playlistId: "123",
    handlePlay: jest.fn(),
    onRemoveTrackFromPlaylist: jest.fn(),
  };

  it("renders track information correctly", () => {
    render(<PlaylistTrackRow {...mockProps} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(
      screen.getByText("Test Artist 1, Test Artist 2")
    ).toBeInTheDocument();
  });

  it("calls handlePlay when play button is clicked", () => {
    render(<PlaylistTrackRow {...mockProps} />);

    const playButton = screen.getByRole("button", { name: "Play" });
    fireEvent.click(playButton);

    expect(mockProps.handlePlay).toHaveBeenCalledWith(mockTrack);
  });

  it("calls onRemoveTrackFromPlaylist when delete button is clicked", () => {
    render(<PlaylistTrackRow {...mockProps} />);

    const deleteButton = screen.getByRole("button", {
      name: /remove track from playlist/i,
    });
    fireEvent.click(deleteButton);

    expect(mockProps.onRemoveTrackFromPlaylist).toHaveBeenCalledWith(
      mockTrack,
      "123"
    );
  });

  it("prevents event propagation when delete button is clicked", () => {
    const parentClickHandler = jest.fn();

    render(
      <div onClick={parentClickHandler}>
        <PlaylistTrackRow {...mockProps} />
      </div>
    );

    const deleteButton = screen.getByRole("button", {
      name: /remove track from playlist/i,
    });

    fireEvent.click(deleteButton);

    expect(parentClickHandler).not.toHaveBeenCalled();
    expect(mockProps.onRemoveTrackFromPlaylist).toHaveBeenCalledWith(
      mockTrack,
      "123"
    );
  });
});
