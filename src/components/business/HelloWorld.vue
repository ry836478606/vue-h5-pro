<template>
	<div class="hello">
		<h1 class="title">{{ msg }}</h1>
	</div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    }
</script>

<style lang="less" scoped>
	.title{
		font-size: @font-size;
		color: @font-color;
	}
</style>
