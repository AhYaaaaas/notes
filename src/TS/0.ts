// interface house{
//     squartMetter?:number;
//     color?:string;
//     [propName:string]:any
// }

// function getOneHouse(houseType:house):{squareMetter:number,color:string}{
//     let myHouse  = {squareMetter:100,color:'white'}
//     if(houseType.squartMetter){
//         myHouse.squareMetter = houseType.squartMetter
//     }
//     if(houseType.color){
//         myHouse.color = houseType.color
//     }
//     return myHouse
// }
// let oneHouse = {color:'green'}
// console.log(getOneHouse({color:'green',mybag:'helloworld'}));
// interface myFn{
//     (num1:number,num2:number):boolean
// }
// let func:myFn = function(a,b){
//     return a>b
// }
// console.log(func(1,2));
// enum color{
//     green,red,blue,yellow
// }
// console.log(color[0]);


// interface checkCtor{
//     new (age: number,gender: string):ctorInterface  
// }
// interface ctorInterface{
//     sayName()
// }
// function createCtorEg(ctor:checkCtor,age:number,gender:string):ctorInterface{
//     return new ctor(age,gender)
// }
// class person implements ctorInterface{
//     age:number
//     gender:string
//     constructor(age,gender){
//         this.age = age
//         this.gender = gender
//     }
//     sayName(){
//         console.log('sayName');
        
//     }
// }
// let person1 = createCtorEg(person,18,'male')
// person1.sayName()


// interface myObj{
//     age:number
//     name:string
//     gender:string
// }
// let obj = {} as myObj

// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }

// function getCounter(): Counter {
//     let counter = <Counter>function (start:number) { };
//     counter.interval = 123;
//     counter.reset = function () { };
//     return counter;
// }

// let c = getCounter();
// c(10);
// c.reset();
// c.interval = 5.0;

// class person{
//     private age:number
// }
// interface prs extends person{
//     select():void
// }
// class bigPerson extends person implements prs{
//     select(): void {
        
//     }
// }
// class bigPerson implements prs{
    
//     select(): void {
        
//     }
// }
// 类型 "bigPerson" 中缺少属性 "age"，但类型 "prs" 中需要该属性。

// class person{
//     constructor(public name:string){

//     }
// }
// let p1 = new person('zhangsan')
// console.log(p1.name);

// class Greeter {
//     static standardGreeting = "Hello, there";
//     greeting: string;
//     greet() {
//         if (this.greeting) {
//             return "Hello, " + this.greeting;
//         }
//         else {
//             return Greeter.standardGreeting;
//         }
//     }
// }

// let greeter1: Greeter;
// greeter1 = new Greeter();
// console.log(greeter1.greet());

// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there!";

// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet());



// console.log(greeterMaker);


