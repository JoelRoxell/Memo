import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/common/Button'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Components', module)

stories.add('Button', () => <Button title="X" onClick={action('X was clicked')} />, {
  notes: 'This is a component description'
})

stories.add('Button 2', () => <Button title="X" onClick={action('HEEY')} />, {
  notes: 'This is a component description'
})
