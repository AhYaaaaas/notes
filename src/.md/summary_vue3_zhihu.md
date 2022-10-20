



#		vue3_zhihu

##  一.移动端项目适配

###  1.rem

1rem = fontSize px

基于HTML上的fontSize大小的单位

###  2.项目配置

####  rem布局

插件：poscss-pxtorem  amfe-flexible

作用：将项目中的所有px单位（基于rootValue）自动转换成rem单位，页面大小改变时自动改变HTML上的fontSzie大小

限制大小/留白

![zhihu](C:\Users\gxy\Desktop\md\zhihu.png)

```typescript
//utils.ts
export const setFontSize = function () {
    //ts获取元素需要指定类型位<HTMLElement>
  const HTML = document.documentElement,
      app =<HTMLElement>document.querySelector('#app')
  const nowFontSize = parseFloat(HTML.style.fontSize)
  HTML.style.fontSize = nowFontSize > 75 ? '75px' : nowFontSize + 'px';
  app.style.maxWidth = nowFontSize > 75 ? '750px' : '100%';
    //app需要设置居中  margin:0 auto
}

//main.ts
setFontSize()
window.addEventListener('resize',setFontSize)
```

####  日期格式化

```typescript
//注意正则的使用
export const formateDate = function (
  nowDate: string | null,
  template: string | null
): string | Error {
  if (nowDate == null) nowDate = new Date().toLocaleDateString();
  if (template == null) template = "{0}年{1}月{2}日";
  let arr = nowDate.match(/^(\d{4})(\d{2})(\d{2})$/) || nowDate.match(/\d+/g);
  if (arr && arr[0] === nowDate) arr.shift();
  if (!arr) {
    return Error("time error");
  }
  return template.replace(/\{(\d+)\}/g, (_, item) => {    
    item = (arr && arr[item]) ? arr[item] : "00";
    return item;
  });
};
```

####  ts版axios配置

需要制定返回数据的类型

config.ts

```typescript
export const urls
export interface IResponseDataType
export type url = keyof typeof urls
```

eg:

```typescript
/**
 * @description: story 结构
 * @return {*}
 */
export interface story{
  "image_hue": string,
  "title": string,
  "url": string,
  "hint": string,
  "ga_prefix": string,
  "image": string,
  "type": number,
  "id": number
}
export const urls ={ 
  'queryNewsLates':'api/news_latest'
}
/**
 * @description: url类型,把queryNewsLates变成了类型
 * @return {*}
 */
export type url = keyof typeof urls


/**
 * @description: 当日新闻
 * @return {*}
 */
export interface Inews_latest{
  date: string,
  stories: story[],
  top_stories:story[]
}

/**
 * @description: 请求数据返回类型
 * @return {*}
 */
export interface IResponseDataType{
  'queryNewsLates'?:Inews_latest
}
```

https.ts

需要重写axios实例类型，添加两个拦截器

```typescript
interface IAxiosInstance extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<IResponseDataType>>;
  };
}
```

eg:

```typescript
/*
 * @Date: 2022-06-06 17:58:36
 * @LastEditors: xuanyi_ge xuanyige87@gmail.com
 * @LastEditTime: 2022-06-06 18:21:05
 * @FilePath: \vue3-zhihu\src\service\axios\https.ts
 */
import { IResponseDataType, url, BASE_URL, TIME_OUT } from "./config";
import axios, {
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface IAxiosInstance extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<IResponseDataType>>;
  };
}

const http: IAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
http.interceptors.request.use(req => {
  console.log(req);
  return req;
}, err => err)

http.interceptors.response.use(res => {
  return new Promise((resolve) => {
    resolve(res);
  })
}, err => err)

export default http
```

index.ts

需要注意指定返回值的类型

```typescript
<T extends url>(obj:AxiosRequestConfig & {url:T})
return new Promise<IResponseDataType[T]>
```

```typescript
/*
 * @Date: 2022-06-03 19:44:35
 * @LastEditors: xuanyi_ge xuanyige87@gmail.com
 * @LastEditTime: 2022-06-06 18:17:13
 * @FilePath: \vue3-zhihu\src\service\axios\index.ts
 */
/*
 * @Date: 2022-06-03 19:44:35
 * @LastEditors: xuanyi_ge xuanyige87@gmail.com
 * @LastEditTime: 2022-06-06 18:14:52
 * @FilePath: \vue3-zhihu\src\service\axios\index.ts
 */
import axios from './https'
import { IResponseDataType,url,urls } from './config'
import { AxiosRequestConfig } from 'axios'
export default <T extends url>(obj:AxiosRequestConfig & {url:T}) => {
  return new Promise<IResponseDataType[T]>((resolve,reject) => {
    axios<IResponseDataType[T]>({
      data: obj.data || {},
      method: obj.method || 'GET',
      responseType: obj.responseType || 'json',
      url:urls[obj.url]
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
```

####  深层样式处理

```css
/deep/  选择器
在scoped语法糖下，使样式能够影响更深层次的组件
```

####  渐变处理

```css
background: -webkit-linear-gradient(top, rgba(0,0,0,0.0), rgba(0,0,0,0.3));
或者
background:linear-gradient(to top,......)
```

####  数据冻结

冻结数据，特别是对从后端获取的大对象。减少响应式设置的开销

Object.freeze()

####  监听dom元素出现

```typescript
onMounted(() => {
  let ob = new IntersectionObserver(async (changes) => {
	// do something
  })
  //开启监听
  loaderMore.value && ob.observe(loaderMore.value)
})
```

