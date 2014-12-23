;(function(w) {
	// 深度复制工具
	function extendDeep() {
		var i,
			target = arguments[0] || {},
			astr = '[object Array]',
			toStr = Object.prototype.toString,
			yArr = Array.prototype.slice.call(arguments, 1);
		for (i = 0, len = yArr.length; i < len; i++) {
			var temp = yArr[i];
			for (var j in temp) {
				if (target.hasOwnProperty(j) && (target[i] === temp[i])) {
					continue;
				}
				if (temp.hasOwnProperty(j)) {
					if (typeof temp[j] === 'object') {
						target[j] = (toStr.call(temp[j] === astr)) ? [] : {};
						extendDeep(target[j], temp[j]);
					} else {
						if (typeof temp[j] !== 'undefined') {
							target[j] = temp[j];
						}
					}
				}
			}
		}
		return target;
	}
	// 工具函数区
	var tool = {
		getType : function(ele){
			var oStr = Object.prototype.toString.call(ele),
			reg = /\[object (.*)\]/,
			arr = reg.exec(oStr);
			return arr[1];
		},
		isArray : function (ele) {
			return (this.getType(ele) === 'Array') ? true : false;
		},
		isObject : function (ele) {
			return (this.getType(ele) === 'Object') ? true : false;
		}
		// makeArray : function(ele){//有问题
		// 	 var target = [];
		// 	 if(ele != null){
		// 	 	var i = ele.length;
		// 	 	console.log(i)
		// 	 	if(i = null || typeof ele === 'string' ||  typeof ele === 'function' || ele.setInterval){
		// 			target[0] = ele;
		// 			console.log('走这里了？')
		// 	 	}else{
		// 	 		console.log('走这里了1？' + i)
		// 	 		while(i){
		// 	 			console.log(i)
		// 	 			target[--i] = ele[i];
		// 	 		}

		// 	 	}
		// 	 }
		// 	 // console.log(target)
		// 	return target;
		// }
	}
	/**
	 * [$arr 数组话函数]
	 * @param  {[元素或类数组]} ele [传进的元素或者类数组话]
	 * @return {[type]}     [description]
	 */
	function $arr(ele) {
	  if (!ele){
	  	return [];
	  } 
	  if (ele.toArray){
	  	return ele.toArray();
	  } 
	  var length = ele.length || 0, results = new Array(length);

	  while (length--){
	  	results[length] = ele[length];
	  } 
	  return results;
	}
	/**
	 * [toCweek 数字转换汉字]
	 * @param  {[number]} ele [传入数字]
	 * @return {[string]}     [返回汉字]
	 */
	function toCweek(ele) {
		if (tool.getType(ele) !== 'Number') {
			ele = Number(ele);
			if (isNaN(ele)) {
				return undefined;
			}
		}
		ele = ele % 7;//大于七的处理
		return weeks[ele];
	}
	//2014,12,10,10,10,10 || '2014,12,10,10,10,10'
	/**
	 * [paramToArray 根据参数判断返回何等时间]
	 * @param  {[type]} args [arguments]
	 * @return {[Date]}      [根据不同的设定时间返回时间对象]
	 */
	function paramToArray(args){//扩展次参数操作
		args = args[0];
		var arr={};
		if(args.length === 0){
			return new Date();
		}
		if(tool.getType(args[0]) === 'String'){
			var str = args[0],
			arr1 = str.split(',');
			arr = {
				yyyy : arr1[0] || '',
				mth : arr1[1] || '',
				dd : arr1[2] || '',
				hh : arr1[3] || '',
				min : arr1[4] || '',
				ss : arr1[5] || ''
			}
			return new Date(arr.yyyy,arr.mth,arr.dd,arr.hh,arr.min,arr.ss);
		}
		 arr = {
			yyyy : args[0] || '',
			mth : args[1] || '',
			dd : args[2] || '',
			hh : args[3] || '',
			min : args[4] || '',
			ss : args[5] || ''
		};
		return new Date(arr.yyyy,arr.mth,arr.dd,arr.hh,arr.min,arr.ss);
	}

	// 原型
	var Time = function() {
		if (!(this instanceof Time)) {
			return new Time(arguments);
		}
		this.time = paramToArray(arguments);
	};
	//时间差基础单位
	var diffTypes = {
		second: 1000,
		minute: 60000,
		hour: 3600000,
		day: 86400000
	};
	//周单位
	var weeks = ['日','一','二','三','四','五','六'];

	/**
	 * [isLeapYear 是否闰年]
	 * @param  {[type]}  ele [description]
	 * @return {Boolean}     [description]
	 */
	function isLeapYear(ele){
		ele = ele || this.time.getFullYear();
		var temp = new Date(ele,2,0).getDate();
		return (temp === 29) ? true : false;
	};
	/**
	 * [quantityInMonth 给定月中返回有多少天]
	 * @param  {[type]} year  [description]
	 * @param  {[type]} month [description]
	 * @return {[type]}       [description]
	 */
	function quantityInMonth(year,month){
		year = year || this.time.getFullYear();
		month = month || this.time.getMonth();
		console.log(year+'...'+month)
		return new Date(year,month,0).getDate();
	};
	/**
	 * [timeDiff 2个时间差]
	 * @param  {[type]} startTime [description]
	 * @param  {[type]} endTime   [description]
	 * @param  {[type]} diffType  [description]
	 * @return {[type]}           [description]
	 */
	function timeDiff(startTime, endTime, diffType){
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		diffType = diffType.toLowerCase();
		var sTime = new Date(startTime), //开始时间
			eTime = new Date(endTime), //结束时间
			divNum = diffTypes[diffType] || 1;
		return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum, 10), 10);
	}
	/**
	 * [getFullTime 格式化时间]
	 * @param  {[b]} b [是否使用当前时间]
	 * @return {[type]}   [description]
	 */
	function getFullTime(b){
		var _time = b ? new Date() : this.time;
		return {
			day: _time.getDate(),
			week: _time.getDay(),
			month: _time.getMonth() + 1,
			year: _time.getFullYear(),
			hours: _time.getHours(),
			minute: _time.getMinutes(),
			seconds: _time.getSeconds(),
			mseconds: _time.getMilliseconds(),
			hab: _time.getFullYear() + '年' + (_time.getMonth() + 1) + '月' + _time.getDate() + '日 星期' + toCweek(_time.getDay()) + ' ' + _time.getHours() + '时' + _time.getMinutes() + '分' + _time.getSeconds() + '秒'
		}
	};

	//countdown
	//参数：单参数从现在时刻到给定的秒后执行callblack() 核心部分其实是不管给定什么时间，最终都要转换成多少秒
	// 
		var countdown = {
			cTime : null,
			conutDown : function(){
				var args = $arr(arguments),
					len = args.length,
					callblack = args.pop();
					if(tool.getType(callblack) !== 'Function'){
						throw new Error("callblack is undefined.");
					}
				if(len > 2){//具体时间
					var diff = Math.floor((new Date(args[0],(args[1] - 1),args[2],args[3],args[4],args[5]).getTime() - new Date().getTime()) / 1000) * 1000;
					this.outTime = setTimeout(function() {
						callblack();
					},diff);
				}else if(len <= 2){//设定秒数倒计时
					this.outTime = setTimeout(function(){
						callblack();
					},args[0]*1000);
				}else{
					throw new Error("111")
				}
			},
			stop : function(){
				clearTimeout(this.cTime);
			}
		}
	



	// 扩展
	extendDeep(Time.prototype, {
		version: '1.0',
		getFullTime : getFullTime,
		timeDiff : timeDiff,
		quantityInMonth :quantityInMonth,
		isLeapYear : isLeapYear
	});
	extendDeep(Time.prototype,countdown)
	if (typeof w.Time === 'undefined') {
		w.Time = Time;
	}

})(window);