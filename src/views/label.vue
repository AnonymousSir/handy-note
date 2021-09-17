<template>
  <div class="label">
    <div class="list">
      <ul>
        <li v-for="(item,index) in labelArr" @click="edit(item,index)" :key="'item'+index">
          <span>{{item.name}}</span>
          <span class="iconfont">&#xe665;</span>
        </li>
      </ul>
    </div>
    <div class="btn">
      <button @click="addLabelShow = true">新建标签</button>
    </div>
    <add-label v-show="addLabelShow" @cansel="(data) => addLabelShow=data"></add-label>
    <edit-label 
      :index="index" 
      :labelName="labelName" 
      v-show="editShow" 
      @close="editShow = false"
      ></edit-label>
  </div>
</template>

<script>
import addlabel from '@/components/addLabel.vue'
import editlabel from '@/components/editLabel.vue'
import { mapState } from 'vuex'
export default{
  data(){
    return {
      addLabelShow: false,
      editShow: false,
      index: 0,
      labelName: ''
    }
  },
  computed: {
    ...mapState(['labelArr']),
  },
  components: {
    'add-label' : addlabel,
    'edit-label' : editlabel
  },
  methods: {
    edit(item,index){
      this.editShow = true;
      this.index = index;
      this.labelName = this.labelArr[index].name
    }
  }
}
</script>


<style scoped>
/* 标签列表 */
.list{
  background-color: #fff;
}
.list ul{
  padding-left: 15px;
}
.list ul li{
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list li span{
  width: 100%;
}
.list li span:nth-child(1){
  text-align: left;
}
.list li span:nth-child(2){
  text-align: right;
  margin-right: 10px;
}
/* 新建标签 */
.btn{
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.btn button{
  border: none;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #767676;
  padding: 10px;
  border-radius: 5px;
}
</style>