import React, { Component } from 'react'
import E from 'wangeditor'

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: ''
    }
  }

  clickHandle() {
    alert(this.state.editorContent)
  }
  mountEditor = ()=>{
    const elem = this.refs.editorRef
    const editor = new E(elem)
    editor.customConfig.uploadImgShowBase64 = true
    // editor.customConfig.uploadImgServer = '/upload' //与上述不能同时存在
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create()
  }

  componentDidMount() {
    this.mountEditor()
  }

  render() {
    return (
      <div className="App">
        <div ref="editorRef" style={{ textAlign: 'left'}}>
        </div>
        <button onClick={this.clickHandle.bind(this)}>获取内容</button>
      </div>
    );
  }
}

export default Chapter;
