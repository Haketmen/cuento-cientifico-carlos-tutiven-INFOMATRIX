const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const conversation = document.getElementById("conversation");
const welcome = document.getElementById("welcome");

const responses = [
  {
    keywords: ["ecosistema", "got", "agua", "micro"],
    text: "Un ecosistema invisible puede incluir comunidades microscópicas que viven en una gota de agua. Aunque no podemos verlas a simple vista, interactúan mediante procesos como el intercambio de nutrientes, el ciclo del carbono y la respiración."
  },
  {
    keywords: ["observar", "observación", "experimento"],
    text: "Observar científicamente significa registrar fenómenos de manera cuidadosa y verificable. Primero se define qué se quiere estudiar, luego se toman datos consistentes y finalmente se comparan con una explicación o hipótesis."
  },
  {
    keywords: ["pregunta", "hipótesis", "investigación"],
    text: "Una buena pregunta científica debe ser clara, concreta y comprobable. Por ejemplo: «¿Cómo cambia el crecimiento de una planta según la cantidad de luz?» Una hipótesis propone una posible respuesta que puede evaluarse mediante un experimento."
  },
  {
    keywords: ["planeta", "energía", "luz", "materia", "universo"],
    text: "La materia, la energía y la luz están relacionadas con las leyes que describen cómo cambia el universo. La luz puede verse como radiación electromagnética y también como una corriente de partículas llamadas fotones."
  }
];

function createMessage(text, role) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "message";
  bubble.textContent = text;
  row.appendChild(bubble);
  conversation.appendChild(row);
  conversation.scrollTop = conversation.scrollHeight;
}

function getResponse(message) {
  const lower = message.toLowerCase();
  const match = responses.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword))
  );

  if (match) return match.text;
  return "Puedo ayudarte a explorar esa idea. Para una explicación científica clara, dime qué concepto quieres comprender y qué parte te resulta más difícil.";
}

function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  if (welcome) welcome.remove();
  createMessage(message, "user");
  input.value = "";
  input.style.height = "36px";

  const row = document.createElement("div");
  row.className = "message-row assistant";
  const bubble = document.createElement("div");
  bubble.className = "message typing";
  bubble.innerHTML = "<span></span><span></span><span></span>";
  row.appendChild(bubble);
  conversation.appendChild(row);
  conversation.scrollTop = conversation.scrollHeight;

  window.setTimeout(() => {
    bubble.className = "message";
    bubble.textContent = getResponse(message);
    conversation.scrollTop = conversation.scrollHeight;
  }, 650);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage(input.value);
  }
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});
