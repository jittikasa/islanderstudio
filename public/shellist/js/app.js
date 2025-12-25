(function ($) {

	"use strict";

	/*
	======================================
		Fix scroll position on page load
	======================================
	*/
	(function() {
		// Disable scroll restoration to prevent browser from jumping to previous position
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		// Force scroll to top on page load
		$(window).on('beforeunload', function() {
			$(window).scrollTop(0);
		});

		// Ensure page starts at top
		$(document).ready(function() {
			window.scrollTo(0, 0);
			$('html, body').scrollTop(0);
		});

		// Prevent default behavior for all # links
		$(document).on('click', 'a[href="#"]', function(e) {
			e.preventDefault();
			return false;
		});
	})();

	(function() {

		$(window).on('load', function() {
			/*
			======================================
				AOS JS
			======================================
			*/
			(function() {
				AOS.init({
					once: true,
					duration: 800
				});
			})();


			/*
			======================================
				Isotope Plugin Init
			======================================
			*/

			if( $('#miwlo-all-projects').length ) {
				$('#miwlo-all-projects').isotope({
					itemSelector: '.grid-item',
					percentPosition: true,
					transformsEnabled: true,
					transitionDuration: "1000ms",
					masonry: {
						columnWidth: '.grid-sizer',
						horizontalOrder: true
					}
				});
			}

		});

	})();


	/*
	======================================
		Scroll Init
	======================================
	*/
	(function() {

		$(window).on('scroll', function() {

			var $headerH 	= jQuery('.header-area').height();
			var $windowH 	= jQuery(window).scrollTop();
			var $nav 		= jQuery('.header-area');
			var $mNav		= jQuery('.saastrace-mobile-menu-area');

			if( $windowH > $headerH ) {
				$nav.addClass('fixed');
				$mNav.addClass('fixed');
			} else {
				$nav.removeClass('fixed');
				$mNav.removeClass('fixed');
			}

		});
	})();

	if( $('.miwlo-parallax').length ) {
		$('.miwlo-parallax').parallax({
			scalarX: 10.0,
			scalarY: 10.0,
		});
	}


	/*
	======================================
		App Screenshot Slider Init
	======================================
	*/

	(function() {

		if( $('.miwlo-app-screenshot-slide').length ) {
			var ScreenshotSlider = new Swiper( '.miwlo-app-screenshot-slide', {
				paginationClickable: true,
				effect: 'coverflow',
				lazyLoadingInPrevNext: true,
				loop: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				initialSlide: 0,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				coverflowEffect: {
					rotate: 0,
					stretch: 60,
					depth: 150,
					modifier: 1.2,
					slideShadows: false,
				}
			});
		}

	})();

	

	/*
	======================================
		Testimonial v1
	======================================
	*/
	(function() {
		if( $('.miwlo-app-testimonial-slide-container').length ) {
			var testimonial = new Swiper( '.miwlo-app-testimonial-slide-container', {
				pagination: {
					el: '.testimonial-pagination',
					clickable: true,
					renderBullet: function (index, className) {
					  return '<div class="' + className + '"><div class="client-image"></div></div>';
					},
				},
			});
		}
	})();


	/*
	======================================
		Testimonial v2
	======================================
	*/

	(function() {
		if( $('.miwlo-testimonial-slide-container').length ) {
			var testimonial = new Swiper( '.miwlo-testimonial-slide-container', {
				loop: true,
				slidesPerGroup: 1,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				},
				breakpoints: {
					// when window width is >= 320px
					320: {
					  slidesPerView: 1
					},
					// when window width is >= 480px
					992: {
					  slidesPerView: 2,
					  spaceBetween: 70
					}
				  }
			});
		}


		$('.testimonial-pagination .swiper-pagination-bullet:nth-child(1) .client-image').append('<img src="images/testimonial-slider/teamr-1.jpg"/>');
		$('.testimonial-pagination .swiper-pagination-bullet:nth-child(2) .client-image').append('<img src="images/testimonial-slider/teamr-2.jpg"/>');
		$('.testimonial-pagination .swiper-pagination-bullet:nth-child(3) .client-image').append('<img src="images/testimonial-slider/teamr-3.jpg"/>');
	})();



	/*
	======================================
		Slinky Menu Init
	======================================
	*/
	(function() {
		if( $('.miwlo-header-area-mobile .col').length ) {
			const slinky = $('.miwlo-header-area-mobile .col').slinky();
		}
	})();



	/*
	======================================
		Counter Plugin Init
	======================================
	*/
	(function() {
		if( $('.counter').length ) {
			$('.counter').counterUp({
				delay: 10,
				time: 1000
			});
		}
	})();


	/*
	======================================
		Coming Soon Popup
	======================================
	*/
	(function() {
		$(document).ready(function() {
			var $popup = $('#coming-soon-popup');
			var $instagramLinks = $('.instagram-link');
			var $closeBtn = $('.popup-close');

			// Show popup when any Instagram link is clicked
			$instagramLinks.on('click', function(e) {
				e.preventDefault();
				$popup.addClass('show');
			});

			// Close popup when X is clicked
			$closeBtn.on('click', function() {
				$popup.removeClass('show');
			});

			// Close popup when clicking outside the content
			$popup.on('click', function(e) {
				if ($(e.target).is($popup)) {
					$popup.removeClass('show');
				}
			});

			// Close popup with Escape key
			$(document).on('keydown', function(e) {
				if (e.key === 'Escape' && $popup.hasClass('show')) {
					$popup.removeClass('show');
				}
			});
		});
	})();


})(jQuery);