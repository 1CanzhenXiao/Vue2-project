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
            name: mock.Random.ctitle(),
            writer: mock.Random.cname(),
            press: mock.mock('@city 人民出版社'),
            date: mock.Random.date(),
            situation: mock.Random.integer(0,1),
        })
    )
}

export default {
    /**
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
    */
    getBooksList: config => {
        const {name, page = 1, limit = 20} = param2Obj(config.url)
        const mockList = List.filter(books => {
            if (name && books.name.indexOf(name) === -1 && books.press.indexOf(name) === -1) return false
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
     * @param name, press, writer, date, situation
     * @return {{code: number, data: {message: string}}}
    */
    createBooks: config => {
        const {name,press,date,situation,writer} = JSON.parse(config.body)
        List.unshift({
            id: mock.Random.guid(),
            name: name,
            press: press,
            date: date,
            writer: writer,
            situation: situation
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
    deleteBooks: config => {
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
     * @param id, name, press, date, writer, situation
     * @return {{code: number, data: {message: string}}}
    */
    updateBooks: config => {
        const {id, name, press, date, writer, situation} = JSON.parse(config.body)
        const situation_num = parseInt(situation)
        List.some(u => {
            if (u.id === id) {
                u.name = name,
                u.press = press,
                u.date = date,
                u.situation = situation_num,
                u.writer = writer
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