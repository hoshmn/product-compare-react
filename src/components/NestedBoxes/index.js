import React, {Component} from 'react'
import './styles.css'

class NestedBoxes extends Component {
  constructor(props) {
    super(props)
    
    this.getBoxes = this.getBoxes.bind(this)
    this.getInards = this.getInards.bind(this)
    this.getBelow = this.getBelow.bind(this)
  }
  
  getBoxes(side, idx) {
    
    const { ratios } = this.props
    const nextSide = (ratios[idx]*side) //for border px
    const borderWidth = (side - nextSide)/2
    
    const height = idx === 0 ? side : '100%'
		const color = this.props.colors[idx] || 'black'
    const boxStyle = {
      height,
      width: side - (1.8*idx), // pixfix
      background: this.props.colors[idx+1],
      border: `solid ${borderWidth}px ${color}`,
      borderRadius: this.props.circle ? '50%' : 0
    }
    
    let nextBoxes;
		 if (idx < this.props.ratios.length - 1) {
     	let borderColor = 'transparent'
      if (
      	!this.props.circle &&
        !this.props.bridgeless &&
        this.props.colors[idx+1]
       ) {
       	borderColor = this.props.colors[idx+1]
       }
      const bridgeStyle = {
        width: (side + nextSide - borderWidth) + (nextSide/8) - (3.6*idx), // pixfix
        borderColor: borderColor
      }
    	nextBoxes = (
      	<div 
          className={'bridge bridge-'+idx}
          style={bridgeStyle}
        >
          {this.getBoxes(nextSide, idx+1)}
        </div>
      )
    }

    return (
    	<div
        style={boxStyle}
        className={'box box-'+idx}
      >
       {nextBoxes}
       {this.getInards(idx, nextSide)}
       {this.getBelow(idx, borderWidth)}
      </div>
    )
  }
  
  getInards(idx, innerSide) {
  	if (
    	!this.props.content ||
      !this.props.content[idx] ||
      !this.props.content[idx].inner
     ) return
    const content = this.props.content[idx].inner
  	return (
    	<div
        className={'inner-content inner-content-'+idx}
        style={{fontSize: innerSide/3}}
       >
        <div>{content}</div>
      </div>
    )
  }  
  
  getBelow(idx, borderWidth) {
  	if (
    	!this.props.content ||
      !this.props.content[idx] ||
      !this.props.content[idx].below
     ) return
    const content = this.props.content[idx].below
  	return (
    	<div
        className={'below-content below-content-'+idx}
        style={{
          // transform: `translate(0, ${borderWidth+5}px)`,
          top: `calc(100% + ${borderWidth + 5}px)`,
          left: -borderWidth,
          right: -borderWidth,
        }}
       >
        <div>{content}</div>
      </div>
    )
  }
  
  render() {
  	const boxes = this.getBoxes(this.props.side, 0)
    
    return (
      <div className='nested-boxes'>
       {boxes}
      </div>
    )
  }
}

export default NestedBoxes