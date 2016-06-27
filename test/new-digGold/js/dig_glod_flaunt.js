/*
**autor:tianyuyan
**date:2016-3-25
**des:dig_gold_actity
*/
//定义
var dig_glod_flaunt ={	
    init: function (a) {
        //初始化 从url中获取 传回参数(挖矿毫克数，显示文字，有效期等)
    	var jsonData =JSON.parse(decodeURIComponent(dig_glod_flaunt.Request('data')));
    	//console.log(jsonData);
    	var type = dig_glod_flaunt.Request('type')
        //初始化 lodding ,type为炫耀页面类型 
    	if(type!=""){
    		if(type=='coupon'){
                dig_glod_flaunt.loading(type,jsonData);  
    		}  else if(type=='littleGold'){
                dig_glod_flaunt.loading(type,jsonData);  
    		} 	  else if(type=='mostGold'){
                dig_glod_flaunt.loading(type,jsonData);  
    		} 	
    	}
    },
    loading: function (type,data) {    	
    	//页面渲染
    	// type ='littleGold' 是 少量黄金  ，type ='mostGold' 是 大量黄金 ，type ='coupon' 是买金券
	    switch (type)
		{
			case 'littleGold':		
				 //炫耀少量黄金
				 dig_glod_flaunt.showOne_hideOrters('gold-dig');			  
        		 $('.gold-dig .goldNum2').html(data.awardGoldWeight);	              		
        		 $('.gold-dig .goldEndTime').html(data.expireDate.split(" ")[0]);
				 break;
			case 'mostGold':		
				 //炫耀大量-最多黄金	
				 dig_glod_flaunt.showOne_hideOrters('gold-yellow-dig');
				 $('.gold-yellow-dig .goldNum2').html(data.awardGoldWeight);	        		
        		 $('.gold-yellow-dig .top-content span').html("今日全世界只有我挖出100毫克黄金");	        		
        		 $('.gold-yellow-dig .goldEndTime').html(data.expireDate.split(" ")[0]);
				 break;
			case 'coupon':			
				 //炫耀 优惠券
				 dig_glod_flaunt.showOne_hideOrters('coupon-dig');	
				 $('.coupon-dig .top-des span').html(data.deductibleTypeStr);
				 $('.coupon-dig .goldNum2').html(parseInt(data.discountMoney)/100);	     	        		
				 $('.coupon-dig .coupon-dig_date .goldEndTime').html(data.endTime.split(" ")[0]);
				 $('.coupon-dig .coupon-dig_des').html(data.useLimit+"  "+data.useExplain);
				 break;
		    default:
		    	//异常处理
		    	dig_glod_flaunt.showOne_hideOrters('error-page');
		    	alert("参数有问题")
		    break;
		}	
	    //打印 获取随机文字	
	    $('.txet_content span').html(dig_glod_flaunt.getText())
    },   
    //获取随机 文字
    getText:function(n) {       
    	var chars  = ['我是个俗人，只对万~恶~的黄金感兴趣',
    	             '几百亿我分分钟搞定，但是挖金，是我一辈子的事业',
    	             '我从没见过zhé么大的金子，OMG',
    	             '我囤的黄金比美联储的金库都多！',
    	             '做一个幸福的人，喂马，劈柴，挖金矿！',
    	             '哥伦布发现了新大陆，我发现了wā金矿',
    	             '只有挖到黄金才能抚慰我股市的心桑-_-!!!',];
    	var length =chars.length;
    	var index  =Math.floor(Math.random()*length);    
    	return chars[index];
    },
    //获取url的参数
    Request:function(argname){
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
    showOne_hideOrters:function(args)
	{
		// 页面div数组
		var arr =['coupon-dig','gold-yellow-dig','gold-dig','error-page'];		
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
};
//模块化定义 module.exports = dig_glod_flaunt;
$().ready(function () { 
	//初始化页面
	dig_glod_flaunt.init();	
});
