import * as types from '../constants/types'


const fields = [
  'indicator',
  'indicator_description',
  'contry_iso_code',
  'country_name',
  'area_name',
  'geographic_scope',
  'year',
  'sex',
  'age',
  'population_segment',
  'population_sub_group',
  'value',
  'value_comment',
  'unit_format',
  'source_organization',
  'source_database',
  'source_year',
  'notes',
  'modality',
  'modality_category'
]

const chartFieldmap = {
  chart1:  {
    indicator: 'People living with HIV - people aged 10-19',
    year: 1990,
    geographic_scope: 'UNAESA',
    age: '10-19'
  },
  chart2:  {
    indicator: 'People living with HIV - people aged 10-19',
    year: 1991,
    geographic_scope: 'UNAESA',
    age: '10-19'
  }
}

const baseUrl = 'https://status.y-x.ch/query?'


export const getChartData = (country) =>
  dispatch => {
    const allChartQueryPs = ['chart1','chart2'].map(chartName => {
      let url = baseUrl
      let char = ''
      fields.forEach(f => {
        const chartValue = chartFieldmap[chartName][f]
        if (chartValue)
          url += encodeURI(`${char}${f}=${chartValue}`)
          char = '&'
      })
      return fetch(url)
        .then(r => r.json())
        .then(data => ({ chartName, data }))
    })

    Promise.all(allChartQueryPs)
    .then(results => {
      const allChartData = {}
      results.forEach(chartData => {
        // console.log(chartData.chartName, chartData.data)
        allChartData[chartData.chartName] = chartData.data
      })

      dispatch({
        type: types.FETCH_CHART_DATA,
        payload: allChartData
      })
    })
  }

// export const compare = product => ({
//     type: types.COMPARE_PRODUCT,
//     product
//   })
