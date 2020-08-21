module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-pxtorem': {
            'rootValue': 75, // 设计稿宽度的1/10（我常用设计稿：750px）
            'propList': ['*'] // 需要做转化处理的属性
        }
    }
}
