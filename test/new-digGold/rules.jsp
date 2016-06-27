<%@ page language="java"
	import="java.util.*,com.gbanker.base.util.PropertiesUtils"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
    String basePath = "https://"+request.getHeader("Host")+"/";
    String httpsBasePath = basePath;
    if (PropertiesUtils.isTestMode()) {
       basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
       httpsBasePath = basePath;
    }
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <title>活动规则</title>
<link rel="shortcut icon" href="<%=basePath %>statics/images/package/favicon.ico">
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="description"
	content="我抢到了黄金钱包派送的金子，快跟上我的脚步！">
<meta name="keywords" content="黄金钱包官网,黄金,金价,黄金价格,实物黄金,投资金条,黄金投资">
<meta name="format-detection" content="telephone=no,email=no">
    <link rel="stylesheet" href="css/digGold.css">
</head>
<body id="rules">
<div class="rainbow-radial-gradient">
    <div class="rule_content">
    <div class="pre_content">1、</div><p>登录后才能开始挖金矿,每人每天都有一次挖金矿的机会;</p>    
    <div class="pre_content">2、</div><p>挖金矿时间为每日6:00—22:00;</p>
    <div class="pre_content">3、</div><p>挖金矿奖励分为黄金和买金券两类，奖励的黄金以红包形式发放到“我的红包”中,买金券会发放至“我的优惠券”,请在有效期内领取;</p>
    <div class="pre_content">4、</div><p>如果第一次没有挖中，可以通过完成任务获得再挖一次的机会或者分享给朋友让朋友来帮您挖金矿;</p>
    <div class="pre_content">5、</div><p>系统会在22点时,自动生效当日最高奖励,生效后请前往“我的红包”兑换领取;</p>
    <div class="pre_content">6、</div><p>本活动最终解释权归黄金钱包所有.</p>
    </div>
</div>
</body>
</html>