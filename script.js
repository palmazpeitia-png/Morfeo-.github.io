// Efecto typing dinámico
const roles = ["Web Developer", "Diseñador Gráfico", "Especialista en Marketing"];
let index = 0, charIndex = 0;
const typingElement = document.querySelector(".typing");

function type() {
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);
