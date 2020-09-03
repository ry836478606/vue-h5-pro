// action可异步后执行mutation

import {REDUCE_COUNT} from './mutation-types';

export default {
    // 异步减少globalCount
    reduceCountAsync({commit}, payload) {
        setTimeout(() => {
            commit(REDUCE_COUNT, payload);
        }, 1000);
    },
};
