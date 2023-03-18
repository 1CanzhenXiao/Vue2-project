<template>
    <div>
        <el-container>
            <el-aside width="auto"><common_aside/></el-aside>
            <el-container>
                <el-header><common_header/></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import common_aside from '../components/aside.vue' 
    import common_header from '../components/header.vue' 

    export default {
        data(){
            return {}
        },
        components: {
            common_aside,
            common_header,
        }
    }
</script>

<style scoped>
    .el-header {
        padding: 0;
    }
    .el-aside {
        padding: 0 !important;
    }
</style>