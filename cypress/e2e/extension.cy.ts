it("First access to Cambridge extension", function () {
  cy.visit("http://localhost:3000/");
  cy.get("img").should("be.visible");
  cy.contains("Make your words meaningful!").should("be.visible");
  cy.get("input").should("be.visible");
  cy.get("button").should("be.visible");
  cy.get("button").children().should("be.visible");
  cy.get("select").should("be.visible").should("have.value", "english");
  cy.get("li").should("not.exist");
});

it("Search a word", function () {
  const word = "test";
  cy.visit("http://localhost:3000/", {
    onBeforeLoad(win) {
      cy.stub(win, "open").as("winOpen");
    },
  });
  cy.get("input").type(word);
  cy.get("button").click();
  cy.get("@winOpen").should(
    "be.calledWith",
    `https://dictionary.cambridge.org/dictionary/english/${word}`,
  );
  cy.get("li").children().should("have.length", 2);
  cy.get("li").children("p").should("have.text", word);
  cy.get("li").children("svg").should("have.exist");
});

it("Search a word on biligual dictionary", function () {
  const word = "test";
  cy.visit("http://localhost:3000/", {
    onBeforeLoad(win) {
      cy.stub(win, "open").as("winOpen");
    },
  });
  cy.get("input").type(word);
  cy.get("select").select("english-japanese");
  cy.get("button").click();
  cy.get("@winOpen").should(
    "be.calledWith",
    `https://dictionary.cambridge.org/dictionary/english-japanese/${word}`,
  );
  cy.get("select").should("have.value", "english-japanese");
  cy.get("li").children().should("have.length", 2);
  cy.get("li").children("p").should("have.text", word);
  cy.get("li").children("svg").should("have.exist");
});

it("Search a word on semi-biligual dictionary", function () {
  const word = "test";
  cy.visit("http://localhost:3000/", {
    onBeforeLoad(win) {
      cy.stub(win, "open").as("winOpen");
    },
  });
  cy.get("input").type(word);
  cy.get("select").select("english-russian");
  cy.get("button").click();
  cy.get("@winOpen").should(
    "be.calledWith",
    `https://dictionary.cambridge.org/dictionary/english-russian/${word}`,
  );
  cy.get("select").should("have.value", "english-russian");
  cy.get("li").children().should("have.length", 2);
  cy.get("li").children("p").should("have.text", word);
  cy.get("li").children("svg").should("have.exist");
});

describe("When excluding a word", () => {
  beforeEach(() => {
    const word = "test";
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
    cy.get("input").type(word);
    cy.get("button").click();
    cy.get("@winOpen").should(
      "be.calledWith",
      `https://dictionary.cambridge.org/dictionary/english/${word}`,
    );
  });

  it("Should have been removed from word list", function () {
    cy.get("li").children("svg").click();
    cy.get("li").should("not.exist");
  });
});

describe("When searching another word", () => {
  beforeEach(() => {
    const word = "test";
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
    cy.get("input").type(word);
    cy.get("button").click();
    cy.get("@winOpen").should(
      "be.calledWith",
      `https://dictionary.cambridge.org/dictionary/english/${word}`,
    );
  });

  it("Should have more than 1 word in the word list", function () {
    const anotherWord = "another";

    cy.get("input").type(anotherWord);
    cy.get("button").click();
    cy.get("@winOpen").should(
      "be.calledWith",
      `https://dictionary.cambridge.org/dictionary/english/${anotherWord}`,
    );
    cy.get("li").should("have.length", 2);
    cy.get("li:first").children().should("have.length", 2);
    cy.get("li:first").children("p").should("not.have.text", anotherWord);
    cy.get("li:first").children("svg").should("have.exist");
    cy.get("li:last").children().should("have.length", 2);
    cy.get("li:last").children("p").should("have.text", anotherWord);
    cy.get("li:last").children("svg").should("have.exist");
  });
});

describe("When searching more than 10 words", () => {
  beforeEach(() => {
    const words = [
      "test",
      "another",
      "some",
      "random",
      "values",
      "search",
      "window",
      "phrase",
      "testing",
      "remove",
      "extra",
      "words",
    ];
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
    words.forEach((word) => {
      cy.get("input").type(word);
      cy.get("button").click();
      cy.get("@winOpen").should(
        "be.calledWith",
        `https://dictionary.cambridge.org/dictionary/english/${word}`,
      );
    });
  });

  it("Should have exact 10 words in the word list", function () {
    cy.get("li").should("have.length", 10);
  });
});

describe("When searching 11 words", () => {
  beforeEach(() => {
    const words = [
      "test",
      "another",
      "some",
      "random",
      "values",
      "search",
      "window",
      "phrase",
      "testing",
      "remove",
    ];
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
    words.forEach((word) => {
      cy.get("input").type(word);
      cy.get("button").click();
      cy.get("@winOpen").should(
        "be.calledWith",
        `https://dictionary.cambridge.org/dictionary/english/${word}`,
      );
    });
  });

  it("Should exclude the oldest word and have the latest word searched in the word list", function () {
    const oldestWord = "test";
    const newestWord = "newest";

    cy.get("li").should("have.length", 10);
    cy.get("li:first").children().should("have.length", 2);
    cy.get("li:first").children("p").should("have.text", oldestWord);
    cy.get("li:first").children("svg").should("have.exist");
    cy.get("li:last").children().should("have.length", 2);
    cy.get("li:last").children("p").should("not.have.text", newestWord);
    cy.get("li:last").children("svg").should("have.exist");
    cy.get("input").type(newestWord);
    cy.get("button").click();
    cy.get("@winOpen").should(
      "be.calledWith",
      `https://dictionary.cambridge.org/dictionary/english/${newestWord}`,
    );
    cy.get("li:first").children().should("have.length", 2);
    cy.get("li:first").children("p").should("not.have.text", oldestWord);
    cy.get("li:first").children("svg").should("have.exist");
    cy.get("li:last").children().should("have.length", 2);
    cy.get("li:last").children("p").should("have.text", newestWord);
    cy.get("li:last").children("svg").should("have.exist");
  });
});

describe("When searching 10 words", () => {
  beforeEach(() => {
    const words = [
      "test",
      "another",
      "some",
      "random",
      "values",
      "search",
      "window",
      "phrase",
      "testing",
      "remove",
    ];
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
    words.forEach((word) => {
      cy.get("input").type(word);
      cy.get("button").click();
      cy.get("@winOpen").should(
        "be.calledWith",
        `https://dictionary.cambridge.org/dictionary/english/${word}`,
      );
    });
  });

  it("Should exclude 2 words on word list and have 8 on word list", function () {
    cy.get("li:first").children("svg").click();
    cy.get("li:last").children("svg").click();
    cy.get("li").should("have.length", 8);
  });
});
