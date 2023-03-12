// 轮播图案例 自己写 1
//添加 总的执行
window.addEventListener("load", function () {
  // 一、按照ul 里面的 li 数量 添加圆圈效果
  // 1、获取 ul  里面 li 的数量
  var ul = document.querySelector(".focus ul");
  var ol = this.document.querySelector(".focus ol");

  // 二、鼠标移入 左右按钮显示，移除隐藏
  var btn_l = this.document.querySelector(".focus .left");
  var btn_r = this.document.querySelector(".focus .right");
  var focus = this.document.querySelector(".focus");
  focus.addEventListener("mouseenter", function () {
    btn_l.style.display = "block";
    btn_r.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    btn_l.style.display = "none";
    btn_r.style.display = "none";
    timer = setInterval(function () {
      btn_r.click();
    }, 2000);
  });
  // 四、点击圆圈实现图片跟随效果
  // 1、获取 ul 里面的 li 的序列号 给index
  //一、 2、给ol
  var focusWidth = focus.offsetWidth;
  for (var i = 0; i < ul.children.length; ++i) {
    var li = document.createElement("li");
    li.setAttribute("index", i);
    ol.appendChild(li);
    ol.children[i].addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; ++i) {
        ol.children[i].className = "";
      }
      this.className = "current";
      var index = this.getAttribute("index");
      num = index;
      animate(ul, -index * focusWidth);
    });
  }
  ol.children[0].className = "current";
  // 三、点击右按钮实现翻页效果
  // 1、缓动动画函数封装
  function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var left = obj.offsetLeft;
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
  // 2、复制第一张放在最后。
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 3、利用 ul offsetLeft。
  var num = 0;
  var circle = 0;
  // 点击右按钮
  var flag = true;
  btn_r.addEventListener("click", function () {
    if (flag) {
      flag = false;
      //如果到了最后一张
      if (num == ul.children.length - 1) {
        ul.style.left = 0 + "px";
        num = 0;
      }
      num++;
      animate(ul, -num * ul.children[0].offsetWidth, function () {
        flag = true;
      });
      // ul.style.left = -num * ul.children[0].offsetWidth + "px";
      // 四、圆圈跟随按钮的效果
      circle = num;
      // 到最后一个圆圈
      if (circle == ol.children.length) {
        circle = 0;
      }
      // 1、圆圈排他 效果
      circleChange();
    }
  });

  // 点击左按钮
  btn_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      //如果到了第一张
      if (num == 0) {
        ul.style.left = -ul.children.length * ul.children[0].offsetWidth + "px";
        num = ul.children.length - 1;
      }
      num--;
      animate(ul, -num * ul.children[0].offsetWidth, function () {
        flag = true;
      });
      // ul.style.left = -num * ul.children[0].offsetWidth + "px";
      // 四、圆圈跟随按钮的效果
      circle = num;
      // 到第一个圆圈
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      // 1、圆圈排他 效果
      circleChange();
    }
  });
  function circleChange() {
    for (var i = 0; i < ol.children.length; ++i) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }
  // 五、自动播放效果
  var timer = setInterval(function () {
    btn_r.click();
  }, 2000);
});
