import http from '../utils/request.js'

export const getData = () => {
    return http.get('/home/getData')
}

export const getUser = (params) => {
    return http.get('/user/getUser', params)
}

export const addUser = (data) => {
    return http.post('/user/add', data)
}

export const editUser = (data) => {
    return http.post('/user/edit', data)
}

export const delUser = (data) => {
    return http.post('/user/del', data)
}


export const getBooks = (params) => {
    return http.get('/books/getBooks', params)
}

export const addBooks = (data) => {
    return http.post('/books/add', data)
}

export const editBooks = (data) => {
    return http.post('/books/edit', data)
}

export const delBooks = (data) => {
    return http.post('/books/del', data)
}