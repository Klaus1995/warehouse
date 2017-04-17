import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Nav from '@/components/Nav'
import Commodity from '@/components/Commodity'
import Client from '@/components/Client'
import Supplier from '@/components/Supplier'
import Enter from '@/components/Enter'
import Out from '@/components/Out'
import Inventory from '@/components/Inventory'
import ModifyPassword from '@/components/ModifyPassword'
import DeleteUser from '@/components/DeleteUser'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Nav',
      name: 'Nav',
      component: Nav,
      children:[
        {
          path: '/Commodity',
          name: 'Commodity',
          component: Commodity
        },
        {
          path: '/Client',
          name: 'Client',
          component: Client
        },
        {
          path: '/Supplier',
          name: 'Supplier',
          component: Supplier
        },
        {
          path: '/Enter',
          name: 'Enter',
          component: Enter
        },
        {
          path: '/Out',
          name: 'Out',
          component: Out
        },
        {
          path: '/Inventory',
          name: 'Inventory',
          component: Inventory
        },
        {
          path: '/ModifyPassword',
          name: 'ModifyPassword',
          component: ModifyPassword
        },
        {
          path: '/DeleteUser',
          name: 'DeleteUser',
          component: DeleteUser
        },
        {
          path: '/About',
          name: 'About',
          component: About
        } 
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
