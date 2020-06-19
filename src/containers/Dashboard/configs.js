import colors from "./colors"
import _ from 'lodash'

// custom label https://jsfiddle.net/BlackLabel/37h8kqdL/
// responsive rules https://jsfiddle.net/alphalpha/rxvjh8y3/

const column = {
  chart: { type: 'column' },
  title: {
    text: '$TITLE',
  },
  // subtitle: { text },
  xAxis: {
    type: 'category',
    labels: {
      rotation: 0,
      style: {
        fontSize: '10px',
      }
    }
  },
  yAxis: [
    {
      min: 0,
      title: {
        text: '$L-TITLE'
      }
    },
    {
      min: 0,
      title: {
        text: '$R-TITLE',
        style: { color: colors[1] } // pull from baseStyle
      },
      labels: { style: { color: colors[1] } },
      opposite: true
    }
  ],

  series: [
    {
      name: '$L-TITLE',
      color: colors[0]+'98',
    },
    {
      name: '$R-TITLE',
        color: colors[1],
      tooltip: {
        pointFormat: '<b>{point.y:.1f}%</b>',
      },
      type: 'scatter',
      yAxis: 1
    },
  ]
}

const line = {
  chart: { type: 'line' },
  title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
  },

  yAxis: {
      title: {
          text: 'Number of Employees'
      }
  },

  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          marker: { radius: 0 }
      }
  },
}

const area = {
  chart: { type: 'area' },
  xAxis: {
      categories: '$[CATEGORIES]'
  },
  yAxis: { title: { text: null } }, //, labels: { enabled: false } },
}

const getColumn = ({title, series}) => {
  const specifics = {
    title: { text: title },
    legend: { enabled: false },
    yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series: series
  }
  return _.merge({}, column, specifics)
}

const getLine = ({title, series, categories, spline=false, options={}}) => {
  const specifics = {
    chart: { type: spline ? 'spline' : 'line' },
    title: { text: title },
    legend: { layout: 'proximate', symbolWidth: 40 },
    yAxis: { title: { text: null } },
    xAxis: { categories },
    // yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series
  }
  return _.merge({}, line, specifics, options)
}

const getArea = ({title, categories, series, options={}}) => {
  const specifics = {
    title: { text: title },
    xAxis: { categories },
    // yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series
  }
  return _.merge({}, area, specifics, options)
}

export {
  getArea,
  getColumn,
  getLine
}
