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
// var {value:v1,done} = reader.next()
// v1.then(value1=>{
//     var {value:v2,done} = reader.next(value1);
//     v2.then((value2)=>{
//         var {value:v3,done} = reader.next(value2)
//         v3.then((value3)=>{
//             var {value:v4,done} = reader.next(value3)
//         })
//     })
// })

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