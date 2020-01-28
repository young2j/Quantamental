import React, { Component,useState,useEffect,useRef} from 'react'
import E from 'wangeditor'
import { Form, Input, Button, DatePicker,Spin,message} from 'antd';
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'

import './index.less'
import { getChapterInfo } from '../../api'

const glassesIcon = <svg t="1580212206075" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14451" width="32" height="32"><path d="M400 425.2h178.2v32.6H400z" fill="#515151" p-id="14452"></path><path d="M897.4 636H586.5l-26-248H917z" fill="#515151" p-id="14453"></path><path d="M861.2 599.1H616.3l-13.1-174.2h271z" fill="#515151" p-id="14454"></path><path d="M437.5 636H126.6L107 388h356.5z" fill="#515151" p-id="14455"></path><path d="M407.7 599.1H162.8l-13-174.2h271z" fill="#515151" p-id="14456"></path><path d="M808.6 388H952v28.6H808.6zM72 388h91.2v28.6H72z" fill="#515151" p-id="14457"></path></svg>



const ChapterDisplayView = (props)=>{
  const { 
    formData, 
    displayForm, 
    setDisplayForm 
  } = props

  const {
    title,
    creater,
    createAt,
    modifier,
    modifyAt,
    content 
  } = formData

  const contentRef = useRef()
  useEffect(() => {
    contentRef.current.innerHTML = content
  }, [content])

  return (
    <div id='chapter-form' style={{marginTop:0}}>
      <div className='title-item' style={{marginTop:50}}>
        <h1 style={{flex:0.80,paddingLeft:"26%"}}>{title}</h1>
        <Button onClick={()=>setDisplayForm(!displayForm)} type='primary'><EditOutlined/></Button>
      </div>
      <div className="create-form" >
        <h4 style={{marginRight:"5%",flex:0.2}}>创建人: {creater}</h4>
        <h4>创建时间: {moment(createAt).format('YYYY-MM-DD hh:mm:ss')}</h4>
      </div>
      <div className="modify-form" >
        <h4 style={{ marginRight: "5%", flex: 0.2 }}>修改人: {modifier}</h4>
        <h4>修改时间: {moment(modifyAt).format('YYYY-MM-DD hh:mm:ss')}</h4>
      </div>
      <div ref={contentRef} style={{width:"77%",margin:'66px auto'}}></div>
    </div>
  )
}


class ChapterEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarClassName: 'toolbar-wrapper',
      scrollTop:false,
      isLoading:false
    }
  }

  onFinish = values => {  //编辑完成后进行提交的处理--模拟ajax请求
    this.setState({
        isLoading:true
      },()=>setTimeout(() => {
        this.props.setFormData(values)
        this.setState({
          isLoading:false
        },()=>message.success('保存成功！'))
      },500)
    )
  };


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
    this.editor.txt.html(this.props.formData.content)

    this.refs.formRef.setFieldsValue(this.props.formData)
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
  }

  render() {
    const {scrollTop,isLoading} = this.state
    const {collapse,displayForm,setDisplayForm} = this.props
    
    return (
      <Spin spinning={isLoading}>
        <Form name="chapter-form" ref="formRef" onFinish={values => this.onFinish(values)}>
          <div className='title-item'>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button style={{width:45,paddingLeft:5}}
            onClick={()=>setDisplayForm(!displayForm)}
          >{glassesIcon}</Button>
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
      </Spin>
      )
  }
}


const Chapter = (props)=>{
  const {collapse,link} = props
  const [displayForm, setDisplayForm] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChapterInfo(link.part)
    .then(resp => {
      const formData = {
        ...resp.data,
        title:link.title,
        createAt: moment(resp.data.createAt),
        modifyAt: moment(resp.data.modifyAt),
      }
      setFormData(formData)
      setLoading(false)
    })
  }, [link])

  const prop = {
    collapse,
    formData,
    displayForm,
    setDisplayForm,
    setFormData
  }
  return <Spin spinning={loading}>
      {
        displayForm?
        <ChapterEditView {...prop}/>:<ChapterDisplayView {...prop}/>
      }
  </Spin>
}

export default Chapter;
