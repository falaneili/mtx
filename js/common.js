$(document).ready(function () {
  var b_name = navigator.appName;
  var b_version = navigator.appVersion;
  var version = b_version.split(";");
  if (version[1]) {
    var trim_version = version[1].replace(/[ ]/g, "");
    if (b_name == "Microsoft Internet Explorer") {
      if (trim_version == "MSIE7.0" || trim_version ==
        "MSIE6.0" || trim_version == "MSIE8.0") {
        $("body").append(
          '<div class="banbendi" style="width:100%;height:30px;background:#FFFF99;text-align:center;line-height:30px;color:#666666;position:absolute;top:0;left:0;" onClick="hid()">您的浏览器版本过低，会影响网页浏览，请使用更高版本的浏览器</div>'
        );
      }
    }
  }
});

function hid() {
  $(".banbendi").css("display", "none");
}

//导航菜单
window.onload = function () {
  $(function () {
    var hrefs = window.location.href.split('/')[window.location.href.split('/').length - 1].substr();
    $('.abouts-left-nav a').each(function () {
      var classify = $(this).attr('href');
      var crumbs = hrefs;
      if (classify.indexOf(crumbs) > -1)
        $(this).addClass("current");
    });
  });
}


if ($(window).width() >= 1025) {

  /*PC下拉菜单*/
  $('.nav>li').hover(function () {
    var sec_count = $(this).find('.sec li').length;
    var a_height = $(this).find('.sec li').eq(0).outerHeight(true);
    var sec_height = sec_count * a_height;
    $(this).find('.active').addClass("current");
    $(this).find('.sec').stop().animate({
      height: sec_height
    }, 300);
  }, function () {
    $(this).find('.active').removeClass("current");
    $(this).find('.sec').stop().animate({
      height: 0
    }, 300);
  });

} else if ($(window).width() <= 640) {
  /*wap下拉菜单*/
  $(".nav>li").each(function () {
    if ($(this).find("ul").hasClass("sec")) {
      $(this).find("a").attr('data-attr', "+");
      $(this).find(".active").attr("href", "javascript:void(0);");
    }
  });
  $('.nav>li').click(function () {
    if ($(this).find("ul").hasClass("sec")) {
      $(this).find(".sec").slideToggle();
      $(this).siblings().find(".sec").slideUp();
    }
  });

  function getStr() {
    if ($("#menu").css("left") == 0 + "px") {
      $(".offcanvas").css("display", "none");
      $("#menu").stop().animate({
        left: -270
      }, 300);
    } else {
      $(".offcanvas").css("display", "block");
      $("#menu").stop().animate({
        left: 0
      }, 300);
    }
  }

}


/*轮播图*/
var swiper = new Swiper('.banner-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

/*选项卡JS*/
$(document).ready(function () {
  $(".hnews-ct:gt(0)").hide();
  var hdw = $(".hnews-hd a");
  //hdw.hover(function() {
  //    $(this).addClass('current').siblings().removeClass('current');
  //});
  hdw.click(function () {
    $(this).addClass("on").siblings().removeClass();
    var hdw_index = hdw.index(this);
    $(".hnews-ct").eq(hdw.index(this)).show().siblings().hide();
  });
});