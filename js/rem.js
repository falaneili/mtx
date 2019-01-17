/*
    # 按照宽高比例设定html字体, width=device-width initial-scale=1版
      /*************************************************
      ***PC端配置
      *
      designWidth: 1920,   //PC端设计稿宽度 必选
      designFontSize: 12,  //PC端设计稿字号 可选 默认12
      viewW: view,
      unit: '%'            //PC端字号单位
      应用方式：12px -> 120%，13px->130%, 14px->140% 以此类推
      
      /*************************************************
      ***移动端配置
      *
      designWidth: 640,    //Mobile端设计稿宽度 必选
      designFontSize: 20,  //Mobile端设计稿字号 可选 默认20
      viewW: view,
      unit: 'px'           //Mobile端字号单位
      应用方式：8px -> .8rem，13px->1.3rem, 20px->2rem 以此类推

    # ps:请尽量第一时间运行此js计算字体
*/

//事件注册
function addEventRem(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);//DOM2.0
    return true;
  }
  else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);//IE5+
    return r;
  }
  else {
    elm['on' + evType] = fn;//DOM 0
  }
}

function argu(){
  var view = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(view > 750){
    return {
      designWidth: 1920,
      designFontSize: 12,
      viewW: view,
      unit: '%'
    }
  }else{
    return {
      designWidth: 750,
      designFontSize: 16,
      viewW: view,
      unit: 'px'
    }
  }
}

function rem(){
  var option = argu(),
      unit = option.unit,
      designHeight = option.designHeight || 0,
      designWidth = option.designWidth,
      designFontSize = option.designFontSize,
      viewWidth = option.viewW,
      win = window,
      root = document.documentElement,
      newSize;

  //返回root元素字体计算结果
  function _getFontSize() {
    if(unit == 'px'){ //移动端
      var scale = designHeight !== 0 ? Math.min(win.innerWidth / designWidth, win.innerHeight / designHeight) : win.innerWidth / designWidth;
      return parseInt( scale * 10000 * designFontSize ) / 10000;
    }else { //PC端
      var scale = (viewWidth * 62.5) / designWidth;
      return scale;
    }
  }

  newSize = _getFontSize();
  //html根元素设置字号
  if(unit == 'px'){
    root.style.fontSize = newSize + "px";
    return false;
  }else{
    root.style.fontSize = newSize + "%";
    return false;
  }
}

addEventRem(window, 'resize', rem);
rem();