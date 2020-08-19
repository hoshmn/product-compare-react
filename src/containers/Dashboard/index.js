import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import * as chartActions from '../../actions/chart'
import baseStyle from './baseStyle'
import {connect} from 'react-redux'
import _ from 'lodash'
import './styles.css'
import { getArea, getColumn, getLine, getColumnScat, getColumnLine } from './configs'
import colors from './colors'
import Tooltip from '../../components/Tooltip'
import NestedBoxes from '../../components/NestedBoxes'
import KPTable from '../../components/KPTable'
import PolicyTable from '../../components/PolicyTable'
import DemographicsTable from '../../components/DemographicsTable'
import { TERM_MAP, TERMS } from '../../constants/glossary'
const HighchartsMore = require('highcharts/highcharts-more')
const Highcharts = require('highcharts')
const ReactHighcharts = require('react-highcharts').withHighcharts(Highcharts)
HighchartsMore(ReactHighcharts.Highcharts)

ReactHighcharts.Highcharts.theme = baseStyle
ReactHighcharts.Highcharts.setOptions(ReactHighcharts.Highcharts.theme)

const DEV = window.location.hostname === 'localhost' && false;

// fix legend markers
// ReactHighcharts.Highcharts.seriesTypes.area.prototype.drawLegendSymbol = 
  // ReactHighcharts.Highcharts.seriesTypes.line.prototype.drawLegendSymbol
// ReactHighcharts.Highcharts.seriesTypes.scatter.prototype.drawDatalabels = 
  // ReactHighcharts.Highcharts.seriesTypes.line.prototype.drawDatalabels


// percentage marks on axis instead of yaxis label
// women men gap?

const countryMap = {
  Kenya: { population: '51.4 million', incomeClass: 'Low income', shiny: true },
  Thailand: { population: '69.4 million', incomeClass: 'Upper-middle income', shiny: false },
}

const URLBase = 'https://status.y-x.ch/query?'

const fields = ['indicator',
'indicator_description',
'contry_iso_code',
'country_name',
'area_name',
'geographic_scope',
'year',
'sex',
'age',
'population_segment',
'population_sub_group',
'value',
'value_comment',
'unit_format',
'source_organization',
'source_database',
'source_year',
'notes',
'modality',
'modality_category']

const chartNames = ['chart1', 'chart2']

const uncertaintyTooltipFormat = `<span style="color:{point.color}">●</span>
  {series.name}: <b>{point.y}</b><br/>
  Uncertainty range: <b>{point.l}% - {point.u}%</b><br/>
  Source: UNAIDS` // todo: fill in actual source on point

const addAvg = arr => {
  if (_.isNumber(arr[0])) {
    return [...arr, _.mean(arr)]
  }

  return [...arr, { y: _.mean(_.map(arr, 'y')) }]
}

const dataHelper = (baseArray, variance=10, shift=0) => {
  return baseArray.map(n => n + shift + Math.floor(Math.random()*variance)-5)
}

class Dashboard extends Component {
  constructor() {
    super()
    this.state = { alertOn: false }
    // fields.forEach(f => this.state[f] = false)

    this.updateField = this.updateField.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
    this.submit = this.submit.bind(this)
    this.submitDQ = this.submitDQ.bind(this)
  }
  componentWillMount() {
    // console.log('hi', this.props.country)
    this.props.actions.getChartData(this.props.country)
  }

  componentDidMount() {
    console.log('mtd', this.props)
  }

  componentWillReceiveProps(newProps) {
    // TODO lodash / deep equal
    if (newProps.chartData === this.props.chartData) {
      console.error('what changed?')
      return
    }
    console.log('Configuring charts: ')
    this.configs = {}
    chartNames.forEach(c => {
      const rows = newProps.chartData[c]
      this.configs[c] = rows
    })
    console.log(this.configs)
  }

  getCascade() {
    const title = 'PLHIV by diagnosis and treatment status'
    const options = { 
      // yAxis: { labels: { format: '{value}%' } },
      subtitle: { text: 'Spectrum model estimates (UNAIDS, 2020)' },
      tooltip: { valueSuffix: ' million' },
      yAxis: { title: { text: 'Adults 15+ (millions)' } },
      plotOptions: { series: { pointStart: 2010 } }
      // tooltip: { pointFormat: '{series.name}: <b>{point.y:.0f} million</b>' },
      // yAxis: { max: 58*2 },
     }
    const series = [
      {
        name: 'Undiagnosed PLHIV',
        description: TERM_MAP.undiagnosedPlhiv.definition,
        color: colors[1]+'97',
        data: [
          14,13,13,12,12,
          12,11,10, 9, 9
        ],
      },
      {
        name: 'PLHIV know status not on ART',
        description: TERM_MAP.plhivWhoKnowStatusNotOnArt.definition,
        color: colors[2]+'97',
        data: [
          38,40,41,44,45,
          45,48,50,53,55
        ].map(n => n-10),
      },
      {
        name: 'PLHIV know status on ART',
        description: TERM_MAP.plhivKnowStatusOnArt.definition,
        color: colors[0]+'97',
        data: [
          16,19,22,24,27,
          32,35,39,42,44
        ].map(n => n-6),
      },
    ]
    return _.merge({}, getArea({title, series, options}))
  }

  getPLHIVAge() {
    const title = 'PLHIV who know status - by age'
    // const options = { plotOptions: { series: { pointStart: 2000 }}}
    const options = {
      legend: { symbolWidth: 40 },
      subtitle: { text: 'Spectrum/Shiny90 model estimates (UNAIDS, 2020)' },
      plotOptions: { series: { pointStart: 2010 } }
    }
    const baseSeries = [
      2, 3, 6,
      9,14,17,
      25,29,36,
      53,
    ]
    const series = [
      {
        name: '15 - 24',
        dashStyle: 'ShortDot',
        data: baseSeries,
      },
      {
        name: '25 - 34',
        dashStyle: 'DashDot',
        data: dataHelper(baseSeries, 8, 5),
      },
      {
        name: '35 - 49',
        dashStyle: 'LongDash',
        data: dataHelper(baseSeries, 6, 8),
      },
      {
        name: '50+',
        color: colors[8],
        dashStyle: 'Solid',
        data: dataHelper(baseSeries, 4, 12),
      },
    ]
    return _.merge({}, getLine({title, series, options}))
  }

  getPLHIVSex() {
    const title = 'PLHIV who know status - by sex'
    const options = {
      legend: { symbolWidth: 40 },
      subtitle: { text: 'Spectrum/Shiny90 model estimates (UNAIDS, 2020)' },
      plotOptions: { series: { pointStart: 2010 } }
    }
    const baseSeries = [
      2, 3, 6,
      9,14,17,
      25,29,36,
      53,
    ]
    
    const series = [
      {
        name: 'Men',
        color: colors[4],
        dashStyle: 'solid',
        data: baseSeries,
      },
      // {
      //   name: '25 - 34',
      //   dashStyle: 'DashDot',
      //   data: dataHelper(baseSeries, 8, 5),
      // },
      // {
      //   name: '35 - 49',
      //   dashStyle: 'LongDash',
      //   data: dataHelper(baseSeries, 6, 8),
      // },
      {
        name: 'Women',
        color: colors[1],
        dashStyle: 'Solid',
        data: dataHelper(baseSeries, 4, 12),
      },
    ]
    return _.merge({}, getLine({title, series, options}))
  }

  getNegative() {
    const title = '<span class="hivn-title">HIV-negative</span> tests - first-time testers and repeat testers'
    const series = [
      {
        name: 'Retest',
        description: TERM_MAP.retest.definition,
        color: colors[4]+'97',
        data: [
          123,132,149,153,163,
          178,191,199,201,212,
          // 214,223,231,238,244,
          // 251,255,257,258,258
        ].map(n => n*1000),

      },
      {
        name: 'First test',
        description: TERM_MAP.firstTest.definition,
        color: colors[9]+'90',
        data: [
          // 29,31,31,32,33,
          // 33,33,34,34,35,
          36,36,36,37,37,
          38,38,39,39,39
        ].map(n => n*1000),
      },
    ]
    const options = {
      title: { useHTML: true },
      yAxis: { title: { text: 'HIV Negative Tests (thousands)' } },
      subtitle: { text: 'Spectrum/Shiny90 model estimates (UNAIDS, 2020)' },
      plotOptions: { series: { pointStart: 2010 } }
      // tooltip: { valueSuffix: ' thousand' },
    }
    return _.merge({}, getArea({title, series, options}))
  }
  
  // getConducted() {
  //   const title = 'HIV Tests Conducted'
  //   const categories = _.range(2000,2020)
  //   const series = [
  //     {
  //       name: 'HIV Negative',
  //       color: colors[4]+'97',
  //       data: [
  //         123,132,149,153,163,
  //         178,191,199,201,212,
  //         214,223,231,238,244,
  //         251,255,257,258,258
  //       ],
  //     },
  //     {
  //       name: 'HIV Positive',
  //       color: colors[9]+'90',
  //       data: [
  //         29,31,31,32,33,
  //         33,33,34,34,35,
  //         36,36,36,37,37,
  //         38,38,39,39,39
  //       ],
  //     },
  //   ]
  //   const options = {
  //     yAxis: { title: { text: 'Adults 15+ (millions)' } },
  //   }
  //   return _.merge({}, getArea({title, categories, series, options}))
  // }

  getDistribution() {
    const title = '<span class="hivp-title">HIV-positive</span> tests - new diagnoses and retests'
    const options = { 
      title: { useHTML: true },
      yAxis: { title: { text: 'HIV Positive tests (thousands)' } },
      subtitle: { text: 'Spectrum/Shiny90 model estimates (UNAIDS, 2020)' },
      plotOptions: { series: { pointStart: 2010 } }
      // tooltip: { pointFormat: '{series.name}: <b>{point.y:.0f} million</b>' },
      // yAxis: { max: 58*2 },
      // tooltip: { valueSuffix: ',000' },
     }
    const series = [
      {
        name: 'Retest - know status on ART',
        description: TERM_MAP.retest.definition,
        color: colors[0]+'97',
        data: [
          // 1,2,4,10,16,
          // 31,39,46,64,78,
          84,81,80,89,94,
          // 84,86,82,83,84,
          77,72,68,61,54
        ].map(n => n*1000),
      },
      {
        name: 'Retest - know status not on ART',
        description: TERM_MAP.retest.definition,
        color: colors[2]+'97',
        data: [
          // 1,2,4,9,15,
          // 26,37,42,59,69,
          62,65,64,54,53,
          // 43,36,33,31,20,
          18,15,9,11,8,
        ].map(n => n*1000),
      },
      {
        name: 'New diagnosis',
        description: TERM_MAP.newDiagnosis.definition,
        color: colors[1]+'97',
        data: [
          // 1,2,4,5,5,
          // 6,7,7,9,9,
          12,15,14,14,13,
          // 13,12,13,11,10,
          10,11,9,9,8,
        ].map(n => n*1000),
      },
    ]
    return _.merge({}, getArea({title, series, options}))
  }

  getPrevalence(shiny) {
    const title = 'Prevalence and positivity'
    const options = {
      plotOptions: { series: { marker: { radius: 3 }}},
      subtitle: { text: 'Spectrum/Shiny90 model estimates (UNAIDS, 2020)' },
      plotOptions: { series: { pointStart: 2010 } }
      // legend: {
      //   useHTML: true,
      //   labelFormatter: function() {
      //     console.log(this.name, this)
      //     return `<span title='${this.userOptions.description}'>${this.name}</span>`
      //   }
      // },
    }

    // TODOxx
    const dyDataArr = dataHelper([
      2, 3, 3, 5, 6,
      9, 11, 14, 17, 21,
    ], 4, 6).reverse()

    const dyRange = dyDataArr.map(v => {
      const u = v + Math.floor(Math.random()*2.5)
      const l = v - Math.floor(Math.random()*2.5)
      return [l,u]
    })

    const dyDataObj = dyRange.map(([l,u], i) => {
      const y = dyDataArr[i]
      return { y, l, u }
    })

    
    const tapDataArr = dataHelper([
      2, 3, 3, 5, 6,
      9, 11, 14, 17, 21,
    ], 6, 8).reverse()

    const tapRange = tapDataArr.map(v => {
      const u = v + Math.floor(Math.random()*2.5)
      const l = v - Math.floor(Math.random()*2.5)
      return [l,u]
    })

    const tapDataObj = tapRange.map(([l,u], i) => {
      const y = tapDataArr[i]
      return { y, l, u }
    })


    
    let series = [
      {
        name: 'HIV prevalence',
        shinyInclude: true,
        description: TERM_MAP.hivPrevalence.definition,
        zIndex: 1,
        tooltip: { pointFormat: uncertaintyTooltipFormat },
        dashStyle: 'ShortDot',
        marker: { radius: 1 },
        lineType: 'line',
        data: [
          {y:43, l:39, u: 46},{y:43, l:39, u: 44},{y:42, l:38, u:43},{y:42, l:38, u:43},{y:42, l:37, u:42},
          {y:41, l:37, u:42},{y:41, l:37, u:42},{y:41, l:37, u:42},{y:41, l:36, u:42},{y:40, l:36, u:41},
        ].map(o => _.each(o, (v,k) => o[k]*=.4)),
      }, {
        name: 'Prevalence range',
        shinyInclude: true,
        data: [
          [39, 46],[39, 44],[38,43],[38,43],[37,42],
          [37,42],[37,42],[37,42],[36,42],[36,41],
        ].map(p => p.map(n => n*.4)),
        type: 'arearange',
        enableMouseTracking: false, // tooltip formatter: find these values to add to + TT
        lineWidth: 0,
        linkedTo: ':previous',
        color: colors[0],
        fillOpacity: 0.2,
        zIndex: 0,
        marker: { enabled: false }
      },
      {
        name: 'Positivity',
        description: TERM_MAP.positivity.definition,
        // dashStyle: 'ShortDot',
        zIndex: 1,
        tooltip: { pointFormat: uncertaintyTooltipFormat },
        data: [ // todo: on import, format l&u into string (as to deal with missing data pre-pointFormat)
          {y: 2, l:1, u: 4}, {y: 3, l:2, u:6}, {y: 3, l:2, u:5}, {y: 5, l:3, u:7}, {y: 6, l:5, u:8},
          {y: 9, l:8, u:9}, {y: 11, l:8, u:12}, {y: 14, l:13, u:15}, {y: 17, l:14, u:19}, {y: 21, l:16, u:23},
        ].reverse(),
      }, {
        name: 'Positivity range',
        data: [
          [1,4],[2,6],[2,5],[3,7],[5,8],
          [8,9],[8,12],[13,15],[14,19],[16,23],
        ].reverse(),
        type: 'arearange',
        enableMouseTracking: false, // tooltip formatter: find these values to add to + TT
        lineWidth: 0,
        linkedTo: ':previous',
        color: colors[1],
        fillOpacity: 0.2,
        zIndex: 0,
        marker: { enabled: false }
      }, {
        name: 'Diagnostic yield',
        description: TERM_MAP.diagnosticYield.definition,
        zIndex: 1,
        tooltip: { pointFormat: uncertaintyTooltipFormat },
        // dashStyle: 'DashDot',
        data: dyDataObj
      }, {
        name: 'Diagnostic yield range',
        data: dyRange,
        type: 'arearange',
        enableMouseTracking: false, // tooltip formatter: find these values to add to + TT
        lineWidth: 0,
        linkedTo: ':previous',
        color: colors[2],
        fillOpacity: 0.2,
        zIndex: 0,
        marker: { enabled: false }
      }, {
        name: 'Treatment adjusted prevalence',
        description: TERM_MAP.treatmentAdjustedPrevalence.definition,
        zIndex: 1,
        color: colors[9],
        // dashStyle: 'LongDash',
        tooltip: { pointFormat: uncertaintyTooltipFormat },
        data: tapDataObj
      }, {
      name: 'Treatment adjusted prevalence range',
      data: tapRange,
      type: 'arearange',
      enableMouseTracking: false, // tooltip formatter: find these values to add to + TT
      lineWidth: 0,
      linkedTo: ':previous',
      color: colors[9],
      fillOpacity: 0.2,
      zIndex: 0,
      marker: { enabled: false }
    },
    ]
    if (!shiny) {
      series = series.filter(s => s.shinyInclude)
    }
    return _.merge({}, getLine({series, options, title, spline:false}))
  }

  getPrep() {
    const title = 'People Receiving Pre-Exposure Prophylaxis (PrEP)'
    const series = [
      {
        name: 'Women',
        color: colors[1],
        data: [11000, 13000, 25000],
      },
      {
        name: 'Men',
        color: colors[4],
        data: [14000, 15000, 29000],
      },
      {
        name: 'Trans',
        color: colors[8],
        data: [1200, 2100, 3900],
      },
      {
        name: 'TOTAL',
        color: colors[0],
        data: [26200, 30100, 57900]
      },
    ]
    const categories = ['2017', '2018', '2019']
    const options = {
      // plotOptions: { column: { stacking: 'normal' } }
    }
    return _.merge({}, getColumn({title, series, options, categories}))
  }

  getPrepStacked() {
    const title = 'People Receiving Pre-Exposure Prophylaxis (PrEP) [STACKED]'
    const series = [
      {
        name: 'Women',
        color: colors[1],
        data: [11000, 13000, 25000],
        stack: 'total'
      },
      {
        name: 'Men',
        color: colors[4],
        data: [14000, 15000, 29000],
        stack: 'total'
      },
      {
        name: 'Trans',
        color: colors[8],
        data: [1200, 2100, 3900],
        stack: 'total'
      },
    ]
    const categories = ['2017', '2018', '2019']
    const options = {
      plotOptions: { column: { stacking: 'normal' } }
    }
    return _.merge({}, getColumn({title, series, options, categories}))
  }

  getForecast() {
    const title = 'HIVST Forecast'
    const options = {
      subtitle: { text: 'WHO model estimates, 2020' },
      // plotOptions: { series: { pointStart: 2019 } }
    }
    const series = [
      {
        name: 'HIVSTs distributed',
        data: [
          { x: 2018, y: 8340 },
          { x: 2019, y: 9012 },
        ]
      },
      {
        name: 'HIVST forecast demand',
        data: [
          { x: 2020, y: 51023 },
          { x: 2021, y: 114389 },
          { x: 2022, y: 218324 },
          { x: 2023, y: 321092 },
          { x: 2024, y: 425203 },
          { x: 2025, y: 534324 }
        ]
      },
      {
        name: 'HIVST forecast need',
        type: 'line',
        data: [
          { x: 2020, y: 812303 },
          { x: 2021, y: 802343 },
          { x: 2022, y: 813242 },
          { x: 2023, y: 829238 },
          { x: 2024, y: 832343 },
          { x: 2025, y: 825232 }]
      }
    ]
    return _.merge({}, getColumnLine({ title, series, options }))
  }

  getComp() {
    const title = 'Custom Comparison'
    const color = colors[8]
    const series = [
      {
        name: 'Indicator One (millions)',
        data: [
          { pointPlacement: -.5, y: 1, color: colors[4]+'20' }, 
          { pointPlacement: -.4, y: 2, color: colors[4]+'40' }, 
          { pointPlacement: -.3, y: 4, color: colors[4]+'80' }, 
          { pointPlacement: -.2, y: 8, color: colors[4] },  
          { pointPlacement: .2, y: 4, color: colors[1]+'20' }, 
          { pointPlacement: .3, y: 2, color: colors[1]+'40' }, 
          { pointPlacement: .4, y: 2, color: colors[1]+'80' }, 
          { pointPlacement: .5, y: 3, color: colors[1] }
        ],
        // color: ['red','red','red','red','blue','blue','blue','blue',]
      },
      {
        name: 'Indicator Two (%)',
        type: 'line',
        data: [21, 30, 43, 11,  41, 12, 15, 22],
        color
      }
    ]
    const options = {
      plotOptions: { column: { grouping: false }},
      yAxis: [
        {}, 
        {
          title: { style: { color } },
          labels: { style: { color } },
      }]
    }
    const categories = [
      '15 - 24','25 - 34','35 - 49','50+',
      '15 - 24','25 - 34','35 - 49','50+',
    ]
    return _.merge({}, getColumnScat({title, categories, series, options}))
  }  

  getAdults() {
    const title = 'Adults'
    const series = [
      {
        name: 'Number of tests conducted (thousands)',
        data: [234, 203]
      },
      {
        name: 'Positivity (%)',
        type: 'line',
        data: [2, 30]
      }
    ]
    const categories = ['Women', 'Men', 'TOTAL']

    // TODO should be weighted avg of %
    const options = {
      subtitle: { text: `Total tests: ${_.mean([234, 203])}k, Average positivity: ${_.mean([2, 30])}%` }
    }
    return _.merge({}, getColumnScat({title, series, options, categories}))
  }

  getCommunity() {
    const title = 'Community Testing Modalities'
    const series = [
      {
        name: 'Number of tests conducted (thousands)',
        data: [234, 238, 245]
      },
      {
        name: 'Positivity (%)',
        type: 'line',
        data: [12, 24, 30]
      }
    ]

    const options = {
      subtitle: { text: `Total tests: ${_.mean([234, 238, 245])}k, Average positivity: ${_.mean([12, 24, 30])}%` }
    } 
    const categories = ['Mobile Testing', 'VCT', 'Other', 'TOTAL']
    return _.merge({}, getColumnScat({title, series, options, categories}))
  }

  getFacility() {
    const title = 'Facility Testing Modalities'
    const series = [
      {
        name: 'Number of tests conducted (thousands)',
        tooltip: {
          // todo: delete if can be handled below (or in legend hover)
          // pointFormat:`<span style="color:{point.color}">●</span>
          //   {series.name}: <b>{point.y}</b><br/>
          //   Uncertainty range: <b>{point.l}% - {point.u}%</b><br/>
          //   Source: UNAIDS`,
        },
        data: [
          { y: 234 },
          { y: 238 },
          { y: 223 },
          { y: 243 },
          { y: 132 }
        ],
      },
      {
        name: 'Positivity (%)',
        tooltip: {
          pointFormat:`<span style="color:{point.color}">●</span>
          {series.name}: <b>{point.y}</b><br/>
          {point.tooltipAddition}`
        },
        type: 'line',
        data: [
          { y: 22 },
          { y: 30 },
          { y: 35 },
          { y: 19 },
          { y: 11, tooltipAddition: 'Description: something you should know about Other' }
        ],
      }
    ]


    const options = {
      subtitle: { text: `Total tests: ${_.meanBy([
          { y: 234 },
          { y: 238 },
          { y: 223 },
          { y: 243 },
          { y: 132 }
        ], 'y')}k, Average positivity: ${_.meanBy([
          { y: 22 },
          { y: 30 },
          { y: 35 },
          { y: 19 },
          { y: 11, tooltipAddition: 'Description: something you should know about Other' }
        ], 'y')}%` }
    }
    const categories = ['PITC', 'ANC', 'VCT', 'Family Planning Clinic', 'Other', 'TOTAL']
    // const options = { xAxis: { categories: ['Community', 'Facility']} }
    return _.merge({}, getColumnScat({title, options, categories, series}))
  }

  getIndex() {
    // TODO: delete? probably not worth conditionally adjusting render position of dataLabel...
    // const x = null
    // const dataLabels = { 
    //   nullFormat: '{point.category}',
    //   nullFormatter: function(e) {
    //     console.log(e)
    //     debugger
    //   }
    // }
    // if (!x) {
    //   dataLabels.align = 'left'
    //   dataLabels.inside = false
    // }
    const title = 'Index'
    const series = [
      {
        name: 'Number of tests conducted (thousands)',
        data: [132, 232]
        // dataLabels,
      },
      {
        name: 'Positivity (%)',
        type: 'line',
        data: [21, 30]
      }
    ]
    const options = {
      subtitle: { text: `Total tests: ${_.mean([132, 232])}k, Average positivity: ${_.mean([21, 30])}%` }
    }
    const categories = ['Community', 'Facility', 'TOTAL']
    return _.merge({}, getColumnScat({title, options, categories, series}))
  }

  // getSelf() {
  //   const title = 'HIV self-tests distributed'
  //   const series = [
  //     {
  //       name: 'number',
  //       color: colors[5],
  //       data: [67000],
  //     },
  //   ]
  //   const categories = ['HIV self-tests distributed']
  //   const options = {
  //     // plotOptions: { column: { stacking: 'normal' } }
  //     legend: { enabled: false }
  //   }
  //   return _.merge({}, getColumn({title, series, options, categories}))
  // }

  // getModeledIcon() {

  //   return (
  //     <div className="modeled-icon" title="this chart uses modeled data">
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
  //       <path d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m14.035 44.508h-5.65v-19.626c0-.564.008-1.355.02-2.372.014-1.018.02-1.802.02-2.353l-5.498 24.351h-5.893l-5.459-24.351c0 .551.006 1.335.02 2.353.014 1.017.02 1.808.02 2.372v19.626h-5.65v-29.016h8.824l5.281 22.814 5.242-22.814h8.725v29.016z" fill={colors[0]}/></svg>
  //   </div>
  //   )
  // }
  
  render() {
    const shiny = countryMap[this.props.country].shiny

    const configCascade = this.getCascade()
    const configPLHIVAge = this.getPLHIVAge()
    const configPLHIVSex = this.getPLHIVSex()
    // const configConducted = this.getConducted()
    const configNegative = this.getNegative()
    const configDistribution = this.getDistribution()
    const configPrevalence = this.getPrevalence(shiny)
    // const configPrep = this.getPrep()
    // const configPrepStacked = this.getPrepStacked()
    const configForecast = this.getForecast()
    
    // const configComp = this.getComp()

    const configAdults = this.getAdults()
    const configCommunity = this.getCommunity()
    const configFacility = this.getFacility()
    const configIndex = this.getIndex()

    // const configSelf = this.getSelf()

    // const mIcon = this.getModeledIcon()

    return (
      <div className='dashboard'>
        <div className='nav'>
          <a onClick={this.props.setCountry.bind(null, null)} action='#' title='go home'>
            <img className='who-logo' src='images/who_logo.png' alt='WHO logo' />
          </a>
          <span className='title text-center'>
            HIV Testing Services Dashboard
          </span>
        </div>

        <div className='charts container-fluid mt-4 p-0'>

          <div className='row no-gutters mb-4'>
            <div className='col-xl-4 col-md-6 col-xs-12'>
              <div className='country-name'>
                <h1> {this.props.country}</h1>
              </div>
              <div className='country-details pb-3'>
                <div><span>Population:</span><span> {countryMap[this.props.country].population}</span></div>
                <div><span>World Bank classification:</span><span> {countryMap[this.props.country].incomeClass}</span></div>
              </div>
            </div>
            <div className='col-xl-4 col-md-6 col-xs-12 prog-95'>
              <div className='content'>
                <p>Progress towards 95-95-95</p>
                <NestedBoxes
                  side={110}
                  ratios={[.85, .79, .87]}
                  // colors={[colors[1]+'97', colors[2]+'97', colors[0]+'97', colors[0]+'40']}
                  colors={['#c38f72', '#85adca', '#999999', colors[0] + '50']}
                  content={[
                    { inner: '85%', below: 'of people living with HIV know their status' },
                    { inner: '79%', below: 'of people living with HIV who know their status are on treatment' },
                    { inner: '87%', below: 'of people on treatment are virally suppressed' },
                  ]}
                  />
              </div>
            </div>
          </div>

          <div className='row no-gutters'>

            <div className='col-xl-4 col-md-6 col-sm-12'>
              <ReactHighcharts config={configCascade}/>
            </div>
            {!shiny ? null : <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configPLHIVSex}/></div>}
            {!shiny ? null : <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configPLHIVAge}/></div>}

            {!shiny ? null : <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configNegative}/></div>}
            {!shiny ? null : <div className='col-xl-4 col-md-6 col-sm-12'>
              <Tooltip> 
                <div>
                  <div><b>Retests - PLHIV on ART:</b><span> Number of positive tests conducted in PLHIV already on ART. This is calculated by… Potential reasons for this type of testing include…</span></div>
                  <div><b>Retests - Aware but not on ART:</b><span> Number of positive tests conducted in PLHIV aware of their HIV infection but not on ART. This is calculated by… Potential reasons for this type of testing include…</span></div>
                  <div><b>New Diagnoses:</b><span> Number of positive tests returned that represent a newly identified HIV infection. This [does/does not] include retesting for verification prior to ART initiation as recommended by WHO. </span></div>
                </div>
              </Tooltip>
              <ReactHighcharts config={configDistribution}/>
            </div>}
            <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configPrevalence}/></div>
            {/* <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configPrep}/></div>
            <div className='col-xl-4 col-md-6 col-sm-12'><ReactHighcharts config={configPrepStacked}/></div> */}
            {/* {!shiny ? null : <div className='col-xl-6 col-md-6 col-sm-12'><ReactHighcharts config={configComp}/></div>} */}
          </div>

          <div className='row no-gutters'>
            <h5 className='col-12 text-center mt-4 mb-2'>HIV tests conducted and positivity in the past year</h5>
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'><ReactHighcharts config={configAdults}/></div>
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'><ReactHighcharts config={configCommunity}/></div>
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'><ReactHighcharts config={configFacility}/></div>
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'><ReactHighcharts config={configIndex}/></div>
            {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'><ReactHighcharts config={configSelf}/></div> */}
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'><ReactHighcharts config={configForecast} /></div>
          </div>

          <div className='row no-gutters mt-5'>
            <KPTable classes='col-sm-12 col-md-7 p-3' />
            <PolicyTable classes='col-sm-12 col-md-5 p-3' />
            <DemographicsTable shiny={shiny} classes='p-3' />
          </div>

          <div className='row no-gutters mt-5'>
            <h3>Links to other sources</h3>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='https://journals.lww.com/aidsonline/fulltext/2019/12153/national_hiv_testing_and_diagnosis_coverage_in.7.aspx'>
              Shiny 90 Modelling Methodology
            </a>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='http://lawsandpolicies.unaids.org'>
              UNAIDS - Laws and Policies
            </a>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='https://journals.lww.com/aidsonline/fulltext/2019/12153/national_hiv_testing_and_diagnosis_coverage_in.7.aspx'>
              WHO Paediatric HIV Testing
            </a>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='https://www.who.int/hiv/prep/global-prep-coalition/en/'>
              Global PrEP Coalition
            </a>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='https://cfs.hivci.org/'>
              WHO HIV Country Profiles
            </a>
            <a className='col-xl-12' target='_blank' rel='noopener noreferrer' href='https://master.d3hbl3m8yhsiqb.amplifyapp.com/Kenya'>
              *OFFICIAL* DASHBOARD (work in progress)
            </a>
          </div>
          {this.getGlossary()}
          <br />
          <br />
          <br />
        
          {this.getDevSection()}
        </div>
      </div>
    )
  }

  getGlossary() {
    return(
      <div className='row no-gutters mt-5 glossary'>
        <div className='col-12'>
          <h2>Glossary</h2>
        </div>
        <div className='terms'>
          {TERMS.map(t => {
            return (
              <div className='term py-1'><strong>{t.term}</strong>: <span>{t.definition}</span></div>
            )
          })}
        </div>
      </div>
    )
  }

  // dev form

  getDevSection() {
    if (!DEV) return;
    const inputs = fields.map(f => {
      return <label key={f}>{f}<input data-field={f} onChange={this.updateField}></input></label>
    })

    return (
      <div>
        <h5 className='text-center'>~ FOR DEVELOPMENT ~</h5>
        <h5>Color Palette</h5>
        {colors.map((c, i) => {
          return <span key={c} style={{background: c, width: '100px', height: '80px', color: 'white', display: 'inline-block'}}>{i}</span>
        })}
        <h5>Query API, results -> devTools console</h5>
        {inputs}
        <button onClick={this.submit} action='#'>go fetch</button>
        <button onClick={this.submit.bind(this, true)} action='#'>dbug</button>
        <br />
        <span>{URLBase}indicator=</span><input id='direct-query'></input>
        <button onClick={this.submitDQ} action='#'>direct query</button>
        <button onClick={this.submitDQ.bind(this, true)} action='#'>dbug</button>
      </div>
    )
  }
  updateField(e) {
    this.setState({ [e.target.dataset.field]: e.target.value })
  }

  updateAlert(e) {
    this.setState({ alertOn: e.target.value === 'on' })
  }

  submitDQ(e, dbug) {
    const v = document.querySelector('#direct-query')
    // debugger
    const url = URLBase + 'indicator=' + v.value || ''
    console.log('url: ', url)
    fetch(url)
    .then(response => response.json())
    .then(r => {
      console.log(r)
      if (dbug) {
        debugger
      }
    })
  }

  submit(e, dbug) {
    let url = URLBase
    let char = ''
    fields.forEach(f => {
      if (this.state[f]) {
        url += encodeURI(`${char}${f}=${this.state[f]}`)
        char = '&'
      }
    })
    console.log('URL: ', url)
    fetch(url)
      .then(response => response.json())
      .then(r => {
        console.log(r)
        if (dbug) {
          debugger
        }
      })
  }
}

export default connect(
  state => ({
    chartData: state.chart.chartData
  }),
  dispatch => ({
    actions: bindActionCreators(chartActions, dispatch)
  })
)(Dashboard)
