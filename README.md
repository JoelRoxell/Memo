# Aeneas (W.I.P)

This project includes everything you need to start on your new and obnoxiously fancy application.

> The project includes the minimal amount of configuration required to produce a state of the art application and keep a sane (productive) development process.

## Included

- React (>16)
- Typescript
- HMR
- Sass
- Autoprefixer
  <!-- * Redux -->
- Webpack (>4)

**Both code and css-module variable names are type-checked.**

If value productivity, stop apply different project configurations and folder structures in every new setup. Otherwise, you will end up and accept your fate as Josef.K.

## TODO

1.  ~~Add relative imports for both webpack and TS.~~
2.  Finish build pipelines for stage|prod.
3.  Consider adding redux.
4.  Replace hard coded variables in config from cli.
5.  Create a generator for component file structure.

## Usage

1.  `yarn`
2.  `yarn start`
3.  `yarn build`

## Add new path resolutions

### tsconfig.json

```json
"paths": {
  "components/*": ["components/*"]
}
```

### weboack.config.js

```js
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.json'],
  alias: {
    components: path.join(srcPath, 'components')
  }
},
```

For even help see [this](https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/) or read about module resolution [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
