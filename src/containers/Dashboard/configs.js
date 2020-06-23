import colors from "./colors"
import _ from 'lodash'

// custom label https://jsfiddle.net/BlackLabel/37h8kqdL/
// responsive rules https://jsfiddle.net/alphalpha/rxvjh8y3/
// legend mouseover event https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-events-legenditemclick/

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
  yAxis: { title: { text: null }, labels: { format: '{value}%' } },
  tooltip: { valueSuffix: '%' },
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
  plotOptions: {
    area: {
      stacking: 'normal',
      // lineColor: '#666666',
      // lineWidth: 1,
      marker: {
        // lineWidth: 1,
        enabled: false
        // lineColor: '#666666'
      }
    }
  },
  legend: {
    symbolHeight: 11,
    symbolWidth: 11,
    symbolRadius: 0,
    symbolHeight: 12,
    marker: { symbolHeight: 12 }
  },
  tooltip: {
    // split: true,
    valueSuffix: ' million'
  },
  xAxis: {
      categories: '$[CATEGORIES]'
  },
  yAxis: { title: { text: null } }, //, labels: { enabled: false } },
  marker : {symbol : 'square',radius : 12 }
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
    xAxis: { categories },
    // yAxis: { title: { text: 'Percent' }},
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
