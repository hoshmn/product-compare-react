import colors from "./colors"
import _ from 'lodash'

// custom label https://jsfiddle.net/BlackLabel/37h8kqdL/

const column = {
  chart: {
    type: 'column'
  },
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
        pointFormat: '<b>{point.y:.1f}</b>',
      },
      type: 'scatter',
      yAxis: 1
    },
  ]
}

const area = {
  chart: {
      type: 'area'
  },
  legend: { enabled: true },
  xAxis: {
      categories: '$[CATEGORIES]'
  },
  yAxis: { title: { text: null } }, //, labels: { enabled: false } },

  // series: [{
  //     color: colors[4]+'90'
  // },{
  //     color: colors[9]+'90'
  // }]
}

const getColumn = ({title, series}) => {
  const specifics = {
    title: { text: title },
    yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series: series
  }
  return _.merge({}, column, specifics)
}

const getArea = ({title, categories, series}) => {
  const specifics = {
    title: { text: title },
    xAxis: { categories },
    // yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series
  }
  return _.merge({}, area, specifics)
}

export {
  getArea,
  getColumn
}
