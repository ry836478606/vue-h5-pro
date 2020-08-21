module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        ["component", {
            "libraryName": "mint-ui", // mint-ui按需引入
            "style": true
        }]
    ],
}
