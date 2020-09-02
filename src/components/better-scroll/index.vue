<template>
	<div
		v-bind:class="[wrapperClass ? wrapperClass : '', 'wrapper']"
		ref="scrollRef"
	>
		<div class="content">
			<!--<div class="pulldownWrapper">
				<div v-show="beforePullDown">
					<span>下拉刷新</span>
				</div>
				<div v-show="!beforePullDown">
					<div v-show="isPullingDown">
						<span>Loading...</span>
					</div>
					<div v-show="!isPullingDown">
						<span>刷新成功</span>
					</div>
				</div>
			</div>-->

			<slot></slot>

			<div class="botTip">
				<div v-if="botTipText && !isPullingUp">{{ botTipText }}</div>
				<div v-if="isPullingUp">Loading...</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll";

// eslint-disable-next-line no-unused-vars
let timer = null;

export default {
  name: "BScrollComponent",
  props: {
    scrollOpt: {
      // better-scroll的参数
      type: Object,
      default: () => {
        return {
          pullUpLoad: false, // 是否开启上拉加载
          pullDownRefresh: false // 下拉刷新
        };
      }
    },
    fetchPullUp: {
      // 上拉加载请求
      default: () => {}
    },
    fetchPullDown: {
      // 下拉刷新请求
      default: () => {}
    },
    botTipText: {
      // 底部提醒文字
      type: String,
      default: ""
    },
    wrapperClass: {
      // 类名
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isPullingUp: false, // 是否显示上拉加载
      isPullingDown: false, // 是否显示下拉刷新
      beforePullDown: true // 是否显示下拉之前的提示
    };
  },
  mounted: function() {
    this.initBScroll();
  },
  // beforeDestroy: function () {
  //     this.scrollIns.destroy()
  //     clearTimeout(timer)
  // },
  methods: {
    // 初始化BScroll
    initBScroll() {
      const { scrollOpt, fetchPullUp, fetchPullDown } = this;
      const { pullUpLoad, pullDownRefresh } = scrollOpt;

      this.scrollIns = new BScroll(this.$refs.scrollRef, {
        pullUpLoad,
        pullDownRefresh,
        scrollY: true
      });

      // 上拉加载更多
      if (pullUpLoad) {
        this.scrollIns.on("pullingUp", async () => {
          try {
            this.isPullingUp = true;
            // 请求数据
            await fetchPullUp({ closePullUp: this.scrollIns.closePullUp });
          } finally {
            // 主动触发finishPullUp后，下次才可再次触发“pullingUp”事件
            this.isPullingUp = false;
            this.scrollIns.finishPullUp();
            this.scrollIns.refresh();
          }
        });
      }

      // 下拉刷新
      if (pullDownRefresh) {
        this.scrollIns.on("pullingDown", async () => {
          try {
            this.beforePullDown = false;
            this.isPullingDown = true;
            // 请求数据
            await fetchPullDown({
              closePullDown: this.scrollIns.closePullDown
            });
          } finally {
            this.isPullingDown = false;
            this.scrollIns.finishPullDown();
            this.scrollIns.refresh();
            timer = setTimeout(() => {
              this.beforePullDown = true;
            }, 500);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "index";
</style>
