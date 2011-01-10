#gLoad a Jquery based lazy loading plugin for image galleries

[*Simple usage*]

Sample Markup:
<span class="lazy-img" data-src="images/img1.jpg"></span>
    <br /><br />
    <span class="lazy-img" data-src="images/img2.jpg"></span>
    <br /><br />
    <span class="lazy-img" data-src="images/img3.jpg"></span>
  
Simple:
$(function() {
    $('.lazy-img').gLoad();
});

With prelader:
$(function() {
    $('.lazy-img').gLoad({placeholder : 'images/loading-small.gif', effect : 'fadeIn', placeholderAsBg : true});
});

[*Options*]

placeholder - path to image to preload. Default none.

placeholderAsBg - Will use the placeholder image as a css style background image positioned center center. Default false.

effect - The Jquery effect to run when the image in loaded. Default none.

event - The Jquery event to fire. Default "scroll"

container - Context. Default window.
