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

class Dashboard extends Component {
  componentWillMount() {
    this.props.actions.getChartData()
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container mt-4">
          Highcharts
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
