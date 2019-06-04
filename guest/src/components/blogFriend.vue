<template>
  <div class="page">
    <div class="blogs">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in tableData" :key="item.id">
          <div class="grid-content bg-purple">
            <div>{{item.name}}</div>
            <img width="80px" height="100px" :src="formart(item)" alt="">
            <div>
              <span>送花
                <img class="icon-img" src="../../static/img/x4.gif" alt="">
              </span>
              <span>加好友
                <img class="icon-img" src="../../static/img/x2.gif" alt="">
              </span>
            </div>
            <div>
              <span>留言
                <img class="icon-img" src="../../static/img/x3.gif" alt="">
              </span>
              <span>发消息
                <img @click="setMssage(item)" class="icon-img" src="../../static/img/x1.gif" alt="">
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-col :span="24" class="toolbar">
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="limit"
        :current-page="page"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
    <message-dialog :messageData='messageData' @close='closeDialog' :dialogShow='messageDialog'></message-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import store from '../vuex/store'
import messageDialog from './dialogs/message'
export default {
  name: "",
  data() {
    return {
      limit: 18,
      page: 1,
      total: 0,
      tableData:[],
      messageDialog:false,
      messageData:{
        formName:'',
        toName:''
      }
    };
  },
  components: {
    messageDialog
  },
  computed:{
    formart:function () {
      return function(item){
        if(item.face){
          return store.state.baseUrl+'/data'+item.face;
        }else{
          return require('../../static/img/defaultphoto.png');
        }

      }
    }
  },
  mounted(){
    this.getList();
  },
  methods: {
    closeDialog(formName){
      this[formName] = false;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    getList(){
      this.https({
        url:'/blog',
        type:'get',
        data:{
          page:this.page,
          limit:this.limit,
          name:localStorage.getItem('name')
        },
      }).then(res=>{
          this.total = res.data.total;
          this.tableData = res.data.data;
      },err=>{

      })
    },
    setMssage(item){
      this.messageData.formName = localStorage.getItem('name');
      this.messageData.toName = item.name;
      this.messageDialog = true;
    }
  }
};
</script>

<style scoped>
.page {
  height: 100%;
  padding: 0 20px 20px;
  box-sizing: border-box;
}
.blogs {
  height: calc(100% - 20px);
}

.blogs .el-row {
  margin-bottom: 20px;
  height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
.blogs .el-col {
  border-radius: 4px;
  height: 30%;
  margin-top: 20px;
}
.blogs .bg-purple-dark {
  background: #99a9bf;
}
.blogs .bg-purple {
  background: #d3dce6;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
}
.blogs .bg-purple img{
  margin-top: 10px;
}
.blogs .bg-purple-light {
  background: #e5e9f2;
}
.blogs .grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 100%;
}
.blogs .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.blogs .bg-purple .icon-img{
  width:18px;
  height: 18px;
  cursor: pointer;
}
</style>
