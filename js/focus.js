window.addEventListener("load", function () {
  var focus = document.querySelector(".main .focus");
  var as = document.querySelectorAll(".main .focus a");
  var leftBtn = document.querySelector(".main .focus .left");
  var rightBtn = document.querySelector(".main .focus .right");

  // 鼠标经过按钮出现
  focus.addEventListener("mouseenter", function () {
    leftBtn.style.display = "block";
    rightBtn.style.display = "block";
    clearInterval(timer);
    timer = null; //清除定时器变量
  });
  focus.addEventListener("mouseleave", function () {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    timer = setInterval(function () {
      rightBtn.click();
    }, 2000);
  });

  // 动态生成小圆圈
  // 创建节点
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector("ol");
  var focusWidth = focus.offsetWidth;
  for (var i = 0; i < ul.children.length; ++i) {
    var li = document.createElement("li");
    // 记录当前小圆圈的索引号，自定义属性
    li.setAttribute("index", i);
    ol.appendChild(li);
    ol.children[i].addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; ++i) {
        ol.children[i].className = "";
      }
      this.className = "current";
      // 点击圆圈到相应的图片
      console.log(focusWidth);
      // 获得当前 点击的 元素的 索引号
      var index = this.getAttribute("index");
      num = index;
      animate(ul, -index * focusWidth);
    });
  }
  ol.children[0].className = "current";

  // 小圆圈的排他思想  可以直接和上面的  for  循环合并
  // for (var i = 0; i < ol.children.length; ++i) {
  //   ol.children[i].addEventListener("click", function () {
  //     for (var i = 0; i < ol.children.length; ++i) {
  //       ol.children[i].className = "";
  //     }
  //     this.className = "current";
  //   });
  // }

  // 左右滑动封装的函数
  function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      if (obj.offsetLeft == target) {
        clearInterval(obj.timer);
        if (callback) {
          callback();
        }
      } else {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
      }
    }, 15);
  }
  // 点击左右按钮实现切换效果
  // 复制第一张，放到最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  var num = 0;
  var circle = 0;
  // 节流阀
  var flag = true;

  // 左侧按钮
  leftBtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      // 此处放想要节流的内容，在内容里面的最后一行打开水龙头：
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -focusWidth * num + "px";
      }
      num--;
      animate(ul, -focusWidth * num, function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });
  // 右侧按钮
  circle = num;
  rightBtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      // 此处放想要节流的内容，在内容里面的最后一行打开水龙头：
      if (num === ul.children.length - 1) {
        ul.style.left = 0 + "px";
        num = 0;
      }
      num++;
      animate(ul, -focusWidth * num, function () {
        flag = true;
      });
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      // 逻辑使：点击右侧按钮，先判断是不是最后一张，如果是就把圆圈和 left 归位，如果不是就继续运行。为下一次运行做准备： num  和 circle 都自增 ；判断 circle  的值 超过圆圈数量就归零。
      // num   和   circle  终归是不一样的，
      circleChange();
    }
  });
  function circleChange() {
    for (var i = 0; i < ol.children.length; ++i) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }
  // 自动播放效果
  // var timer = this.setInterval(function () {
  //   rightBtn.click();
  // }, 2000);
});
