import * as types from '../constants/types'

export const getChartData = () =>
  dispatch => {

    debugger;
    fetch(`https://status.y-x.ch/query?indicator=People%20living%20with%20HIV%20-%20people%20aged%2010-19&year=1990&geographic_scope=UNAESA&age=10-19`)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: types.FETCH_CHART_DATA,
        payload: response.products
      })
    })
  }

// export const compare = product => ({
//     type: types.COMPARE_PRODUCT,
//     product
//   })
