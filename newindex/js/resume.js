(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  showGrid();
})(jQuery); // End of use strict


function showGrid() {
    var showgrids = '';
    showgrids+=' <div class="container">';
    showgrids+='     <div class="row col-sm-12 col-lg-8 col-md-10  mx-auto">';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="#first_Grid">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/1.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Bristlebot</span>';
    showgrids+='                     <span class="description-body">Mimicking a reptile.</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="https://shz145.wixsite.com/telesignalization">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/2.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Telesignalization</span>';
    showgrids+='                     <span class="description-body">Telesignalization is a human relationship meansure.</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/music/musicindex.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/3.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Music Player</span>';
    showgrids+='                     <span class="description-body">New way to play music on your webpage.</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/Papercage.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/4.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Paper Cage</span>';
    showgrids+='                     <span class="description-body">A furniture that print by 3D material.</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/About.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity bg-white" src="../9images/5.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Personal Information</span>';
    showgrids+='                     <span class="description-body">Get to know more about me</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="https://hlou29.wixsite.com/coconutfactrory">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/6.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Coconut Factory</span>';
    showgrids+='                     <span class="description-body">A game design to have fun</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/creativeswitch.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/7.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Creative Switcher</span>';
    showgrids+='                     <span class="description-body">A switcher that makes your life better.</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/unitygame.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/8.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">Escape City</span>';
    showgrids+='                     <span class="description-body">Unity Game that make by personal drawing</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='         <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 item zoom-on-hover">';
    showgrids+='             <a class="lightbox" href="/thecup.html">';
    showgrids+='                 <img class="img-fluid image selectOpacity" src="../9images/9.png">';
    showgrids+='                 <span class="description">';
    showgrids+='                     <span class="description-heading">The Cup</span>';
    showgrids+='                     <span class="description-body">A 3D cup that makes by meshmixer</span>';
    showgrids+='                     </span>';
    showgrids+='             </a>';
    showgrids+='         </div>';
    showgrids+='     </div>';
    showgrids+='</div>';

    $("#showGrids").html(showgrids);
}