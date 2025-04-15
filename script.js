const carrossel = document.getElementById('carrossel');
const cards = document.querySelectorAll('.card');
const btnAnterior = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo');

let ativoIndex = 0;
let autoplayInterval;

function atualizarCarrossel() {
  cards.forEach((card, index) => {
    card.classList.remove('ativo');
    if (index === ativoIndex) {
      card.classList.add('ativo');
    }
  });

  const scrollX = cards[ativoIndex].offsetLeft - (carrossel.offsetWidth - cards[ativoIndex].offsetWidth) / 2;
  carrossel.scrollTo({ left: scrollX, behavior: 'smooth' });
}

function pararAutoplay() {
  clearInterval(autoplayInterval);
}

btnAnterior.addEventListener('click', () => {
  ativoIndex = (ativoIndex - 1 + cards.length) % cards.length;
  atualizarCarrossel();
  pararAutoplay();
});

btnProximo.addEventListener('click', () => {
  ativoIndex = (ativoIndex + 1) % cards.length;
  atualizarCarrossel();
  pararAutoplay();
});

function mostrarInfo(cardClicado) {
  cards.forEach((card, index) => {
    if (card === cardClicado) ativoIndex = index;
  });
  atualizarCarrossel();
  pararAutoplay();
}

window.onload = () => {
  atualizarCarrossel();

  autoplayInterval = setInterval(() => {
    ativoIndex = (ativoIndex + 1) % cards.length;
    atualizarCarrossel();
  }, 4000); // troca a cada 4 segundos
};
