var code = "";
var gradeId = "";
var inviteCode = "";

// 是否是微信浏览器
var isWeiXin = false;

var mobile = "";
var openId = "";
var timer;

function getReplaceUrl() {
  var redirect_uri = encodeURIComponent(
    // "http://192.168.1.224:8080/shop-api/index.jsp?gradeId=" +
    // gradeId + "&inviteCode=" + inviteCode);
  "http://test.tmabt.com/shop-api/index.jsp?gradeId="
  + gradeId + "&inviteCode=" + inviteCode);
  console.log("url===" + redirect_uri);
  return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx49f1b0d55f0fa4cf&response_type=code" +
    "&redirect_uri=" + redirect_uri +
    "&scope=snsapi_base&state=123456#wechat_redirect";
}

function pay() {
  /**判断是否是微信浏览器，不是微信浏览器就不支付 */
  // 是
  if (isWeiXin) {
    var commonOrderData = commonOrder();
    console.log(commonOrderData)

    function onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": commonOrderData.appId, //公众号名称，由商户传入
          "timeStamp": commonOrderData.timeStamp, //时间戳，自1970年以来的秒数
          "nonceStr": commonOrderData.nonceStr, //随机串
          "package": commonOrderData.package,
          "signType": commonOrderData.signType, //微信签名方式：
          "paySign": commonOrderData.paySign //微信签名
        },
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // alert("支付成功")
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else {
            alert(res.err_msg);
            // alert("支付失败")
          }
        });
    }

    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }

}

/**统一下单 */
function commonOrder() {
  var commonOrderResult = {};
  mobile = $(".userName").val();
  if (openId != '' && openId != null && openId != undefined) {
    $.ajax({
      type: "post",
      url: "../shop-api/pay/commonOrder",
      data: {
        pay_type: 1,
        pay_way: 1,
        attach: gradeId,
        mobile: mobile,
        openid: openId
      },
      dataType: 'json',
      async: false,
      success: function (result) {
        commonOrderResult = result.result;
        // timeStamp = result.result.timeStamp;
        // appid = result.result.appid;
        // nonceStr = result.result.nonceStr;
        // package = result.result.package;
        // signType = result.result.signType;
        // paySign = result.result.paySign;
      },

    })
    return commonOrderResult;
  } else {
    // alert("请前往微信浏览器打开1")
  }

}

/**
 * 根据ID获取段位信息,废弃
 */
// function getCustGradeRuleById() {
//   var custGradeInfo = {};
//   $.ajax({
//     type: "post",
//     url: "../shop-api/custGradeRule/getCustGradeRuleById",
//     data: {
//       id: gradeId
//     },
//     dataType: 'json',
//     async: false,
//     success: function (result) {
//       custGradeInfo = result.result;
//       $('.custGrade').text(custGradeInfo.gradeName);
//       $('.payMoney').text(custGradeInfo.gradePrice);
//     },
//   })
//   return custGradeInfo;
// }

/**
 * 微信授权，获取openId
 *
 */
function getAuthInfo() {
  if (code != null && code != '' && code != undefined) {
    code = encodeURI(code);
    $.ajax({
      type: "post",
      url: "../shop-api/wxAuth/getAuthInfo",
      data: {
        code: code
      },
      async: false,
      dataType: 'json',
      success: function (result) {
        if (result.code == 200) {
          console.log("openId=" + result.result.openid);
          openId = result.result.openid;
        } else {
          // alert("getAuthInfo1")
          window.location.replace(getReplaceUrl());
        }
      },
    })
    return openId;
  } else {
    // alert("getAuthInfo1111")
    window.location.replace(getReplaceUrl());
  }
}

/**
 * 获取验证码
 */
function getCode() {
  mobile = $(".userName").val();
  if (mobile != '' && mobile != null && mobile != undefined) {
    if (isTelOrMobile(mobile)) {
      $.ajax({
        type: "GET",
        url: "../shop-api/verifyCode/getCode?type=1&mobile=" + mobile,
        dataType: 'json',
        success: function (data) {
          console.log(data)
          if (data.code == 200) {
            time(59)
            $(".payBtn").attr("disabled", false).removeClass("disabledPay");
          } else {
            $(".payBtn").attr("disabled", true).addClass("disabledPay");
            alert(data.message);
          }
        },
      })
    } else {
      alert("请填写正确的手机号码")
    }

  } else {
    alert("请填写手机号")
  }
}

/**
 * 手机号码判断
 */
function isTelOrMobile(telephone) {
  var teleReg = /^((0\d{2,3})-)(\d{7,8})$/;
  var mobileReg = /^1[3456789]\d{9}$/;
  if (!teleReg.test(telephone) && !mobileReg.test(telephone)) {
    return false;
  } else {
    return true;
  }
}

function register() {
  mobile = $(".userName").val();
  var verificationCode = $('.code').val();
  // alert("../shop-api/register/mobile?inviteCode=" + inviteCode + "&mobile=" +
  //   mobile +
  //   "&verificationCode=" + verificationCode);
  if (verificationCode != '' && verificationCode != null && verificationCode !=
    undefined && mobile != '' && mobile != null && mobile != undefined) {
    $.ajax({
      type: "GET",
      url: "../shop-api/register/mobile?inviteCode=" + inviteCode + "&mobile=" +
        mobile +
        "&verificationCode=" + verificationCode,
      dataType: 'json', // 请求方式为json
      success: function (data) {
        console.log(data)
        if (data.code == 200) {
          pay();
        } else {
          alert(data.message);
        }
      },
    })
  } else {
    alert("请先填写验证码或手机号");
  }
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) {
    return unescape(r[2])
  };
  return null; //返回参数值
}

/**
 * 验证码倒计时
 */
function time(timeNum) {
  clearInterval(timer); //这句话至关重要
  timer = setInterval(function () {
    if (timeNum <= 0) {
      // clearInterval(timer);
      $('.getCode').text("");
      $('.getCode').text("点击重新发送");
      $('.getCode').attr("disabled", false).removeClass("disabledPay");
    } else {
      $('.getCode').attr("disabled", true).addClass("disabledPay").css({
        paddingRight: "10px",
        border: "none"
      });
      $('.getCode').text("");
      $('.getCode').text("剩余" + (timeNum) + "秒");
      timeNum--;
    }
  }, 1000);
}

function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase();
  if (agent.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function initData(gradeId) {
  var custGradeInfo = {};
  var listGradeDetails = [];
  var imagesList = ['./images/money.png', './images/pay.png', './images/wallet.png', './images/reward.png']
  $.ajax({
    type: "post",
    url: "../shop-api/index/getOneGradeDescriptionThanCust",
    data: {
      gradeId: gradeId
    },
    async: false,
    dataType: 'json',
    success: function (result) {
      if (result.code == 200) {
        console.log(result);
        custGradeInfo = result.result[0];
        listGradeDetails = custGradeInfo.listGradeDetails;
        $('.gradeName').text(custGradeInfo.gradeName);
        $('.gradePrice').text(custGradeInfo.gradePrice);
        for (var i = 0; i < listGradeDetails.length; i++) {
          console.log(imagesList[i])
          $(".listGradeDetails").append("<li class='flexSta'><img src=" + imagesList[i] + " alt='' style='flex:1'><p style='flex:9'><span class='small'>" + listGradeDetails[i].subTitle + "</span><span class='greyColor'>" + listGradeDetails[i].content + "</span></p></li>");

          // console.log($(".listGradeDetails").html())
        }
      } else {}
    },
  })
}
$(document).ready(function () {
  isWeiXin = isWeixinBrowser();
  //从页面的url上获取参数
  gradeId = getUrlParam("gradeId");
  code = getUrlParam("code");
  inviteCode = getUrlParam("inviteCode");
  console.log(inviteCode);
  var htmlStr = '<div  style="margin:200px auto;width:100%;text-align:center">' +
    '<h1>赚赚熊提醒您</h1>' +
    '<p>请使用微信登陆</p></div>'
  if (!isWeiXin) {
    $("body").empty();
  } else {
    initData(gradeId)
    //   getCustGradeRuleById();
    openId = getAuthInfo();
  }

})