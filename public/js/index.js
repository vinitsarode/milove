var $item = $('.carousel-item');
var $wHeight = $(window).height();

$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel-img').each(function() {
  var $src = $(this).attr('src');
  // var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    // 'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});

      

// $(function(){
//   $(document).scroll(function(){
//     var $nav = $("#mainNavbar");
//     $nav.toggleClass("scrolleditem", $(this).scrollTop() > $nav.height());
//   })
// })    





// detect scroll top or down
if ($('.navbar').length > 0) { // check if element exists
    var last_scroll_top = 0;
    $(window).on('scroll', function() {
        scroll_top = $(this).scrollTop();
        if(scroll_top < last_scroll_top) {
            $('.navbar').removeClass('scrolled-down').addClass('scrolled-up');
        }
        else {
            $('.navbar').removeClass('scrolled-up').addClass('scrolled-down');
        }
        last_scroll_top = scroll_top;
    });
}





// $('.events.dropdown-toggle').prop('disabled', true);

const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";
 
$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown.hover(
      function() {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function() {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});

// $(function(){
//     $(document).scroll(function(){
//       var $nav = $("#mainNavbar");
//       if($(this).scrollTop > $nav.height()){
//         $nav.toggleClass("scrollednav", $(this).scrollTop() > $nav.height())
//       }
//       else{
//         $nav.toggleClass("scrolled", $(this).scrollTop() > $item.height());
//       }
//   })
// })

// $(document).ready(function(){
//   $(window).scroll(function(){
//     var $nav = $("#mainNavbar");
//   	var scroll = $(window).scrollTop();
// 	  if (scroll > $nav.height()) {
// 	    $nav.toggleClass("scrollednav", $(this).scrollTop() > $nav.height())
// 	  }

// 	  else{
// 		  $nav.toggleClass("scrolled", $(this).scrollTop() > $item.height());  	
// 	  }
//   })
// })


$(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});