<template>
 <div class="page">
   <div class="fl">
     <div class="new_blogs">
       <h3>新进会员</h3>
     </div>
     <div class="new_images">
       <h3>最新图片</h3>
     </div>
   </div>
   <div class="fr">
     <h3>帖子列表</h3>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 name:"",
 data() {
 return {

 }
 },
 components: {

 },
 methods: {

 }
}
</script>

<style scoped>
.page{
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.fl{
  height: 100%;
  width: 40%;
  float: left;
}

.new_blogs{
  height: 55%;
  border: 1px solid #929292;
  border-radius:5px;
}
.new_images{
  border: 1px solid #929292;
  border-radius:5px;
  margin-top: 20px;
  height: calc(45% - 24px) ;
}
h3{
  text-indent: 20px;
  color: #828282;
}
.fr{
  height: calc(100% - 2px);
  width: calc(60% - 22px);
  border: 1px solid #929292;
  border-radius:5px;
  float: right;
}
</style>
