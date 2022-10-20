let x = [1,2,3,[4,5,6]]
let newArr = []
let count = 0
do{
    count = 0
    for(var i = 0;i<x.length;i++){
        if(typeof x[i] !== 'number'){
            newArr.push(x[i])
        }else{
            newArr.push(...x[i])
            count++
        }
    }
    x = newArr
    newArr = []
}while(count>1)
console.log(newArr);