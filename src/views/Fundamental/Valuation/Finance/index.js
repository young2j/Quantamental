import React, { Component } from 'react'
// import _ from 'lodash'

import { 
    Icon, 
    Button, 
    Input, 
    AutoComplete, 
    message,
    Card,
    Typography,
    Popconfirm,
    Table,
    Tag,
    Rate,
} from 'antd';

import { searchFirmcode,getFinancialData,getFinancialsData} from '../../../../api'

import './index.less'


const columnsNames = {
    profitability:{
        stkcd:"公司代码",
        roe: "净资产报酬率",
        roa: "总资产报酬率",
        gpm: "销售毛利率",
        opm: "主营业务利润率",
        npm: "净利润率",
        operate:"操作"
    },
    solvency:{
        stkcd:"公司代码",
        currentRatio: "流动比率",
        quickRatio: "速动比率",
        cashRatio: "现金比率",
        debtRatio: "资产负债率",
        equityRatio: "产权比率",
        interestCRatio: "利息保障倍数",
        operate:"操作"
    }        
}


export default class Finance extends Component {
    constructor(props){
        super(props)    
        this.state = {
            searchDataSource: [],
            switchTitle:false,
            isSearching:false,

            columns:[],
            dataSource: []
        }
    }


    //处理输入的值，并提供数据源
    handleSearch = value => {
        searchFirmcode()
            .then(resp => {
                const searchDataSource = resp.data.map(item=>{
                        return item.stkcd+` ${item.name}`
                })
                this.setState({
                    searchDataSource
                })
            })
    }; 
    //处理选择的值
    onSelect = (value) => {
        this.setState({
            isSearching:true
        })
        const stkcd = /^\d{6}/.exec(value) //返回数组,没有则返回null
        if (stkcd){
            getFinancialData(stkcd[0])
            .then(resp=>{
                console.log(resp);
            })
            .finally(()=>
               this.setState({
                    isSearching: false
                })
            )
        } else {
            message.error("输入的公司不存在")
            this.setState({
                isSearching: false
            })
        }
    }
    //处理输入框回车
    onPressEnter = (value)=>{
        this.onSelect(value)
    }


    //table
    handleDelete = record => {        
        const dataSource = this.state.dataSource
        Object.keys(dataSource).map(
            key => {
               return dataSource[key]=dataSource[key].filter(item=>item.stkcd!==record.stkcd)
            }
        )
        this.setState({ 
            dataSource
        })
    };

    handleAdd = () => {
        const dataSourceNow  = this.state.dataSource
        getFinancialData()
        .then(resp=>{
            const dataSource = this.handleDataSource(resp)
            Object.keys(dataSourceNow).map(
                k=>{
                 return dataSource[k] = dataSourceNow[k].concat(dataSource[k])
                }
            )
            
            this.setState({
                dataSource
            })
        })        
    };

    //获取数据处理dataSource和columns
    handleDataSource = (resp) => {
            //dataSource
            const data = resp.data.map( //data:Array 
                firm => { //Object
                    const profitability = Object.assign(
                        {}, firm.profitability, {
                        stkcd: firm.stkcd
                    }
                    )
                    const solvency = Object.assign(
                        {}, firm.solvency, {
                        stkcd: firm.stkcd
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
    
    componentDidMount() {
        getFinancialsData()
            .then(resp => {
                const dataSource = this.handleDataSource(resp)
                this.setState({
                    dataSource
                })
            }
        )        
    }

    render() {
        //columns
        const profitabilityColumns = Object.keys(columnsNames.profitability).map((k, i) => {
            if (k === 'operate') {
                return {
                    title: columnsNames.profitability[k],
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <Button.Group >
                                <Button type='primary' ghost style={{border:'none',padding:"0px 3px"}}>关注</Button>
                                <Popconfirm title="确定要移除该公司?" onConfirm={() => this.handleDelete(record)}>
                                    |<Button type='danger' ghost style={{ border:'none',padding:"0px 3px"}}>移除</Button>
                                </Popconfirm>
                            </Button.Group>
                        )
                    }
                }
            }
            if (k==='stkcd'){
                return {
                    title: (<Button ghost
                                onClick={this.handleAdd} 
                                type="primary"
                                shape='round' 
                                icon='plus'>
                                可比公司
                            </Button>),
                    dataIndex: k,
                    render: (text, record) => {
                        const {stkcd} = record
                        return (
                            <Tag style={{
                                fontSize:12,
                                fontWeight:'bold',
                                border:0,
                                backgroundColor:'transparent',
                                color:'#1890ff'
                                }}>
                                {stkcd}
                            </Tag>
                        )
                    }
                }
            }
            return {
                title: columnsNames.profitability[k],
                dataIndex: k,
                sorter: (a, b) => Object.values(a)[i] - Object.values(b)[i],
                sortDirections: ['descend', 'ascend'],
                render:(text,record)=>{
                    return (<>{text}
                            <sup><Rate allowHalf 
                                     disabled 
                                     value={text * 3}
                                     style={{color:text>1? 'red':'green'}}
                                 /></sup>
                            </>)
                }
            }
        })

        const columns = {
            profitabilityColumns,
            // solvencyColumns: data[0].solvencyColumns,
        }

        const pageTitle = (
            <div className='finance-title'>
                <Typography.Text className='finance-title-text'
                    onClick={() => this.setState({ switchTitle: !this.state.switchTitle })}
                >
                    {this.state.switchTitle ? '纵向分析' : '横向分析'}
                    <Icon type="retweet" />
                </Typography.Text>
            </div>
        )

        const searchBar = (
            <div className="global-search-wrapper">
                <AutoComplete
                    className="global-search"
                    size="large"
                    dataSource={this.state.searchDataSource}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="输入公司代码或公司名"
                    filterOption={(inputValue, option) =>
                        option.props.children.indexOf(inputValue) !== -1
                    }
                >
                    <Input.Search 
                        enterButton={
                            <Button type='primary' shape='circle' style={{height:'40px'}}>
                                <Icon type='search'/>
                            </Button>
                            }
                        loading={this.state.isSearching}  
                        onSearch={this.onPressEnter}/>
                </AutoComplete>
            </div>
        )


        return (
            <Card 
                className="finance-page"
                title={pageTitle} 
                extra={searchBar}
                // bordered={false}
            >
                <Table
                    size='middle'
                    bordered={false}
                    rowKey = {(record)=>record.stkcd}
                    dataSource={this.state.dataSource.profitabilityDataSource}
                    columns={columns.profitabilityColumns}
                />
            </Card>
        );
    }
}
