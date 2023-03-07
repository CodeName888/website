var mobile = "";
var inviteCode = "";
var timer;
var timeout;

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
                        message(data.message, 0);
                    }
                },
            })
        } else {
            message("请填写正确的手机号码", 0)
        }

    } else {
        message("请填写手机号", 0)
    }
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
                if (data.code == 200) {
                    message("恭喜您已成功注册赚赚熊会员", 1);
                    window.location.href = "downloadApp.jsp"
                } else {
                    message(data.message, 0);
                }
            },
        })
    } else {
        message("请先填写验证码或手机号", 0);
    }
}

function message(msg, type) {
    clearTimeout(timeout)
    if (type === 0) {
        $("#alertWarning").css("display", "block")
        $("#alertWarning").html(msg)
        timeout = setTimeout(function () {
            $(".alert").css("display", "none")
        }, 3000)
    } else if (type === 1) {
        $("#alertSuccess").css("display", "block")
        $("#alertSuccess").html(msg)
        timeout = setTimeout(function () {
            $(".alert").css("display", "none")
        }, 3000)
    } else {
        $("#alertDefault").css("display", "block")
        $("#alertDefault").html(msg)
        timeout = setTimeout(function () {
            $(".alert").css("display", "none")
        }, 3000)
    }


}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return unescape(r[2])
    }
    ;
    return null; //返回参数值
}

// 复制
function copy() {
    var copyEle = document.getElementById("inviteCode");
    window.getSelection().selectAllChildren(copyEle);
    var result = document.execCommand("Copy");
    console.log(document.execCommand("Copy"))
    if (result) {
        message("已复制到剪切板", 2);
    } else {
        message("请长按复制", 0);
    }

}

$(document).ready(function () {
    inviteCode = getUrlParam("inviteCode");
    console.log($("#inviteCode"))
    $("#inviteCode").html(inviteCode)

})