import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WordList from "./WordList";

test("render content", () => {
  const arrayWords = [
    {
      word: "test",
      url: "example.com",
    },
    {
      word: "another test",
      url: "anoter.com",
    },
  ];

  const mockExclusion = jest.fn();
  const mockPopUp = jest.fn();

  render(
    <WordList
      arrayWords={arrayWords}
      handlePopUp={mockPopUp}
      handleExclusion={mockExclusion}
    />,
  );

  const ul = screen.getByRole("ul");
  const lis = screen.getAllByRole("li");

  expect(ul).toBeDefined();
  expect(ul).toBeInTheDocument();
  lis.forEach((li) => () => {
    expect(li).toBeDefined();
    expect(li).toBeInTheDocument();
  });
  arrayWords.forEach((word) => () => {
    expect(screen.getByText(word.word)).toBeDefined();
    expect(screen.getByText(word.word)).toBeVisible();
    expect(screen.getByText(word.word)).toHaveTextContent(word.word);
    expect(screen.getByText(word.word)).toBeInTheDocument();
  });
});

test("click in the word to pop up the search", async () => {
  const arrayWords = [
    { word: "test", url: "example.com" },
    { word: "another test", url: "anoter.com" },
  ];

  const user = userEvent.setup();
  const mockExclusion = jest.fn();
  const mockPopUp = jest.fn();

  render(
    <WordList
      arrayWords={arrayWords}
      handlePopUp={mockPopUp}
      handleExclusion={mockExclusion}
    />,
  );

  const lis = screen.getAllByRole("li");

  lis.forEach((li) => async () => {
    let element = li.querySelector("p");

    await user.click(element!);

    expect(mockPopUp.mock.calls).toHaveLength(1);
  });
});

test("click in the x to exclude the search", async () => {
  const arrayWords = [
    { word: "test", url: "example.com" },
    { word: "another test", url: "anoter.com" },
  ];

  const user = userEvent.setup();
  const mockExclusion = jest.fn();
  const mockPopUp = jest.fn();

  render(
    <WordList
      arrayWords={arrayWords}
      handlePopUp={mockPopUp}
      handleExclusion={mockExclusion}
    />,
  );

  const lis = screen.getAllByRole("li");

  lis.forEach((li) => async () => {
    let element = li.querySelector("svg");

    await user.click(element!);

    expect(mockExclusion.mock.calls).toHaveLength(1);
  });
});
