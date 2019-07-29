import packageJson from '../package.json'

let projectData = packageJson

if (!packageJson) projectData = { version: 'test version' } // TODO: remove once jest may import json files.

let config = {
  version: projectData.version
}

export default config
