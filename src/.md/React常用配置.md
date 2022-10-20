#  Axios

##  TsetLink

https://httpbin.org

##  service->axios->index.js

```javascript
import axios from "axios"
import {BASE_URL,TIME_OUT} from "./config"
const instance = axios.create({
  baseUrl:BASE_URL,
  timeout:TIME_OUT
})

instance.interceptors.request.use((config)=>{
    console.log(config);
    return config;
},err =>{
    return err;
})

instance.interceptors.response.use((response)=>{
  return response.data;
},(err)=>{
  if(err && err.response){
    switch(err.response.status){
      case 400:
        console.log(400);
        break;
      case 404:
        console.log(404);
        break;
      case 401:
        console.log(401);
        break;
      default:
        break;
    }
  }
  return err;
})


export default instance;
```

##  service->axios->config.js

```javascript
const base_url = ""
const pro_url = ""
const BASE_URL = process.env.NODE_ENV ==="development"?base_url:pro_url;
const TIME_OUT = 5000
export {
  BASE_URL,
  TIME_OUT,
}
```

#  LazyLoad

##  LazyLoad.js

```javascript
import React from 'react';

export const LazyLoad = (componentName)=>{
  const Temp = React.lazy(()=>import(`../components/${componentName}`))
  return (
    <React.Suspense fallback = {<h1>加载中...</h1>}>
      <Temp></Temp>
    </React.Suspense>
  );
}

export default LazyLoad;
```



#  setupProxy

##  src/setupProxy.js

```javascript
const {createProxyMiddleware} = require("http-proxy-middleware")
module.exports = function(app){
  app.use(
    '/ajax',
    createProxyMiddleware({
      target:"https://i.maoyan.com",
      changeOrigin:true,
    })
  )
}

//https://i.maoyan.com/ajax/comingListci=50&limit=10&movieIds=&token=&optimus_uuid=EEEDB1//E0DA9511ECB32F258E7F60234E3D4CA7621E46469E8AA12F79B1C1CDCC&optimus_risk_level=71&optimu//s_code=10
```

#  Router

##  src/router/index.js

```javascript
import LazyLoad from "../service/LazyLoad";
import { useRoutes } from "react-router-dom";
import Redirect from "../components/Redirect";
function R(){
  const e = useRoutes([
    {
      path:"/book",
      element:LazyLoad('Book.jsx'),
      children:[
        {
          path:"jack",
          element:LazyLoad("Jack.jsx")
        },
        {
          path:"*",
          element:<Redirect to='/book'></Redirect>
        }
      ]
    },
    {
      path:"/bag",
      element:LazyLoad('Bag.jsx'),
      children:[]
    },
    {
      path:"/school",
      element:LazyLoad('School.jsx'),
      children:[]
    },
    {
      path:"/",
      element:<Redirect to="/book"></Redirect>,
      children:[]
    },
    {
      path:"*",
      element:LazyLoad("NotFound.jsx"),
      children:[]
    }
  ])
  return (
    e
  )
}
export default R
```

##  useRouteTable

包裹在HashRouter或者BrowserRouter组件里

```javascript
import React from 'react';
import R from "../Routers"
import {HashRouter} from "react-router-dom"
import Tabar from './Tabar';
function TestRouter(props) {
  return (
    <HashRouter>
      <R></R>
      <Tabar></Tabar>
    </HashRouter>
  );
}

export default TestRouter;
```

#  Redux

##  src/redux/index.js

```javascript
import { createStore } from "redux"
const reducer = (preState = {
  //default value or old value
},action)=>{
  let newState = {...preState}
  switch(action.type){
    case :
      //do something
      break;
    case :
      //do something
      break;
    default:
      break;
  }
  return newState;
}
const store = createStore(reducer)
export default store
```

##  import

```javascript
import store from "../redux";
```



##  dispatch

```javascript
store.dispatch({type:Type,payLoad:vlaue})
Type:switch actions
payLoad:delivered value
```



##  subscribe

```javascript
store.subscribe(()=>{
    // do something
})
```

##  getState

```javascript
store.getState().PropName
```

##  use vlaue

```javascript
//transform store.state to inner state
function Component(){
 const [a,setA] = useState(store.getState().PropName)
 store.subscribe(()=>{
     // when trigger action
     // do something
     //eg:
     setA(store.getState().PropName)
     //then the value changed both UI and inner state
 })
 return (
 	<h1>{a}</h1>
 )
} 
```

#  redux tooltik

react 18/replace redux

##  src/store/index

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counter from "./modules/counter";
export const store = configureStore({
  reducer:{
    counter
  }
})

export default store
```

##  src/store/modules

a file

```javascript
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../service/axios"
const counter = createSlice({
  name:"counter", // name space
  initialState:{  // init value
    count:0,
    content:{}
  },
  reducers:{     //motheds
    add(state,action){
      console.log(state,action);
      state.count++;
    },
    modifyContent(state,action){
      state.content = action.payload.payload
    }
  }
})
export const getInfo = ()=>{
  return async(dispatch,getState)=>{
    const res = await axios.get("/ajax/comingList?ci=50&limit=10&movieIds=&token=&optimus_uuid=EEEDB1E0DA9511ECB32F258E7F60234E3D4CA7621E46469E8AA12F79B1C1CDCC&optimus_risk_level=71&optimus_code=10")
    dispatch(modifyContent({payload:res}))
  }
}
export const {add,modifyContent} = counter.actions
export default counter.reducer  // .reducer
```

##  async in redux toolkit

```javascript
export const getInfo = ()=>{
  return async(dispatch,getState)=>{
    const res = await axios.get("/ajax/comingList?ci=50&limit=10&movieIds=&token=&optimus_uuid=EEEDB1E0DA9511ECB32F258E7F60234E3D4CA7621E46469E8AA12F79B1C1CDCC&optimus_risk_level=71&optimus_code=10")  // async 
    dispatch(modifyContent({payload:res}))  // mothed in reducer
  }
}
```

##  use in component

###  Provider

​	wrapper father component then in son component can use useDispatch to trigger event and use useSelector to get state

###  useDispatch

```javascript
// define dispathc use it to trigger event
const dispatch = useDispatch()

//use
dispatch(a method u nedd triggered) //eg.dispatch(add())

```

###  useSelector

```javascript
const {count} = useSelector(state => state.counter)
```



##  eg

```javascript
import React from 'react';
import store from '../store';
import {Provider,useDispatch,useSelector} from "react-redux"
import { add,getInfo } from '../store/modules/counter';
function Basic(props) {
  const dispatch = useDispatch() 
  const {count} = useSelector(state => state.counter) //getstate
  return (
    <div>
      <h1>{count}</h1>
      <button
      onClick={()=>{
        dispatch(add())
      }}
      >ADD</button>
      <button onClick={()=>{
        dispatch(getInfo())
      }}>GETINFO</button>
    </div>
  );
}

export default Basic;
```





