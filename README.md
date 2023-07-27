# [Cambridge Dictionary](https://dictionary.cambridge.org/) Firefox Extension

A firefox version of the [Cambridge Dictionary Lookup extension](https://chrome.google.com/webstore/detail/cambridge-dictionary-look/cppdeppdfkcdmmhnocldacomdeilfbei?hl=en/).

## Building the Extension

To build the extension first, you need install the dependencies:

```bash
npm install
```

after just run:

```bash
npm run build
```

## Testing

To test all the tests run the command:

```bash
npm test:all
```

or if you want only one of the tests:

- test coverage
    ```bash
    npm run test:coverage
    ```
- end-to-end test
    ```bash
    npm run test:e2e
    ```
