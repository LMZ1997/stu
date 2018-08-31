import React,{Component} from 'react';
import Simditor from 'simditor'

import 'simditor/styles/simditor.css'
import $ from 'jquery' 


class RichEditor extends Component{
	constructor(props){
		super(props);
		this.toolbar=[
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol', 
			  'ul', 
			  'blockquote',
			  'code',
			  'table',
			  'link',
			  'image',
			  'hr',
			  'indent',
			  'outdent',
			  'alignment'
			]
		$.ajaxSetup({                //simditor并没有封装withCredentials:true的接口，所以需要用ajax全局配置
			xhrFields:{
				withCredentials:true
			}
		})
	}
	componentDidMount(){
		this.editor=new Simditor({                 
		  textarea:this.textarea,
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		    fileKey: 'upload_'      // 文件参数的关键;
		  }
		});
		this.editor.on('valuechanged',()=>{
			this.props.getRichEditorValue(this.editor.getValue())
		})
	}
	render(){
		return(          //ref用来选择DOM节点
			<textarea ref={(textarea)=>{this.textarea=textarea}}></textarea>
		)
	}

}


export default RichEditor