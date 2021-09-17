<template>
  <div class="stati">
    <header>
      <ul>
        <li :class="{'income': !income}" @click="income = false">支出</li>
        <li :class="{'income': income}" @click="income = true">收入</li>
      </ul>
    </header>
    <!-- 支出和收入对应显示的内容 -->
    <div class="list-box burst-view">
      <div class="expend-box" v-if="!income">
        <!-- 判断记录是否为空。true就是空，就显示empty -->
        <div class="empty" v-if="list">
          <span>目前没有相关记录</span>
        </div>
        <div class="list" v-else>
          <h3>
            <span>总支出</span>
            <span>￥{{expendTotal}}</span>
          </h3>
          <ul class="list-li">
            <li
              v-for="(item,index) in expendList" 
              :key="'list'+index" 
            >
              <span :title="item.label">{{item.label}}</span>
              <span :title="item.remarks">{{item.remarks}}</span>
              <span :title="item.number">￥{{item.number}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="income-box" v-else>
        <div class="empty" v-if="list">
          <span>目前没有相关记录</span>
        </div>
        <div class="list" v-else>
          <h3>
            <span>总收入</span>
            <span>￥{{incomeTotal}}</span>
          </h3>
          <ul class="list-li">
            <li
              v-for="(item,index) in incomdeList" 
              :key="'list'+index" 
            >
              <span :title="item.label" class="burst-view">{{item.label}}</span>
              <span :title="item.remarks" class="burst-view">{{item.remarks}}</span>
              <span :title="item.number" class="burst-view">￥{{item.number}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
  data(){
    return {
      income: false,
      list: false
    }
  },
  computed: {
    ...mapState(['labelArr','labelList','total']),
    ...mapGetters(['expendList','incomdeList','expendTotal','incomeTotal'])
  },
  methods: {
    ...mapMutations(['totalCount'])
  },
  created(){
    this.totalCount();
  },
}
</script>


<style lang="less" scoped>
// @media scroll and (min-device-height: 560px){
//   .list-box{
//     position: absolute;
//     top: 54px;
//     left: 0;
//   }
// }
@min-hei: 52px;
.stati{
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
}
/* 顶部两个标签 */
header{
  width: 100%;
  height: 72px;
  background-color: #f5f5f5;
  position: relative;
}
header ul{
  width: 100%;
  height: 72px;
  position: fixed;
  background-color: #f5f5f5;
}
header li{
  width: 50%;
  height: 100%;
  font-size: 24px;
  display: inline-flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
}
.income{
  background-color: #fff;
}
/* 显示的列表 */
.list-box{
  width: 100%;
  height: calc(100%-72px);
  height: -webkit-calc(100%-72px);
  height: -moz-calc(100%-72px);
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  z-index: 9;
  flex: 1 1 auto;
}
.empty{
  width: 100%;
  height: 10%;
  text-align: center;
  padding: 15px 0;
}
.empty span{
  width: 100%;
  height: 10%;
  min-height: 36px;
}
.list{
  width: 100%;
  height: 90%;
	/* overflow: hidden;
	overflow-y: scroll; */
  box-sizing: border-box;
}
.list h3{
  width: 100%;
  height: 28px;
  min-height: 28px;
  padding: 10px 0;
  display: flex; 
  font-weight: normal;
}
.list h3 span{
  width: 50%;
  height: 28px;
  min-height: 28px;
  margin: 0 20px;
}
.list h3 span:nth-child(1){
  text-align: left;
}
.list h3 span:nth-child(2){
  text-align: right;
}
.list-li li{
  background-color: #fff;
  box-sizing: border-box;
  padding: 5px 5px;
  // margin: 5px 0;
  /* border: 1px solid #999999; */

  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
}
.list-li li span::-webkit-scrollbar{
  display: none;
}
.list-li li span{
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
	/* overflow: hidden; */
	overflow-x: scroll;
}
.list-li li span:nth-child(1){
  display: flex;
  justify-content: center;
  // border-right: 1px solid #c4c4c4;
  margin: 0 5px;
  flex: 2;
}
.list-li li span:nth-child(2){
  /* margin: 0 10px; */
  margin: 0 5px;
  color: #999999;
  flex: 6;
}
.list-li li span:nth-child(3){
  // border-left: 1px solid #c4c4c4;
  margin-left: 5px;
  flex: 2;
}
</style>