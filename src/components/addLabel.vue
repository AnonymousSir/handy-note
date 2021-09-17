<template>
    <div class="add">
        <div class="box">
            <h4>新增标签</h4>
            <div class="text">
                <form @submit.prevent="confirm">
                    <label for="addlabel-text">标签名</label>
                    <input v-model="text" 
                        type="text" 
                        ref="text" 
                        id="addlabel-text" 
                        autocomplete="off" 
                        placeholder="在这里输入标签名"
                    >
                </form>
            </div>
            <div class="btn">
                <button @click="$emit('cansel',false)">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default{
    data(){
        return {
            text: ''
        }
    },
    methods: {
        ...mapMutations(['addLabel','localData']),
        confirm(){
            let x = this.labelArr.find(x => this.text == x.name);
            if(x){
                alert('已经有相同的标签了');
                this.$refs.text.focus();
            }else{
                let obj = {
                    name: this.text,
                    done: false
                }
                this.addLabel(obj);
                localStorage.setItem('localLabel',JSON.stringify(this.labelArr));
                this.text = '';
                this.$emit('cansel',false);
                // alert('添加成功');
            }
        }
    },
    computed: {
        ...mapState(['labelArr'])
    }
}
</script>


<style scoped>
.add{
    width: 100%;
    height: 100%;
    background-color: #000000B3;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    overflow: hidden;
    z-index: 99;
}
.box{
    width: 320px;
    height: 156px;
    background-color: #fff;
    border-radius: 16px;
    margin-bottom: 100px;
    position: absolute;
    top: 25%;
}
.box h4{
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 16px;
    height: 24px;
}
.text{
    width: 320px;
    height: 40px;
    padding: 16px 0;
    /* border-bottom: 1px solid #ebedf0; */
    font-size: 14px;
    color: #646566;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-sizing: border-box; */
}
.text form{
    width: 100%;
    height: 100%;
    padding: 0 16px;
}
.text label{
    height: 32px;
    padding-right: 16px;
    /* display: flex; */
    /* justify-content: flex-start; */
}
.text input{
    height: 32px;
    min-height: 32px;
    border: none;
    flex: 1;
    background-color: transparent;
}
.btn{
    position: relative;
}
.btn::after{
    position: absolute;
    content: " ";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-top: 1px solid #ebedf0;
    transform: scale(.5);
}
.btn button{
    background-color: transparent;
    border: none;
    width: 160px;
    height: 44px;
    font-size: 16px;
}
.btn button:nth-child(1){
    border-right: 1px solid #ebedf0;
    box-sizing: border-box;
}
.btn button:nth-child(2){
    color: #1989fa;
}
</style>