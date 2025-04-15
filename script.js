const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');
const btnAnterior = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo');

let currentIndex = 0;
let autoplayInterval;

function updateCarousel() {
  // Remove a classe "active" de todos e ativa o card atual
  cards.forEach((card, index) => {
    card.classList.remove('active');
    if (index === currentIndex) {
      card.classList.add('active');
    }
  });

  // Pega o card ativo e sua margem esquerda (caso definida no CSS)
  const activeCard = cards[currentIndex];
  const cardStyle = window.getComputedStyle(activeCard);
  const marginLeft = parseInt(cardStyle.marginLeft) || 0;
  
  // Calcula o deslocamento considerando a margem:
  const offset = activeCard.offsetLeft - ((carousel.offsetWidth - activeCard.offsetWidth) / 2) - marginLeft;
  carousel.style.transform = `translateX(-${offset}px)`;
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

btnAnterior.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
  stopAutoplay();
});

btnProximo.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
  stopAutoplay();
});

function mostrarInfo(clickedCard) {
  cards.forEach((card, index) => {
    if (card === clickedCard) {
      currentIndex = index;
    }
  });
  updateCarousel();
  stopAutoplay();
}

window.onload = () => {
  updateCarousel();
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 4000); // troca de slide a cada 4 segundos
};
