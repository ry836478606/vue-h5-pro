<template>
    <div class="main">
        <div class="cont">
            <div class="logoWrapper">
                <img class="logoImg" alt="Vue logo" src="~@assets/logo.png" />
            </div>

            <HelloWorld msg="以下是我发表的朋友圈文本：" />

            <div class="list">
                <div v-for="(item, index) in moments" :key="index" class="item">
                    <div class="serial">{{ index }}：</div>
                    <div class="text">{{ item.moment.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getPublicMoments} from '@services/index';
import HelloWorld from '@business/HelloWorld.vue';

export default {
    name: 'Home',
    data() {
        return {
            moments: [],
        };
    },
    components: {
        HelloWorld,
    },
    created: async function () {
        try {
            const res = await getPublicMoments({offset: 0, limit: 10, mark: 'ODk4NDE2NjQ%3D'});
            console.log(res.data);
            this.moments = res.data;
        } catch (e) {
            // 获取请求错误：是返回整个e.response，服务端的返回内容在response.data中
            console.log('e.response.data', e.response.data);
        }
    },
};
</script>

<style scoped lang="less">
@import './index';
</style>
