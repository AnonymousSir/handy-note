<template>
  <div class="home">
    <div class="labels">
      <div class="label burst-view">
        <ul>
          <li v-for="(item,index) in labelArr" 
          :key="index" 
          :class="{'label-done': item.done}" 
          @click="listDone(index)" 
          >{{item.name}}
          </li>
        </ul>
      </div>
      <div class="add-label">
        <button @click="addLabel = true">新增标签</button>
      </div>
    </div>
    <div class="tabs">
      <div class="remarks">
        <label for="remarks-txt">备注</label>
        <input 
          v-model="remarksTxt"
          type="text" 
          id="remarks-txt" 
          placeholder="在这里输入备注" 
          autocomplete="off"
        >
      </div>
      <div class="tab">
        <ul class="list">
          <li :class="{'income': !income}" @click="income = false">支出</li>
          <li :class="{'income': income}" @click="income = true">收入</li>
        </ul>
        <div class="txt">
          <span>{{num}}</span>
        </div>
      </div>
      <div class="keyboard">
        <button 
        v-for="(item,index) in keyArr" 
        :key="'item'+index"
        @click="addKey(index)"
        :class="{zero: index == 11,ok: index == 12}"
        >{{item}}</button>
      </div>
    </div>
    <!-- 添加标签组件 -->
    <add-label v-show="addLabel" @cansel="(data) => addLabel=data"></add-label>
  </div>
</template>

<script>
import addlabel from '../components/addLabel.vue'
import { mapState,mapMutations } from 'vuex'

export default {
  data(){
    return {
      income: false,
      addLabel: false,
      remarksTxt: '',
      num: '0',
      keyArr: ['1','2','3','删除','4','5','6','清空','7','8','9','OK','0','.']
    }
  },
  computed: {
    ...mapState(['labelArr','labelList','total']),
  },
  components: {
    'add-label' : addlabel
  },
  methods: {
    ...mapMutations(['refreshLabel','listDone','addLabelList','totalCount']),
    addKey(i){
      let key = (i==0||i==1||i==2||i==4||i==5||i==6||i==8||i==9||i==10||i==12);
      let number;
      let addNum = () => {
        if(this.num == '0'){
          this.num = this.keyArr[i];

        }else{
          this.num += this.keyArr[i]
        }
      }
      // 限制字符串的长度
      if(this.num.length == 17){
        return
      }else{
        // 数字键
        if(key){
          addNum();
          // .
        }else if(this.keyArr[i] == '.'){
          // 第一位点击.
          if(this.num == '0'){
            this.num = '0.'
            // 判断字符串有没有出现过点
          }else if(this.num.indexOf('.') == -1){
            this.num += '.'
          }
          // 点击删除
        }else if(i == 3){
          if(this.num == '0'){
            return
          }else if(this.num.length == 1){
            this.num = '0'
          }else{
            this.num = this.num.substr(0,this.num.length-1)
          }
          // 点击清空
        }else if(i == 7){
          if(this.num == '0'){
            return
          }else{
            this.num = '0'
          }
          // 点击OK
        }else if(i == 11){
          let arr = this.labelArr.filter(x => x.done == true);
          let test = [];
          if(arr.length != 0 && this.num != '0' && this.num != '0.'){
            arr.forEach(x => {
                test.push(x.name);
                // 将点击的标签状态取消
                x.done = false;
            })
            function cutZero(old){
              //拷贝一份 返回去掉零的新串
              let newstr = old;
              //循环变量 小数部分长度
              let leng = old.length-old.indexOf(".")-1
              //判断是否有效数
              if(old.indexOf(".")>-1){
                  //循环小数部分
                  for(i=leng;i>0;i--){
                      //如果newstr末尾有0
                      if(newstr.lastIndexOf("0")>-1 && newstr.substr(newstr.length-1,1)==0){
                          let k = newstr.lastIndexOf("0");
                          //如果小数点后只有一个0 去掉小数点
                          if(newstr.charAt(k-1)=="."){
                              return  newstr.substring(0,k-1);
                          }else{
                          //否则 去掉一个0
                              newstr=newstr.substring(0,k);
                          }
                      }else{
                      //如果末尾没有0
                          return newstr;
                      }
                  }
              }
              return old;
            }
            let obj = {
              "label": test.join(),
              "remarks": this.remarksTxt,
              "income": this.income,
              "number": cutZero(parseFloat(this.num).toFixed(3))
            }
            // 将数据添加进统计列表里
            this.addLabelList(obj);
            localStorage.setItem('localList',JSON.stringify(this.labelList));
            console.log(this.labelList);
            // 清空备注栏、键盘栏
            this.remarksTxt = '';
            this.num = '0';
            alert('添加成功')
            return 
          }else{
            alert('请选择至少一个标签并且输入金额');
            return
          }
        }
      }
      
    }
  }
}
</script>

<style scoped>
@media screen and (min-device-width: 380px) and (min-device-height: 160px){
  .tab{
    width: 380px;
    height: 160px;
  }
}
.home{
  width: 100%;
  height: 100%;
}
/* 标签盒子 */
.labels{
  width: 100%;
  height: 29%;
  min-height: 114px;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
}
/* 标签 */
.label{
  height: 75%;
  min-height: 50px;
  width: 100%;
  overflow-y: scroll;
}
.label ul{
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-content: flex-end;
  flex-wrap: wrap;
}
.label ul li{
  display: block;
  background-color: #D9D9D9;
  padding: 2px 16px;
  margin: 2px 6px;
  font-size: 14px;
  border-radius: 16px;
}
.label-done{
  color: #fff;
  background-color: #5A5A5A !important;
}
.add-label{
  height: 25%;
  min-height: 32px;
}
.add-label button{
  border: none;
  height: 100%;
  min-height: 32px;
  background-color: transparent;
  height: 100%;
  color: #999999;
  border-bottom: 1px solid #999999;
  padding-top: 10px;
  box-sizing: border-box;
}
/* 键盘及键盘以上未到白色部分 */
.tabs{
  width: 100%;
  height: 71%; /*56*/
  /* background: rosybrown; */
  box-sizing: border-box;
}
/* 备注 */
.remarks{
  width: 100%;
  height: 14%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
}
.remarks label{
  flex: 1 1 auto;
  height: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.remarks input{
  height: 100%;
  border: none;
  font-size: 16px;
  background-color: transparent;
  flex: 6 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 支出、收入 */
.tab{
  width: 100%;
  height: 28%;
  min-height: 80px;
  box-sizing: border-box;
}
.list{
  height: 50%;
  display: flex;
  font-size: 24px;
  background-color: #c4c4c4;
}
.list li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  box-sizing: border-box;
  border-bottom: 3px solid transparent;
}
.list .income{
  border-bottom: 3px solid black;
}
.txt{
  height: 50%;
  font-size: 36px;
  background-color: #fff;
  box-shadow: inset 0 -3px 3px -3px rgb(0 0 0 / 25%), inset 0 3px 3px -3px rgb(0 0 0 / 25%);
}
.txt span{
  height: 100%;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* 键盘 */
.zero{
  height: 50% !important;
  position: absolute;
  right: 0;
  bottom: 0;
}
.ok{
  width: 50% !important;
}
.keyboard{
  height: 58%;
  /* min-height: calc(100% - 234px);
  min-height: -webkit-calc(100% - 234px);
  min-height: -moz-calc(100% - 234px); */
  /* min-height: 40px; */
  width: 100%;
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.keyboard button{
  display: inline-bloack;
  border: none;
  width: 25%;
  height: 25%;
  font-size: 16px;
  background-color: #DEDEDE;
  border: 1px solid rgb(224, 214, 214);
  box-sizing: border-box;
}
</style>
