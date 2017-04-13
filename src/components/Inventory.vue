<template>
	<Row type="flex" justify="center" class="content">
		<Col span="20">
			<Table highlight-row border :context="self" :columns="columns" :data="$store.state.inventoryInformation"></Table>
		</Col>
	</Row>
</template>

<script type="text/javascript">
	let vm = {
		data:function(){
			return {
				self:this,
				columns:[
					{
						type:'index',
						width:50,
						align:'center'
					},
					{
						title:'商品名称',
						key:'name'
					},
					{
						title:'商品规格',
						key:'specification'
					},
					{
						title:'商品单位',
						key:'unit'
					},
					{
						title:'商品库存',
						key:'number'
					}
				]
			}
		},
		created:function(){
			if(this.$store.state.user===''){
				this.$router.push('/');
			}
		}
	};
	export default vm
</script>

<style scoped>
	.content{
		margin-top: 50px; 
	}
</style>