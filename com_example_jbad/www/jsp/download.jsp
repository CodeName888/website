<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>赚赚熊App下载</title>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/bootstrap.css" />

    <link rel="stylesheet" type="text/css" media="screen" href="./css/base.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="./css/index.css" />

</head>

<body>
    <!-- <div class="registerWrap row"> -->
    <div id="alertWarning" class="alert alert-warning"></div>
    <div id="alertSuccess" class="alert alert-success"></div>
    <div id="alertDefault" class="alert alert-default"></div>
    <div class="col-md-6 col-md-offset-3">
        <div class="page-header">
            <h1>搜罗全球好物</h1>
            <h1>尽享品质生活</h1>
            <p>自购省钱 分享赚钱 最高返佣</p>
            <img src="./images/register.png" alt="">
        </div>
        <div class="page-content col-md-6 col-md-offset-3">
            <h2>注册赚赚熊会员</h2>
            <p>注册即享100%返佣，最高可享150%以上</p>
            <form action="" style="margin: 0 auto;max-width: 520px;width: 88%;">
                <div class="form-item">
                    <img src="./images/phone.png" alt="">
                    <input type="text" placeholder="请输入手机号码" class="userName">
                </div>
                <div class="form-item">
                    <img src="./images/code.png" alt="">
                    <input type="text" placeholder="请输入手机验证码" class="code">
                    <a type="button" class="getCode" onclick="getCode()">获取验证码</a>
                </div>
            </form>
            <a type="submit" class="submit colorBtn  btn-default" onclick="register()">立即注册</a>
            <a class=" colorBtn" onclick="copy()">邀请码:<span id="inviteCode"></span></a><i class="glyphicon glyphicon-question-sign"></i>
            <a href="./downloadApp.jsp?" class=" colorBtn  btn-default">下载APP</a>
        </div>
        <!-- <div class="page-foot col-md-6 col-md-offset-3">
            <img src="./images/logo2.png" alt="">
        </div> -->
    </div>
    <!-- </div> -->
    <script src="./js/jquery-2.1.1.js"></script>
    <script src="./js/bootstrap.min.js"></script>

    <script src="./js/download.js"></script>

</body>

</html>