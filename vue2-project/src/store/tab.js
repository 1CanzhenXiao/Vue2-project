export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
            {
                path: "/books",
                name: "books",
                label: "图书管理",
                icon: "video-play",
                url: "MallManage/MallManage",
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "UserManage/UserManage",
            },
            {
                label: "其他",
                icon: "location",
                children: [
                    {
                        path: "/page1",
                        name: "page1",
                        label: "第一页",
                        icon: "setting",
                        url: "Other/PageOne",
                    },
                    {
                        path: "/page2",
                        name: "page2",
                        label: "第二页",
                        icon: "setting",
                        url: "Other/PageTwo",
                    },
                ],
            },
        ],
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            if(val.name !== 'home'){
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if(index === -1){
                    state.tabsList.push(val)                
                }
            }
        }
    },
};
