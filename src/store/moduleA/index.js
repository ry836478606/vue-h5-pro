// 分store的命名空间模块

import mutations from './mutations'
import actions from './actions'

export const moduleA = {
    namespaced: true,
    state: {
        globalCount: 0,
        todos: [
            {id: 1, text: 'todo111', done: true},
            {id: 2, text: 'todo222', done: false},
        ]
    },
    // 可以理解为：store的计算属性
    getters: {
        doneTodos: (state) => (state.todos.filter(todo => todo.done)),
        doneTodosCount: (state, getters) => (getters.doneTodos.length || 0),
    },
    // 突变处理事件，通过store.commit('addCount')触发突变
    mutations: {
        ...mutations,
    },
    // 可以在action里面执行异步操作后，在执行mutation
    actions: {
        ...actions,
    },
    modules: {
    }
}
