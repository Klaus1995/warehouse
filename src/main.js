// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)

//设置Vue的原型ajax方法  $http
Vue.prototype.$http = axios
Vue.prototype.$Clear = function(obj){
	for(let key in obj){
    if(typeof obj[key]==='string'){
      obj[key] = '';
    }else if(typeof obj[key]==='number'){
      obj[key] = 0;
    }else if(typeof obj[key]==='object'){
      obj[key] = new Date();
    }
	}
}
Vue.prototype.$Copy = function (newObj, oldObj) {
    for (let key in oldObj) {
        var prop = oldObj[key];
        if (typeof prop === 'object') {
            if (Object.prototype.toString.call(prop) === '[object Array]'){
                newObj[key] = newObj[key] || [];
                deepCopy(newObj[key],prop);
            }else{
                newObj[key] = newObj[key] || {};//如果新对象有定义属性则保留下来
                deepCopy(newObj[key],prop);//递归，向下拷贝
            }
        }else{
            newObj[key] = prop;
        }
    }
    return newObj;
}

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
