import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./hooks/useTracks", () => ({
  useTracks: () => ({
    tracks: [
      {
        id: "1",
        title: "Test Track",
        genres: [],
        moods: [],
        main_artists: [],
        featured_artists: [],
        length: 180,
        bpm: 120,
      },
    ],
  }),
}));

jest.mock("./hooks/usePlaylists", () => ({
  usePlaylists: () => ({
    playlists: [],
    createPlaylist: jest.fn(),
    deletePlaylist: jest.fn(),
    addTrackToPlaylist: jest.fn(),
    removeTrackFromPlaylist: jest.fn(),
  }),
}));

test("renders app with tracks tab", () => {
  render(<App />);
  const linkElement = screen.getByText(/tracks/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders app with playlists tab", () => {
  render(<App />);
  const linkElement = screen.getByText(/playlists/i);
  expect(linkElement).toBeInTheDocument();
});
