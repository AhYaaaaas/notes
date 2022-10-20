#  this问题

##  this的四种绑定

PS:this指向在调用的时候确定     !!!!!!!!!!!!!!!!!!!!!!!!!important

###  1.默认绑定规则

```javascript
console.log(this === window); //true
    console.log({} === {}); //false
    // 函数的独立调用
        function test(){
            console.log(this === window);
        }
        window.test() // true
```

> 不加前缀的调用均为独立调用,独立调用this指向全局

###  2.隐式绑定规则

PS:谁调用就指向谁

```javascript
var obj = {
        a:2,
        foo:function(){
            console.log(this); // obj
            function test(){
                console.log(this); 
            }
            test() // window
            return test
        }
    }
    obj.foo()
     // 闭包指向
    obj.foo()() //window 等价于var n = obj.foo()   n()
    function man(){
        console.log(this);
    }
    var o = {
        foo:man
    }
    var b = o.foo
    function women(fn){
        fn()
    }
    women(o.foo) //window
```

> ​	结合默认绑定规则,直接找调用者！！！！！

###  3.显式绑定

```javascript
var obj = {
        a:2
    }
    function test(a,b,c){
        console.log(this);
        console.log(a,b,c);
    }
    // test.call(obj)   // {a: 2}
    // test.apply(obj)    // {a: 2}
    // test.bind(obj)()    // {a: 2}
    // call apply bind 传递参数
    test.call(obj,1,2,3)   
    test.apply(obj,[1,2,3])    
    test.bind(obj)(1,2,3)
	var arr = [1,2,3,4,5]
    arr.forEach(function(item,index,arr){
        console.log(this);
    },obj)
```

> ​	call apply bind 改变函数的this指向,数组,定时器等方法可以传递第二个参数指定内部的this指向(父函数可以指定子函数的this指向)   注意:只有将回调函数写成function(){}能生效 ,  this默认向外找一层脱离父函数

###  4.new 绑定

```javascript
function person(){
        this.name = "zhangsan"
        console.log(this); //person {name: 'zhangsan'}
        // return {}   // p = {}
        return this // person
    }
    var p = new person()
```

> ​	new一个实例后 this指向实例对象 但是在构造函数内可以通过return 改变 p 的内容 this依旧指向person实例对象

###  5.this 指向优先级

> ​	4>3>2>1

###  6.经典面试题

```javascript
<script>
    function Foo(){
        getName = function(){
            console.log(1);
        }
        return this
    }
    Foo.getName = function(){console.log(2);}
    Foo.prototype.getName = function(){console.log(3);}
    var getName = function(){console.log(4);}
    function getName(){console.log(5);}

    // 请写出以下输出结果
    Foo.getName(); //2
    getName(); // 4  函数声明提升,表达式覆盖函数
    Foo().getName(); //1
    getName(); //1

    new Foo.getName() // 2 
    new Foo().getName();//3<==>var obj = new Foo();obj.getName();obj为Foo的实例对象原型链查找
    new new Foo().getName() // 3 Foo()实例对象的getName对象<==>Foo.getName {}
</script>
```

