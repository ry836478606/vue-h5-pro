<template>
  <div class="main">
    <div class="allCount">总数据rows_found：{{ total }}</div>

    <!--
			尽量在接口请求完再去渲染“BetterScroll”；
			不然可能在接口还未请求完，“BetterScroll”已经初始化完成，高度没随着数据变化，不能滚动
		-->
    <BetterScroll
      v-if="dataList.length"
      wrapperClass="scrollWrapper"
      v-bind:scroll-opt="{ pullUpLoad: true, pullDownRefresh: true }"
      v-bind:fetchPullUp="fetchData"
      v-bind:fetchPullDown="initFetch"
      v-bind:botTipText="botTipText"
    >
      <div v-for="(item, index) of dataList" :key="index" class="item">
        {{ index }} - {{ item.moment.content }}
      </div>
    </BetterScroll>

    <div v-else class="noList">
      <div>暂无数据</div>
      <img class="img" alt="Vue logo" src="~@assets/logo.png" />
    </div>

    <div class="other">其他元素-不影响滚动</div>
  </div>
</template>

<script>
import { getPublicMoments } from "@services";
import BetterScroll from "@components/better-scroll";

// data-初始化数据
const initData = () => {
  return {
    dataList: [], // 列表数据
    pageSize: 10, // 分页大小
    page: 1, // 当前页码
    total: 0, // 列表总数
    isCanFetch: true // 是否可请求
  };
};

export default {
  name: "ScrollPage",
  components: {
    BetterScroll
  },
  data() {
    return {
      ...initData()
    };
  },
  computed: {
    botTipText() {
      const { dataList, isCanFetch } = this;
      let txt = "";

      if (dataList.length && !isCanFetch) {
        txt = "加载完毕~";
      }
      return txt;
    },
    nextOffset() {
      return (this.page - 1) * this.pageSize;
    }
  },
  mounted: function() {
    this.initFetch();
  },
  methods: {
    // 初始化请求
    async initFetch() {
      this.data = { ...this.data, ...initData() };

      this.isCanFetch = true;
      const {
        data,
        pagination: { rows_found }
      } = await getPublicMoments({
        mark: "ODk4NDE2NjQ%3D",
        offset: 0,
        limit: this.pageSize
      });
      this.dataList = data;
      this.page = 2;
      this.total = rows_found;

      // 这里直接写“this.nextOffset”，而不在上面解构“nextOffset”；
      // 是因为“nextOffset”是“page”和“pageSize”的计算属性，上面的this.page = 2，在结构下面
      // 拿到的还是之前的“nextOffset”
      if (rows_found < this.nextOffset) {
        this.isCanFetch = false;
      }
    },
    // 请求分页数据
    async fetchData() {
      if (this.isCanFetch) {
        const { total, pageSize, dataList = [], nextOffset } = this;

        if (nextOffset < total) {
          const {
            data,
            pagination: { rows_found }
          } = await getPublicMoments({
            mark: "ODk4NDE2NjQ%3D",
            offset: nextOffset,
            limit: pageSize
          });
          this.dataList = dataList.concat(data);
          this.page++;
          this.total = rows_found;
        } else {
          this.isCanFetch = false;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index";
</style>
