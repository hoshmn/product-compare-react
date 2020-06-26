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
    indicator: 'HIV tests conducted',
    country_name: true // true to replace with active country
  },
  chart3:  {
    indicator: 'HIV positive tests results received',
    country_name: true
  },
  chart4:  {
    indicator: 'HIV self-tests distributed',
    country_name: true
  }
}

const chartNames = ['chart1', 'chart2', 'chart3', 'chart4']

const baseUrl = 'https://status.y-x.ch/query?'


export const getChartData = (country) =>
  dispatch => {
    console.log('GETCHARTDATA DISPATCH (shortcircuit here)')
    // until we care about the data, avoid errors
    return
    const allChartQueryPs = chartNames.map(chartName => {
      let url = baseUrl
      let char = ''
      fields.forEach(f => {
        let chartValue = chartFieldmap[chartName][f]
        if (chartValue) {
          if (f === 'country_name') {
            chartValue = country
          }
          url += encodeURI(`${char}${f}=${chartValue}`)
          char = '&'
        }
      })

      // TODO: does this prevent cacheing? 
      var myHeaders = new Headers()
      myHeaders.append('pragma', 'no-cache')
      myHeaders.append('cache-control', 'no-cache')
      
      var myInit = {
        method: 'GET',
        headers: myHeaders,
      }
      console.log('GETCHARTDATA FETCH')
      return fetch(url, myInit)
        .then(r => r.json())
        .then(data => ({ chartName, data }))
        .catch(e => console.error('DATA FETCH FAILED FOR ', chartName, ' : ', e))
    })

    Promise.all(allChartQueryPs)
    .then(results => {
      const allChartData = {}
      results.forEach(result => {
        if (!result) {
          console.error('RESULT UNDEFINED')
          return
        }
        allChartData[result.chartName] = result.data
      })
      
      console.log('GETCHARTDATA COMPLETE')
      dispatch({
        type: types.FETCH_CHART_DATA,
        payload: allChartData
      })
    })
  }
