import request from '@services/request';
import {stringify} from 'qs';
import api from '@services/api';
import {format} from '@utils/index';

export async function getGroupDetails(payload) {
    return request({
        url: format(api.getGroupDetails.url, {id: payload.id}),
    });
}

// 对外访问的企业朋友圈
export async function getPublicMoments(params = {}) {
    return request({
        url: `${api.getPublicMoments.url}?${stringify(params)}`,
    });
}

// 创建朋友圈
export async function createMoment(payload) {
    return request({
        url: api.createMoment.url,
        method: api.createMoment.method,
        data: payload.body,
    });
}
