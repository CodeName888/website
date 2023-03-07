<%--
  Created by IntelliJ IDEA.
  User: ww247
  Date: 2019/7/9
  Time: 20:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=2.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
</head>
<style type="text/css">
    div.centerDiv {
        /*background: red;*/
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
<script src="../js/jquery-2.1.1.js"></script>
<body>
<div id="content"  class="centerDiv">
</div>
<div>

</div>
</body>
<script type="text/javascript">
  if (${result.code == 200}) {
    // 取相关的东西
    <%--if (${result.goodsUrl == null || result.goodsUrl == ''}) {--%>
      document.getElementById("content").innerHTML = "${result.content}"+"<br/>打开【taobao】即可抢购";
    // } else {
      <%--window.location.href = "${result.goodsUrl}";--%>
    // }
  }
</script>
</html>
