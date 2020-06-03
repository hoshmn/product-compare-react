import { combineReducers } from 'redux'
import product from './productReducer'
import chart from './chartReducer'

const compareApp = combineReducers({
  product,
  chart
});

export default compareApp