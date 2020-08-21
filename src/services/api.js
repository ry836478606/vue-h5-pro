import config from '@config/index'

export default {
    getGroupDetails: {
        url: `${config.apiHost}/customer/api/group_chat/{id}`,
        method: 'get'
    },
    // 对外访问的企业朋友圈
    getPublicMoments: {
        url: `${config.apiHost}/profile/api/moments/public/records`,
        method: 'GET',
    },
    createMoment: {
        url: `${config.apiHost}/profile/api/moments`,
        method: 'POST',
    },
}
