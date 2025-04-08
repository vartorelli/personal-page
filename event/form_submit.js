const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("form-name").value,
    email: document.getElementById("form-email").value,
    subject: document.getElementById("form-subject").value,
    message: document.getElementById("form-message").value,
  };

  try {
    const response = await fetch("/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Correo enviado: ", result);
      alert("Correo enviado con éxito.");
    } else {
      console.error("Error al enviar el correo: ", result.error);
      alert("Hubo un error al enviar el correo.", result.error);
    }
  } catch (error) {
    console.error("Error de red: ", error);
    alert("No se pudo conectar con el servidor.");
  }
});