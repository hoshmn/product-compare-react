import React, {Component} from 'react'
import './styles.css'

class PolicyTable extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    let classes = 'policy-table '
    if (this.props.classes) {
      classes += this.props.classes
    }
    return (
      <div className={classes}>
        <h2>WHO HIV Testing Policy Compliance</h2>
        <table className='table table-striped'>
          <tbody>
            <tr>
              <th scope='row'>HIV self-testing</th>
              <td>HIVST policy and implementation</td>
              <td><span className='marker compliant'></span></td>
            </tr>
            <tr>
              <th scope='row'>Partner notification / Index testing</th>
              <td>Policy implemented</td>
              <td><span className='marker compliant'></span></td>
            </tr>
            <tr>
              <th scope='row'>Compliance with WHO testing strategy</th>
              <td>Not in compliance</td>
              <td><span className='marker non-compliant'></span></td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
}

export default PolicyTable