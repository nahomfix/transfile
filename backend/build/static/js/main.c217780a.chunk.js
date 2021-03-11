(this.webpackJsonphello=this.webpackJsonphello||[]).push([[0],{127:function(e,t,n){},128:function(e,t,n){},160:function(e,t,n){"use strict";n.r(t);var a=n(6),s=n(0),i=n(23),c=n.n(i),l=(n(127),n(128),n(92)),o=n(68),r=n(69),d=n(80),j=n(78),h=n(167),u=n(166),b=n(165),x=n(170),p=n(164),f=n(66),m=n(169),O=n(168),g=n(60),v=n.n(g),k=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleMessage=function(e){a.setState({message:e.target.value})},a.handleUpload=function(){var e=a.state.fileList,t=new FormData;e.forEach((function(e){t.append("file",e),t.append("message",a.state.message.trim())})),a.setState({uploading:!0}),v.a.post("http://localhost:5000/uploads",t).then((function(e){return a.setState({link:"".concat(window.location.href).concat(e.data.data.slug),uploading:!1})})).catch((function(e){return a.setState({uploading:!1})}))},a.resetLink=function(){a.setState({link:"",fileList:[],message:""})},a.state={message:"",fileList:[],uploading:!1,link:""},a}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=h.a.TextArea,n=this.state,s=n.uploading,i=n.fileList,c=u.a.Text,o=u.a.Link,r=u.a.Title,d=u.a.Paragraph,j={maxCount:1,onRemove:function(t){e.setState((function(e){var n=e.fileList.indexOf(t),a=e.fileList.slice();return a.splice(n,1),{fileList:a}}))},beforeUpload:function(t){return e.setState((function(e){return{fileList:[t]}})),!1},fileList:i,progress:{strokeColor:{"0%":"#108ee9","100%":"#87d068"},strokeWidth:3,format:function(e){return"".concat(parseFloat(e.toFixed(2)),"%")}}};return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(b.a,{style:{textAlign:"center"},children:Object(a.jsxs)(x.b,{align:"center",direction:"vertical",children:[!this.state.link&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(p.a,Object(l.a)(Object(l.a)({},j),{},{children:Object(a.jsx)(f.a,{icon:Object(a.jsx)(m.a,{}),children:"Upload File"})})),Object(a.jsx)(t,{autoSize:{minRows:6,maxRows:9},value:this.state.message,onChange:this.handleMessage,placeholder:"Message..."})]}),this.state.link&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(O.a,{twoToneColor:"#52c41a",style:{fontSize:"70px"}}),Object(a.jsx)(r,{children:"You're done!"}),Object(a.jsx)(r,{level:5,children:"Copy the download link below."})]}),this.state.link&&Object(a.jsx)(c,{code:!0,children:Object(a.jsx)(o,{href:this.state.link,target:"_blank",children:Object(a.jsx)(d,{copyable:!0,children:this.state.link})})}),this.state.link?Object(a.jsx)(f.a,{type:"primary",shape:"round",onClick:this.resetLink,children:"Another Link"}):Object(a.jsx)(f.a,{type:"primary",shape:"round",loading:s,disabled:0===i.length,onClick:this.handleUpload,children:"Get Link"})]})})})}}]),n}(s.Component),y=n.p+"static/media/transfileLogo.4e970537.svg",w=n(115),L=n(24),F=n(116),S=n(162),C=n(163),T=n(119),A=n(88),N=n.n(A),U=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).download=function(){var e=new Blob([new Uint8Array(a.state.file.data)]);N()(e,a.state.filename)},a.downloadFile=function(){v()({url:"http://localhost:5000/download/".concat(a.props.match.params.slug),method:"GET",responseType:"blob"}).then((function(e){F.b.info("Download started."),N()(e.data,a.state.filename)})).catch((function(e){return console.log(e)}))},a.state={message:"",filename:"",file:null,loading:!0},a}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;v.a.get("http://localhost:5000/uploads/".concat(this.props.match.params.slug)).then((function(t){e.setState({message:t.data.message,filename:t.data.name,loading:!1})})).catch((function(t){e.setState({message:"File not found!"})}))}},{key:"render",value:function(){var e=u.a.Title,t=u.a.Text;return Object(a.jsx)("div",{children:Object(a.jsxs)(b.a,{style:{minWidth:"240px",textAlign:"center"},children:[this.state.loading&&Object(a.jsx)(S.a,{tip:"Fetching file from server please wait..."}),!this.state.loading&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(T.a,{style:{fontSize:"70px",color:"#ccc"}}),Object(a.jsx)(e,{level:4,children:"Ready when you are!"}),Object(a.jsx)(t,{type:"secondary",children:"Link expires in 24 hours"}),Object(a.jsx)(C.a,{}),Object(a.jsx)("p",{style:{textAlign:"left"},children:this.state.message}),Object(a.jsx)(C.a,{}),Object(a.jsx)("p",{style:{textAlign:"left"},children:this.state.filename}),Object(a.jsx)(C.a,{}),Object(a.jsx)(f.a,{type:"primary",shape:"round",onClick:this.downloadFile,children:"Download"})]})]})})}}]),n}(s.Component),_=n(58),D=n(36);var M=function(){return Object(a.jsx)(w.a,{children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("nav",{children:Object(a.jsx)("ul",{className:"navigation",children:Object(a.jsx)("li",{children:Object(a.jsx)("img",{src:y,alt:"logo",height:20,style:{margin:" 15px 20px"}})})})}),Object(a.jsxs)(_.a,{className:"main",children:[Object(a.jsx)(D.a,{xs:24,sm:24,md:12,lg:12,xl:12,className:"main__info",children:Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Transfer Files"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:"Free"}),Object(a.jsx)("li",{children:"Fast"}),Object(a.jsx)("li",{children:"No registration"})]})]})}),Object(a.jsx)(D.a,{xs:24,sm:24,md:12,lg:12,xl:12,className:"main__file",children:Object(a.jsxs)(L.c,{children:[Object(a.jsx)(L.a,{exact:!0,path:"/",component:k}),Object(a.jsx)(L.a,{path:"/:slug",component:U})]})})]})]})})};c.a.render(Object(a.jsx)(M,{}),document.getElementById("root"))}},[[160,1,2]]]);
//# sourceMappingURL=main.c217780a.chunk.js.map