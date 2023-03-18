import mock from 'mockjs'
import homeapi from './mockServeData/home'
import user from './mockServeData/user'
import books from './mockServeData/books'

mock.mock('/api/home/getData', homeapi.getStatisticalData)

mock.mock('/api/user/add', 'post', user.createUser)
mock.mock('/api/user/edit','post', user.updateUser)
mock.mock('/api/user/del', 'post', user.deleteUser)
mock.mock(/api\/user\/getUser/, user.getUserList)

mock.mock('/api/books/add', 'post', books.createBooks)
mock.mock('/api/books/edit','post', books.updateBooks)
mock.mock('/api/books/del', 'post', books.deleteBooks)
mock.mock(/api\/books\/getBooks/, books.getBooksList)