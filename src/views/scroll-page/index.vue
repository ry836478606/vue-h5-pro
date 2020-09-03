<template>
    <div class="main">
        <div class="allCount">总数据rows_found：{{ total }}</div>

        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div v-for="(item, index) of dataList" :key="index" class="item">
                    {{ index }} - {{ item.moment.content }}
                </div>
                <div class="tip">
                    <div v-if="!isPullUpload">可加载更多</div>
                    <div v-else>Loading...</div>
                </div>
            </div>
        </div>

        <div class="other">其他元素-不影响滚动</div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import {getPublicMoments} from '@services';

export default {
    name: 'ScrollPage',
    data() {
        return {
            isPullUpload: false, // 是否显示上拉加载的loading
            dataList: [], // 列表数据
            pageSize: 10, // 分页大小
            page: 1, // 当前页码
            total: 0, // 列表总数
            isCanFetch: true, // 是否可请求
        };
    },
    mounted: async function () {
        await this.fetchData(true);
        this.initBScroll();
    },
    methods: {
        // 请求分页数据
        async fetchData(isInitFetch = false) {
            const nextOffset = (this.page - 1) * this.pageSize;
            const {total, pageSize, dataList} = this;

            if (isInitFetch || nextOffset < total) {
                const {
                    data,
                    pagination: {rows_found},
                } = await getPublicMoments({
                    mark: 'ODk4NDE2NjQ%3D',
                    offset: nextOffset,
                    limit: pageSize,
                });
                this.dataList = [...dataList].concat(data);
                this.page++;
                this.total = rows_found;
            } else {
                this.bscroll.closePullUp();
                this.isCanFetch = false;
            }
        },
        // 初始化BScroll
        initBScroll() {
            this.bscroll = new BScroll(this.$refs.wrapper, {
                pullUpLoad: true,
            });

            this.bscroll.on('pullingUp', this.pullUploadHandler);
        },
        async pullUploadHandler() {
            if (this.isCanFetch) {
                console.log('pullingUp');
                this.isPullUpload = true;

                // 请求数据
                await this.fetchData();

                // 主动触发finishPullUp后，下次才可再次触发“pullingUp”事件
                this.bscroll.finishPullUp();
                this.bscroll.refresh();

                this.isPullUpload = false;
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import './index';
</style>
