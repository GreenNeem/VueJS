<template>
	<div>
		<b-table hover :items="recordsList" :fields="fields" class="text-left" >
			<template #cell(categoryname)="recordsList" v-if="recordsList.length">
				{{categories[recordsList.item.categorynum]}}
			</template>
			<template #cell(getButton)="recordsList" v-if="recordsList.length">
				<b-button variant="primary">
					<router-link :to="{name: 'editEntry', params: { id:recordsList.item.id }}" class="lnk_router">Edit</router-link>
				</b-button>
				<b-button variant="danger"  v-on:click="onDelete(recordsList.index)" class="btn_align">
					Delete
				</b-button>	
			</template>
			<template slot="custom-foot" v-if="!recordsList.length">
				<b-tr>
					<td colspan="5" class="text-center">There is no records yet.</td>
				</b-tr>
			</template>
		</b-table>
		<b-card class="mt-3" header="Result Report Info" align="left">
			<aboutCmp :recordData="recordsList" v-if="recordsList.length"/>
		</b-card>
	</div>
</template>
<script>
	import aboutCmp from '@/components/ReportResultDisplay.vue'
	import common from '@/js/common.js'
	export default{
		components:{
			aboutCmp,
		},
		props:{
			records:Array,
		},
		data:function(){
			return{
				recordsList:this.records,
				fields:[
				{key: 'id',label: 'Primary Key',sortable: true,},
				{key: 'categoryname',label:'Name',sortable:true,},
				{key: 'title',label: 'Title',sortable: true,},
				{key: 'details',label: 'Details',sortable: true,},
				{key: 'spentTime',label:'Hours',sortable:true,},
				{key: 'getButton',label:'',}
				],
				categories:common.methods.getCategories(),	
			}
		},
		methods:{
			onDelete:function(val){
				if (val > -1) {
					this.recordsList.splice(val, 1);
				}	
			}
		}
	}
</script>
<style>

.btn_align{
	margin-left: 10px;
}
.lnk_router{
	color:  #FFFFFF;
}


</style>