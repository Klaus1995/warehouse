import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BasicInformation from '@/components/BasicInformation'
import InformationQuery from '@/components/InformationQuery'
import InventoryManagement from '@/components/InventoryManagement'
import UserManagement from '@/components/UserManagement'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/BasicInformation',
      name: 'BasicInformation',
      component: BasicInformation
    },
    {
      path: '/InventoryManagement',
      name: 'InventoryManagement',
      component: InventoryManagement
    },
    {
      path: '/InformationQuery',
      name: 'InformationQuery',
      component: InformationQuery
    },
    {
      path: '/UserManagement',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
