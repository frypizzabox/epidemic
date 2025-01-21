import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlaylistsForm from "./PlaylistsForm";

describe("PlaylistsForm", () => {
  test("renders playlist form elements", () => {
    render(<PlaylistsForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/playlist name:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(<PlaylistsForm onSubmit={() => {}} />);

    const input = screen.getByLabelText(/playlist name:/i);
    fireEvent.change(input, { target: { value: "My New Playlist" } });

    expect(input.value).toBe("My New Playlist");
  });

  test("calls onSubmit with form data when form is submitted", () => {
    const mockOnSubmit = jest.fn();
    render(<PlaylistsForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/playlist name:/i);
    const submitButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "My New Playlist" } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "My New Playlist",
      description: "",
    });
  });

  test("resets form after submission", () => {
    render(<PlaylistsForm onSubmit={() => {}} />);

    const input = screen.getByLabelText(/playlist name:/i);
    const submitButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "My New Playlist" } });
    fireEvent.click(submitButton);

    expect(input.value).toBe("");
  });
});
