(function ($) {
  "use strict";

  $(function () {
    var header = $("header");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 130) {
        header.removeClass('start-style').addClass("scroll-on");
      } else {
        header.removeClass("scroll-on").addClass('start-style');
      }
    });
  });

  $(".navbar-collapse")
    .on("show.bs.collapse", function () {
      $("header").addClass("menu-open");
      $("body").addClass("menu-open");
    })
    .on("hidden.bs.collapse", function () {
      $("header").removeClass("menu-open");
      $("body").removeClass("menu-open");
    });

  $(".navbar-collapse a[href]").not(".dropdown > .nav-link").on("click", function () {
    var panel = this.closest(".navbar-collapse");
    if (panel && panel.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(panel).hide();
    }
  });

  var desktopHover = window.matchMedia("(min-width: 992px) and (hover: hover)");
  var megaTrigger = $(".navbar-nav .nav-item.dropdown > .nav-link");

  megaTrigger.on("click", function (event) {
    event.preventDefault();
    if (desktopHover.matches) return;
    var trigger = $(this);
    var abierto = trigger.closest(".dropdown").toggleClass("is-open").hasClass("is-open");
    trigger.attr("aria-expanded", abierto);
    $("header").toggleClass("mega-open", abierto);
  });

  $(".navbar-nav .nav-item.dropdown")
    .on("mouseenter", function () {
      if (!desktopHover.matches) return;
      $("header").addClass("mega-open");
      $(this).children(".nav-link").attr("aria-expanded", "true");
    })
    .on("mouseleave", function () {
      if (!desktopHover.matches) return;
      $("header").removeClass("mega-open");
      $(this).children(".nav-link").attr("aria-expanded", "false");
    });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $(".hero-media").each(function () {
      this.autoplay = false;
      this.pause();
    });
  }

  $(".mega-group-head").on("click", function () {
    var abierto = $(this).closest(".mega-group").toggleClass("is-open").hasClass("is-open");
    $(this).attr("aria-expanded", abierto);
  });

  $(".mega-project").on("mouseenter focus", function () {
    var proyecto = $(this).attr("data-project");
    $(".mega-project").removeClass("is-active");
    $(this).addClass("is-active");
    $(".mega-media-item, .mega-info-item").removeClass("is-active");
    $('.mega-media-item[data-project="' + proyecto + '"], .mega-info-item[data-project="' + proyecto + '"]').addClass("is-active");
  });


})(jQuery);


var sliderPortafolio = document.querySelector(".slider-portafolio") && new Swiper(".slider-portafolio", {
  slidesPerView: "auto",
  spaceBetween: 16,
  pagination: {
    el: ".slider-portafolio-dots",
    clickable: true,
  },
  navigation: {
    nextEl: ".slider-next",
    prevEl: ".slider-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 37,
    },
  },
});


/* Torres Óptima: acordeones en desk, slider en móvil */
var sliderEco = null;
var sliderTorres = null;
var sliderGaleria = null;
var sliderBrom = null;
var sliderEspacios = null;
var sliderGal1 = null;
var sliderCross = null;
var torresMovil = window.matchMedia("(max-width: 991px)");

function abreEco(item) {
  var lista = item.closest(".eco-lista, .serv-lista");
  if (!lista) return;
  var esServicios = lista.classList.contains("serv-lista");
  var selItem = esServicios ? ".serv-item" : ".eco-item";
  var selMedia = esServicios ? ".serv-media-item" : ".eco-media-item";
  var items = lista.querySelectorAll(selItem);
  var indice = [].indexOf.call(items, item);
  [].forEach.call(items, function (li, i) {
    var activo = i === indice;
    li.classList.toggle("is-active", activo);
    var boton = li.querySelector(".eco-cabecera");
    if (boton) boton.setAttribute("aria-expanded", activo ? "true" : "false");
  });
  [].forEach.call(document.querySelectorAll(selMedia), function (pic, i) {
    pic.classList.toggle("is-active", i === indice);
  });
}

document.addEventListener("click", function (e) {
  var cabecera = e.target.closest && e.target.closest(".eco-cabecera");
  if (cabecera) {
    var itemAcordeon = cabecera.closest(".eco-item, .serv-item");
    if (itemAcordeon && (itemAcordeon.classList.contains("serv-item") || !torresMovil.matches)) {
      abreEco(itemAcordeon);
      return;
    }
  }
  var panel = e.target.closest && e.target.closest(".torre-cabecera");
  if (panel && !torresMovil.matches) {
    var item = panel.closest(".torre-item");
    [].forEach.call(document.querySelectorAll(".torre-item"), function (el) {
      el.classList.toggle("is-active", el === item);
    });
  }
});

function sincronizaTorres() {
  if (!document.querySelector(".eco-slider, .espacios-slider, .t1-galeria-slider, .cross-slider, .brom-slider")) return;

  if (torresMovil.matches) {
    if (!sliderEco) {
      sliderEco = new Swiper(".eco-slider", {
        wrapperClass: "eco-lista",
        slideClass: "eco-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".eco-dots", clickable: true }
      });
    }
    if (!sliderTorres) {
      sliderTorres = new Swiper(".torres-slider", {
        wrapperClass: "to-torres-row",
        slideClass: "torre-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".torres-dots", clickable: true }
      });
    }
    if (!sliderGaleria) {
      sliderGaleria = new Swiper(".galeria-slider", {
        wrapperClass: "to-galeria-row",
        slideClass: "galeria-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".galeria-dots", clickable: true }
      });
    }
    if (!sliderEspacios && document.querySelector(".espacios-slider")) {
      sliderEspacios = new Swiper(".espacios-slider", {
        wrapperClass: "t1-espacios-row",
        slideClass: "espacio-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".espacios-dots", clickable: true }
      });
    }
    if (!sliderGal1 && document.querySelector(".t1-galeria-slider")) {
      sliderGal1 = new Swiper(".t1-galeria-slider", {
        wrapperClass: "t1-galeria-row",
        slideClass: "galeria-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".t1-galeria-dots", clickable: true }
      });
    }
    if (!sliderCross && document.querySelector(".cross-slider")) {
      sliderCross = new Swiper(".cross-slider", {
        wrapperClass: "t1-cross-row",
        slideClass: "cross-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".cross-dots", clickable: true }
      });
    }
    if (!sliderBrom) {
      sliderBrom = new Swiper(".brom-slider", {
        wrapperClass: "to-brom-fotos",
        slideClass: "brom-item",
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".brom-dots", clickable: true }
      });
    }
  } else {
    if (sliderEco) { sliderEco.destroy(true, true); sliderEco = null; }
    if (sliderTorres) { sliderTorres.destroy(true, true); sliderTorres = null; }
    if (sliderGaleria) { sliderGaleria.destroy(true, true); sliderGaleria = null; }
    if (sliderBrom) { sliderBrom.destroy(true, true); sliderBrom = null; }
    if (sliderEspacios) { sliderEspacios.destroy(true, true); sliderEspacios = null; }
    if (sliderGal1) { sliderGal1.destroy(true, true); sliderGal1 = null; }
    if (sliderCross) { sliderCross.destroy(true, true); sliderCross = null; }
  }
}

sincronizaTorres();

if (torresMovil.addEventListener) {
  torresMovil.addEventListener("change", sincronizaTorres);
} else if (torresMovil.addListener) {
  torresMovil.addListener(sincronizaTorres);
}

var esperaTorres = null;
window.addEventListener("resize", function () {
  clearTimeout(esperaTorres);
  esperaTorres = setTimeout(sincronizaTorres, 150);
});

var sliderLegado = null;
var legadoMovil = window.matchMedia("(max-width: 991px)");

function sincronizaLegado() {
  if (!document.querySelector(".legado-slider")) return;

  if (legadoMovil.matches && !sliderLegado) {
    sliderLegado = new Swiper(".legado-slider", {
      wrapperClass: "legado-row",
      slideClass: "legado-item",
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".legado-dots",
        clickable: true,
      },
    });
  } else if (!legadoMovil.matches && sliderLegado) {
    sliderLegado.destroy(true, true);
    sliderLegado = null;
  }
}

sincronizaLegado();

if (legadoMovil.addEventListener) {
  legadoMovil.addEventListener("change", sincronizaLegado);
} else if (legadoMovil.addListener) {
  legadoMovil.addListener(sincronizaLegado);
}

var esperaLegado = null;
window.addEventListener("resize", function () {
  clearTimeout(esperaLegado);
  esperaLegado = setTimeout(sincronizaLegado, 150);
});


$(document).ready(function () {
  if ($(window).width() < 767) {
    $('#menuModal .modal-body a').on('click', function () {
      $('#menuModal').modal('hide');
    });
  }

});

document.addEventListener('DOMContentLoaded', function () {
  var boton = document.getElementById('submitBtn');
  var formulario = document.getElementById('contact-form');
  if (!boton || !formulario) return;

  boton.addEventListener('click', function (event) {
    event.preventDefault();

    formulario.requestSubmit();
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var boton = document.getElementById('submitBtnModal');
  var formulario = document.getElementById('form-discount');
  if (!boton || !formulario) return;

  boton.addEventListener('click', function (event) {
    event.preventDefault();

    formulario.requestSubmit();
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var boton = document.getElementById('sendFormModal');
  var formulario = document.getElementById('formModal');
  if (!boton || !formulario) return;

  boton.addEventListener('click', function (event) {
    event.preventDefault();

    formulario.requestSubmit();
  });
});


// document.addEventListener('DOMContentLoaded', function () {
//   setTimeout(function () {
//     var DiscountModal = new bootstrap.Modal(document.getElementById('modalDiscount'), {
//       keyboard: false
//     });
//     DiscountModal.show();
//   }, 1000);
// });

function openModal() {
  var modalTop = new bootstrap.Modal(document.getElementById('modalDiscount'), {
    keyboard: true
  });
  modalTop.show();
}