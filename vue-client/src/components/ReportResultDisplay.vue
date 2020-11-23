<template>
	<table>
		<tr>
			<td>お疲れ様です。</td>
		</tr>
		<tr>
			<td>今日の作業事績は</td>
		</tr>
		<div v-if="recordData != null">
			<div v-for="(category,index) in categoryList" :key="index">	
				<tr v-if="recordData.filter(num => num['categorynum']==index).length>0">
					<td><BIconBookmarksFill/><b>{{category}}</b></td>
				</tr>	
				<div v-for="record in recordData" :key="record.id">
					<div v-if="index == record.categorynum">
						<tr>
							<td class="jobTitle"><BIconInfo/><b>{{record.title}}[{{record.spentTime}}{{lblHour}}]</b></td>
						</tr>
						<tr>
							<td>
								<div class="jobDetail">{{record.details}}
								</div>
							</td>
						</tr>
					</div>
				</div>
			</div>
		</div>
		<tr>
			<td>以上、宜しくお願いします.</td>
		</tr>
	</table>
</template>
<script src="/js/common.js"></script>
<script>
	import {BIconBookmarksFill,BIconInfo} from 'bootstrap-vue'
	import common from '@/js/common.js'
	export default {
		components:{
			BIconBookmarksFill,
			BIconInfo,
		},
		props:{
			recordData :Array,
		},
		data:function(){
			return {
				categoryList:[],
				lblHour:common.LBLHOURS,
			};
		},
		mounted:function(){
			this.categoryList=common.methods.getCategories();
		},	
	}
</script> 
<style>
.jobDetail{
	width:500px;
	padding: 0 60px;
}
.jobTitle{
	padding-left: 30px;
	font-size: 15px;
}
</style>