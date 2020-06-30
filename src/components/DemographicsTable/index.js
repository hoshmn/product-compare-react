import React, {Component} from 'react'
import './styles.css'

class DemographicsTable extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    let classes = 'demographics-table '
    if (this.props.classes) {
      classes += this.props.classes
    }
    return (
      <div className={classes}>
        <h2>Population Groups</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope="col">Estimated number of PLHIV</th>
              <th scope="col">Undiagnosed PLHIV</th>
              <th scope="col">PLHIV who know status (%)</th>
              <th scope="col">HIV prevalence</th>
              <th scope="col">New HIV infections</th>
              <th scope="col">Tested in past year</th>
              <th scope="col">Ever tested (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>Women (15+)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Women (15-24)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Women (25-34)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Women (35-49)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Women (50+)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <th scope='row'>Men (15+)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Men (15-24)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Men (25-34)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Men (35-49)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Men (50+)</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default DemographicsTable