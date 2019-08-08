# WIP Aeneas

## Included

- React (>16)
- Typescript
- HMR
- Scss
- Autoprefixer
- Webpack (>4)

![img](https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif)

## Usage

Development:
`npm start` or `npm run start:no-ssl`

coverage
`npm t -- --coverage.`

## Build

`npm run build`

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

## SSL

````bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
 -newkey rsa:2048 -nodes -sha256 \
 -subj '/CN=localhost' -extensions EXT -config <( \
 printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
 ```bash
````

## Chrome SSL localhost

chrome://flags/#allow-insecure-localhost
