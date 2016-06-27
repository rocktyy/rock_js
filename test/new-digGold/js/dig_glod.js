/*
**autor:tianyuyan
**date:2016-3-25
**des:dig_gold_actity
*/
// 定义 挖金矿
var dig_gold = {
	digData:'',
	type:'',
	init: function (a) {
        //初始化 lodding
        dig_gold.loading();
    },
    loading: function (ui_data) {
        dig_gold.renderajax();
        //获取 挖矿获奖列表
		dig_gold.getGoldMinerInfo();
		//增加  监听事件
        dig_gold.addlistener();
    }, 
    renderajax: function (ui_data) {
    	var data =this.Request('telephone');
    	if(data ==''){
        	//没有手机号，未登录状态
        	dig_gold.showOne_hideOrters('gold-mine');
        	//增加挖矿  监听
        	dig_gold.dig_goldListener();
        	return;
        }
    	//回调 获取参数
        dig_gold.getDigGoldData(data, function (args) {            
            dig_gold.render(args);
        })
    },

    //显示 超时页面
    show_timeout_page: function (data) {
    	dig_gold.showOne_hideOrters('time-out-dig');	
		$('.time-out-bg').css("height",$(window).height())
		//隐藏挖矿页面
		$("#digInfo").hide(); 
		$('.rule-div').hide();
    },
    render: function (data) {
    	var _index=data.digResultType;        
		switch (_index)
		{
			case -1:		  
        	    //未挖矿
	        	if((data.digGoldDayStart==true)&&(data.digGoldDayEnd==false)){
	        		dig_gold.showOne_hideOrters('gold-mine');
	          	    //增加挖矿  监听
	          	    dig_gold.dig_goldListener();    		
	          	    //$('.rule-div').css("bottom","2.65rem")
	        	}else{
	        		//显示打烊页面
	        		dig_gold.show_timeout_page();   
	        	} 
			  break;
			case 0:
				//挖矿为空	     
				if((data.digGoldDayStart==true)&&(data.digGoldDayEnd==false)){
			          dig_gold.showOne_hideOrters('no-dig');
			          //活动规则单独处理
			          $('.rule-div').css("padding-top","46px")
				}else{
	        		//显示打烊页面
	        		dig_gold.show_timeout_page();   
	        	}  	
			  break;
			case 1:			  	
				if(data.digData.isMaxAwardGoldWeight =='0'){
			  		//不是最大红包 
	        		dig_gold.showOne_hideOrters('gold-dig');
	        		$('.gold-dig .goldNum2').html(data.digData.awardGoldWeight);	        		
	        		$('.gold-dig .top-content span').html(data.digData.encourageContent);	        		
	        		$('.gold-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0]);
	        		if(data.digData.giftStatus == '1'){
	        			$('.gold-dig .get_hongbao').val('立即拆红包')
	        		}else if(data.digData.giftStatus == '2'){
	        			$('.gold-dig .get_hongbao').val('查看红包')
	        		}else if(data.digData.giftStatus == '3'){
	        			$('.gold-dig .get_hongbao').val('查看红包')
	        		}
			  	}else if(data.digData.isMaxAwardGoldWeight =='1'){
			  		//金色 红包
	        		dig_gold.showOne_hideOrters('gold-yellow-dig');
	        		$('.gold-yellow-dig .goldNum2').html(data.digData.awardGoldWeight);	        		
	        		$('.gold-yellow-dig .top-content span').html(data.digData.encourageContent);	        		
	        		$('.gold-yellow-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0]);
	        		if(data.digData.giftStatus == '1'){
	        			$('.gold-yellow-dig .get_hongbao').val('立即拆红包')
	        		}else if(data.digData.giftStatus == '2'){
	        			$('.gold-yellow-dig .get_hongbao').val('查看红包')
	        		}else if(data.digData.giftStatus == '3'){
	        			$('.gold-yellow-dig .get_hongbao').val('查看红包')
	        		}
			  	}
			  break;
			case 2:
			  //挖到代金券
	          dig_gold.showOne_hideOrters('coupon-dig');
			  $('.coupon-dig .top-content span').html(data.digData.encourageContent);
			  $('.coupon-dig .top-des span').html(data.digData.deductibleTypeStr);
			  $('.coupon-dig .goldNum2').html(parseInt(data.digData.discountMoney)/100);	     	        		
			  $('.coupon-dig .coupon-dig_date .goldEndTime').html(data.digData.endTime.split(" ")[0]);
			  $('.coupon-dig .coupon-dig_des').html(data.digData.useLimit+"  "+data.digData.useExplain);	        		
			  break;
			case 3:
			  if((data.digGoldDayStart==true)&&(data.digGoldDayEnd==false)){ 
	        	  //隐藏没有人帮挖 挖矿结果
				  dig_gold.showOne_hideOrters('gold-nobodydig-dig');	
	        	  $('#coupon_userList').hide();  
			  }else{
	        		//显示打烊页面
	        		dig_gold.show_timeout_page();   
	          } 
			  break;
			case 4:
			  if((data.digGoldDayStart==true)&&(data.digGoldDayEnd==false)){ 
	        	  //隐藏所有人 挖矿结果
				  dig_gold.showOne_hideOrters('gold-somebodyhelp_nodig-dig');	 
	        	  $('#coupon_userList').hide(); 
			      var list = data.helperList;
	        	  dig_gold.show_friends_list(list);
			  }else{
	        		//显示打烊页面
	        		dig_gold.show_timeout_page();   
	          } 			 
			  break;
			case 5:
			   if(data.digData.isMaxAwardGoldWeight=='0'){
			    	dig_gold.showOne_hideOrters('gold-somebodyhelp_little-dig');	
		        	//隐藏所有人 挖矿结果
		        	$('#coupon_userList').hide();    
		        	$('.gold-somebodyhelp_little-dig .top_content .friend').html(data.digData.maxHelperWxNickName);
				    $('.gold-somebodyhelp_little-dig .goldNum2').html(data.digData.maxGoldWeight); //显示好友  挖矿结果
					var list = data.helperList;		        	
		        	dig_gold.show_friends_list(list);
		      }else if(data.digData.isMaxAwardGoldWeight=='1'){	
		        	dig_gold.showOne_hideOrters('gold-somebodyhelp_most-dig');	 
		        	//隐藏所有人 挖矿结果
		        	//隐藏所有人 挖矿结果
		        	$('#coupon_userList').hide();    
		        	$('.gold-somebodyhelp_most-dig .top_content .friend').html(data.digData.maxHelperWxNickName);
				    $('.gold-somebodyhelp_most-dig .goldNum2').html(data.digData.maxGoldWeight); 
				    $('#coupon_userList').hide();     
		        	//显示好友  挖矿结果
		        	var list = data.helperList;		        	
		        	dig_gold.show_friends_list(list);
		      }
		      break;
		    case 6:
			  if(data.digData.isMaxAwardGoldWeight=='0'){
			  	    //挖到  但不是最多的 黄金
			    	dig_gold.showOne_hideOrters('acquire-glod-dig');	
		        	 //隐藏所有人 挖矿结果
		        	$('#coupon_userList').hide(); 
	        		$('.acquire-glod-dig .goldNum2').html(data.digData.awardGoldWeight);	     	        		
	        		$('.acquire-glod-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0].split(" ")[0]);

		        	if(data.digData.giftStatus == '1'){
	        			$('.acquire-glod-dig .get_hongbao').val('立即领奖励')
	        		}else if(data.digData.giftStatus == '2'){
	        			$('.acquire-glod-dig .get_hongbao').val('查看红包')
	        		}else if(data.digData.giftStatus == '3'){
	        			$('.acquire-glod-dig .get_hongbao').val('查看红包')
	        		}

		      }else if(data.digData.isMaxAwardGoldWeight=='1'){		        	
	        	    dig_gold.showOne_hideOrters('acquire-mostGlod-dig');	
	        		//隐藏所有人 挖矿结果
	        		$('#coupon_userList').hide();  
	        		
	        		$('.acquire-mostGlod-dig .goldNum2').html(data.digData.awardGoldWeight);	     	        		
	        		$('.acquire-mostGlod-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0].split(" ")[0]);

		        	if(data.digData.giftStatus == '1'){
	        			$('.acquire-mostGlod-dig .get_hongbao').val('立即领奖励')
	        		}else if(data.digData.giftStatus == '2'){
	        			$('.acquire-mostGlod-dig .get_hongbao').val('查看红包')
	        		}else if(data.digData.giftStatus == '3'){
	        			$('.acquire-mostGlod-dig .get_hongbao').val('查看红包')
	        		} 

		      }
		    break;
		    default:
		    	//异常 显示页面 lodding 页
    	    	dig_gold.showOne_hideOrters('digInfo-lodding');
                alert("获取用户数据失败，网络/服务器错误");
		    ;
		}	
    },
    show_friends_list:function(list){
        //显示好友  挖矿结果
	    $('#friends_userList').show(); 
	    var _goldMinerInfo =list;
	    var tbody ='<tbody>';
	    if(list != undefined && list.length > 0 ){
			$.each(list, function(index, p2){
				if(list[index].helpedDigResult == '0'){
					var ss ='<tr><td style="font-size: 0.9375rem;color: #a74b00;width:23%"><div class="autocut">'
						+list[index].helperNickName+'</div></td>'+
					' <td style="font-size: 0.9375rem;color: #c25c09; font-weight: 500;width:50%">'+"一不小心帮你"+'</td>'+
					' <td style="font-size: 0.9375rem;color: #a74b00;width:27%"><span style="float:right">挖空了</span></td></tr>'
				}else if(list[index].helpedDigResult == '1'){
					var ss ='<tr><td style="font-size: 0.9375rem;color: #a74b00;width:23%"><div class="autocut">'
						+list[index].helperNickName+'</div></td>'+
						//［帮你挖出了］文字字色：#c25c09
					' <td style="font-size: 0.9375rem;color: #c25c09; font-weight: 500;width:50%">'+"帮你挖出了黄金"+'</td>'+
					' <td style="font-size: 0.9375rem;color: #a74b00;width:27%"><span style="float:right">'+list[index].awardGoldWeight+'毫克</span></td></tr>'
				}
				tbody += ss;
			});
		}
		tbody += '</tbody>';
		$("#friends_userList table").append(tbody);
		/*
		 * 去掉滚动 4-6
		 * setTimeout(function(){
			$("#friends_userList table").addClass("friends_list-animation");
		},1000);*/
   	
    },
    //用户列表 api挖金矿获奖用户信息接口
	getGoldMinerInfo:function(){
		$.ajax({
			type:"POST",
			url: basePath+'digGold/getGoldMinerInfo',
			data: {
			},
			beforeSend:function(){
				Msg().loading().show();
			},
			complete:function(){
				Msg().loading().hide();
			},
			dataType: 'json',	
			success: function(_data, _textStatus) {
				$("#minerNum").html('');
				var _arr = new Array();
				var _goldMinerInfo = _data.goldMinerInfo;
				if(_goldMinerInfo != undefined && _goldMinerInfo.length > 0 ){
					for(var i = 0; i < _goldMinerInfo.length; i++){
						_arr[_arr.length] = '<li><span><font>'+_goldMinerInfo[i].mobile+'</font></span><span>刚刚挖出了 '+_goldMinerInfo[i].message+'</span></li>';
					}
				}
				$("#userNum").html(_data.num);
				$("#userTotal1").html(_arr.join(''));
				$("#userTotal2").html(_arr.join(''));
				setTimeout(function(){
					$("#userTotal1").addClass("user-total-animation");
					$("#userTotal2").addClass("user-total-animation");
				},1000);
			}
		});
	},
	dig_goldListener:function(){
		//提前请求  img 动画效果 
		var img = new Image(); 
		img.src = 'imgs/mountain_break_small.png'; 
		var img2 = new Image(); 
		img2.src = 'imgs/mountain_break_big.png';
		//提前加载 MP3文件
		var media = new Audio("imgs/break.mp3"); 
		//增加动态效果
		$(".hammer").addClass("hammer-animation");
		// 点击  山  挖矿
		$(".mountain").bind("touchstart",function(){
			var _telephone =dig_gold.Request('telephone');
			//未登录需要进行登录
			if(_telephone == ""){
				dig_gold.login();
				return;	
			}
			$(".hammer").removeClass("hammer-animation");
			$(".hammer").addClass("hammer-break-animation");
			//$(".mountain").addClass("break-animation");
			$(".light").addClass("light-animation");
			media.play();
			//动画  遮罩 延时效果 
			setTimeout(function(){Msg().loading().show();},2000);
			//挖矿
			setTimeout(function(){dig_gold.digGold();},3000);
			setTimeout(function(){
				$(".mountain").css("background-image","url(imgs/mountain_break_small.png)");
			},400);
			setTimeout(function(){
				$(".mountain").css("background-image","url(imgs/mountain_break_big.png)");
			},1200); 
		});
	},
    addlistener:function(data){  
    	$('.share_flaunt').click(function(){
    		// type ='littleGold' 是 少量黄金  ，type ='mostGold' 是 大量黄金 ，type ='coupon' 是买金券
    		var data = encodeURIComponent(JSON.stringify(dig_gold.digData));
    		alert(dig_gold.type);
    		alert(JSON.stringify(dig_gold.digData));
    		var url  ="flaunt.html?data="+data+"&type="+dig_gold.type;
    		window.location.href = url;
    	});   
    	//现在拿奖励
    	$('.get_rightNow').click(function(){
    		// 调用 app内部方法 
			/*window.location.href = "gbanker://page_hongbao";*/
    		var w = dig_gold.getVersion();
    		if(w >=2600){
    			dig_gold.send({
                    'methodName' : 'openUrl',
                    'data' : {
                        'url' :'gbanker://page_hongbao',
                        "params":{"orderID":""}
                    },
                    'responseCallback' : function (responseData) {}
                });
    		}else{
    			window.location.href = "gbanker://page_hongbao";
    		}
    		
		});   
    	//点击立即领奖励 
    	$('.get_hongbao').click(function(){
    		// 调用 app内部方法 
			/*window.location.href = "gbanker://page_hongbao";*/
    		var w = dig_gold.getVersion();
    		if(w >=2600){
    			dig_gold.send({
                    'methodName' : 'openUrl',
                    'data' : {
                        'url' :'gbanker://page_hongbao',
                        "params":{"orderID":""}
                    },
                    'responseCallback' : function (responseData) {}
                });
    		}else{
    			window.location.href = "gbanker://page_hongbao";
    		}
		});   
		//点击买黄金 
    	$('.get_purchasegold').click(function(){
    		// 调用 app内部方法 
			/*window.location.href = "gbanker://page_purchasegold";*/
    		var w = dig_gold.getVersion();
    		if(w >=2600){
    			dig_gold.send({
                    'methodName' : 'openUrl',
                    'data' : {
                        'url' :'gbanker://page_purchasegold',
                        "params":{"orderID":""}
                    },
                    'responseCallback' : function (responseData) {}
                });
    		}else{
    			window.location.href = "gbanker://page_purchasegold";
    		}
    		
		});   
		
		//请更多好友帮我挖 
		$('.invite_friends').click(function(){
			//分享 
			dig_gold.share();
		});    	
		//点击分享按钮 
		$('.dig_again').click(function(){
			dig_gold.share();
		});
		// wait  事件 

		//点击领奖 打开遮罩
		$('#show_mask_div').click(function(){
			// 点击显示 遮罩
			showOne_hideOrters('mask_div');	
	    	 //隐藏所有人 挖矿结果
	    	$('#coupon_userList').hide();   
	    	//隐藏好友  挖矿结果
	    	$('#friends_userList').hide();  
		});
		//点击获取奖励 
		$('#get_bonus').click(function(){
			// 点击显示 遮罩
			var Rand = Math.random()*10;
			if(Rand > 5){
			  showOne_hideOrters('acquire-glod-dig');
			}else{
			  showOne_hideOrters('acquire-mostGlod-dig');
			}  
		});	
		//分享 按钮监听
		$('#button_share').bind("click",function () {
			var w = dig_gold.getVersion();
    		if(w >=2600){
    			dig_gold.send({
                    'methodName' : 'share',
                    'data' : {
                     'type':"1",//分享类型 1：新闻类分享  2：截图分享
                     'code' : 'goldMiner',//活动code，分享统计标示
                     'platform' : '1',//0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                     'needLogin' : '0',
                     'pushShareMark' : '1',//是否需要统计用户分享（挖金矿需求）
                    },
                    'responseCallback' : function (responseData) {}
                });
    		}else{
    			try{
    	    		var _code = "goldMiner";
    	        	window.location.href = "gbanker://share?code="+_code+"&needLogin=0&platform=1&pushShareMark=1";
    			}catch(e){}
    		}
    		setTimeout(function(){
				//location.href=basePath+"digGold/index";
				location.reload();
			},10);
			
	    });
	    $('#button_wx_share').bind("click",function () {
	    	var w = dig_gold.getVersion();
    		if(w >=2600){
    			dig_gold.send({
                    'methodName' : 'share',
                    'data' : {
                     'type':"1",//分享类型 1：新闻类分享  2：截图分享
                     'code' : 'goldMiner',//活动code，分享统计标示
                     'platform' : '2',//0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                     'needLogin' : '0',
                     'pushShareMark' : '1',//是否需要统计用户分享（挖金矿需求）
                    },
                    'responseCallback' : function (responseData) {}
                });
    		}else{
    			try{
    	    		var _code = "goldMiner";
    	        	window.location.href = "gbanker://share?code="+_code+"&needLogin=0&platform=2&pushShareMark=1";
    			}catch(e){}
    		}
    		setTimeout(function(){
				//location.href=basePath+"digGold/index";
				location.reload();
			},10);
	    	
	    });
    },
	//得到url的传值,按名字获取url中的参数 
    Request: function (argname) {
	    var url = document.location.href;
	    var arrStr = url.substring(url.indexOf("?")+1).split("&");
	    //return arrStr;
	    for(var i =0;i<arrStr.length;i++)
	        {
	        var loc = arrStr[i].indexOf(argname+"=");
	        if(loc!=-1)
	            {
	            return arrStr[i].replace(argname+"=","").replace("?","");
	            break;
	            }
	        }
	    return "";
	},
	//判断手机系统
	 getPlatform:function() {
			var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)){
				return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
			}
			return '';
	 },
	send:function(data){
		 if(dig_gold.getPlatform() == 'android') {
			 android_new.send(data);
	          }
	          
		 else {
	            ios.send(data);
	          }
	 },
	showOne_hideOrters:function(args)
	{
		// 页面 数组
		var arr =['gold-mine','no-dig','gold-dig','coupon-dig','userAndRule',
		'gold-yellow-dig','gold-nobodydig-dig','gold-somebodyhelp_nodig-dig',
		'gold-somebodyhelp_little-dig','gold-somebodyhelp_most-dig','mask_div',
		'acquire-glod-dig','acquire-mostGlod-dig','time-out-dig','digInfo-lodding'];		
		//数组长度 
		var length = arr.length;
		for(var i=0;i<length;i++){
			if(arr[i] ==args){
				$('.'+arr[i]).css("display","block");
			}else{
				$('.'+arr[i]).css("display","none");
			}
		}
	},
	getDigGoldData: function (data, callback) {
		// App 获取用户当日挖矿信息 
        var _url =basePath+"digGold/getUserDailyGoldMinerDetail?telephone="+data;	
        $.ajax({
            type: 'GET',
            url: _url,
            success: function (args) {
                try {                   
                    //回调 回传数据
                    callback(args)
                    //炫耀参数赋值
                    dig_gold.digData =args.digData;
                    if(args.digResultType=='1'){
                    	if(args.digData.isMaxAwardGoldWeight =='1'){
                    		dig_gold.type = 'mostGold'
                    	}else if(args.digData.isMaxAwardGoldWeight =='0'){
                    		dig_gold.type = "littleGold";            	
                    	}        	
                    }else if(args.digResultType=='2'){
                    	dig_gold.type ="coupon";
                    }
                    //debugger
                } catch (e) {
                	//异常 显示页面 lodding 页
        	    	dig_gold.showOne_hideOrters('digInfo-lodding');
		        	/*dig_gold.showOne_hideOrters('');
	              	//增加挖矿  监听
	              	dig_gold.dig_goldListener();*/
                    alert(args.msg);
                }
            },    		
            error: function () {
            	//异常 显示页面 lodding 页
    	    	dig_gold.showOne_hideOrters('digInfo-lodding');
                alert("获取用户数据失败，服务器错误");
            }
        });
    },
    //挖矿 api挖金矿接口
    digGold:function(){
		//当前 用户号码
		var _telephone =dig_gold.Request('telephone');
		$.ajax({
			type:"POST",
			// App 挖金矿接口 
			url: basePath+'digGold/dig',
			data: {
				"telephone":_telephone
			},
			beforeSend:function(){
				$(".gold-mine").hide();
			},
			dataType: 'json',
			complete:function(){
				Msg().loading().hide();
			},
			success: function(data, _textStatus) {
				if(data.success){
					var _digResultType = data.digResultType;
					var _index = parseInt(_digResultType);
					var _digData = data.digData;
					$("#userAndRule").show();					
					//炫耀参数赋值
                    dig_gold.digData =data.digData;
                    if(data.digResultType=='1'){
                    	if(data.digData.isMaxAwardGoldWeight =='1'){
                    		dig_gold.type = 'mostGold'
                    	}else if(data.digData.isMaxAwardGoldWeight =='0'){
                    		dig_gold.type = "littleGold";            	
                    	}        	
                    }else if(data.digResultType=='2'){
                    	dig_gold.type ="coupon";
                    }
					switch(_index){
						case -1:		  
				        	//未挖矿
				        	dig_gold.showOne_hideOrters('gold-mine');
				        	//增加挖矿  监听
				        	dig_gold.dig_goldListener();
							break;
						case 0:
							$(".no-dig").show();
							break;
						case 1:
							//判断是否最大
							if(data.digData.isMaxAwardGoldWeight =='0'){
						  		//不是最大红包 
				        		dig_gold.showOne_hideOrters('gold-dig');
				        		$('.gold-dig .goldNum2').html(data.digData.awardGoldWeight);	        		
				        		$('.gold-dig .top-content span').html(data.digData.encourageContent);	        		
				        		$('.gold-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0]);
				        		if(data.digData.giftStatus == '1'){
				        			$('.gold-dig .get_hongbao').val('立即拆红包')
				        		}else if(data.digData.giftStatus == '2'){
				        			$('.gold-dig .get_hongbao').val('查看红包')
				        		}else if(data.digData.giftStatus == '3'){
				        			$('.gold-dig .get_hongbao').val('查看红包')
				        		}
						  	}else if(data.digData.isMaxAwardGoldWeight =='1'){
						  		//金色 红包
				        		dig_gold.showOne_hideOrters('gold-yellow-dig');
				        		$('.gold-yellow-dig .goldNum2').html(data.digData.awardGoldWeight);	        		
				        		$('.gold-yellow-dig .top-content span').html(data.digData.encourageContent);	        		
				        		$('.gold-yellow-dig .goldEndTime').html(data.digData.expireDate.split(" ")[0]);
				        		if(data.digData.giftStatus == '1'){
				        			$('.gold-yellow-dig .get_hongbao').val('立即拆红包')
				        		}else if(data.digData.giftStatus == '2'){
				        			$('.gold-yellow-dig .get_hongbao').val('查看红包')
				        		}else if(data.digData.giftStatus == '3'){
				        			$('.gold-yellow-dig .get_hongbao').val('查看红包')
				        		}
						  	}
						  break;
						case 2:
							//代金券 显示
							$(".coupon-dig").show();    		
						    $('.coupon-dig .top-content span').html(data.digData.encourageContent);
						    $('.coupon-dig .top-des span').html(data.digData.deductibleTypeStr);
						    $('.coupon-dig .goldNum2').html(parseInt(data.digData.discountMoney)/100);	     	        		
						    $('.coupon-dig .goldEndTime').html(data.digData.endTime.split(" ")[0].split(" ")[0]);
						    $('.coupon-dig .coupon-dig_des').html(data.digData.useLimit+"  "+data.digData.useExplain);
							//金额赋值 
							break;
					}
				}else{
					$(".hammer").addClass("hammer-animation");
					$(".hammer").removeClass("hammer-break-animation");
					$(".mountain").css("background-image","url(imgs/mountain.png)");
					$(".gold-mine").show();
					Msg().alert(data.msg);
				}
			}
		});
	},
	share: function (){
		$("#digInfo").hide();//隐藏挖矿
		$('.rule-div').hide();//隐藏活动规则
		$("#shareInfo").show();
		//获取手机号
		var _telephone =dig_gold.Request('telephone');			
		var _code = "goldMiner";
		//获取 分享信息
		dig_gold.getShareInfo(_telephone,_code);		
	},
	getVersion:function(){
		var version,verson_new,weight;
	    if(dig_gold.Request('version')){
	         version = dig_gold.Request('version');
	         verson_new  = version.split('.');
	      	 weight = verson_new[0]*1000 + verson_new[1]*100 + verson_new[2]*10;
	    }
	 	return weight;
	},
	login:function(){
		var w = dig_gold.getVersion();
		if(w >=2600){
			dig_gold.send({
	             'methodName' : 'login',
	             'data' : {},
	             'responseCallback' : function (responseData) {}
	         });
		}else{
			//获取设备信息 
			var userAgent = navigator.userAgent.toLowerCase();
			var version = userAgent.match(/(iphone|android)/)[1];
			if(version == 'android'){
				android.login();
			}else if(version == 'iphone'){
				try{
				    iphone.setValue('login',0);
				}catch(e){}
			    window.webkit.messageHandlers.login.postMessage(0);
				//Msg().alert('请登录后再来挖矿');
			}
		}
		
	},
	//获取分享后 信息
	getShareInfo:function(telephone,code){
		$.ajax({
			type:"POST",
			url: basePath+'info/getShareInfo',
			data: {
				telephone:telephone,
				code:code
			},
			beforeSend:function(){
				Msg().loading().show();
			},
			complete:function(){
				Msg().loading().hide();
			},
			dataType: 'json',
			success: function(_data, _textStatus) {
				if(_data.success){
					// 分享成功 将信息填到 msg中
					$("#shareInfo #news_title").html(_data.title);
					$("#shareInfo #news_img").attr("src",_data.imageUrl);
					$("#shareInfo #news_body").html(_data.description);
				}
			}
		});
		
	},
}

//页面初始化  加载
$().ready(function () { 	
	//初始化  加载loading
	setTimeout(function(){Msg().loading().hide();},1000);
	//初始化页面
	dig_gold.init();	
});
