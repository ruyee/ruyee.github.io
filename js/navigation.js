(function ($) {
	"use strict";

	var core = {
		initialize: function () {
			this.event();
			this.hoverDropdown();
		},
		event: function () {
			// ------------------------------------------------------------------------------ //
			// Variable
			// ------------------------------------------------------------------------------ //
			var getNav = $("nav");

			// ------------------------------------------------------------------------------ //
			// Navbar Center 
			// ------------------------------------------------------------------------------ //
			if (getNav.hasClass("navbar-center")) {
				var postsArr = new Array(),
					index = $("nav.navbar-center"),
					$postsList = index.find('ul.navbar-nav');

				//Create array of all posts in lists
				index.find('ul.navbar-nav > li').each(function () {
					postsArr.push($(this).html());
				});

				//Split the array at this point. The original array is altered.
				var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
					secondList = postsArr,
					ListHTML = '';

				var createHTML = function (list) {
					ListHTML = '';
					for (var i = 0; i < list.length; i++) {
						ListHTML += '<li>' + list[i] + '</li>'
					}
				}

				//Generate HTML for first list
				createHTML(firstList);
				$postsList.html(ListHTML);
				index.find("ul.nav").first().addClass("navbar-left");

				//Generate HTML for second list
				createHTML(secondList);
				//Create new list after original one
				$postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
				index.find("ul.nav").last().addClass("navbar-right");

				//Wrap navigation menu
				index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
				index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");

				//Selection Class
				index.find('ul.navbar-nav > li').each(function () {
					var dropDown = $("ul.dropdown-menu", this),
						megaMenu = $("ul.megamenu-content", this);
					dropDown.closest("li").addClass("dropdown");
					megaMenu.closest("li").addClass("megamenu-fw");
				});
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Sidebar 
			// ------------------------------------------------------------------------------ //
			if (getNav.hasClass("navbar-sidebar")) {
				// Add Class to body
				$("body").addClass("wrap-nav-sidebar");
				getNav.wrapInner("<div class='scroller'></div>");
			} else {
				$(".megamenu").addClass("on");
			}

			// ------------------------------------------------------------------------------ //
			// Menu Center 
			// ------------------------------------------------------------------------------ //
			if (getNav.find("ul.nav").hasClass("nav-center")) {
				getNav.addClass("menu-center");
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Full
			// ------------------------------------------------------------------------------ //
			if (getNav.hasClass("navbar-full")) {
				// Add Class to body
				$("nav.navbar").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
				$(".wrap-full-menu").wrap("<div class='nav-full'></div>");
			} else {
				getNav.addClass("no-full");
			}

			// ------------------------------------------------------------------------------ //
			// Navbar Mobile
			// ------------------------------------------------------------------------------ //
			if (getNav.hasClass("navbar-mobile")) {
				// Add Class to body
				$('.navbar-collapse').on('shown.bs.collapse', function () {
					$("body").addClass("side-right");
				});
				$('.navbar-collapse').on('hide.bs.collapse', function () {
					$("body").removeClass("side-right");
				});

				$(window).on("resize", function () {
					$("body").removeClass("side-right");
				});
			}

			// ------------------------------------------------------------------------------ //
			// Button Cart
			// ------------------------------------------------------------------------------ //
			$(".btn-cart").on("click", function (e) {
				e.stopPropagation();
			});

			// ------------------------------------------------------------------------------ //
			// Navbat Tabs
			// ------------------------------------------------------------------------------ //
			$(".tab-nav li").each(function () {
				$("a", this).off("click");
				$("a", this).on("click", function (e) {
					e.preventDefault();
					var cek = $(this).closest("li").hasClass("active");
					if (cek) {
						$("a", this).off("click");
					} else {
						var getID = $(this).attr("href");
						$(".wrap-tabs .tab-content").stop().slideUp().removeClass("fadeInLeft");
						$(getID).stop().slideDown().addClass("fadeInLeft");

						$(".tab-nav li").removeClass("active");
						$(this).closest("li").addClass("active");
					}
				});
			});

			$(".tab-content").each(function () {
				var getBG = $(this).data("background");
				$(this).css("background-image", "url('" + getBG + "')");
				$(this).addClass("animated");
			});

			// ------------------------------------------------------------------------------ //
			// Menu Fullscreen
			// ------------------------------------------------------------------------------ //
			if ($("#nav-menu").length) {
				$("#nav-menu").menupuncher({
					color: '#000',
					textcolor: '#FFF',
					opacity: '0.8',
					hovercolor: '#FFF'
				});
			}

			// ------------------------------------------------------------------------------ //
			// Search form
			// ------------------------------------------------------------------------------ //
			$(".show-form").on("click", function () {
				$(".search-wrapper").css("display", "block");
				$(".search-wrapper").removeClass('slideOutUp');
				$(".search-wrapper").addClass('slideInDown');
				$(this).css("display", "none");
				$(".close-form").fadeIn();
				$(".shopping-cart").fadeOut();
				return false;
			});

			$(".close-form").on("click", function () {
				$(".search-wrapper").removeClass('slideInDown');
				$(".search-wrapper").addClass('slideOutUp');
				$(this).css("display", "none");
				$(".show-form").fadeIn();
				$(".shopping-cart").fadeIn();
				return false;
			});

			// ------------------------------------------------------------------------------ //
			// Sticky
			// ------------------------------------------------------------------------------ //
			/*            if (!getNav.hasClass("navbar-sidebar")) {
			                $(window).scroll(function () {
			                    var scrollTop = $(window).scrollTop();
			                    if (scrollTop >= 34) {
			                        $(".navbar").addClass("top-nav-collapse");
			                        $(".header-top-area").slideUp();
			                    } else {
			                        $(".navbar").removeClass("top-nav-collapse");
			                        $(".header-top-area").slideDown();
			                    }
			                });
			            }*/
		},

		// ------------------------------------------------------------------------------ //
		// Change dropdown to hover on dekstop
		// ------------------------------------------------------------------------------ //
		hoverDropdown: function () {
			var getNav = $("nav"),
				getWindow = $(window).width(),
				getHeight = $(window).height();

			if (getWindow < 981) {

				// Height of scroll navigation sidebar
				$(".scroller").css("height", "auto");

				// Disable mouseenter event
				$("nav.navbar ul.nav").find("li.dropdown").off("mouseenter");
				$("nav.navbar ul.nav").find("li.dropdown").off("mouseleave");
				$("nav.navbar ul.nav").find(".title").off("mouseenter");
				$("nav.navbar ul.nav").off("mouseleave");
				$(".navbar-collapse").removeClass("animated");

				// Enable click event
				$("nav.navbar ul.nav").each(function () {
					$(".dropdown-menu", this).addClass("animated");
					$(".dropdown-menu", this).removeClass("fadeOutLeft");

					// Dropdown Fade Toggle
					$("a.dropdown-toggle", this).off('click');
					$("a.dropdown-toggle", this).on('click', function (e) {
						e.stopPropagation();
						$(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass("fadeInDown");
						$(this).closest("li.dropdown").first().toggleClass("on");
						return false;
					});

					// Hidden dropdown action
					$('li.dropdown', this).each(function () {
						$(this).find(".dropdown-menu").stop().fadeOut();
						$(this).on('hidden.bs.dropdown', function () {
							$(this).find(".dropdown-menu").stop().fadeOut();
						});
						return false;
					});

					// Megamenu style
					$(".megamenu-fw", this).each(function () {
						$(".col-menu", this).each(function () {
							$(".content", this).addClass("animated");
							$(".content", this).stop().fadeOut();
							$(".title", this).off("click");
							$(".title", this).on("click", function () {
								$(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass("fadeInDown");
								$(this).closest(".col-menu").toggleClass("on");
								return false;
							});

							$(".content", this).on("click", function (e) {
								e.stopPropagation();
							});
						});
					});
				});

				// Hidden dropdown
				var cleanOpen = function () {
					$('li.dropdown', this).removeClass("on");
					$(".dropdown-menu", this).stop().fadeOut();
					$(".dropdown-menu", this).removeClass("fadeInDown");
					$(".col-menu", this).removeClass("on");
					$(".col-menu .content", this).stop().fadeOut();
					$(".col-menu .content", this).removeClass("fadeInDown");
				}

				// Hidden om mouse leave
				$("nav.navbar ul.nav").on("mouseleave", function () {
					cleanOpen();
				});

				// Toggle Bars
				$(".navbar-toggle").each(function () {
					$(this).off("click");
					$(this).on("click", function () {
						$(".fa", this).toggleClass("fa-bars");
						$(".fa", this).toggleClass("fa-times");
						cleanOpen();
					});
				});

			} else if (getWindow > 981) {
				// Height of scroll navigation sidebar
				$(".scroller").css("height", getHeight + "px");

				// Navbar Sidebar
				if (getNav.hasClass("navbar-sidebar")) {
					// Hover effect Sidebar Menu
					$("nav.navbar ul.nav").each(function () {
						$("a.dropdown-toggle", this).off('click');
						$("a.dropdown-toggle", this).on('click', function (e) {
							e.stopPropagation();
						});

						$(".dropdown-menu", this).addClass("animated");
						$("li.dropdown", this).on("mouseenter", function () {
							$(".dropdown-menu", this).eq(0).removeClass("fadeOutLeft");
							$(".dropdown-menu", this).eq(0).stop().fadeIn().addClass("fadeInDown");
							$(this).addClass("on");
							return false;
						});

						$(".col-menu").each(function () {
							$(".content", this).addClass("animated");
							$(".title", this).on("mouseenter", function () {
								$(this).closest(".col-menu").find(".content").stop().fadeIn().addClass("fadeInDown");
								$(this).closest(".col-menu").addClass("on");
								return false;
							});
						});

						$(this).on("mouseleave", function () {
							$(".dropdown-menu", this).stop().removeClass("fadeInDown");
							$(".dropdown-menu", this).stop().addClass("fadeOutLeft").fadeOut();
							$(".col-menu", this).find(".content").stop().fadeOut().removeClass("fadeInDown");
							$(".col-menu", this).removeClass("on");
							$("li.dropdown", this).removeClass("on");
							return false;
						});
					});
				} else {
					// Hover effect Default Menu
					$("nav.navbar ul.nav").each(function () {
						$("a.dropdown-toggle", this).off('click');
						$("a.dropdown-toggle", this).on('click', function (e) {
							e.stopPropagation();
						});

						$(".megamenu-fw", this).each(function () {
							$(".title", this).off("click");
							$("a.dropdown-toggle", this).off("click");
							$(".content").removeClass("animated");
						});

						$(".dropdown-menu", this).removeClass("animated");
						$("li.dropdown", this).on("mouseenter", function () {
							$(".dropdown-menu", this).eq(0).stop().fadeIn();
							$(this).addClass("on");
							return false;
						});

						$("li.dropdown", this).on("mouseleave", function () {
							$(".dropdown-menu", this).eq(0).stop().fadeOut();
							$(this).removeClass("on");
						});

						$(this).on("mouseleave", function () {
							$(".dropdown-menu", this).stop().fadeOut();
							$("li.dropdown", this).removeClass("on");
							return false;
						});
					});
				}
			}

			// ------------------------------------------------------------------------------ //
			// Menu Fullscreen
			// ------------------------------------------------------------------------------ //
			if (getNav.hasClass("navbar-full")) {
				var windowHeight = $(window).height(),
					windowWidth = $(window).width();

				$(".nav-full").css("height", windowHeight + "px");
				$(".wrap-full-menu").css("height", windowHeight + "px");
				$(".wrap-full-menu").css("width", windowWidth + "px");

				$(".navbar-collapse").addClass("animated");
				$(".navbar-toggle").each(function () {
					var getId = $(this).data("target");
					$(this).off("click");
					$(this).on("click", function () {
						$(this).toggleClass("fixed");
						$(getId).toggleClass("on");
						$(getId).toggleClass("bounceIn");
						$(".fa", this).toggleClass("fa-bars");
						$(".fa", this).toggleClass("fa-times");
					});
				});
			}
		},
	};

	$(window).on("load", function () {
		core.initialize();
	});

	$(window).on("resize", function () {
		core.hoverDropdown();

		// Toggle Bars
		$(".navbar-toggle").each(function () {
			$(".fa", this).removeClass("fa-times");
			$(".fa", this).addClass("fa-bars");
			$(this).removeClass("fixed");
		});
		$(".navbar-collapse").removeClass("in");
		$(".navbar-collapse").removeClass("on");
		$(".navbar-collapse").removeClass("bounceIn");
	});

}(jQuery));
