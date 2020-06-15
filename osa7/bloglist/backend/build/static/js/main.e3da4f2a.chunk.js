(this.webpackJsonpblogilista=this.webpackJsonpblogilista||[]).push([[0],{65:function(e,t,n){e.exports=n(95)},95:function(e,t,n){"use strict";n.r(t);var a,r=n(0),l=n.n(r),c=n(19),u=n.n(c),o=n(10),i=n(23),s=n(58),m=n(59),d=n(3),f=n.n(d),p=n(5),h=n(38),g=n(12),E=n.n(g),v=null,b={getAll:function(){return E.a.get("/api/blogs").then((function(e){return e.data}))},create:function(){var e=Object(p.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,E.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return E.a.put("".concat("/api/blogs","/").concat(t),e).then((function(e){return e.data}))},deleteBlog:function(e){var t={headers:{Authorization:v}};return E.a.delete("".concat("/api/blogs","/").concat(e),t).then((function(e){return e}))},setToken:function(e){v="bearer ".concat(e)}},O={comment:function(){var e=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/api/comments",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},w=function(e){return e.sort((function(e,t){return e.likes<t.likes?1:-1}))},y=function(e){return function(){var t=Object(p.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.create(e);case 2:a=t.sent,n({type:"NEW",data:a});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},k=function(e){return function(){var t=Object(p.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.deleteBlog(e);case 2:a=t.sent,n({type:"DELETE",data:a});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LIKE":var n=t.data.id,a=e.find((function(e){return e.id===n}));return w(e.map((function(e){return e.id!==n?e:a})));case"COMMENT":var r=t.data.savedComment.blog,l=e.find((function(e){return e.id===r}));return l.comments.push(t.data.savedComment),console.log("commented blog",l),w(e.map((function(e){return e.id!==r?e:l})));case"NEW":return w([].concat(Object(h.a)(e),[t.data.savedBlog]));case"INIT_BLOGS":return t.data;case"DELETE":var c=t.data.id;return w(e.filter((function(e){return e.id!==c})));default:return e}},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NOTIFICATION":return t.notification;default:return e}},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FILTER":return t.filter;default:return e}},N={login:function(){var e=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},I=function(e,t){return function(){var n=Object(p.a)(f.a.mark((function n(a){var r;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,N.login({username:e,password:t});case 2:r=n.sent,window.localStorage.setItem("loggedBlogappUser",JSON.stringify(r)),b.setToken(r.token),a({type:"LOGIN",data:r});case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGGED_IN":case"LOGIN":return t.data;default:return e}},T=function(){return E.a.get("/api/users").then((function(e){return e.data}))},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_USERS":case"USER":return t.data;default:return e}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"COMMENT":return[].concat(Object(h.a)(e),[t.data.savedComment]);default:return e}},A=Object(i.combineReducers)({blogs:C,notification:x,filter:j,loggedUser:L,users:S,comment:B}),D=Object(i.createStore)(A,Object(m.composeWithDevTools)(Object(i.applyMiddleware)(s.a))),F=n(16),M=function(e){return l.a.createElement("h1",null,e.text)},U=function(e){return l.a.createElement("h2",null,e.text)},G=n(97),R=function(e){return l.a.createElement(G.a,{onClick:e.handleClick,type:e.type,id:e.id,variant:e.variant,className:e.className},e.text)},_=l.a.forwardRef((function(e,t){var n=Object(r.useState)(!1),a=Object(F.a)(n,2),c=a[0],u=a[1],o={display:c?"none":""},i={display:c?"":"none"},s=function(){u(!c)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:s}})),l.a.createElement("div",null,l.a.createElement("div",{style:o},l.a.createElement(R,{handleClick:s,text:e.buttonLabel,id:e.idView})),l.a.createElement("div",{style:i,className:"togglableContent"},e.children,l.a.createElement(R,{handleClick:s,text:e.buttonHideLabel,id:e.idHide})))})),H=n(14),J=function(e){var t=e.blog;e.user,e.handleLikeClick,e.handleDeleteClick;return l.a.createElement("tr",{id:t.id,key:t.id,className:"blog"},l.a.createElement("td",null,l.a.createElement(H.b,{to:"/blogs/".concat(t.id)},t.title)),l.a.createElement("td",null,t.author))},P=function(e){return l.a.createElement("input",{type:e.type,placeholder:e.placeholder,onChange:e.handleOnChange,id:e.id,value:e.value,name:e.name,className:"form-control"})},W=function(e){return l.a.createElement("div",null,l.a.createElement(U,{text:"Search"}),"Filter by Name: ",l.a.createElement(P,{placeholder:"Name..",handleOnChange:e.handleFilterOnChange}))},z=function(e){var t=e.createBlog,n=e.showMessage,a=Object(r.useState)(""),c=Object(F.a)(a,2),u=c[0],o=c[1],i=Object(r.useState)(""),s=Object(F.a)(i,2),m=s[0],d=s[1],f=Object(r.useState)(""),p=Object(F.a)(f,2),h=p[0],g=p[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(U,{text:"Add New Blog"}),l.a.createElement("form",null,l.a.createElement("div",{className:"form-group mb-0"},l.a.createElement("label",{className:"mb-1"},"Title"),l.a.createElement("br",null),l.a.createElement(P,{placeholder:"Title..",handleOnChange:function(e){o(e.target.value)},id:"titleInput0"}),l.a.createElement("br",null)),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{className:"mb-1"},"Author"),l.a.createElement("br",null),l.a.createElement(P,{placeholder:"Author..",handleOnChange:function(e){d(e.target.value)},id:"authorInput0"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{className:"mb-1"},"URL"),l.a.createElement("br",null),l.a.createElement(P,{placeholder:"Url..",handleOnChange:function(e){g(e.target.value)},id:"urlInput0"})),l.a.createElement(R,{className:"mb-3",variant:"primary",type:"submit",handleClick:function(e){if(e.preventDefault(),""===u)n("Input title","danger");else if(""===m)n("Input author","danger");else if(""===h)n("Input url","danger");else{t({title:u,author:m,url:h}),o(""),d(""),g("")}},text:"Add",id:"addNewBlogButton"})))},K=n(98),V=function(e){var t=l.a.createRef();return l.a.createElement(l.a.Fragment,null,l.a.createElement(_,{buttonLabel:"New Blog",ref:t,buttonHideLabel:"Cancel"},l.a.createElement(z,{createBlog:e.handleAddClick,showMessage:e.showMessage})),l.a.createElement(W,{handleFilterOnChange:e.handleFilterOnChange}),l.a.createElement(U,{text:"Blogs"}),l.a.createElement(K.a,{stripped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Title"),l.a.createElement("th",null,"Author"))),l.a.createElement("tbody",null,e.blogs.map((function(t,n){return l.a.createElement(l.a.Fragment,null,l.a.createElement(J,{blog:t,user:e.user,handleLikeClick:e.handleLikeClick,handleDeleteClick:e.handleDeleteClick,rowIndex:"row".concat(n)}))})))))},Y=n(100),q=function(){var e=Object(o.c)((function(e){return e.notification}));return l.a.createElement(Y.a,{variant:e.msgClass},e.msg)},Q=function(e){return l.a.createElement("form",{onSubmit:e.handleLogin},l.a.createElement("div",null,"username",l.a.createElement(P,{type:"text",value:e.username,name:"Username",handleOnChange:function(t){var n=t.target;return e.setUsername(n.value)},id:"inputUsername"})),l.a.createElement("div",null,"password",l.a.createElement(P,{type:"password",value:e.password,name:"Password",handleOnChange:function(t){var n=t.target;return e.setPassword(n.value)},id:"inputPassword"})),l.a.createElement(R,{type:"submit",text:"Login",id:"loginButton"}))},X=function(e){var t=e.user;return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",{id:t.id,key:t.id,className:"blog"},l.a.createElement("td",null,l.a.createElement(H.b,{to:"/users/".concat(t.id)},t.name)),l.a.createElement("td",null,t.blogs.length)))},Z=function(){var e=Object(o.c)((function(e){return e.users}));return l.a.createElement("div",null,l.a.createElement(U,{text:"Users"}),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"User"),l.a.createElement("th",null,"Blogs created"))),l.a.createElement("tbody",null,e.map((function(e,t){return l.a.createElement(l.a.Fragment,null,l.a.createElement(X,{user:e}))})))))},$=n(7),ee=function(e){var t=e.user;return l.a.createElement("div",null,l.a.createElement(U,{text:t.name}),l.a.createElement("h3",null,"Added Blogs"),t.blogs.map((function(e,t){return l.a.createElement("li",null,e.title)})))},te=function(e){var t=e.blog,n=e.showMessage,a=Object(r.useState)(""),c=Object(F.a)(a,2),u=c[0],i=c[1],s=Object(o.b)();return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",null,l.a.createElement(P,{id:"commentInput",placeholder:"Write a comment",name:"comm",handleOnChange:function(e){i(e.target.value)}}),l.a.createElement(R,{text:"Add Comment",handleClick:function(e){if(e.preventDefault(),u){var a,r={comment:u,blog:t.id};s((a=r,function(){var e=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.comment(a);case 2:n=e.sent,console.log("newComment",n),t({type:"COMMENT",data:n});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())),n("You have commented on ".concat(t.title),"success"),document.getElementById("commentInput").value="",i("")}else n("Can't add an empty comment","error")}})))},ne=n(102),ae=function(e){var t=e.blog,n=e.user,a=e.handleLikeClick,r=e.handleDeleteClick,c=e.showMessage;return t&&n?l.a.createElement(l.a.Fragment,null,l.a.createElement(U,{text:t.title}),l.a.createElement("a",{href:t.url},t.url),l.a.createElement("p",null,t.likes," likes",l.a.createElement(R,{className:"ml-2",text:"like",handleClick:function(){return a(t)}}),t.user&&n.username===t.user.username?l.a.createElement(R,{className:"ml-2",text:"Delete Blog",id:(t.title+t.author).trim(),handleClick:function(){return r(t.id,t.title)}}):""),t.user?l.a.createElement("p",null,"added by ",t.user.name):"",l.a.createElement("div",{className:"col p-1",style:{background:"lightgray"}},l.a.createElement("h3",null,"Comments"),l.a.createElement(te,{blog:t,showMessage:c}),0===t.comments.length?l.a.createElement("p",null,"This blog has no comments"):l.a.createElement(ne.a,{className:"mt-2",style:{background:"lightgray"}},t.comments.map((function(e,t){return l.a.createElement(ne.a.Item,{key:t},e.comment)}))))):null},re=n(99),le=n(101),ce=function(e){var t=e.user,n=e.handleLogout;return l.a.createElement(re.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},l.a.createElement(re.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),l.a.createElement(re.a.Collapse,{id:"responsive-navbar-nav"},l.a.createElement(le.a,{className:"mr-auto"},l.a.createElement(le.a.Link,{href:"#",as:"span"},l.a.createElement(H.b,{to:"/",className:"navbarLink"},"BLOGS")),l.a.createElement(le.a.Link,{href:"#",as:"span"},l.a.createElement(H.b,{to:"/users",className:"navbarLink"},"USERS")),l.a.createElement(le.a.Link,{href:"#",as:"span"},t?l.a.createElement("em",null,t.name," logged in"):l.a.createElement(H.b,{to:"/login"},"login")),l.a.createElement(R,{text:"logout",handleClick:n}))))},ue=function(){var e=Object(r.useState)(""),t=Object(F.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),i=Object(F.a)(u,2),s=i[0],m=i[1],d=Object(o.b)();Object(r.useEffect)((function(){d(function(){var e=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.getAll();case 2:n=e.sent,t({type:"INIT_BLOGS",data:w(n)});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(r.useEffect)((function(){d(function(){var e=Object(p.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=window.localStorage.getItem("loggedBlogappUser"))&&(a=JSON.parse(n),b.setToken(a.token),t({type:"LOGGED_IN",data:a}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]),Object(r.useEffect)((function(){d(function(){var e=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:n=e.sent,t({type:"INIT_USERS",data:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var h=Object(o.c)((function(e){return e.blogs.filter((function(t){return t.title.toLowerCase().includes(e.filter.toLowerCase())}))})),g=Object(o.c)((function(e){return e.loggedUser})),E=Object(o.c)((function(e){return e.users})),v=Object($.f)("/users/:id"),O=v?E.find((function(e){return e.id===v.params.id})):null,C=Object($.f)("/blogs/:id"),x=C?h.find((function(e){return e.id===C.params.id})):null,j=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{d(I(n,s)),c(""),m("")}catch(a){A("wrong credentials","danger")}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{d(y(t)),A("Added ".concat(t.title),"success"),B()}catch(n){A(n,"danger")}case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(p.a)(f.a.mark((function e(t,n){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a="Do you really want to delete ".concat(n,"?"),window.confirm(a))try{d(k(t)),A('The "'.concat(n,'" blog has beed deleted'),"primary")}catch(r){A(r,"danger")}case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S=function(e){console.log(e);var t={title:e.title,author:e.author,url:e.url,likes:e.likes+=1,user:e.user?e.user.id:void 0};try{d(function(e,t){return function(){var n=Object(p.a)(f.a.mark((function n(a){var r;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,b.update(e,t);case 2:r=n.sent,a({type:"LIKE",data:r});case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(t,e.id)),A("You liked ".concat(t.title),"success")}catch(n){A("Error: ".concat(n),"danger")}},B=function(){document.getElementById("titleInput0").value="",document.getElementById("authorInput0").value="",document.getElementById("urlInput0").value=""},A=function(e,t){var n,r;d((n={msg:e,msgClass:t},r=5,function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t({type:"NOTIFICATION",notification:n});case 2:clearTimeout(a),a=setTimeout((function(){t({type:"NOTIFICATION",notification:{msg:"",msgClass:void 0},timeout:!0})}),1e3*r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))};l.a.createRef();return null===g?l.a.createElement("div",null,l.a.createElement(M,{text:"Blog App"}),l.a.createElement(q,null),l.a.createElement(_,{buttonLabel:"Login",buttonHideLabel:"Cancel"},l.a.createElement(Q,{handleLogin:j,username:n,setUsername:c,password:s,setPassword:m}))):l.a.createElement("div",{className:"container mr-0 ml-0 p-0 mw-100"},l.a.createElement(ce,{user:g,handleLogout:function(){d(function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.localStorage.clear(),t({type:"LOGGED_IN",data:null});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}),l.a.createElement("div",{className:"col ml-10 mr-10"},l.a.createElement(M,{text:"Blog App"}),l.a.createElement(q,null),l.a.createElement($.c,null,l.a.createElement($.a,{path:"/users/:id"},l.a.createElement(ee,{user:O})),l.a.createElement($.a,{path:"/users"},l.a.createElement(Z,null)),l.a.createElement($.a,{path:"/blogs/:id"},l.a.createElement(ae,{blog:x,user:g,handleLikeClick:S,handleDeleteClick:L,showMessage:A})),l.a.createElement($.a,{path:"/"},l.a.createElement(V,{blogs:h,handleDeleteClick:L,handleLikeClick:S,user:g,handleFilterOnChange:function(e){d({type:"FILTER",filter:e.target.value})},handleAddClick:N,showMessage:A})))))};u.a.render(l.a.createElement(o.a,{store:D},l.a.createElement(H.a,null,l.a.createElement(l.a.StrictMode,null,l.a.createElement(ue,null)))),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.e3da4f2a.chunk.js.map