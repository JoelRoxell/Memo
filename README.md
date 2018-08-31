# WIP Anease

## Included

- React (>16)
- Typescript
- HMR
- Sass
- Autoprefixer
- Redux
- Webpack (>4)

**Both code and css-module variable names are type-checked.**

If value productivity, stop apply different project configurations and folder structures in every new setup. Otherwise, you will end up and accept your fate as Josef.K.

![img](https://www.sartle.com/sites/default/files/images/artwork/wm_the_fight_between_aeneas_and_king_turnus_from_virgils_aeneid_Q20880310.jpg)

## Usage

Development:
`yarn start` or `yarn start:no-ssl`

build container:
`docker build -t <project>-front-end .`

test appliction:
`docker run <project>-front-end yarn test`

build application:
`docker run -v $(pwd)/build:/usr/src/app/build <project>-front-end yarn build`

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

### [Generating new components](https://github.com/JoelRoxell/generator-annevo)

```bash
npm install -g yo
npm install -g generator-annevo
yo annevo:hermes --name component-name --path src/components/common/ --subs
```

`yo annevo:hermes --name about --path src/components/ --subs` produces the following component structure with an appropriate file structure.

About.tsx

```ts
import * as React from 'react'
import * as style from './About.scss'

interface AboutProps {
  title: string
}

class About extends React.Component<AboutProps> {
  render() {
    return (
      <div className={style.about}>
        <p>About</p>
      </div>
    )
  }
}

export default About
```

About.scss

```scss
.about {
  ...
}
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
