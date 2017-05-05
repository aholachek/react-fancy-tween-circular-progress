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

export default function (svgEl, options) {
  const percent = normalizePercent(options.percent)
  const color = (typeof options.color === 'string') ? {
    0: options.color,
    100: options.color
  } : options.color

  const svg = select(svgEl)

  const radius = 80
  const g = svg.append('g')
    .attr('transform', 'translate(' + 85 + ',' + 100 + ')')

  const colorScale = scaleLinear()
    .domain(Object.keys(color).map(n => parseInt(n)))
    .range(Object.values(color))

  const arcPath = d3Shape.arc()
    .outerRadius(radius)
    .innerRadius(options.fat ? radius - 20 : radius - 10)

  // draw the background arc
  const backgroundPath = g
    .append('path')
    .attr('fill', options.underlayColor)
    .datum({startAngle: 0, padAngle: 0, endAngle: 2 * Math.PI})
    .attr('d', arcPath)

  let text = g.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '48px')
            .attr('dy', '18px')

  const prefix = text.append('tspan')
  .attr('class', 'circular-progress__prefix')
  .attr('font-size', '32px')
  .text(options.prefix)

  const mainText = text.append('tspan')
            .attr('class', 'circular-progress__number')

  const suffix = text.append('tspan')
    .attr('class', 'circular-progress__suffix')
    .attr('font-size', '32px')
    .text(options.suffix)

  if (options.label) {
    g.append('text')
              .attr('text-anchor', 'middle')
              .attr('dy', '28.8px')
              .attr('font-size', '16px')
              .attr('class', 'circular-progress__label')
              .text(options.label)

    text.attr('dy', '8px')
  }
  const arc = g.append('path')
    .datum({ percent: 0, startAngle: 0, padAngle: 0, endAngle: 0 }
  )
    .attr('d', arcPath)

  if (options.floating) {
    arc.attr('filter', 'url(#dropshadow)')
    backgroundPath
    .attr('fill', 'transparent')
  }

  // ========================================================
  //  updateChart function handles actually drawing the chart
  // ========================================================
  const updateChart = (percent, dontAnimate) => {
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
    if (dontAnimate) {
      arc.attr('d', arcPath)
      .attr('fill', () => colorScale(percent))
      mainText.text(Math.round(percent))
    } else {
      arc.transition()
        .ease(easeExp)
        .duration(1000)
        .attrTween('d', arcTween)
    }
  }

    // ========================================================
    //  fancy interpolation for arcs, text, + fill
    // ========================================================

  function arcTween (d) {
      // this is going to use 'interpolateObject' to tween each value

    const i = interpolate(this._current, d)
    const el = this

    return function (t) {
      const snapshot = i(t)
         // update fill
      select(el).attr('fill', () => colorScale(snapshot.percent))
       // update text
      mainText.text(Math.round(snapshot.percent))
         // update arc
      return arcPath(snapshot)
    }
  }

    // ========================================================
    //  draw the graph with initially provided percent value
    // ========================================================
  updateChart(percent, !options.initialAnimation)

  return {
    updateChart
  }
}
