M.AutoInit();

// (function($){
//   $(function(){
//     $(".sidenav").sidenav();
//   });
// })(jQuery);

// $(document).ready(function(){
//   $('.sidenav').sidenav();
// });

document.addEventListener('DOMContentLoaded', function () {
    var elemCategory = document.querySelector('#category');
    M.Sidenav.init(elemCategory, {
        'draggable': true,
        'edge': 'right'
    });

    // var elemsCarousel = document.querySelectorAll('.carousel');
    // M.Carousel.init(elemsCarousel, {
    //     'dist': 0,
    //     'numVisible': 1,
    //     'duration': 500,
    //     'indicators': true,
    //     'fullWidth': false
    // });

    // var instCarousel = M.Carousel.getInstance(document.querySelector('.carousel'));
    // setInterval(function() {
    //     instCarousel.next();
    // }, 2000);
});