import colors from "./colors"
import _ from 'lodash'

// custom label https://jsfiddle.net/BlackLabel/37h8kqdL/
// responsive rules https://jsfiddle.net/alphalpha/rxvjh8y3/
// legend mouseover event https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-events-legenditemclick/

const columnScat = {
  chart: { type: 'column' },
  plotOptions: {
    line: {
      lineWidth: 0,
      states: { hover: { lineWidthPlus: 0 } },
      marker: { radius: 5 }
    },
    column: {
      states: { hover: { 
        // brightness: .5,
        // color: '#a4edba',
        borderColor: 'black'
      } },
    }
  },
  legend: { enabled: false },
  xAxis: {
    type: 'category',
    labels: {
      rotation: 0,
      style: {
        fontSize: '10px',
      }
    }
  },
  tooltip: {
    shared: true
  },
  yAxis: [
    {
      min: 0,
      // tickPixelInterval: 50,
      tickAmount: 5,
      title: {
        text: '$L-TITLE'
      }
    },
    {
      min: 0,
      // tickPixelInterval: 50,
      tickAmount: 5,
      title: {
        style: { color: colors[1] } // pull from baseStyle
      },
      labels: { style: { color: colors[1] } },
      opposite: true
    }
  ],

  series: [
    {
      color: colors[0]+'98',
    },
    {
      color: colors[1],
      yAxis: 1
    },
  ]
}

const columnLine = {
  chart: { type: 'column' },
  plotOptions: {
    line: {
      // lineWidth: 0,
      // states: { hover: { lineWidthPlus: 0 } },
      marker: { radius: 5 }
    },
    column: {
      states: { hover: { 
        // brightness: .5,
        // color: '#a4edba',
        borderColor: 'black'
      } },
    }
  },
  legend: { enabled: true },
  xAxis: {
    type: 'category',
    labels: {
      rotation: 0,
      style: {
        fontSize: '10px',
      }
    }
  },
  tooltip: {
    shared: true
  },

  series: [
    {
      color: colors[12],
    },
    {
      color: colors[2],
    },
  ]
}

const column = {
  chart: { type: 'column' },
  title: {
    text: '$TITLE',
  },

  plotOptions: {
    column: {
      states: { hover: { 
        borderColor: 'black'
      } },
    }
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: 0,
      style: {
        fontSize: '10px',
      }
    }
  },

  yAxis: {
    min: 0,
  },

  // series: [
  //   {
  //     name: '$L-TITLE',
  //     color: colors[0]+'98',
  //   },
  //   {
  //     name: '$R-TITLE',
  //       color: colors[1],
  //     // tooltip: {
  //     //   pointFormat: '<b>{point.y:.1f}%</b>',
  //     // },
  //     yAxis: 1
  //   },
  // ]
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
    symbolRadius: 0,
  },
  tooltip: {
    // split: true,
    // valueSuffix: ' million'
  },
  xAxis: {
      categories: '$[CATEGORIES]'
  },
  yAxis: { title: { text: null } }, //, labels: { enabled: false } },
  marker : {symbol : 'square',radius : 12 }
}

const getColumnScat = ({title, categories, series, options}) => {
  const specifics = {
    title: { text: title },
    xAxis: { categories },
    yAxis: [{ title: { text: series[0].name }}, { title: { text: series[1].name }}],
    series: series
  }
  return _.merge({}, columnScat, specifics, options)
}

const getColumnLine = ({title, categories, series, options}) => {
  const specifics = {
    title: { text: title },
    xAxis: { categories },
    yAxis: [{ title: { text: null }}],
    series: series
  }
  return _.merge({}, columnLine, specifics, options)
}

const getColumn = ({title, categories, series, options}) => {
  const specifics = {
    title: { text: title },
    // legend: { enabled: false },
    xAxis: { categories },
    yAxis: { title: null }, 
    series: series
  }
  return _.merge({}, column, specifics, options)
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
  getColumnScat,
  getColumnLine,
  getLine
}
