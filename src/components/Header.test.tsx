import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("render phrase content", () => {
  render(<Header />);

  const phraseElement = screen.getByText("Make your words meaningful!");

  expect(phraseElement).toBeDefined();
  expect(phraseElement).toBeVisible();
  expect(phraseElement).toBeInTheDocument();
});

test("render image content", () => {
  render(<Header />);

  const imageElement = screen.getByRole("image-logo");

  expect(imageElement).toBeDefined();
  expect(imageElement).toHaveAttribute(
    "src",
    "https://dictionary.cambridge.org/external/images/logo-lrg-small.png?version=5.0.329",
  );
  expect(imageElement).toHaveAttribute(
    "alt",
    'Cambridge Dictionary logo with "Cambridge Dictionary" on the left side',
  );
  expect(imageElement).toBeVisible();
  expect(imageElement).toBeInTheDocument();
});
