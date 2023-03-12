$(function () {
  // 电梯导航
  var tooltop = $(".recom").offset().top;
  var flag = true;
  toggleTool();
  geta();
  function geta() {
    if (flag) {
      // 背景颜色和内容的匹配
      $(".floor .floor1").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top - 300) {
          $(".fixedtool li")
            .eq(i)
            .addClass("current")
            .siblings()
            .removeClass("current");
        }
      });
    }
  }
  $(window).scroll(function () {
    toggleTool();
    geta();
  });
  function toggleTool() {
    if ($(document).scrollTop() >= tooltop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }
  // 点击导航界面滚动到相应区域
  $(".fixedtool li").click(function () {
    flag = false;
    // 每次点击l 就计算出页面要去往的位置
    var current = $(".floor .floor1").eq($(this).index()).offset().top;
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          flag = true;
        }
      );
    // li 和背景颜色的匹配
    $(this).addClass("current").siblings("li").removeClass("current");
  });
});
