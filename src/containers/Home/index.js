import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import Dashboard from '../Dashboard'
import {Compare, ProductList} from '../../components'
import * as productActions from '../../actions/product'
import {connect} from 'react-redux'
import Homepage from '../../components/Homepage'

class Home extends Component {
  constructor() {
    super()
    this.state = { country: null }

    this.setCountry = this.setCountry.bind(this)
  }

  componentWillMount() {
    this.props.actions.getProducts()
  }

  setCountry(country) {
    this.setState({ country })
  }

  render() {
    // const {products, actions} = this.props
    // const compareProducts = products.filter(product => product.compare)
    const contents = this.state.country ? 
      <Dashboard setCountry={this.setCountry} country={this.state.country} /> : <Homepage setCountry={this.setCountry} />

    return (
      <div>
        {contents}
      </div>
    )
  }
}

export default connect(
  state => ({
    products: state.product.products
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home)

/* <ProductList products={products} compare={actions.compare}/>
{compareProducts.length >= 2 &&
  <Compare products={compareProducts}/>
} */
