import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectLanguage from "./SelectLanguage";

test("render content", () => {
  const translation: string = "english";

  const Mock = jest.fn();
  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  const select = screen.getByRole("combobox");
  const definitiosOptgroup = screen.getByRole("group", { name: "Definitions" });
  const bilingualOptgroup = screen.getByRole("group", {
    name: "Bilingual Dictionaries",
  });
  const semiBilingualOptgroup = screen.getByRole("group", {
    name: "Semi-bilingual Dictionaries",
  });

  expect(select).toBeDefined();
  expect(select).toHaveAttribute("name", "chooseDictionary");
  expect(definitiosOptgroup).toContainHTML(
    '<option value="english">English</option>',
  );
  expect(bilingualOptgroup).toContainHTML(
    '<option value="english-dutch">English-Dutch</option>',
  );
  expect(semiBilingualOptgroup).toContainHTML(
    '<option value="english-arabic">English-Arabic</option>',
  );
  expect(select).toHaveValue(translation);
  expect(select).toBeInTheDocument();
  expect(select).toBeVisible();
});

test("total number of options", () => {
  const translation: string = "english";

  const Mock = jest.fn();

  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  const elements = screen.getAllByRole("option");

  expect(elements).toHaveLength(30);
});

test("options are rendered", () => {
  const translation: string = "english";

  const Mock = jest.fn();

  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  const elements = screen.getAllByRole("option");

  elements.forEach((element) => () => {
    expect(element).toBeDefined();
    expect(element).toBeVisible();
    expect(element).toHaveAttribute("value");
    expect(element).not.toHaveTextContent("");
    expect(element).toBeInTheDocument();
  });
});

test("select english", () => {
  const translation: string = "english";

  const Mock = jest.fn();

  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  fireEvent.click(screen.getByText("English"));
  expect(screen.getByText("English")).toHaveValue("english");
  expect(screen.getByText("English")).toBeVisible();
  expect(screen.getByText("English")).toBeInTheDocument();
});

test("select portuguese", () => {
  const translation: string = "english";

  const Mock = jest.fn();

  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  fireEvent.click(screen.getByText("English-Portuguese"));
  expect(screen.getByText("English-Portuguese")).toHaveValue(
    "english-portuguese",
  );
  expect(screen.getByText("English-Portuguese")).toBeVisible();
  expect(screen.getByText("English-Portuguese")).toBeInTheDocument();
});

test("select korean", () => {
  const translation: string = "english";

  const Mock = jest.fn();

  render(<SelectLanguage translation={translation} setTranslation={Mock} />);

  fireEvent.click(screen.getByText("English-Korean"));
  expect(screen.getByText("English-Korean")).toHaveValue("english-korean");
  expect(screen.getByText("English-Korean")).toBeVisible();
  expect(screen.getByText("English-Korean")).toBeInTheDocument();
});
