<template>
	<div class="app">
		<!-- <router-view class="view-box burst-view"></router-view> -->
		<div class="view-box burst-view">
			<router-view></router-view>
		</div>
		<footer class="footer">
			<router-link to="/"><b class="iconfont">&#xe6bd;</b>记账</router-link>
			<router-link to="/label"><b class="iconfont">&#xe631;</b>标签</router-link>
			<router-link to="/stati"><b class="iconfont">&#xe65e;</b>统计</router-link>
		</footer>
		<div class="mask" v-if="isMack">
			<p class="mask-text">请使用手机扫码打开本页</p>
			<img src="./assets/chitu_qrcode.png">
			<button @click="isMack = false" class="iconfont">&#xe6b6;</button>
		</div>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default{
	data(){
		return {
			isMack: true
		}
	},
	methods: {
		...mapMutations(['refreshLabel','refreshList','totalCount'])
	},
	computed: {
		...mapState(['labelArr','labelList'])
	},
	watch: {
		'this.labelList' : () => {
			this.totalCount();
		}
	},
	created(){
		// 清除localStorage。删除注释后，刷新页面
		// localStorage.clear();	

		// 标签列表与localStorage
		let label = localStorage.getItem('localLabel');
		// label不为空时，同步local
		if(label){
			let arr = JSON.parse(label);
			this.refreshLabel(arr)
		}else{
			// label为空时，将labelArr加进local
			let txt = JSON.stringify(this.labelArr);
			localStorage.setItem('localLabel',txt);
		}

		// 统计列表与localStorage
		let list = localStorage.getItem('localList');
		// list不为空时,同步local
		if(list){
			let arr = JSON.parse(list);
			this.refreshList(arr);
		}else{
			// list为空，labelList不为空时，将labelList加进local
			if(this.labelList[0]){
				let txt = JSON.stringify(this.labelList);
				localStorage.setItem('localList',txt)
			}
		}
	}
}
</script>

<style>
/* 二维码遮罩 */
.mask{
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 75%);
	z-index: 1000;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
.mask-text{
	color: #fff;
	position: absolute;
	top: calc(50% - 200px);
}
.mask img{
	width: 200px;
	height: 200px;
}
.mask button{
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 32px;
	/* background-color: transparent; */
	position: absolute;
	top: calc((50% - 16px) - 120px);
	left: calc((50% - 16px) + 120px);
}
/* 初始化一些样式 */
/* 不显示滚动条 */
.burst-view::-webkit-scrollbar{
	display: none;
}
html,body,p,ul,li,h1,h2,h3,h4,button,form{
	margin: 0;
	padding: 0;
}
ul,li{
	list-style-type: none;
	margin: 0;
	padding: 0;
}
html,body{
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}
a{
	text-decoration: none;
	color: black;
}
.app{
	width: 100%;
	height: 100%;
}
/* 通用样式 */
input{
	outline: 0;
}
/* router-view */
.view-box{
	width: 100%;
	/* height: 92%; */
	height: calc(100% - 54px);
	height: -webkit-calc(100% - 54px);
	height: -moz-calc(100% - 54px);
	overflow: hidden;
	overflow-y: scroll;
	box-sizing: border-box;
}
/* 底部固定的三个标签 */
.footer{
	width: 100%;
	/* height: 8%; */
	height: 54px;
	/* min-height: 54px;
	max-height: 54px; */
	box-sizing: border-box;
	z-index: 1000;
	display: flex;
	position: fixed;
	left: 0;
	bottom: 0;
	box-shadow: 0 0 3px rgba(0, 0, 0, 25%);
	background-color: #f5f5f5;

	/* flex: 1; */
}
.footer > a{
	width: 100%;
	height: 100%;
	/* min-height: 54px;
	max-height: 54px; */
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 14px;
}
.footer > a .iconfont{
	font-size: 20px;
}
.footer > a.router-link-exact-active{
	color: #FF0000;
}
</style>
