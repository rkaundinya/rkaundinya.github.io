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

  // Mobile navigation - JavaScript overlay solution
  $(document).ready(function () {
    var $navbarCollapse = $("#navbarNav");
    var $body = $("body");
    var overlayCreated = false;

    // Create mobile overlay
    function createMobileOverlay() {
      if (overlayCreated) return;

      // Create overlay container
      var $overlay = $('<div id="mobile-menu-overlay" class="mobile-menu-overlay"></div>');
      var $overlayContent = $('<div class="mobile-menu-content"></div>');

      // Clone the navigation content
      var $navContent = $navbarCollapse.find(".navbar-nav").clone();

      // Add close button
      var $closeBtn = $('<button class="mobile-menu-close" aria-label="Close menu">&times;</button>');

      // Assemble overlay
      $overlayContent.append($closeBtn).append($navContent);
      $overlay.append($overlayContent);
      $body.append($overlay);

      // Handle close button
      $closeBtn.on("click", function () {
        hideMobileOverlay();
        $navbarCollapse.collapse("hide");
      });

      // Handle navigation links
      $overlay.find(".nav-link").on("click", function () {
        hideMobileOverlay();
        $navbarCollapse.collapse("hide");
      });

      // Handle dropdowns
      $overlay.find(".dropdown-toggle").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $dropdown = $(this).closest(".dropdown");
        var $dropdownMenu = $dropdown.find(".dropdown-menu");

        // Close other dropdowns
        $overlay.find(".dropdown").not($dropdown).removeClass("show");
        $overlay.find(".dropdown-menu").not($dropdownMenu).removeClass("show");

        // Toggle current dropdown
        if ($dropdown.hasClass("show")) {
          $dropdown.removeClass("show");
          $dropdownMenu.removeClass("show");
        } else {
          $dropdown.addClass("show");
          $dropdownMenu.addClass("show");
        }
      });

      overlayCreated = true;
    }

    // Show mobile overlay
    function showMobileOverlay() {
      if (!overlayCreated) {
        createMobileOverlay();
      }
      $("#mobile-menu-overlay").addClass("show");
      $body.addClass("mobile-menu-open");
    }

    // Hide mobile overlay
    function hideMobileOverlay() {
      $("#mobile-menu-overlay").removeClass("show");
      $body.removeClass("mobile-menu-open");
    }

    // Handle hamburger button click
    $(".navbar-toggler").on("click", function () {
      if ($(window).width() <= 991.98) {
        // Small delay to let Bootstrap handle its state
        setTimeout(function () {
          if ($navbarCollapse.hasClass("show")) {
            showMobileOverlay();
          }
        }, 100);
      }
    });

    // Listen for Bootstrap collapse events
    $navbarCollapse.on("show.bs.collapse", function () {
      if ($(window).width() <= 991.98) {
        setTimeout(showMobileOverlay, 100);
      }
    });

    $navbarCollapse.on("hide.bs.collapse", function () {
      if ($(window).width() <= 991.98) {
        hideMobileOverlay();
      }
    });

    // Handle window resize
    $(window).on("resize", function () {
      if ($(window).width() > 991.98) {
        hideMobileOverlay();
        $navbarCollapse.collapse("hide");
        $(".dropdown").removeClass("show");
        $(".dropdown-menu").removeClass("show");
      }
    });

    // Close overlay when clicking outside
    $(document).on("click", function (e) {
      if ($(window).width() <= 991.98 && overlayCreated) {
        var $overlay = $("#mobile-menu-overlay");
        if ($overlay.hasClass("show") && !$overlay.is(e.target) && $overlay.has(e.target).length === 0) {
          hideMobileOverlay();
          $navbarCollapse.collapse("hide");
        }
      }
    });

    // Handle escape key
    $(document).on("keydown", function (e) {
      if (e.key === "Escape" && $(window).width() <= 991.98 && overlayCreated) {
        if ($("#mobile-menu-overlay").hasClass("show")) {
          hideMobileOverlay();
          $navbarCollapse.collapse("hide");
        }
      }
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
