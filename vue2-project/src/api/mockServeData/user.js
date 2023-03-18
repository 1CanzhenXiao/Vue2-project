import mock from 'mockjs'

function param2Obj (url) {
    const search = url.split('?')[1]
    if(!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i=0; i<count; i++) {
    List.push(
        mock.mock({
            id: mock.Random.guid(),
            name: mock.Random.cname(),
            addr: mock.mock('@county(true)'),'age|18-60':1,
            birth: mock.Random.date(),
            sex: mock.Random.integer(0,1),
            email: mock.Random.email()
        })
    )
}

export default {
    /**
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
    */
    getUserList: config => {
        const {name, page = 1, limit = 20} = param2Obj(config.url)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page-1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * @param name, addr, birth, sex
     * @return {{code: number, data: {message: string}}}
    */
    createUser: config => {
        const {name,addr,birth,sex, email} = JSON.parse(config.body)
        List.unshift({
            id: mock.Random.guid(),
            name: name,
            addr: addr,
            birth: birth,
            sex: sex,
            email: email
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    /**
     * @param id
     * @return {*}
    */
    deleteUser: config => {
        const {id} = JSON.parse(config.body)
        if(!id){
            return {
                code: -999,
                message: '参数不正确'
            }
        }else {
            List = List.filter(u => u.id !== id)
            return{
                code: 20000,
                data: {
                    message: '删除成功'
                }
            }
        }
    },
    /**
     * @param id, name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
    */
    updateUser: config => {
        const {id,name,addr,age,birth,sex,email} = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name,
                u.addr = addr,
                u.age = age,
                u.birth = birth,
                u.sex = sex_num,
                u.email = email
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    },
    /**
     * @param config
     * @return {{code: number, data: {message: string}}}
    */
    batchremove: config => {
        let {ids} = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u, id))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    }
}