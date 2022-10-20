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