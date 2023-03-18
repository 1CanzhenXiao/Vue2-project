<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
    background-color="#23362f" text-color="#fff" active-text-color="#8bc34a">
    <h3>{{ isCollapse ? "后台" : "图书管理系统" }}</h3>
    <el-menu-item @click="clickmenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
        <el-menu-item @click="clickmenu(subitem)" :index="subitem.path">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item-group {
  padding-left: 0px !important;
}

.el-menu {
  height: 100vh;
  user-select: none;
  border: none;

  h3 {
    color: rgb(255, 255, 255);
    line-height: 48px;
    text-align: center;
    font-size: 17px;
    font-weight: 800;
  }
}

</style>

<script>
export default {
  data() {
    return {
      menuData: [
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
    };
  },
  methods: {
    clickmenu(item) {
      if (this.$route.path !== item.path &&
        !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>
