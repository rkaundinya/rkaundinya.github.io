$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // Mobile navigation fixes - Simple Bootstrap 4.6.2 compatibility
  // Ensure mobile menu works properly with existing Bootstrap functionality
  $(document).ready(function () {
    // Ensure Bootstrap collapse is properly initialized
    if (typeof $ !== "undefined" && $.fn.collapse) {
      $("#navbarNav").collapse({
        toggle: false,
      });
    }

    // Fix for dropdown toggles in mobile
    $(".dropdown-toggle").on("click", function (e) {
      if ($(window).width() <= 991.98) {
        e.preventDefault();
        e.stopPropagation();

        var $dropdown = $(this).closest(".dropdown");
        var $dropdownMenu = $dropdown.find(".dropdown-menu");

        // Close other dropdowns
        $(".dropdown").not($dropdown).removeClass("show");
        $(".dropdown-menu").not($dropdownMenu).removeClass("show");

        // Toggle current dropdown
        if ($dropdown.hasClass("show")) {
          $dropdown.removeClass("show");
          $dropdownMenu.removeClass("show");
        } else {
          $dropdown.addClass("show");
          $dropdownMenu.addClass("show");
        }
      }
    });

    // Close mobile menu when clicking on a nav link
    $(".navbar-nav .nav-link").on("click", function () {
      if ($(window).width() <= 991.98) {
        var $navbarCollapse = $("#navbarNav");
        if ($navbarCollapse.hasClass("show")) {
          $navbarCollapse.collapse("hide");
        }
      }
    });

    // Handle window resize
    $(window).on("resize", function () {
      if ($(window).width() > 991.98) {
        // Reset mobile menu state on larger screens
        $("#navbarNav").collapse("hide");
        $(".dropdown").removeClass("show");
        $(".dropdown-menu").removeClass("show");
      }
    });

    // Ensure mobile menu is properly positioned and visible
    $(".navbar-toggler").on("click", function () {
      // Small delay to ensure Bootstrap classes are applied
      setTimeout(function () {
        var $navbarCollapse = $("#navbarNav");
        if ($navbarCollapse.hasClass("show")) {
          // Ensure the mobile menu is properly visible
          $navbarCollapse.css({
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            width: "100%",
            overflow: "visible",
            "max-height": "none",
          });

          // Ensure all navigation items are visible
          $navbarCollapse.find(".navbar-nav, .nav-item, .nav-link, .dropdown-menu, .dropdown-item").css({
            visibility: "visible",
            opacity: "1",
            display: "block",
            "pointer-events": "auto",
          });
        }
      }, 100);
    });

    // Prevent any interference with mobile menu visibility
    $(document).on("mouseenter mouseleave", ".navbar-collapse, .navbar-nav, .nav-item, .nav-link, .dropdown-menu, .dropdown-item", function (e) {
      // Ensure elements stay visible during hover events
      $(this).css({
        visibility: "visible",
        opacity: "1",
      });
    });
  });

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
