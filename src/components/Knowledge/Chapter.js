import React, { Component,useRef,useEffect } from 'react'
import E from 'wangeditor'
import { Form, Input, Button, DatePicker} from 'antd';
import moment from 'moment'

import './index.less'
import { getChapterInfo } from '../../api'


const ChapterPlainText = ({fieldsValue,getFieldsValue})=>{
  console.log(fieldsValue);
  const contentRef = useRef()
  const toolbarRef = useRef()
  const {
    title,
    creater,
    createAt,
    modifier,
    modifyAt,
    content,
  } = fieldsValue

  useEffect(() => {
    const editor = new E(toolbarRef,contentRef)
    editor.create()
    editor.txt.html(content)
  }, [])
  
  return (
    <div id='chapter-form' style={{marginTop:0}}>
      <div className='title-item'>
        <h1 style={{flex:0.8,paddingLeft:"26%"}}>{title}</h1>
        <Button onClick={getFieldsValue} >编辑</Button>
      </div>
      <div className="create-form" style={{marginLeft:-100}} >
        <h4 style={{marginRight:50}}>创建人: {creater}</h4>
        <h4>创建时间: {moment(createAt).format('YYYY-MM-DD hh-mm-ss')}</h4>
      </div>
      <div className="modify-form" style={{ marginLeft: -100 }}>
        <h4 style={{ marginRight: 50 }}>修改人: {modifier}</h4>
        <h4>修改时间: {moment(modifyAt).format('YYYY-MM-DD hh-mm-ss')}</h4>
      </div>
      <div ref={toolbarRef} className='plain-text-toolbar'></div>
      <div ref={contentRef} className='plain-text'></div>
    </div>
  )
}

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarClassName: 'toolbar-wrapper',
      collapse: props.collapse,
      scrollTop:false,
      displayForm:false,
      fieldsValue:{}
    }
  }

  getData = ()=>{
    getChapterInfo()
      .then(resp =>{
        const formData = {
          ...resp.data,
          createAt: moment(resp.data.createAt),
          modifyAt: moment(resp.data.modifyAt),
        }
      this.setState({fieldsValue:formData})
      this.refs.formRef.setFieldsValue(formData)
      this.editor.txt.html(resp.data.content)
      })
  }

  onFinish = values => {  //编辑完成后进行提交的处理
    console.log('Received values of form: ', values);
  };

  getFieldsValue = ()=>{
    const fieldsValue = this.refs.formRef.getFieldsValue()
    const {displayForm} = this.state
    this.setState({
      displayForm:!displayForm,
      fieldsValue
    })
    const toolbarWrapper = this.refs.toolbarRef //
    
  }
  mountEditor = () => {
    const editorRef = this.refs.editorRef
    const toolbarRef = this.refs.toolbarRef
    this.editor = new E(toolbarRef, editorRef)
    this.editor.customConfig.uploadImgShowBase64 = true
    // editor.customConfig.uploadImgServer = '/upload' //与上述不能同时存在
    this.editor.customConfig.onchange = html => {
      this.refs.formRef.setFieldsValue({
        content:html
      })
    }
    this.editor.create()
  }

  listenEditorScroll = () => {
    const frameEle = document.getElementsByClassName('frame-content')[0]
    const scroller = () => {
        this.setState({ scrollTop: frameEle.scrollTop > 168})
      }
    frameEle.addEventListener('scroll', scroller, false)
  }


  componentDidMount() {
    this.mountEditor()
    this.listenEditorScroll()
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.collapse !== prevProps.collapse) {
      this.setState({
        collapse: this.props.collapse
      })
    }
  }

  render() {
    const { collapse,scrollTop,displayForm,fieldsValue } = this.state

    return (
      <Form name="chapter-form" ref="formRef" onFinish={values => this.onFinish(values)}>
      {
        displayForm?
        (
        <> 
          <div className='title-item'>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button onClick={this.getFieldsValue}>编辑</Button>
        </div>
        <div className='create-form'>
          <Form.Item
            label='创建人'
            name="creater"
            rules={[{ required: true }]}
          >
            <Input size='small' />
          </Form.Item>

          <Form.Item
            label='创建时间'
            name="createAt"
            rules={[{ required: true }]}
          >
            <DatePicker showTime size='small' />
          </Form.Item>
        </div>

        <div className='modify-form'>
          <Form.Item
            label='修改人'
            name="modifier"
            rules={[{ required: true }]}
          >
            <Input size='small' />
          </Form.Item>

          <Form.Item
            label='修改时间'
            name="modifyAt"
            rules={[{ required: true }]}
          >
            <DatePicker showTime size='small' />
          </Form.Item>
        </div>
        </>
          )
            : (<ChapterPlainText fieldsValue = { fieldsValue } getFieldsValue = {this.getFieldsValue} />)
        }

        <div className='editor-form'>
          <div className={collapse ? 
            (scrollTop ? 'toolbar-wrapper-collapse-fixtop' :'toolbar-wrapper-collapse')
            : (scrollTop ? 'toolbar-wrapper-fixtop' :'toolbar-wrapper')}>
            <div ref="toolbarRef" className='toolbar' ></div>
          </div>
          <Form.Item
            label=''
            name='content'
            rules={[
              {
                required: true
              }, {
                min: 200,
                message: '内容至少200个词！'
              }
            ]}
          >
            <div ref="editorRef" style={{ textAlign: 'left' }} className='content'></div>
          </Form.Item>
        </div>
        
        <div className={collapse ? 'submit-btn-collapse' : 'submit-btn'}>
          <Form.Item label=" " colon={false} >
            <Button htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default Chapter;
