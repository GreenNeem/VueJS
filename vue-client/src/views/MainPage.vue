<template>
	<body>
		<div class="row">
			<div class="col-lg-4 col-md-12">
				<div class="box-align">
					<b-card class="card-css" header="REPORT ENTRY">	
						<b-form @submit="onSubmit" @reset="onReset" v-if="show">
							<b-form-group id="input-group-1" label="Job Category:" label-for="input-1">
								<b-form-select id="input-1" v-model="form.categoryname" :options="ddlJobCategories" required>
								</b-form-select>
							</b-form-group>
							<b-form-group id="input-group-2" label="Job Title:" label-for="input-2">
								<b-form-input id="input-2" v-model="form.title" placeholder="Enter job title" required>   
								</b-form-input>
							</b-form-group>
							<b-form-group id="input-group-3" label="Details:" lable-for="input-3">
								<b-form-textarea id="input-3"  v-model="form.details" placeholder="Enter Details..." rows="3" max-rows="6">
								</b-form-textarea>
							</b-form-group>
							<b-form-group id="input-group-4">
								<b-dropdown id="dropdown-left" :text="form.spentTime+lblHour" variant="primary">
									<li v-for="(hour,index) in ddlHours" v-bind:key="index" selected>
										<b-dropdown-item @click="form.spentTime =hour">{{hour}}</b-dropdown-item>
									</li>    
								</b-dropdown>
							</b-form-group>
							<b-button type="submit" variant="primary" v-if="display.addFlg">Add</b-button>
							<b-button type="reset" variant="danger" class="btnAlign" v-if="display.addFlg">Reset</b-button>	
							<b-button variant="primary" @click="onUpdate()" v-if="display.updateFlg">Edit</b-button>
							<b-button variant="danger" class="btnAlign" @click="onCancle()" v-if="display.updateFlg">Cancle</b-button>
						</b-form>
					</b-card>	
				</div>
			</div>
			<div class="col-lg-8 col-md-12">
				<div class="box-align">
					<RecordsDisplay :records="recordsList"/>
				</div>
			</div>
		</div>	
	</body>
</template>
<script >
	import RecordsDisplay from '@/components/ReportRecordsDisplay.vue'
	import common from '@/js/common.js'
	export default {
		components: {
			RecordsDisplay
		},	
		data:function() {
			// console.log('data')
			return {
				index:-1, //更新オブジェクトの索引
				recordsList:[],
				form: {
					categoryname: null,
					title: '',
					details: '',
					spentTime:'0.0',
				},
				display: {
					updateFlg:false,
					addFlg:true,
				},
				ddlJobCategories:common.methods.getCategories(),
				ddlHours:common.methods.getHours(),
				lstDataFields:common.methods.getDataFields(),
				lblHour:common.LBLHOURS,// 共通テキストデータ用
				show: true
			}
		},
		watch:{
			'$route': {
				handler: function (val) {	
					//変更対象データの主キーを検索
					this.recordsList.filter(record=>{
						if(record.id==val.params.id) this.index=this.recordsList.indexOf(record);
					})
					if( this.index >-1){
						//画面項目設定
						Object.getOwnPropertyNames(this.form).forEach(name => {
							if(this.lstDataFields.includes(name))
							this.form[name]=this.recordsList[this.index][name];
						});
						//対象データを設定する。
						var categorynum=this.recordsList[this.index].categorynum;
						this.form.categoryname=this.ddlJobCategories[categorynum];
	
						//画面項目差し替え
						this.display.addFlg=false;
						this.display.updateFlg=true;

					}else{
						console.log('zc-info:Id does not found');
					}
				},
				deep: true
			}
		},
		methods: {
			onUpdate:function(){
				this.lstDataFields.forEach(name => {
					if(Object.getOwnPropertyNames(this.form).includes(name)){
						this.recordsList[this.index][name]=this.form[name];
					}else{
						//ユーザ入力データを基づいて値を作成。
						switch(name){
							case common.DF_CATEGORYNUM: 
								var num=common.methods.getCategories().indexOf(this.form.categoryname);
								this.recordsList[this.index][name]=num;
								break;
						}
					}		
				});
				//画面項目差し替え
				this.display.addFlg=true;
				this.display.updateFlg=false;

				this.clearAll();
			},
			clearAll:function(){
				//クリアする
				this.form.categoryname = null
				this.form.title=''
				this.form.details=''
				this.form.spentTime='0.0'

				this.$router.replace({
					name:'Home',
				})
			},
			onCancle:function(){
				this.clearAll();
			},
			getNewDataId:function(){
				console.log('add')
				if(!this.recordsList.length) return 0;
				else return this.recordsList[this.recordsList.length-1].id+1;
			},
			onSubmit:function(evt) {
				evt.preventDefault()
				this.recordsList.push({ 
					id:this.getNewDataId(),
					categorynum: common.methods.getCategories().indexOf(this.form.categoryname), 
					title: this.form.title, 
					details: this.form.details,
					spentTime:this.form.spentTime,
				});
				this.clearAll();
			},
			onReset:function(evt) {
				evt.preventDefault()
			//クリアする
			this.clearAll();
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = true
			})
		},
	}
}
</script>
<style>
.box-align{
	padding:10px;
}
.card-css{
	/*text-align: left;*/
	font-weight: bold;
}
.btnAlign{
	margin-left: 10px;
}
</style>