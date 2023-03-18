<template>
    <div class="header">
        <div class="l-header">
            <el-button style="margin-right: 20px;" @click="handleMenu()" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-header">
            <el-dropdown>
                <span class="dropdown-link">
                    <img class="user-img" src="../assets/XCZ.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
    export default {
        data(){
            return {}
        },
        methods: {
            handleMenu(){
                this.$store.commit('collapseMenu')
            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
        }
    }
</script>
<style lang="less" scoped>
    .header {
        padding: 0 20px;
        background-color: rgb(7, 156, 131);
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .l-header {
        display: flex;
        align-items: center;
        /deep/ .el-breadcrumb__inner, /deep/ .el-breadcrumb__inner.is-link:hover {
            color: #606266;
        }
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: #fff;
        }
    }
</style>