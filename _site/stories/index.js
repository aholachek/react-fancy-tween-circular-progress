import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Chart from './../src/DonutChart'
import Welcome from './Welcome'
import './style.css'

const chartStories = storiesOf('Chart', module)
chartStories.addDecorator(withKnobs)

chartStories
  .add('basic', () => (
    <div style={{width: '300px', height: '300px', margin: '10%'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ))
  .add('large', () => (
    <div style={{width: '500px', height: '500px', margin: '10px'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ))
  .add('small', () => (
    <div style={{width: '50px', height: '50px', margin: '10px'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ))
  .add('monotone', () => (
    <div style={{width: '300px', height: '300px', margin: '10%'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ))
  .add('custom color scheme', () => (
    <div style={{width: '300px', height: '300px', margin: '10%'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ))
  .add('show percent', () => (
    <div style={{width: '300px', height: '300px', margin: '10%'}}>
      <Chart percent={number('Percent', 75)} showPercent />
    </div>
    ))
