//更新脚本
(function(mui, window){
	var update = {};
	//获取当前应的版本
	update.version = plus.runtime.version;
	console.log(update.version);
	update.validate = function(){
		
	};
	
	
	window.update = update;
})(mui, window)
