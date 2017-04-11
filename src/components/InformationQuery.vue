<template>
	<div>
		<h1>信息查询</h1>
		<p>用户：{{$store.state.user}}</p>
		<button @click="inventoryInformationQuery">库存信息查询</button>
		<table v-if="inventoryInformationQueryFlag">
			<tr>
				<td>序号</td>
				<td>商品名</td>
				<td>商品规格</td>
				<td>商品单位</td>
				<td>总量</td>
			</tr>
			<tr v-for="(item,index) in inventory">
				<td>{{index+1}}</td>
				<td>{{item.name}}</td>
				<td>{{item.specification}}</td>
				<td>{{item.unit}}</td>
				<td>{{item.number}}</td>
			</tr>
		</table>
	</div>
</template>

<script type="text/javascript">
	let vm = {
		data:function(){
			return {
				inventory:this.$store.state.inventoryInformation,
				inventoryInformationQueryFlag:false
			};
		},
		methods:{
			inventoryInformationQuery:function(){
				if(this.$store.state.user===''){alert('请先登录');return;};
				this.inventoryInformationQueryFlag = !this.inventoryInformationQueryFlag;
			}
		}
	};
	export default vm
</script>

<style type="text/css">
table
  {
  border-collapse:collapse;
  }

table, td
  {
  border:1px solid black;
  }
</style>