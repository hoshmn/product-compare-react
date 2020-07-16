import React, {Component} from 'react'
import './styles.css'


const data = [
  { rowName: 'Age of consent for HIV testing', value: '16 years' },
  { rowName: 'Provider-initiated testing', value: 'Testing approach used' },
  { rowName: 'Community-based testing', value: 'Testing approach used' },
  { rowName: 'Lay provider testing', value: 'Testing approach used' },
  { rowName: 'Self-testing', value: 'Policy and full implementation' },
  { rowName: 'Provider-assisted referral/index testing', value: 'Testing approach used' },
  { rowName: 'Social network-based testing', value: 'Not yet available' },
  { rowName: 'Compliance with WHO testing strategy', value: 'Not in compliance' },
  { rowName: 'Verification testing before ART   ', value: 'Not yet available' },
]

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
            {data.map((r,i)=> {
              
              return (
                <tr key={i}>
                  <th scope='row'>{r.rowName}</th>
                  <td>{r.value}</td>
                  {/* <td><span className='marker compliant'></span></td> */}
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  }
}

export default PolicyTable