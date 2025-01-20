import { render, screen } from "@testing-library/react";
import TracksPage from "./TracksPage";

const mockedTracks = [
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
  {
    id: "2",
    title: "Test Track 2",
    genres: [],
    moods: [],
    main_artists: [],
    featured_artists: [],
    length: 180,
    bpm: 120,
  },
];

test("renders tracks page", () => {
  render(<TracksPage tracks={[]} />);
  const linkElement = screen.getByText(/Tracks/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders tracks page with no tracks", async () => {
  render(<TracksPage tracks={[]} />);
  const linkElement = screen.getByText(/No tracks/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders tracks page with tracks", async () => {
  render(<TracksPage tracks={mockedTracks} />);
  const linkElement = await screen.findAllByText(/Test Track/i);
  expect(linkElement[0]).toBeInTheDocument();
  expect(linkElement[1]).toBeInTheDocument();
});
