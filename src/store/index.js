import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标签
    labelArr: [
      {
        name: "衣",
        done: false
      },
      {
        name: "食",
        done: false
      },
      {
        name: "住",
        done: false
      },
      {
        name: "行",
        done: false
      },
    ],
    // 账目数据
    labelList: [],
    total: 0
  },
  mutations: {
    // 添加一条labelArr
    addLabel(state,data){
      state.labelArr.push(data);
    },
    // 删除一条labelArr
    delLabel(state,index){
      state.labelArr.splice(index,1);
    },
    // 修改标签labelArr.name
    changeLabel(state,payload){
      state.labelArr[payload.index].name = payload.test;
    },
    // 将labelArr改成localStorage里存的值
    refreshLabel(state,arr){
      state.labelArr = arr;
    },
    // 添加labelList
    addLabelList(state,obj){
      state.labelList.push(obj);
    },
    // 改变labelArr.done
    listDone(state,i){
      state.labelArr[i].done = !state.labelArr[i].done;
    },
    // 将labelList改成localStorage里存的值
    refreshList(state,arr){
      state.labelList = arr;
    },
    // 总数
    totalCount(state){
      let num = 0;
      state.labelList.forEach(x => {
        // 因为前面保存的时候就已经保留三位小数了，所以这里就把他们*1000再/1000来保留精度
        num*=1000;
        num += x.number*1000;
        num/=1000;
      })
      state.total = num;
      console.log('total'+this.total);
    }
  },
  actions: {
    
  },
  getters: {
    // 支出数据
    expendList(state){
      return state.labelList.filter(x => x.income == false);
    },
    // 收入数据
    incomdeList(state){
      return state.labelList.filter(x => x.income == true);
    },
    // 支出总数
    expendTotal(context,state){
      let num = 0;
      state.expendList.forEach(x => {
        // 因为前面保存的时候就已经保留三位小数了，所以这里就把他们*1000再/1000来保留精度
        num*=1000;
        num += x.number*1000;
        num/=1000;
      })
      // forEach用不了，所以用for了
      // for(let x in state.expendList){
      //   num*=1000;
      //   num += state.expendList[x].number*1000;
      //   num/=1000;
      // }
      return num;
    },
    // 收入总数
    incomeTotal(context,state){
      let num = 0;
      state.incomdeList.forEach(x => {
        // 因为前面保存的时候就已经保留三位小数了，所以这里就把他们*1000再/1000来保留精度
        num*=1000;
        num += x.number*1000;
        num/=1000;
      })
      
      // forEach用不了，所以用for了
        // for(let i in state.incomdeList){
        //   num*=1000;
        //   num += state.incomdeList[i].number*1000;
        //   num/=1000;
        // }
      return num;
    }
  },
  modules: {
  }
})
