#  迭代器与生成器

##  什么是迭代

> ​	迭代是一种遍历模式,对有序的(具有索引的),连续的数据类型进行抽取,因此对象没有迭代接口

##  迭代方法

```javascript
<script>
    var arr = [1,2,3,4]
    var s = "1234"
    console.log(arr); //Symbol(Symbol.iterator): ƒ values()
    console.log(Object.getPrototypeOf(s)); //Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
    var iterator = arr[Symbol.iterator]() //返回一个迭代器对象,内置有next方法
    console.log(iterator);
    // Array Iterator {}
    //     [[Prototype]]: Array Iterator
    //         next: ƒ next()
    //         Symbol(Symbol.toStringTag): "Array Iterator"
    //             [[Prototype]]: Object
    console.log(iterator.next()); //{value: 1, done: false}
    console.log(iterator.next()); //{value: 2, done: false}
    console.log(iterator.next()); //{value: 3, done: false}
    console.log(iterator.next()); //{value: 4, done: false}
    console.log(iterator.next()); //{value: undefined, done: true}
</script>
```

##  手写iterator方法

```javascript
<script>
    var arr = [1,2,3,4]
	//涉及一部分闭包
    function makeIterator(arr){
        let index = 0;
        return {
            next(){
                var done = index<arr.length?false:true;
                return{
                    value:arr[index++],
                    done
                }
            }
        }
    }
    var iterator = makeIterator(arr);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
</script>
```

##  部署对象迭代接口

```javascript
<script>
    var obj = {
        a: 1,
        b: 2,
        c: 3,
        [Symbol.iterator]() {
            let index = 0;
            let map = new Map([['a', 1], ['b', 2], ['c', 3]])
            return {
                next() {
                    var mapEntries = [...map.entries()]
                    var done = index < mapEntries.length ? false : true;
                    return {
                        value: mapEntries[index++],
                        done,
                    };
                },
            };
        },
    };
    var iterator = obj[Symbol.iterator]()
    console.log(iterator.next()); //{value: Array(2), done: false}
    console.log(iterator.next()); //{value: Array(2), done: false} 
    console.log(iterator.next()); //{value: Array(2), done: false} 
    console.log(iterator.next()); //{value: undefined, done: true}
    for(var i of obj){
        console.log(i);
    }
    //['a', 1] ['b', 2] ['c', 3]
</script>
```

###  优化对象迭代接口

```javascript
<script>
    var obj = {
        a: 1,
        b: 2,
        c: 3,
        hello(){
            console.log("helloworld");
        }
    }
    obj[Symbol.iterator] = function () {
        // var mapEntries = Object.entries(obj)
        var index = 0
        return {
            next() {
                var mapEntries = Object.entries(obj)
                var done = index < mapEntries.length ? false : true
                return {
                    value: mapEntries[index++],
                    done
                }
            }
        }
    }
    var iterator = obj[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    for(var i of obj){
        console.log(i);
    }

</script>
```

##  生成器

###  特点

```javascript
<script>
    function* test(){
        var v1 = yield 1
        console.log(v1); //two
        var v2 = yield 2
        console.log(v2); //three
        var v3 = yield 3
        console.log(v3); //four
        var v4 = yield 4
        console.log(v4); //five
    }
    var maker = test()
    maker.next('one')
    maker.next('two')
    maker.next('three')
    maker.next('four')
    maker.next('five')
    // next传入的值在下一次next调用后生效
</script>
```

###  生成器改造对象迭代

```javascript
<script>
        var obj = {
        a: 1,
        b: 2,
        c: 3,
        hello(){
            console.log("helloworld");
        }
    }
    obj[Symbol.iterator] = function* () {
        var mapEntries = Object.entries(obj)
        var index = 0
        while(index < mapEntries.length){
            var done = index < mapEntries.length ? false : true
            yield {
                value: mapEntries[index++],
                done
            }
        }
    }
    var iterator = obj[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    for(var i of obj){
        console.log(i);
    }
</script>
```

##  Promise

###  回调地狱(callback hell)

```javascript
const fs = require('fs')

fs.readFile('class.txt','utf-8',function(err,data){
    fs.readFile(data,'utf-8',function(err,data){
        fs.readFile(data,'utf-8',function(err,data){
            console.log(data);
        })
    })
})
```

###  几个概念

> 	1. JS是单线程(防止DOM冲突,即避免对同一个DOM元素同时进行互逆的操作 如：同时增删)
>  	2. 异步的解决方案   事件轮询(Event Loop)
>  	3.  事件轮询的核心  回调函数(callback)

####  事件轮询

#####  图解

[Event Loop](C:\Users\gxy\Desktop\JS经典题目\iterator,generator,promise\Event Loop.jfif)

###  promise对象

```javascript
const fs = require('fs')

function readFile(pathname){
    return new Promise(function(resolve,reject){
        fs.readFile(pathname,'utf-8',(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
    // 同步回调函数,执行器(executor)函数
}
// promise状态(生命周期)
// pending
// fulfilled
// rejected
var promise = readFile('./class.txt');
promise.then((data)=>{
    console.log(data);
},(err)=>{
    console.log(err);
})
// 异步回调函数,微任务
// 异步任务的完成与否取决于promise的状态
```



###  promise特点

>  1. promise 状态不受外界影响
>
>  2. promise 状态固化,一旦确定不可更改
>
>     --即第一次promise的状态由rejected或者resolve确定后,内部再次给该promise添加回调函数都会是同个状态。
>
>     ```javascript
>     var p1 = new Promise((resolve,rejected)=>{
>             resolve("p1-resolve")
>             rejected("p1-rejected") --无效
>         })
>         p1.then(function(data){
>             console.log(data);
>         }).catch((err)=>{
>             console.log(err);
>         })
>     //p1-resolve
>     ```
>
>     ```javascript
>     var p1 = new Promise((resolve,rejected)=>{
>         	rejected("p1-rejected")
>             resolve("p1-resolve") -- 无效
>         })
>         p1.then(function(data){
>             console.log(data);
>         }).catch((err)=>{
>             console.log(err);
>         })
>     // p1-rejected
>     ```
>
>     

###  promise执行机制-微任务

> ​	JS 任务机制
>
> ​		-宏任务
>
> ​		-微任务
>
> ​		-异步任务
>
> 执行顺序: 宏任务->微任务(超车道)->异步任务(主车道)

```javascript
<script>
    console.log("window");
    setTimeout(() => {
        console.log("setTimeOUT");
    }, 0);
    var promise = new Promise((resovle,rejected)=>{
        console.log(1);
        resovle('promise')
    })
    promise.then((data)=>{
        console.log(data);
    })
    // RESULT:
    // window
    // 1
    // promise
    // setTimeOUT
</script>
```

###  promise静态方法及thenable对象

####  静态方法

> 	1. promise.resolve() --返回fulfilled状态的promise  （自动调用thenable对象的then方法）
>  	2. promise.reject() --返回rejected状态的promise

####  thenable对象

```javascript
<script>
    var obj = {
        then(resolve,rejected){
            resolve('i am obj')
        }
    }
    var promise = Promise.resolve(obj);
    promise.then((data)=>{
        console.log(data); // i am obj
    })
    var p2 = Promise.reject(obj)
    p2.catch((err)=>{
        console.log(err); // {then: ƒ}
    })
//resolv一个thenable对象会自动调用其next()方法
</script>
```

###  题目

```javascript
<script>
    Promise.resolve().then(()=>{   --P
        console.log('promise-resolve');  --w1
        setTimeout(() => {    --s1
            console.log('setTimeOut1');
        }, 0);
    })

    setTimeout(() => {    --S
        console.log("setTimeOut2"); --w2
        Promise.resolve().then(()=>{ --p1
            console.log('setTimeOut-promise');
        })
    }, 0);

    // result:
    // promise-resolve
    // setTimeOut2
    // setTimeOut-promise
    // setTimeOut1
</script>
```

####  解答

>Step1: P(w1,s1)>S(s2,p1)

> Step2: w1>S(s2,p1)>s1

> Step3: w1>w2>p1>s1			(微任务超车)

### 链式调用

> ​	返回普通值或者promise( 普通值 || promise)
>
> ```javascript
> var p1 = new Promise((resolve, rejected) => {
>         resolve("p1");
>     })
> ```



####  返回类型

```javascript
console.log(p1.then((data) => {console.log(data);}));  //Promise {<pending>}
```

####  调用

##### 普通调用

```javascript
p1.then((data) => {console.log(data);}) // p1
  .then((data) => {console.log(data);}) // undefined
```

```javascript
p1.then((data)=>{
        console.log(data); //p1
        return data+data; //将return的值包装成一个promise对象
    }).then((data)=>{
        console.log(data); //p1p1
    })
```

#####  区分两种调用方式

```javascript
<script>
    var p1 = new Promise((resolve,rejected)=>{
    	resolve(11)
    })
    //Type 1
    p1.then((data)=>{console.log(data+1);return data+1})    //12
    p1.then((data)=>{console.log(data+1);return data+1})    //12
    p1.then((data)=>{console.log(data+1);return data+1})    //12
    p1.then((data)=>{console.log(data+1);return data+1})    //12

    //Type 2
    p1.then((data)=>{console.log(data+1);return data+1})    //12
      .then((data)=>{console.log(data+1);return data+1})    //13
      .then((data)=>{console.log(data+1);return data+1})    //14
      .then((data)=>{console.log(data+1);return data+1})    //15
</script>
```

> ​	Type1:只有一个promise对象
>
> ​	Type2:5个promise对象（包括p1和最后一个then返回的promise）

###  状态依赖

```javascript
var p = new Promise((resolve,rejected)=>{
        setTimeout(()=>{
            rejected('1000');
        },3000)
    })
    var promise = new Promise((resolve,rejected)=>{
        setTimeout(()=>{
            resolve(p)
        },1000)
    })
    promise
        .then((data)=>{console.log('success'+data);})
        .catch(err=>{console.log('error'+err);})
//error1000
//注意:	resolve(rejected) -> rejected
//		 rejected(resolve) -> rejected		
//两种状态嵌套最后都是rejected
```

###  promisfy

函数promise化

```javascript
function promisfy(fn) {
    return function (...args) {
        return new Promise((resolve, rejected) => {
            fn(...args, (err, data) => {
                if (err) {
                    rejected(err)
                }
                resolve(data)
            })
        })
    }
}

var readFile = promisfy(fs.readFile);
readFile('./class.txt', 'utf-8')
    .then(data => readFile(data, 'utf-8'))
    .then(data => readFile(data, 'utf-8'))
    .then(data => console.log((data)))
```

###  两个静态方法

```javascript
promise.all([a,b,c,d])  //执行所有promise
promise.race([a,b,c,d]) //执行最快结束的那个promise
```

###  async await

####  封装co模块

```javascript
const fs = require('fs')
function readFile(pathname){
    return new Promise(function(resolve,reject){
        fs.readFile(pathname,'utf-8',(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
}
function* read(){
    let v1 = yield readFile('./class.txt');
    let v2 = yield readFile(v1);
    let v3 = yield readFile(v2);
    return v3
}



var reader = read()


function co(iter){
    return new Promise((resolve,rejected)=>{
        let next = function(v){
            var {value:val,done} = iter.next(v);
            if(done === true){
                resolve(val)
            }else{
                val.then(path=>{
                    next(path)
                })
            }
        }
        next();
    })
}
co(reader).then(data=>{console.log(data);})
```

