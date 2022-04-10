module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/multi-word-component-names': 0, //vue 组件必须复数命名
    'prefer-promise-reject-errors': 0,
    'standard/no-callback-literal': 0, // 允许回调函数
    'vue/html-indent': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-expressions': 0,
    'semi': [2, 'never'],
    indent: [2, 2], // 对齐校验
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [2, { code: 120 }]
  }
}
