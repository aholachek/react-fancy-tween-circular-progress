import {select} from 'd3-selection'
import 'd3-transition'

import {scaleLinear} from 'd3-scale'
import * as d3Shape from 'd3-shape'
import {interpolate} from 'd3-interpolate'
import {easeExp} from 'd3-ease'

function normalizePercent (percent) {
  if (percent < 0) return 0
  else if (percent > 100) return 100
  else return percent
}

export default function (svgEl, percent, colors, percentSymbol) {
  percent = normalizePercent(percent)

  const svg = select(svgEl)

  const radius = 100
  const g = svg.append('g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')')

  const colorScale = scaleLinear()
    .domain([0, 70, 85, 100])
    .range(colors)

  const arcPath = d3Shape.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius)

  // draw the background arc
  g
    .append('path')
    .attr('fill', 'rgba(0, 0, 0, 0.05)')
    .datum({startAngle: 0, padAngle: 0, endAngle: 2 * Math.PI})
    .attr('d', arcPath)

  const text = g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
            .attr('font-size', '3rem')

  const arc = g.append('path')
    .datum({startAngle: 0, padAngle: 0, endAngle: 0 })
    .attr('d', arcPath)

  // ========================================================
  //  updateChart function handles actually drawing the chart
  // ========================================================
  const updateChart = (percent) => {
    percent = normalizePercent(percent)
    arc
      // cache previous value
      .each(function (d) { this._current = d })
      .datum({
        startAngle: 0,
        padAngle: 0,
        endAngle: (2 * Math.PI) * (percent / 100),
        percent
      })
      .transition()
      .ease(easeExp)
      .duration(500)
      .attrTween('d', arcTween)
  }

    // ========================================================
    //  fancy interpolation for arcs, text, + fill
    // ========================================================

      // arc.datum()
  function arcTween (d) {
      // this is going to use 'interpolateObject' to tween each value

    const i = interpolate(this._current, d)
    const el = this

    return function (t) {
      const snapshot = i(t)
         // update fill
      select(el).attr('fill', () => colorScale(snapshot.percent))
         // update text
      text.text(Math.round(snapshot.percent) + (percentSymbol ? '%' : ''))
         // update arc
      return arcPath(snapshot)
    }
  }

    // ========================================================
    //  draw the graph with initially provided percent value
    // ========================================================
  updateChart(percent)

  return {
    updateChart
  }
}
