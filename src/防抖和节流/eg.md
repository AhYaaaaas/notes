#  JS经典题目

##  防抖

###  1.目的

> 函数节流（throttle）与 函数防抖（debounce）都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。 

###  2.知识点

> 函数闭包，this指向，arguments参数，apply改变this指向



###  3.完整代码

```javascript
<body>
    <input type="text">
    <input type="submit" value="点击提交" id="input">
</body>
<script>
    const btn = document.getElementById("input")
    function submit(e){
        console.log(1);
    }
    function load(fn){
        let t = null;
        return function(){
            // if(t){
            //     clearTimeout(t)
            // }else{
            //     t = setTimeout(()=>{
            //         fn.apply(this,arguments)
            //     },2000)
            // }
            let flag = !t
            if(t) clearTimeout(t)
            if(flag){
                fn.apply(this,arguments)
            }
            t = setTimeout(()=>{
                t = null
            },500)
        }
    }
    btn.addEventListener('click',load(submit),false)
</script>
```

###  4.逐行解释

```javas
return function()
```

> 返回事件处理函数

```javascript
if(t) clearTimeout(t) 
```

> 确保消息队列里只有一个定时器，避免重复延迟

```javascript
btn.addEventListener('click',load(submit),false)
```

> submit按钮注册click事件,load(submit),返回一个函数,点击后执行该函数而不是load
>
> 由于闭包参数t并没有被销毁,**无论点击多少次始终只有一个t**

```JAVAS
fn.apply(this,arguments)
```

> 调用submit函数并将this指向改为该事件处理函数，用于获取事件和事件对象(arguments)

###  5.整体说明

```javascript
function load(fn){
        let t = null;
        return function(){
            let flag = !t
            if(t) clearTimeout(t)
            if(flag){
                fn.apply(this,arguments)
            }
            t = setTimeout(()=>{
                t = null
            },500)
        }
    }
```

> 用户点击后,t从null变成了setTimeout()函数的引用,并在500ms后重新指向null
>
> 注意:只有当t=null时才执行fn函数
>
> 当用户重复点击是t始终是一个setTimeout函数的引用,且在消息队列中只有一个定时器

##  节流

###  1.目的

> 函数节流（throttle）与 函数防抖（debounce）都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。 

###  2.知识点

###  3.完整代码

```javascript
<body>
    <input type="text">
    <input type="submit" value="点击提交" id="input">
</body>
<script>
    const btn = document.getElementById("input")
    function submit(e){
        console.log(1);
    }
    function load(fn,delay){
        let beginTime = 0
        return function(){
            let curTime = new Date().getTime()
            if(curTime - beginTime > delay){
                fn()
            }
            beginTime = new Date().getTime()
        }
    }
    btn.addEventListener('click',load(submit,1000),false)
</script>
```

###  4.原理

>利用两次事件间隔来判断是否执行



