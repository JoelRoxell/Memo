import { configure } from '@storybook/react'
// automatically import all files ending in *.stories.tsx
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

const req = require.context('../src/stories', true, /\.stories\.tsx$/)

// Globally in your .storybook/config.js, or alternatively, per-chapter
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline'
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0
        },
        h2: {
          display: 'inline',
          color: '#999'
        }
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2'
      }
    },
    inline: true,
    source: false
  })
)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
