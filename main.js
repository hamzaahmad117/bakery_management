// Animation on scroll
AOS.init({
  duration: 800,
  easing: "slide",
});
// alert("hello from frontend");

document.addEventListener('DOMContentLoaded', function () {
    var userInfoElement = document.getElementById('user-info');
    var loginBtnElement = document.getElementById('login-btn');
    var logoutBtnElement = document.getElementById('logout-btn');
    var viewOrderElement = document.getElementById('order-view');

    // Check if 'user' item exists in local storage
    var user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
      userInfoElement.innerHTML = '<span class="nav-link">Hello, ' + user.FName + '</span>';
        viewOrderElement.style.display = 'block';
        loginBtnElement.style.display = 'none';
        logoutBtnElement.style.display = 'block';
    } else {
        userInfoElement.innerHTML = '';
        loginBtnElement.style.display = 'block';
        logoutBtnElement.style.display = 'none';
    }

    // Add click event listener to logout button
    logoutBtnElement.addEventListener('click', function () {
        // Clear user information from local storage
        localStorage.removeItem('user');
        // Redirect to login page
        window.location.href = 'loginPopUp.html';
    });
});

function login()
  {
    var btn = document.getElementsByClassName('logBtn');
    var button=btn[0]
// Now you can work with the button, for example, adding an event listener
button.addEventListener('click', function() {
     window.location.href = 'loginPopUp.html';
});
}
login();

  // SIGNUP BUTTON SCRIPT
    var order = document.getElementById('order_cake');
    order.addEventListener('click', function () {
        window.location.href = 'menu.html';
    });


(function ($) {
  "use strict";
  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  //   full height
  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight(); //call that function

  // navbar scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");
      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }

      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }
        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }

      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  $.Scrollax();

  //   carousel
  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: true,
      dots: false,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class = 'ion-ios-arrow-back'></span>",
        "<span class = 'ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
    $(".carousel-testimony").owlCarousel({
      loop: true,
      autoplay: true,
      center: true,
      margin: 30,
      nav: false,
      stagePadding: 0,
      items: 1,
      navText: [
        "<span class = 'ion-ios-arrow-back'></span>",
        "<span class = 'ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  };
  carousel();

  var counter = function () {
    $("#section-counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_seperator_number_step = $.animateNumber.numberStepFactories.separator(
            ","
          );
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_seperator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();
  

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn` ftco-animated`");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  $("#book_date").datepicker({
    format: "m/d/yyyy",
    autoclose: true,
  });
  $("#book_time").timepicker();
})(jQuery);
