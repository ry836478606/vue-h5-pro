<template>
    <div class="main">
        <h1>该登录接口是mock的</h1>
        <div class="cont">
            <div class="row">
                <input v-model="account" type="text" maxlength="10" placeholder="请输入账号" />
            </div>
            <div class="row">
                <input v-model="password" type="password" maxlength="20" placeholder="请输入密码" />
            </div>
            <button type="button" @click="handleLogin">登录</button>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
import {setTokenForStorage} from '@utils/index';
// import router from '@router/index';

export default {
    name: 'Login',
    data() {
        return {
            account: 'xmp',
            password: 123456,
        };
    },
    components: {},
    created: async function () {},
    methods: {
        handleLogin: function () {
            const {account, password} = this;
            const {query = {}} = this.$route;

            if (account && password) {
                setTokenForStorage('xmp_token');
                if (query.redirect) {
                    this.$router.push(query.redirect);
                } else {
                    this.$router.push('/');
                }
            } else {
                Toast('账号密码不能为空');
            }
        },
    },
};
</script>

<style scoped lang="less">
@import './index';
</style>
