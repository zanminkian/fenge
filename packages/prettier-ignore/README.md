# prettier-ignore

## Usage

Install it.

```sh
npm i prettier-ignore -D
```

Use it via Prettier by passing `--ignore-path` option.

```sh
npx prettier --ignore-path ./node_modules/prettier-ignore/prettierignore .
```

## Why

Prettier will not ignore some common files which should be ignored, like `pnpm-lock.yaml` file and `dist` folder, according to their [issues](https://github.com/prettier/prettier/issues/14517). This package provide some commonly patterns which should be ignored by Prettier.

## License

MIT
