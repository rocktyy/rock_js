# rock js
blog<br/>
jquery 组件<br/> 

模块化例子<br/>

1.赋值
例如： var t = T || '*'
当 T 的值不是null或undefined的时候， T的值会赋给t。反之则*会赋给t

2.url 获取参数<br/>

```javascript 
function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 
getQueryString("123")
```

