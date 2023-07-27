import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExcludeWord from "./ExcludeWord";

test("render content", () => {
  const word = {
    word: "test",
    url: "example.com",
  };

  const Mock = jest.fn();

  render(<ExcludeWord handleExclusion={Mock} w={word} />);

  const element = screen.getByRole("cross-mark");

  expect(element).toBeDefined();
  expect(element).toBeVisible();
  expect(element).toBeInTheDocument();
});

test("click on exclude", async () => {
  const word = {
    word: "test",
    url: "example.com",
  };

  const Mock = jest.fn();
  const user = userEvent.setup();

  render(<ExcludeWord handleExclusion={Mock} w={word} />);
  const element = screen.getByRole("cross-mark");

  await user.click(element);
  expect(Mock.mock.calls).toHaveLength(1);
});
