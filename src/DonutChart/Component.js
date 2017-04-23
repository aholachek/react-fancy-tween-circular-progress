import React from 'react'
import PropTypes from 'prop-types'
import ChartRenderer from './ChartRenderer'
import ReactDOM from 'react-dom'

export default class DonutChart extends React.Component {
  componentDidMount () {
    this.Vis = ChartRenderer(
      ReactDOM.findDOMNode(this).querySelector('svg'),
      this.props
    )
  }

  componentWillUpdate (nextProps) {
    if (nextProps.percent !== this.props.percent) {
      this.Vis.updateChart(nextProps.percent)
    }
    return false
  }

  render () {
    return (
      <div style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
        verticalAlign: 'middle',
        overflow: 'hidden'
      }}>
        <svg
          className='circular-progress'
          viewBox='0 0 200 200'
          preserveAspectRatio='xMinYMin'
          style={{
            display: 'inline-block',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <defs xmlns='http://www.w3.org/2000/svg'>
            <filter id='dropshadow' height='200%'>
              <feGaussianBlur in='SourceAlpha' stdDeviation='5' />
              <feOffset dx='0' dy='10' result='offsetblur' />
              <feComponentTransfer>
                <feFuncA type='linear' slope='0.18' />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>
        </svg>
    </div>)
  }
}
DonutChart.defaultProps = {
  color: {0: '#E53935', 25: '#F1C40E', 75: '#F1C40E', 100: '#27AE60'},
  percentSymbol: false,
  percent: 0,
  fat: false,
  floating: false,
  underlayColor: 'rgba(0, 0, 0, 0.05)',
  label: null,
  initialAnimation: true,
  prefix: '',
  suffix: ''
}

DonutChart.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  fat: PropTypes.bool,
  floating: PropTypes.bool,
  underlayColor: PropTypes.string,
  label: PropTypes.string,
  initialAnimation: PropTypes.bool
}
