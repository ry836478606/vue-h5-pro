<template>
	<div class="main">
		<div class="title">群详情：</div>
		<div class="cont">
			<div class="row">
				<div class="label">群名称：</div>
				<div class="text">{{data.name}}</div>
			</div>
			<div class="row">
				<div class="label">群主：</div>
				<div class="text">{{data.owner}}</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {getGroupDetails} from '@services/index'

    export default {
        name: 'About',
        data() {
            return {
                data: {},
            }
        },
        created: async function () {
            const res = await getGroupDetails({ id: 250 })
            if(res) {
                this.data = res.data
            }
        },
    }
</script>

<style lang="less" scoped>
	@import "./index";
</style>
