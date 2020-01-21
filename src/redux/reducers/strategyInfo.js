import actionTypes from "../actions/actionTypes";


const initTitles = ['估值因子', '成长因子', '资本结构因子', '技术面因子']
const initDataIndex = ['evaFactors', 'growthFactors', 'CSFactors', 'techFactors']

const initColumns = initTitles.map((title, index) => {
  return (
    [{
      title,
      dataIndex: initDataIndex[index],
      editable: true,
    }, {
      title: '',
      editable: false,
    }]
  )
})

const initDataValues = {
  evaFactors: ['PB', 'ProfitRatio', 'PEG', 'PSALES'],
  growthFactors: ['ROEGrate', 'ROAGrate', 'EBITDAGrate'],
  CSFactors: ['debtRatio'],
  techFactors: ['momentum6M', 'momentum12M', 'inverse1M']
}
const initDataSource = initDataIndex.map(idx => {
  return initDataValues[idx].map((value, i) => {
    return {
      key: i,
      [idx]: value
    }
  })
})



const initState = {
  samplePeriod:{},
  columns: initColumns,
  dataSource: initDataSource,
  factorsValidateOK:[]
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_SAMPLE_PERIOD:
      return {
        ...state,
        samplePeriod:action.payload
      }

    case actionTypes.ADD_COLUMNS:
      const newDataIndex = `columns${state.columns.length + 1}`
      const newColumn = [
        [{
          title: '',
          dataIndex: newDataIndex,
          editable: true,
          headerEditable: true,
        }, {
          title: '',
          editable: false,
          headerEditable: false,
        }]
      ]
      const newDataSource = [
        [
          {
            key: 1,
            [newDataIndex]: '',
          }, {
            key: 2,
            [newDataIndex]: '',
          }
        ]
      ]

      return {
        ...state,
        columns: state.columns.concat(newColumn),
        dataSource: state.dataSource.concat(newDataSource),
      }

    case actionTypes.DELETE_COLUMNS:
      const { index } = action.payload

      const deleteColumns = [...state.columns]
      const deleteDataSource = [...state.dataSource]
      deleteColumns.splice(index, 1)
      deleteDataSource.splice(index, 1)

      return {
        ...state,
        columns: deleteColumns,
        dataSource: deleteDataSource,
      }

    case actionTypes.MERGE_FACTORS:
      const i = action.payload.index
      const upDateColumns = [...state.columns]
      const upDateDataSource = [...state.dataSource]

      upDateColumns.splice(i, 1, action.payload.columns)
      upDateDataSource.splice(i, 1, action.payload.dataSource)

      return {
        ...state,
        columns: upDateColumns,
        dataSource: upDateDataSource,
      }

    case actionTypes.COMPUTE_CORR:
      return {
        ...state,
        factorsValidateOK:action.payload
      }

    default:
      return state
  }
}