module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "semi": 0, // 语句的分号
        "indent": [2, 4], // 缩进设置成4个space
        "no-tabs": 0,
        // "vue/script-indent": ["error", 4, { "baseIndent": 1 }], // vue文件：<script>标签内的缩进
        "vue/script-indent": 0,
        "vue/html-indent": ["error", "tab", { "baseIndent": 1 }], // vue文件：html内的缩进
        "quote-props": 0, // 引号的属性检查
        "quotes": 0, // 对象属性的引号
        'comma-dangle': 0, // 对象最后逗号
        'space-before-function-paren': 0, // 函数前面的空格
        'keyword-spacing': 0, // js语言的关键词前后的空格
        'no-trailing-spaces': ["error", { "skipBlankLines": true }], // 不允许末尾空位
        'object-curly-spacing': 0,
        'no-mixed-spaces-and-tabs': 0,
    },
    "overrides": [ // .vue文件和其他.js文件缩进冲突
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]
}
