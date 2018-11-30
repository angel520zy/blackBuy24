/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
Vue.use(ElementUI);

// 导入IView框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 注册到Vue上
Vue.use(iView);
// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)


// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios';
Vue.prototype.$axios=axios;
// 让axios携带cookie
axios.defaults.withCredentials=true;
axios.defaults.baseURL='http://111.230.232.110:8899/';
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性


// 导入 路由
import VueRouter from "vue-router";
// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入每一个页面的 组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";
import order from "./components/04.order.vue";
import login from "./components/05.login.vue";
import payMoney from "./components/06.payMoney.vue";
import paySuccess from "./components/07.paySuccess.vue";
import vipCenter from "./components/08.vipCenter.vue";


// 写路由规则
let routes = [
  {
    path: "/",
    // 重定向到 首页/index
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  // 使用动态路由匹配 传递参数
  {
    path: "/detail/:artID",
    component: detail
  },
  // 购物车的跳转
  {
    path: "/shopCart",
    component: shopCart
  },
  //登录跳转
  {
    path: "/order/:ids",
    component: order,
    meta: { checkLogin: true }
  },
  //登录跳转
  {
    path: "/login",
    component: login
  },
  
  //支付页面
  {
    path: "/payMoney/:orderId",
    component: payMoney,
    meta: { checkLogin: true }
  },
  // 支付成功
  {
    path: "/paySuccess",
    component: paySuccess,
    meta: { checkLogin: true }
  },
  // 会员中心
  {
    path: "/vipCenter",
    component: vipCenter,
    meta: { checkLogin: true }
  },
];

// 实例化路由对象
let router = new VueRouter({
  routes
});
// 导航守卫回调函数
router.beforeEach((to, from, next)=>{
  //  console.log("守卫啦");
  console.log(to)
  // if(to.path.indexOf("/order")!=-1){
    if(to.meta.checkLogin == true){
    axios.get("site/account/islogin").then(result=>{
     if(result.data.code=="nologin"){
      Vue.prototype.$Message.warning("请先登录");
      router.push('/login')
     }else{
       next();
     }
    })
  }else{
    next();
  }

})
 

// 注册全局过滤器 方便使用
// 导入 moment
import moment from 'moment';
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});
Vue.filter("shortTimePlus", value => {
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});


import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //短路运算
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{},
    isLogin:false
  },
  getters: {
    totalCount(state){
      console.log(state)
      let num=0;
      for(const key in state.cartData){
        num += state.cartData[key]
      }
      return num;
    }
  },
  mutations: {
    // increment (state) {
    //   console.log("触发了")
    //   state.count++
    // }
    add2Cart(state,obj){
      console.log(obj);
      if(state.cartData[obj.goodId]!=undefined){
       
        // state.cartData[obj.goodId]+=obj.goodNum
        // 上面那句扩写
        let oldNum = state.cartData[obj.goodId];
        oldNum += obj.goodNum;
        state.cartData[obj.goodId]=oldNum;
      }else{
        Vue.set(state.cartData, obj.goodId, obj.goodNum)
      }
      console.log(state);
    },
    updateCartData(state,obj){
      state.cartData = obj;

    },
    delGoodsById(state,id){
      Vue.delete(state.cartData, id);
    },
    changeLogin(state,isLogin){
      state.isLogin=isLogin;
    }
  }
})
//浏览器关闭保存数据
window.onbeforeunload=function(){
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
}
// 实例化Vue
new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  store,
  created(){
    axios.get("site/account/islogin").then(result=>{
      if(result.data.code=="nologin"){
       Vue.prototype.$Message.warning("请先登录");
       router.push('/login')
      }else{
       store.state.isLogin=true;
      }
     })
  }
}).$mount("#app");
