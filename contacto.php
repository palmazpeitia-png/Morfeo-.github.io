
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST['mensaje']));

    if (!$nombre || !$email || !$mensaje) {
        echo "Por favor completa todos los campos correctamente.";
        exit;
    }

    $destinatario = "tu-email@dominio.com"; // Cambia esto por tu email
    $asunto = "Nuevo mensaje desde tu portafolio";
    $contenido = "Nombre: $nombre\nEmail: $email\nMensaje:\n$mensaje";

    $headers = "From: $email";

    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "Gracias por contactarme, $nombre. Te responderé pronto.";
    } else {
        echo "Hubo un error al enviar el mensaje. Intenta de nuevo.";
    }
} else {
    echo "Método no permitido.";
}
?>
