import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Word from "./Word";

test("render content", () => {
  const word = {
    word: "test",
    url: "example.com",
  };

  const Mock = jest.fn();

  render(<Word w={word} handlePopUp={Mock} />);

  const element = screen.getByText(word.word);
  expect(element).toBeDefined();
  expect(element).toBeVisible();
  expect(element).toBeInTheDocument();
});

test("click on word", async () => {
  const word = {
    word: "test",
    url: "example.com",
  };

  const Mock = jest.fn();
  render(<Word w={word} handlePopUp={Mock} />);

  const user = userEvent.setup();
  const element = screen.getByText(word.word);

  await user.click(element);
  expect(Mock.mock.calls).toHaveLength(1);
});
