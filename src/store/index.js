import Vue from 'vue';
import Vuex from 'vuex';
import {moduleA} from './moduleA';

Vue.use(Vuex);

// 分模块注册store，项目小没必要分模块
export default new Vuex.Store({
    modules: {
        moduleA: moduleA,
    },
});
