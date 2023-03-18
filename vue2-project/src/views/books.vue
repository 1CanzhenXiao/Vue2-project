<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="书名" prop="name">
                    <el-input placeholder="请输入书名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="作者名" prop="writer">
                    <el-input placeholder="请输入作者名" v-model="form.writer"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="situation">
                    <el-select v-model="form.situation" placeholder="请选择">
                        <el-option label="可看" :value="1"></el-option>
                        <el-option label="不可看" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出版日期" prop="date">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择出版时间" value-format="yyyy-MM">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出版社" prop="press">
                    <el-input placeholder="请输入出版社" v-model="form.press"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit" style="background-color: #1c8056;">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary" style="background-color: #1c8056;">
                + 新增
            </el-button>
            <el-form :inline="true" :model="booksForm"> 
                <el-form-item>
                    <el-input placeholder="请输入书名" v-model="booksForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="background-color: #1c8056;">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-tabel">
            <el-table stripe :data="tableData" style="width: 95%" height="100%">
                <el-table-column prop="name" label="书名" width="150">
                </el-table-column>
                <el-table-column prop="writer" label="作者名" width="100">
                </el-table-column>
                <el-table-column prop="date" label="出版日期" width="180">
                </el-table-column>
                <el-table-column prop="press" label="出版社" width="220">
                </el-table-column>
                <el-table-column prop="situation" label="状态" width="100">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px;">{{ scope.row.situation == 1 ? '可看' : '不可看' }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paper">
                <el-pagination
                    layout="prev, pager, next"
                    :total = "total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getBooks, addBooks, editBooks, delBooks } from '../api'

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                writer: '',
                situation: '',
                date: '',
                press: ''
            },
            edit: {
                name: '',
                writer: '',
                press: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入书名' }
                ],
                writer: [
                    { required: true, message: '请输入作者名' }
                ],
                situation: [
                    { required: true, message: '请选择状态' }
                ],
                date: [
                    { required: true, message: '请选择出版时间' }
                ],
                press: [
                    { required: true, message: '请输入出版社' }
                ],
            },
            tableData: [],
            modalType: 0,
            total: 0,
            pageData: {
                page: 1,
                limit: 10
            },
            booksForm: {
                name: ''
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modalType === 0) {
                        addBooks(this.form).then(() => {
                            this.getList()
                        })
                    } else {
                        editBooks(this.form).then(() => {
                            this.getList()
                        })
                    }
                    this.$refs.form.resetFields();
                    this.dialogVisible = false;
                }
            })
        },
        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose()
        },
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delBooks({id: row.id}).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getList() {
            getBooks({params: {...this.booksForm, ...this.pageData}}).then(({ data }) => {
                this.tableData = data.list
                this.total = data.count || 0
            })
        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        handlePage(val){
            this.pageData.page = val
            this.getList()
        },
        onSubmit(){
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 93%;
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-tabel {
        position: relative;
        height: calc(100% - 62px);
        .paper {
            bottom: 0;
            right: 20px;
            .el-paper {
                color: #009688;
            }
        }
    }
}
</style>