import * as types from '../constants/types'

const INITIAL_STATE = {
  chartData: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_CHART_DATA:
      return {
        ...state, chartData: action.payload
      };
    default:
      return state
  }
}
