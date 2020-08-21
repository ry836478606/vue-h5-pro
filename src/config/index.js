const config = require(`./${process.env.VUE_APP_PRO_ENV}.js`).default

export default {
    apiHost: '',
    ...config,
}
