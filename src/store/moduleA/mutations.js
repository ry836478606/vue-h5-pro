import {ADD_COUNT, REDUCE_COUNT} from './mutation-types';

export default {
    // 添加globalCount
    [ADD_COUNT](state, payload) {
        state.globalCount += payload.amount;
    },
    // 减少globalCount
    [REDUCE_COUNT](state, payload) {
        state.globalCount -= payload.amount;
    },
};
