<template>
<div>
  <nav>
    <ul>
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/BasicInformation">基本信息</router-link></li>
      <li><router-link to="/InventoryManagement">库存管理</router-link></li>
      <li><router-link to="/InformationQuery">信息查询</router-link></li>
      <li><router-link to="/UserManagement">用户管理</router-link></li>
      <li><router-link to="/About">关于</router-link></li>
    </ul>
  </nav>
  <router-view></router-view>
</div>
</template>

<style type="text/css">
  ul:after{
    display: table;
    clear: both;
    content: '';
  }
  li{
    display: block;
    height: 30px;
    width: 100px;
    float: left;
  }
</style>