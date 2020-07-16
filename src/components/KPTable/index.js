import React, {Component} from 'react'
import './styles.css'

class KPTable extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    let classes = 'kp-table '
    if (this.props.classes) {
      classes += this.props.classes
    }
    return (
      <div className={classes}>
        <h2>Key Population Table</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope="col">HIV prevalence</th>
              <th scope="col">Knowledge of Status</th>
              <th scope="col">Tested in past year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>Sex workers</th>
              <td>24.3%</td>
              <td>N/A</td>
              <td>9 241</td>
            </tr>
            <tr>
              <th scope='row'>Gay men and other men who have sex with men</th>
              <td>20.6%</td>
              <td>N/A</td>
              <td>5 057</td>
            </tr>
            <tr>
              <th scope='row'>People who inject drugs</th>
              <td>24.3%</td>
              <td>N/A</td>
              <td>9 241</td>
            </tr>
            <tr>
              <th scope='row'>Transgender people</th>
              <td>18.5%</td>
              <td>71.3%</td>
              <td>12 324</td>
            </tr>
            <tr>
              <th scope='row'>People in prison</th>
              <td>4.1%</td>
              <td>62.8%</td>
              <td>3 597</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default KPTable