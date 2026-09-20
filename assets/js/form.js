var URL_FORMULARIO = "PENDIENTE_APPS_SCRIPT_BROM";

// Textos según el idioma de la página (CLAUDE: se eligen por document.documentElement.lang)
var FORM_EN = document.documentElement.lang === "en";
var FORM_TEXTOS = FORM_EN ? {
    requerido: "This field is required.",
    nombreMin: "Your name must be at least 3 characters long.",
    correo: "Please enter a valid email address.",
    enviando: "Sending…",
    error: "We couldn't send your message. Please try again in a few minutes.",
    gracias: "thank-you.html"
} : {
    requerido: "Este campo es obligatorio.",
    nombreMin: "El nombre debe tener al menos 3 caracteres.",
    correo: "Introduce una dirección de correo electrónico válida.",
    enviando: "Enviando…",
    error: "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
    gracias: "gracias.html"
};

$(document).ready(function () {
    $("#contact-form").validate({
        ignore: ":hidden:not(select)",
        rules: {
            nombre: { required: true, minlength: 3 },
            correo: { required: true, email: true }
        },
        messages: {
            nombre: {
                required: FORM_TEXTOS.requerido,
                minlength: FORM_TEXTOS.nombreMin
            },
            correo: {
                required: FORM_TEXTOS.requerido,
                email: FORM_TEXTOS.correo
            }
        },
        errorElement: "label",
        errorPlacement: function (error, element) {
            error.appendTo(element.closest(".campo"));
        },
        submitHandler: function (form) {
            var $form = $(form);
            var $boton = $form.find("[type=submit]");
            var rotulo = $boton.text();

            if ($form.find("[name=check_bot_field]").val()) {
                return false;
            }

            var datos = {};
            $.each($form.serializeArray(), function (i, campo) {
                datos[campo.name] = campo.value;
            });
            datos.pagina = document.title;
            datos.idioma = document.documentElement.lang;

            $boton.prop("disabled", true).text(FORM_TEXTOS.enviando);

            $.ajax({
                url: URL_FORMULARIO,
                type: "POST",
                data: $.param(datos),
                success: function (respuesta) {
                    if ($.trim(respuesta) === "SUCCESS") {
                        window.location.href = FORM_TEXTOS.gracias;
                        return;
                    }
                    $boton.prop("disabled", false).text(rotulo);
                    alert(FORM_TEXTOS.error);
                },
                error: function () {
                    $boton.prop("disabled", false).text(rotulo);
                    alert(FORM_TEXTOS.error);
                }
            });

            return false;
        }
    });
});
