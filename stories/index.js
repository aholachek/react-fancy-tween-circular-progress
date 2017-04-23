import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Chart from './../src/DonutChart'
import './style.css'

const chartStories = storiesOf('Chart', module)
chartStories.addDecorator(withKnobs)

chartStories
  .addWithInfo('Basic', 'Change the percent value at the bottom to see the chart animate.', () => (
    <div style={{width: '300px', height: '300px', margin: '2%'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ), {inline: true, propTables: false })
  .addWithInfo('Responsive by default', 'Resize window to see chart rescale.',
  () => (
    <div style={{width: '60%', margin: '10px'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ),
  { inline: true, propTables: false }
)
  .addWithInfo('Make it tiny', 'Scale chart size by changing container size', () => (
    <div style={{width: '50px', height: '50px', margin: '10px'}}>
      <Chart percent={number('Percent', 75)} />
    </div>
  ),
  { inline: true, propTables: false }
)
.addWithInfo('Add a drop shadow', () => (
  <div style={{width: '300px', height: '300px', margin: '2%'}}>
    <Chart percent={number('Percent', 75)} floating />
  </div>
),
{ inline: true, propTables: false }
)
  .addWithInfo('Use a custom color scheme', () => (
    <div style={{width: '300px', height: '300px', margin: '2%'}}>
      <Chart percent={number('Percent', 75)} color={{
        0: '#4ee9ff',
        50: '#4e4eff',
        100: '#984eff'
      }}
        underlayColor='hsla(27, 100%, 50%, 0.3)'
      />
    </div>
  ),
  { inline: true, propTables: false }
)
  .addWithInfo('Add a suffix', () => (
    <div style={{width: '300px', height: '300px', margin: '2%'}}>
      <Chart percent={number('Percent', 75)} suffix='%' />
    </div>
  ),
  { inline: true, propTables: false }
)
    .addWithInfo('Add a prefix', () => (
      <div style={{width: '300px', height: '300px', margin: '2%'}}>
        <Chart percent={number('Percent', 75)} prefix='$' />
      </div>
    ),
    { inline: true, propTables: false }
)
      .addWithInfo('Make the line a little fatter', () => (
        <div style={{width: '300px', height: '300px', margin: '2%'}}>
          <Chart percent={number('Percent', 75)} fat />
        </div>
    ),
    { inline: true, propTables: false }
)
    .addWithInfo('Add a label', () => (
      <div style={{width: '300px', height: '300px', margin: '2%'}}>
        <Chart percent={number('Percent', 75)} label='Average Score' />
      </div>
  ), { inline: true, propTables: false }
)
  .addWithInfo('No initial animation', () => (
    <div style={{width: '300px', height: '300px', margin: '2%'}}>
      <Chart percent={number('Percent', 75)} initialAnimation={false} />
    </div>
),
{ inline: true, propTables: false }
)
