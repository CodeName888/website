<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>赚赚熊App下载</title>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/index.css"/>

</head>

<body style="background: #fff;color: #666;">

<div class="row download">
    <div class="col-md-6 col-md-offset-3">

        <div class="page-content col-md-6 col-md-offset-3">
            <img src="./images/zhuanzhuanxiong.png" alt="">
            <h1 class="large-font">赚赚熊商城</h1>
            <h1 class="large-font">zzx8848.com</h1>
            <p>你想要的都在这里</p>
        </div>
        <div class="page-foot col-md-6 col-md-offset-3">
            <!-- <%--<a type="button" class="anzuo-btn btn" id="android" onclick="downloadApp(0)">--%> -->
            <a type="button" id="androidUrl" class="anzuo-btn btn" id="android"
               href="https://liil-version.oss-cn-shanghai.aliyuncs.com/liil-version.apk">
                <img src="./images/anzuo.png" alt="">
                <span>Android版本下载</span>
            </a>
            <!-- <%--<a type="button" class="pg-btn btn" id="ios" onclick="downloadApp(1)">--%> -->
            <!-- <%--<a type="button" class="pg-btn btn" id="ios"--%> -->
            <!-- <%--href="itms-services://?action=download-manifest&url=https://liil-ios.oss-cn-shanghai.aliyuncs.com/liil-prod.plist">--%> -->
            <a type="button" class="pg-btn btn" id="ios"
               href="https://apps.apple.com/cn/app/%E7%8B%B8%E7%8B%B8/id1463959197">
                <!-- <a type="button" class="pg-btn btn" id="ios" onclick="javascript:alert('ios暂未开放');"> -->
                <img src="./images/pg.png" alt="">
                <span>iOS版本下载</span>
            </a>
        </div>
    </div>
</div>
<script src="./js/jquery-2.1.1.js"></script>
<script src="./js/downloadApp.js"></script>

</body>

</html>