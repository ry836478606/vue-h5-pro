<template>
    <div class="main">
        <div class="globalWrapper">
            <div class="item" style="font-weight: bold">global-data：</div>
            <div class="item">count：{{ count }}</div>
            <div class="item">countAlias：{{ countAlias }}</div>

            <div class="item">countPlusLocalCount：{{ countPlusLocalCount }}</div>
            <div class="item" style="font-weight: bold">global-getter：</div>
            <div class="item">doneTodosCount：{{ doneTodosCount }}</div>
            <div class="item">doneTodos.length：{{ doneTodos.length }}</div>

            <!--通过commit来触发mutation-->
            <div class="item" style="font-weight: bold">
                add-globalCount-by-mutation1：<button @click="addCount">click</button>
            </div>

            <!--通过commit来触发mutation-->
            <div class="item" style="font-weight: bold">
                add-globalCount-by-mutation2：<button @click="addCountByMutation({amount: 1})">
                    click
                </button>
            </div>

            <!--通过action-dispatch来触发mutation-->
            <div class="item" style="font-weight: bold">
                reduce-globalCount-by-action：<button @click="addCountByAction">click</button>
            </div>
        </div>
        <div class="title">群详情：</div>
        <div class="cont">
            <div class="row">
                <div class="label">群名称：</div>
                <div class="text">{{ data.name }}</div>
            </div>
            <div class="row">
                <div class="label">群主：</div>
                <div class="text">{{ data.owner }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
import {getGroupDetails} from '@services/index';

const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('moduleA');

export default {
    name: 'About',
    data() {
        return {
            data: {},
            localCount: 1,
        };
    },
    created: async function () {
        const res = await getGroupDetails({id: 250});
        if (res) {
            this.data = res.data;
        }
    },
    methods: {
        // 将 `this.addCountByMutation(payload)` 映射为 `this.$store.commit('ADD_COUNT', payload)`
        ...mapMutations({
            addCountByMutation: 'ADD_COUNT',
        }),
        // 将 `this.reduceCountAsync(payload)` 映射为 `this.$store.dispatch('reduceCountAsync', payload)`
        ...mapActions({
            reduceCountAsync: 'reduceCountAsync',
        }),
        // 触发全局的globalCount+1
        addCount: function () {
            this.$store.commit('moduleA/ADD_COUNT', {amount: 1});
        },
        // 触发全局的globalCount-10
        addCountByAction: function () {
            this.$store.dispatch('moduleA/reduceCountAsync', {amount: 10});
        },
    },
    // computed: {
    //     count() {
    //         return this.$store.state.globalCount
    //     }
    // },
    computed: {
        ...mapState({
            count: (state) => state.globalCount,
            // 传字符串参数 'globalCount' 等同于 `state => state.globalCount`
            countAlias: 'globalCount',
            countPlusLocalCount(state) {
                return state.globalCount + this.localCount;
            },
            doneTodosCount: (state, getters) => this.getters.doneTodosCount(state, getters),
        }),
        // store中计算好的属性：类似store的computed
        ...mapGetters(['doneTodos', 'doneTodosCount']),
    },
    getters: {
        doneTodosCount: (state, getter) => getter.doneTodos.length || 0,
    },
};
</script>

<style lang="less" scoped>
@import './index';
</style>
