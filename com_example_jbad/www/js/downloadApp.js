var type = 0;
var domain = window.location.host;
var protocol = window.location.protocol
var url = protocol + "//" + domain + "/shop-api/index/getVersion";

// var deviceType = 0;//pc:0;ios:1;android:-1
window.onload = function () {
//  deviceType = getDevice();
//  if (deviceType.ios || deviceType.iPad || deviceType.iPhone) {
//    document.getElementById("android").style.display = "none";

//  } else if (deviceType.android) {
//    document.getElementById("ios").style.display = "none";
    var isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger')
        != -1;
    if (isWeiXin) {
        document.getElementById("androidUrl").setAttribute('href', "https://a.app.qq.com/o/simple.html?pkgname=com.liil.liilapp");
        // var htmlStr = '<div  style="margin:200px auto;width:100%;text-align:center;line-height:1.8">'
        //     + '<img style="width:100px;height: 100px;" src="./images/zhuanzhuanxiong.png"  alt="">'
        //     + '<h3>赚赚熊提醒您</h3>' +
        //     '<p>请前往浏览器访问</p></div>'
        // $(".row").empty().append(htmlStr);
    } else {
        $.ajax({
            type: "GET",
            url: url,
            data: {phoneType: 0},
            dataType: "json",
            success: function (data) {
                downloadUrl = data.result.url;
                document.getElementById("androidUrl").setAttribute('href', downloadUrl);
            }
        });
    }

};

function getDevice() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };

    // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //     // ios暂未开放
    //     document.getElementById("android").style.display = "none";
    //     return 1;

    // } else if (/(Android)/i.test(navigator.userAgent)) {
    //     //判断Android
    //     document.getElementById("ios").style.display = "none";
    //     return -1;
    // } else {
    //     //pc
    //     return 0;
    // }
};