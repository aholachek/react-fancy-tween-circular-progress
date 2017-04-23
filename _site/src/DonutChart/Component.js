import React from 'react'
import PropTypes from 'prop-types'
import ChartRenderer from './ChartRenderer'
import ReactDOM from 'react-dom'
import defaultColors from './defaultColors'

export default class DonutChart extends React.Component {
  componentDidMount () {
    this.Vis = ChartRenderer(
      ReactDOM.findDOMNode(this).querySelector('svg'),
      this.props.percent,
      this.props.colors,
      this.props.percentSymbol
    )
  }

  componentWillUpdate (nextProps) {
    if (nextProps.percent !== this.props.percent) {
      this.Vis.updateChart(nextProps.percent)
    }
    return false
  }

  render () {
    return (<div style={{
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      paddingBottom: '100%',
      verticalAlign: 'middle',
      overflow: 'hidden'
    }}>
      <svg
        viewBox='0 0 200 200'
        preserveAspectRatio='xMinYMin'
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>)
  }
}

DonutChart.defaultProps = {
  colors: defaultColors,
  percentSymbol: false,
  percent: 0
}

DonutChart.propTypes = {
  percent: PropTypes.number,
  colors: PropTypes.array,
  percentSymbol: PropTypes.bool
}
