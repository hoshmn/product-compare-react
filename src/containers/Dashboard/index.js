import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import * as chartActions from '../../actions/chart'
import {connect} from 'react-redux'
const ReactHighcharts = require('react-highcharts')


const config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
}

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

class Dashboard extends Component {
  constructor() {
    super()
    this.state = { alertOn: false }
    fields.forEach(f => this.state[f] = false)

    this.updateField = this.updateField.bind(this)
    this.updateAlert = this.updateAlert.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillMount() {
    this.props.actions.getChartData()
  }

  updateField(e) {
    this.setState({ [e.target.dataset.field]: e.target.value })
  }

  updateAlert(e) {
    this.setState({ alertOn: e.target.value === 'on' })
  }

  submit() {
    let url = 'https://status.y-x.ch/query?'
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
      .then(response => {
        if (this.state.alertOn) {
          alert(response)
        } else {
          console.log(response)
        }
      })
  }

  render() {
    const inputs = fields.map(f => {
      return <label key={f}>{f}<input data-field={f} onChange={this.updateField}></input></label>
    })
    
    return (
      <div className="dashboard">
        <div className="container mt-4">
          {inputs}
          <button onClick={this.submit} action='#'>go fetch</button>
          <ReactHighcharts config={config}/>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.chart.chartData
  }),
  dispatch => ({
    actions: bindActionCreators(chartActions, dispatch)
  })
)(Dashboard)