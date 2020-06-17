import colors from "./colors"
import _ from 'lodash'

// custom label https://jsfiddle.net/BlackLabel/37h8kqdL/

const column = {
  chart: {
    type: 'column'
  },
  title: {
    text: '$TITLE', // 'Adults'
    tooltip: 'hihihi'
  },
  subtitle: {
    // text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
  },
  xAxis: {
    type: 'category',
    labels: {
      // rotation: -45,
      style: {
        fontSize: '10px',
        fontFamily: 'Verdana, sans-serif'
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
  legend: { enabled: false },
  credits: { enabled: false },

  series: [
    {
      name: '$L-TITLE',
      data: [
        ['Women', 24.2],
        ['Men', 20.8],
      ],
    },
    {
      name: '$R-TITLE',
      tooltip: {
        pointFormat: '<b>{point.y:.1f}</b>',
        // formatter: function(point) {
        //   console.log(point)
        //   debugger
        // }
      },
      data: [
        ['Women', 2.234322],
        ['Men', 30.234328],
      ],
      type: 'scatter',
      yAxis: 1
    },
  ]
}

const getColumn = ({title, series}) => {
  const specifics = {
    title: { text: title },
    yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series: series
  }
  return _.merge({}, column, specifics)
}

export {
  getColumn
}
