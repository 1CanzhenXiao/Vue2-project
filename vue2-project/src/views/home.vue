<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/XCZ.jpg" alt="">
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2023-1-1</span></p>
                    <p>上次登录地点：<span>汕头</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;">
                <el-table :data="tableData" style="width: 100%" height="260">
                    <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" width="140" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <el-card style="height: 280px;">
                <div ref="charts1" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card class="g1" style="height: 310px;">
                    <div ref="charts2" style="height: 310px;"></div>
                </el-card>
                <el-card class="g2" style="height: 310px;">
                    <div ref="charts3" style="height: 310px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '书名',
                writer: '作者',
                date: '出版日期',
                press: '出版社',
                situation: '状态',
            }
        }
    },
    mounted() {
        getData().then(({ data }) => {
            const { tableData } = data.data
            this.tableData = tableData
            const charts1 = echarts.init(this.$refs.charts1)
            var option1 = {}
            const { orderData,userData,videoData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }
            option1.xAxis = xAxisData
            option1.yAxis = {}
            option1.legend = xAxisData
            option1.series = []
            xAxis.forEach(key => {
                option1.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            charts1.setOption(option1)

            const charts2 = echarts.init(this.$refs.charts2)
            const option2 = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: "bar"
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: "bar"
                    }
                ],
            }
            charts2.setOption(option2)

            const charts3 = echarts.init(this.$refs.charts3)
            const option3 = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
            charts3.setOption(option3)
        })
    }
}
</script>
<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
    }
}

.user-info {
    .name {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .access {
        color: #9999;
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #9999;

        span {
            color: #9999;
            margin-left: 60px;
        }
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .g1 {
        width: 48%;
    }
    .g2 {
        width: 48%;
    }
}
</style>