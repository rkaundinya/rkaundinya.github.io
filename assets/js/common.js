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

  // Mobile navigation fixes
  // Ensure mobile menu works properly
  $(".navbar-toggler").on("click", function () {
    var target = $(this).data("target");
    var $navbarCollapse = $(target);

    // Force proper display of mobile menu
    if ($navbarCollapse.hasClass("show")) {
      $navbarCollapse.removeClass("show").addClass("collapsing");
      setTimeout(function () {
        $navbarCollapse.removeClass("collapsing");
      }, 350);
    } else {
      $navbarCollapse.addClass("show");
    }
  });

  // Fix dropdown menus in mobile navigation
  $(".dropdown-toggle").on("click", function (e) {
    if ($(window).width() <= 991.98) {
      e.preventDefault();
      var $dropdown = $(this).closest(".dropdown");
      var $dropdownMenu = $dropdown.find(".dropdown-menu");

      if ($dropdown.hasClass("show")) {
        $dropdown.removeClass("show");
        $dropdownMenu.removeClass("show");
      } else {
        $(".dropdown").removeClass("show");
        $(".dropdown-menu").removeClass("show");
        $dropdown.addClass("show");
        $dropdownMenu.addClass("show");
      }
    }
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".navbar").length) {
      $(".navbar-collapse").removeClass("show");
      $(".dropdown").removeClass("show");
      $(".dropdown-menu").removeClass("show");
    }
  });

  // Additional mobile navigation fixes
  // Ensure proper Bootstrap collapse functionality
  $(".navbar-toggler").on("click", function (e) {
    e.preventDefault();
    var target = $(this).data("target");
    var $navbarCollapse = $(target);

    // Toggle the mobile menu
    if ($navbarCollapse.hasClass("show")) {
      $navbarCollapse.removeClass("show");
    } else {
      // Close any open dropdowns first
      $(".dropdown").removeClass("show");
      $(".dropdown-menu").removeClass("show");
      // Open the mobile menu
      $navbarCollapse.addClass("show");
    }
  });

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

  // Ensure mobile menu is properly initialized
  $(window).on("resize", function () {
    if ($(window).width() > 991.98) {
      // Reset mobile menu state on larger screens
      $(".navbar-collapse").removeClass("show");
      $(".dropdown").removeClass("show");
      $(".dropdown-menu").removeClass("show");
    }
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
