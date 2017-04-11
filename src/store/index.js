import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


//设置store的内容
var store = new Vuex.Store({
	state:{
		user:'',
		basicInformation:'',
		inventoryInformation:'',
		inventoryManagement:''
	},
	mutations:{
	    clearAll:function(state){
	    	state.user = '';
			state.basicInformation = '';
			state.inventoryInformation = '';
			state.inventoryManagement = '';
	    }
  	}
});


export default store