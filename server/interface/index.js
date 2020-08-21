import http from './fetchHttp'

export const getProjectList = (data) => {
    return http.request('/cys/project/list', data)
}