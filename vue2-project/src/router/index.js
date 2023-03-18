import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import user from '../views/user.vue'
import main from '../views/main.vue'
import books from '../views/books.vue'
import p1 from '../views/page1.vue'
import p2 from '../views/page2.vue'
import login from "../views/login.vue"


Vue.use(VueRouter)

const routes = [
    //主路由
    {
        path: '/',
        component: main,
        redirect: '/home',
        //子路由
        children: [
            { path: 'home', component: home},
            { path: 'user', component: user},
            { path: 'books', component: books},
            { path: 'page1', component: p1},
            { path: 'page2', component: p2}
        ]
    },
    {
        path:"/login",
        component: login,
    }
]

const router = new VueRouter({
    routes
})

export default router