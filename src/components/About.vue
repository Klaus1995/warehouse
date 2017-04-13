<template>
	<div style="text-align:center">
		<h1>关于</h1>
		<p>作者：Klaus</p>
		<p>破东西就写的贼难受。。。</p>
		<img src="../assets/debug.jpg" height="848" width="600">
	</div>
</template>

<script type="text/javascript">
	let vm = {
		created:function(){
			if(this.$store.state.user===''){
				this.$router.push('/');
			}
		}
	};
	export default vm
</script>