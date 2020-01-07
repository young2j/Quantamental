//获取数据处理dataSource和columns
export const handleDataSource = (respData) => {
    //dataSource
    const data = respData.map( //data:Array 
        firm => { //Object
            const profitability = Object.assign(
                {}, firm.profitability, {
                stkcd: firm.stkcd + ` ${firm.name}`
            }
            )
            const solvency = Object.assign(
                {}, firm.solvency, {
                stkcd: firm.stkcd + ` ${firm.name}`
            }
            )
            return { profitability, solvency }
        })


    const profitabilityDataSource = data.map(item => {
        return item.profitability
    })
    const solvencyDataSource = data.map(item => {
        return item.solvency
    })

    const dataSource = {
        profitabilityDataSource,
        solvencyDataSource
    }

    return dataSource
}