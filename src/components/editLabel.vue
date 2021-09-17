<template>
    <div class="edit">
        <div class="title">
            <span class="iconfont" @click="closeed">&#xe685;</span>
            <h4>编辑标签</h4>
        </div>
        <div class="name">
            <label for="label-name">标签名</label>
            <input type="text" id="label-name" ref="labelname" v-model="test">
        </div>
        <div class="btn">
            <button @click="saveData(test,index)">保存</button>
            <button @click="del(index)">删除</button>
        </div>
    </div>
</template>

<script>

import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            test: ''
        }
    },
    props: ['index','labelName'],
    computed: {
        ...mapState(['labelArr']),
    },
    methods: {
        ...mapMutations(['delLabel','changeLabel']),
        closeed(){
            this.$emit('close',false);
        },
        del(index){
            this.delLabel(index);
            alert('删除标签成功');
            localStorage.setItem('localLabel',JSON.stringify(this.labelArr))
            this.closeed();
        },
        saveData(test,index){
            let x = this.labelArr.find(x => this.text == x.name);
            if(x){
                alert('标签名重复');
                this.$refs.labelname.focus();
            }else{
                console.log(test,index);
                this.changeLabel({test,index});
                localStorage.setItem('localLabel',JSON.stringify(this.labelArr));
                alert('保存成功');
                this.closeed();

            }
        }
    },
    watch: {
        labelName: function (){
            this.test = this.labelName;
        }
    }
    
}
</script>


<style scoped>
.edit{
    width: 100%;
	height: 92%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
	background-color: #f5f5f5;
}
.title{
    width: 100%;
    height: 24px;
    padding: 12px 16px;
    background-color: #fff;
    display: flex;
}
.title span,h4{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title span{
    font-size: 24px;
    box-sizing: border-box;
}
.title h4{
    font-weight: normal;
    padding-right: 40px;
    flex: 1;
}

.name{
    height: 40px;
    background-color: #fff;
    margin: 5px 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
}
.name label{
    color: #333333;
    font-size: 14px;
    padding-right: 16px;
}
.name input{
    border: none;
    height: 100%;
    flex: 1 1 auto;
}

.btn{
    height: 52px;
    padding: 16px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.btn button{
    min-height: 40px;
    border: none;
    border-radius: 4px;
    padding: 0 16px;
    margin: 0 16px;
    color: #fff;
    background-color: #767676;
}
</style>