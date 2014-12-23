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
	var tool_type = {
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
	}
	/**
	 * [toCweek 数字转换汉字]
	 * @param  {[number]} ele [传入数字]
	 * @return {[type]}     [description]
	 */
	function toCweek(ele) {
		if (tool_type.getType(ele) !== 'Number') {
			ele = Number(ele);
			if (isNaN(ele)) {
				return undefined;
			}
		}
		ele = ele % 7;//大于七的处理
		return weeks[ele];
	}
	/**
	 * [paramToArray 根据参数判断返回何等时间]
	 * @param  {[type]} args [description]
	 * @return {[type]}      [description]
	 */
	function paramToArray(args){
		args = args[0];
		var arr={};
		if(args.length === 0){
			return new Date();
		}
		if(tool_type.getType(args[0]) === 'String'){
			var str = args[0],
			arr1 = str.split(',');
			arr = {
				yyyy : arr1[0] || '',
				mth : arr1[1] || '',
				dd : arr1[2] || '',
				hh : arr1[3] || '',
				min : arr1[4] || '',
				ss : arr1[5] || '',
				sss : arr1[6] || '',
			}
			return new Date(arr.yyyy,arr.mth,arr.dd,arr.hh,arr.min,arr.ss,arr.sss)
		}
		 arr = {
			yyyy : args[0] || '',
			mth : args[1] || '',
			dd : args[2] || '',
			hh : args[3] || '',
			min : args[4] || '',
			ss : args[5] || '',
			sss : args[6] || ''
		}
		return new Date(arr.yyyy,arr.mth,arr.dd,arr.hh,arr.min,arr.ss,arr.sss);
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

	//闰年
	Time.isLeapYear = function(ele){
		ele = ele || this.time.getFullYear();
		var temp = new Date(ele,2,0).getDate();
		return (temp === 29) ? true : false;
	};
	//一个月有多少天
	Time.quantityInMonth = function(year,month){
		year = year || this.time.getFullYear();
		month = month || (this.time.getMonth() + 1);
		return new Date(year,(month + 1),0).getDate();
	};
	// 2个时间差
	Time.timeDiff = function(startTime, endTime, diffType){
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		diffType = diffType.toLowerCase();
		var sTime = new Date(startTime), //开始时间
			eTime = new Date(endTime), //结束时间
			divNum = diffTypes[diffType] || 1;
		return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum, 10), 10);
	}
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
	
	extendDeep(Time, {
		version: '1.0',
		getFullTime : getFullTime
	});
	if (typeof w.Time === 'undefined') {
		w.Time = Time;
	}

})(window);