var move = require('./move.js')

function a2d(n) {
  return n * 180 / Math.PI;
}

function hoverDir(elem, ev) {
  // var a = ev.clientX - (elem.offsetLeft + elem.offsetWidth / 2);
  // var b = elem.offsetTop + elem.offsetHeight / 2 - ev.clientY;
  // return Math.round((a2d(Math.atan2(b, a)) + 180) / 90) % 4;

  var w = elem.offsetWidth;
  var h = elem.offsetHeight;
  var x = (ev.clientX - elem.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
  var y = (ev.clientY - elem.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);

  // console.log(`w: ${w} h: ${h} \n e.pageX: ${ev.pageX} e.pageY: ${ev.pageX} \n offset().left: ${elem.offsetLeft} offset().top: ${elem.offsetTop}`)

  return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
  
}

function through(elem) {
  var elWidth = elem.offsetWidth;
  var elHeight = elem.offsetHeight;
  elem.onmouseenter = function (ev) {
    var oEvent = ev || event;
    var oS = this.children[1];
    var dir = hoverDir(elem, oEvent);
    switch (dir) {
      case 0: // 上
        oS.style.left = 0;
        oS.style.top = -elWidth + 'px';
        break;
      case 1: // 右
        oS.style.left = elWidth + 'px';
        oS.style.top = 0;
        break;
      case 2: // 下
        oS.style.left = 0;
        oS.style.top = elHeight + 'px';
        break;
      case 3: // 左
        oS.style.left = -elHeight + 'px';
        oS.style.top = 0;
        break;
    }
    move(oS, {
      left: 0,
      top: 0
    }, {
      duration: 300,
      easeing: 'linear'
    });
  }
  elem.onmouseleave = function (ev) {
    var oEvent = ev || event;
    var oS = this.children[1];
    var dir = hoverDir(elem, oEvent);
    switch (dir) {
      case 0:
        move(oS, {
          left: 0,
          top: -elHeight
        }, {
          duration: 300,
          easing: 'linear'
        });
        break;
      case 1:
        move(oS, {
          left: elWidth,
          top: 0
        }, {
          duration: 300,
          easing: 'linear'
        });
        break;
      case 2:
        move(oS, {
          left: 0,
          top: elHeight
        }, {
          duration: 300,
          easing: 'linear'
        });
        break;
      case 3:
        move(oS, {
          left: -elWidth,
          top: 0
        }, {
          duration: 300,
          easing: 'linear'
        });
        break;
    }
  };
}
window.onload = function () {
  var box = document.getElementsByClassName("cont-box");
  for (var i = 0; i < box.length; i++) {
    through(box[i])
  }

}