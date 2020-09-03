<template>
    <div id="app">
        <div class="nav">
            <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
            <router-link to="/404">404</router-link> |
            <router-link to="/use-bscroll-component">使用BScroll组件</router-link> |
        </div>

        <transition :name="direction">
            <router-view class="page" />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {};
    },
    computed: {
        // 动态设置过渡样式（设置页面左右动画切换，会出现2个页面出现在#app中，自由布局就会出现上下重叠样式；就得设置每个页面absolute，脱离自由布局）
        direction: function () {
            const currentPath = this.$route.path;
            const localRoute = (window.myVue && window.myVue.localRoute) || [];
            const index = localRoute.indexOf(currentPath);
            let tranName = '';

            if (localRoute.length === 0) {
                tranName = 'fade'; // 首页，渐显
            } else if (index >= 0) {
                tranName = 'page-back'; // 回退，右划
            } else {
                tranName = 'page-go'; // 进入新页面，左划
            }
            return tranName;
        },
    },
};
</script>

<style lang="less">
// 在main.js中引入的话，会被打包到页面组件的样式后面
@import '~@styles/global.less';

#app {
    position: relative;
    color: @font-color;
    font-size: @font-size;

    // 导航按钮
    .nav {
        height: 70px;
        padding: 20px 30px;
        line-height: 30px;
        box-sizing: border-box;
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    /*.page {
				  transition: transform 0.8s ease-in-out;
			  }

			  .fade-enter-active, .fade-leave-active {
				  transition: all 0.2s ease;
			  }
			  .fade-enter, .fade-leave-active {
				  opacity: 0;
			  }

			  .page-go-enter-active {
				  transform: translate3d(100%, 0, 0);
			  }
			  .page-go-enter-to {
				  transform: translate3d(0, 0, 0);
			  }
			  .page-go-leave-active {
				  transform: translate3d(0, 0, 0);
			  }
			  .page-go-leave-to {
				  transform: translate3d(-100%, 0, 0);
			  }

			  .page-back-enter-active {
				  transform: translate3d(-100%, 0, 0);
			  }
			  .page-back-enter-to {
				  transform: translate3d(0, 0, 0);
			  }
			  .page-back-leave-active {
				  transform: translate3d(0, 0, 0);
			  }
			  .page-back-leave-to {
				  transform: translate3d(100%, 0, 0);
			  }*/
}
</style>
