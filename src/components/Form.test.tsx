import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import { SearchedWord } from "../types";

test("render content", () => {
  const translation = "english";
  const word = "test";
  const arrayWords = [
    {
      word: "testing",
      url: "example.com",
    },
    {
      word: "another test",
      url: "another.com",
    },
  ];

  const mockWord = jest.fn();
  const mockArrayWords = jest.fn();
  const mockTranslation = jest.fn();

  render(
    <Form
      word={word}
      setWord={mockWord}
      translation={translation}
      setTranslation={mockTranslation}
      arrayWords={arrayWords}
      setArrayWords={mockArrayWords}
    />,
  );

  const form = screen.getByRole("form");
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  const select = screen.getByRole("combobox");

  expect(form).toBeDefined();
  expect(form).toBeInTheDocument();
  expect(input).toBeDefined();
  expect(input).toBeInTheDocument();
  expect(button).toBeDefined();
  expect(button).toBeInTheDocument();
  expect(button).toBeVisible();
  expect(button).toContainElement(button.querySelector("svg"));
  expect(select).toBeDefined();
  expect(select).toBeInTheDocument();
  expect(select).toHaveAttribute("name", "chooseDictionary");
});

test("search word with empty array words", async () => {
  const translation = "english";
  const word = "test";
  const arrayWords: SearchedWord[] = [];

  const user = userEvent.setup();
  const mockWord = jest.fn();
  const mockArrayWords = jest.fn();
  const mockTranslation = jest.fn();

  render(
    <Form
      word={word}
      setWord={mockWord}
      translation={translation}
      setTranslation={mockTranslation}
      arrayWords={arrayWords}
      setArrayWords={mockArrayWords}
    />,
  );

  const button = screen.getByRole("button");

  await user.click(button);

  expect(mockWord.mock.calls[0][0]).toBe("");
  expect(mockArrayWords.mock.calls[0][0]).toHaveLength(1);
  expect(mockArrayWords.mock.calls[0][0][0]).toStrictEqual({
    word: "test",
    url: "https://dictionary.cambridge.org/dictionary/english/test",
  });
});

test("search word with populated array words", async () => {
  const translation = "english";
  const word = "test";
  const arrayWords: SearchedWord[] = [
    {
      word: "some",
      url: "some.com",
    },
    {
      word: "word",
      url: "word.com",
    },
  ];

  const user = userEvent.setup();
  const mockWord = jest.fn();
  const mockArrayWords = jest.fn();
  const mockTranslation = jest.fn();

  render(
    <Form
      word={word}
      setWord={mockWord}
      translation={translation}
      setTranslation={mockTranslation}
      arrayWords={arrayWords}
      setArrayWords={mockArrayWords}
    />,
  );

  const button = screen.getByRole("button");

  await user.click(button);

  expect(mockWord.mock.calls[0][0]).toBe("");
  expect(mockArrayWords.mock.calls[0][0]).toHaveLength(3);
  expect(mockArrayWords.mock.calls[0][0][2]).toStrictEqual({
    word: "test",
    url: "https://dictionary.cambridge.org/dictionary/english/test",
  });
});
