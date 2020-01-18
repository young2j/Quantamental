import React, { Component } from 'react'
import { Table, Button,Form,Input,Popconfirm } from 'antd'

// import './index.less'

// const InnerTable = () => {
//     const columns = [{
//         title: '估值因子',
//         dataIndex: 'evaFactors'
//     }]
//     const dataSource = [
//         {
//             evaFactors: 'P/B'
//         },
//         {
//             evaFactors: 'PEG'
//         },
//     ]
//     return (
//         <Table
//             className='inner-table'
//             columns={columns}
//             dataSource={dataSource}
//             showHeader={false}
//             bordered
//             rowKey={record=>record.evaFactors}
//             pagination={{hideOnSinglePage:true}}
//         />
//     )
// }

// const initColumns = [
//     {
//         title: '估值因子',
//         dataIndex: 'evaFactors'
//     },
//     {
//         title: '成长因子',
//         dataIndex: 'growthFactors'
//     },
//     {
//         title: '资本结构因子',
//         dataIndex: 'CSFactors'
//     },
//     {
//         title: '技术面因子',
//         dataIndex: 'techFactors'
//     },
// ]
// class OuterTable extends Component {
//     state = {
//         columns:initColumns
//     }
//     addColumn = () => {
//         let newColumn = [{
//             title: 'newColumn',
//             dataIndex: 'newDataIndex'
//         }]
//         this.setState({
//             columns:this.state.columns.concat(newColumn)
//         })      
//     }

//     render(){

//         const editColumn = [{
//             title: '',
//             render: () => {
//                 return <Button icon='plus' onClick={this.addColumn}>添加大类因子</Button>
//             }
//         }]

//         const columns = this.state.columns.concat(editColumn)

//         const dataSource = [
//             {   
//                 key:'1',
//                 evaFactors: <InnerTable/>,
//                 growthFactors: <InnerTable/>,
//                 CSFactors: <InnerTable/>,
//                 techFactors: <InnerTable/>,
//             }
//         ]

//         return (

//             <Table 
//                 className='outer-table'
//                 columns={columns}
//                 dataSource={dataSource}
//                 pagination={{hideOnSinglePage:true}}
//                 scroll={{x:1000}}
//             />
//         )
//     }
// }


// class Step21Content extends Component {
//     render() {
//         return (
//             <div style={{margin:"30px auto",width:'90%'}}>
//                 <OuterTable/>                
//             </div>
//         )
//     }
// }


// export default Step21Content




const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef();
    const form = React.useContext(EditableContext);
    React.useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

class Step21Content extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0',
                },
                {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1',
                },
            ],
            count: 2,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a row
        </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default Step21Content