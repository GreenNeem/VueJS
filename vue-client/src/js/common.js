	export default{
		//固定テキストデータ定義
		LBLHOURS:'Hours',
		//画面共有データパッケージのカラム名
		DF_CATEGORYNUM:'categorynum',
		DF_ID:'id',
		//共通データリスト
		methods:{
			getHours:function(){
				var list=[];
				for(var i=0; i<=48 ; i++) list.push(Number.isInteger(0.5*i)?(0.5*i+'.0'):0.5*i);
					return list;
			},
			getCategories:function(){
				return [
				{ text: 'Select One', value: null },
				'Studying IT Technique', 
				'Environment Setting', 
				'Meeting', 
				'Other'
				]
			},
			getDataFields:function(){
				return [
					'id',
					'categorynum',
					'title',
					'details',
					'spentTime',
				]
			}
		}

	}
