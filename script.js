// Função de contagem regressiva
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

const countdown = () => {
    const now = new Date();
    const targetDate = new Date("2025-03-15T19:00:00"); // Data do evento

    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
};
countdown()
setInterval(countdown, 1000);




const video = document.getElementById("background-video");
const muteButton = document.getElementById("mute-toggle");

// Detecção de dispositivos e navegadores
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

window.onload = function () {
  // Tratamento para dispositivos iOS
  if (isIOS) {
    video.muted = true; // Começa com som desligado
    video.play().catch((err) => console.log("Erro ao reproduzir vídeo no iOS:", err));
  } else {
    // Tentativa de reprodução automática com som desligado para outros dispositivos
    video.play().catch((err) => console.log("Erro ao reproduzir vídeo:", err));
  }

// //   // Simula clique no botão de som ao carregar a página
//   muteButton.click();

  // Evento para desbloquear som em dispositivos que exigem interação
  document.body.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch((err) => console.log("Erro ao reproduzir o vídeo:", err));
    }
  });
};

// Lógica do botão de mute/unmute
muteButton.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    muteButton.textContent = "🔊"; // Ícone de som ativado
  } else {
    video.muted = true;
    muteButton.textContent = "🔈"; // Ícone de som desativado
  }
});



//Formulario


const form = document.getElementById("confirmation-form");
const message = document.getElementById("confirmation-message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;

    if (!name || !attendance) {
        message.textContent = "Por favor, preencha todos os campos.";
        message.style.color = "red";
        message.classList.remove("hidden");
        return;
    }

    // Dados a serem enviados
    const data = { name, attendance };

    // URL do Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbxPzGYjSP8b1_-4dt-eDzeTX4qwzea7-UiZWOPFFUckMQzNRkM1O_MLetW0tPfWU50/exec"; // Coloque aqui o URL correto do Apps Script

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (response.ok) {
                message.textContent = "Confirmação enviada com sucesso!";
                message.style.color = "green";
                form.reset();
            } else {
                message.textContent = "Erro ao enviar a confirmação. Tente novamente.";
                message.style.color = "red";
            }
            message.classList.remove("hidden");
        })
        .catch((error) => {
            console.error("Erro:", error);
            message.textContent = "Erro ao enviar os dados.";
            message.style.color = "red";
            message.classList.remove("hidden");
        });
});







