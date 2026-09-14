var URL_FORMULARIO = "PENDIENTE_APPS_SCRIPT_BROM";

$(document).ready(function () {
    $("#contact-form").validate({
        ignore: ":hidden:not(select)",
        rules: {
            nombre: { required: true, minlength: 3 },
            correo: { required: true, email: true }
        },
        messages: {
            nombre: {
                required: "Este campo es obligatorio.",
                minlength: "El nombre debe tener al menos 3 caracteres."
            },
            correo: {
                required: "Este campo es obligatorio.",
                email: "Introduce una dirección de correo electrónico válida."
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

            $boton.prop("disabled", true).text("Enviando…");

            $.ajax({
                url: URL_FORMULARIO,
                type: "POST",
                data: $.param(datos),
                success: function (respuesta) {
                    if ($.trim(respuesta) === "SUCCESS") {
                        window.location.href = "gracias.html";
                        return;
                    }
                    $boton.prop("disabled", false).text(rotulo);
                    alert("No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.");
                },
                error: function () {
                    $boton.prop("disabled", false).text(rotulo);
                    alert("No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.");
                }
            });

            return false;
        }
    });
});
