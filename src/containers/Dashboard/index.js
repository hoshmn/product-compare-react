import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import * as chartActions from '../../actions/chart'
import baseStyle from './baseStyle'
import {connect} from 'react-redux'
import _ from 'lodash'
import './styles.css'
import { getColumn } from './configs'
import colors from './colors'
const ReactHighcharts = require('react-highcharts')

ReactHighcharts.Highcharts.theme = baseStyle
ReactHighcharts.Highcharts.setOptions(ReactHighcharts.Highcharts.theme)


const config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
}

const bar = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Historic World Population by Region'
  },
  subtitle: {
    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
  },
  xAxis: {
    categories: ['Men', 'Women'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total tests',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    // valueSuffix: ' millions'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  // legend: {
  //   layout: 'vertical',
  //   align: 'right',
  //   verticalAlign: 'top',
  //   x: -40,
  //   y: 80,
  //   floating: true,
  //   borderWidth: 1,
  // },
  credits: {
    enabled: false
  },
  series: [12, 14]
  // [{
  //   name: 'Year 1800',
  //   data: [107, 31, 635, 203, 2]
  // }, {
  //   name: 'Year 1900',
  //   data: [133, 156, 947, 408, 6]
  // }, {
  //   name: 'Year 2000',
  //   data: [814, 841, 3714, 727, 31]
  // }, {
  //   name: 'Year 2016',
  //   data: [1216, 1001, 4436, 738, 40]
  // }]
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

  getAdults() {
    const title = 'Adults'
    const series = [
      {
        name: 'Total Tests',
        data: [
          ['Women', 234],
          ['Men', 238],
        ],
      },
      {
        name: 'Positivity (%)',
        data: [
          ['Women', 2.234322],
          ['Men', 30.234328],
        ],
      }
    ]
    return _.merge({}, getColumn({title, series}))
  }

  getCommunity() {
    const title = 'Community Testing Modalities'
    const series = [
      {
        name: 'Total Tests',
        data: [
          ['Mobile Testing', 234],
          ['VCT', 238],
          ['Other', 2],
        ],
      },
      {
        name: 'Positivity (%)',
        data: [
          ['Mobile Testing', 2.234322],
          ['VCT', 30.234328],
          ['Other', 30.2343],
        ],
      }
    ]
    return _.merge({}, getColumn({title, series}))
  }

  getFacility() {
    const title = 'Facility Testing Modalities'
    const series = [
      {
        name: 'Total Tests',
        data: [
          ['PITC', 234],
          ['ANC', 238],
          ['VCT', 223],
          ['Family Planning Clinic', 243],
          ['Other', 122],
        ],
      },
      {
        name: 'Positivity (%)',
        data: [
          ['PITC', 2.234322],
          ['ANC', 30.234328],
          ['VCT', 35.2343],
          ['Family Planning Clinic', 20.2343],
          ['Other', 10.2343],
        ],
      }
    ]
    return _.merge({}, getColumn({title, series}))
  }

  getIndex() {
    const title = 'Index'
    const series = [
      {
        name: 'Total Tests',
        data: [
          ['Community', 123],
          ['Facility', 232],
        ],
      },
      {
        name: 'Positivity (%)',
        data: [
          ['Community', 21.34],
          ['Facility', 34],
        ],
      }
    ]
    return _.merge({}, getColumn({title, series}))
  }
  
  render() {
    // console.log('NNNNNNN',this.props.chartData)
    const inputs = fields.map(f => {
      return <label key={f}>{f}<input data-field={f} onChange={this.updateField}></input></label>
    })

    const configAdults = this.getAdults()
    const configCommunity = this.getCommunity()
    const configFacility = this.getFacility()
    const configIndex = this.getIndex()
    
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

        <div className='container-fluid mt-4'>
          <div className='country-name'>
            <h1> {this.props.country}</h1>
          </div>
          <div className='country-details pb-3'>
            <div><span>Population:</span><span> 51.4 million</span></div>
            <div><span>World Bank classification:</span><span> Low income</span></div>
          </div>

          <div className='row no-gutters'>
            <div className='col-xl-3 col-lg-6 col-sm-12'><ReactHighcharts config={configAdults}/></div>
            <div className='col-xl-3 col-lg-6 col-sm-12'><ReactHighcharts config={configCommunity}/></div>
            <div className='col-xl-3 col-lg-6 col-sm-12'><ReactHighcharts config={configFacility}/></div>
            <div className='col-xl-3 col-lg-6 col-sm-12'><ReactHighcharts config={configIndex}/></div>
          </div>
          <br />
          <br />
          <br />
        
          <h5 className='text-center'>~ FOR DEVELOPMENT ~</h5>
          <h5>Color Palette</h5>
          {colors.map((c, i) => {
            return <span style={{background: c, width: '100px', height: '80px', color: 'white', display: 'inline-block'}}>{i+1}</span>
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
      </div>
    )
  }

  // dev form
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
