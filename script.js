// Card data
const cards = [
  {
    id: 'about',
    title: 'About Me',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    content: `
      <div class="profile-content">
        <h3 class="text-3xl font-bold">Lutfi Fikar Dzulkarnain</h3>
        <img 
          src="profile.jpg" 
          alt="Profile"
          class="profile-image"
        />
        <p class="text-lg">
          Full-stack developer with a passion for creating interactive experiences.
          I specialize in HTML, CSS, and little  JavaScript.
        </p>
        <div class='dcv' ><button class="btn download-cv-button">Download CV</button></div>
      </div>
    `
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"></path><path d="M12 12a5 5 0 1 0 5 5"></path><path d="M12 12a2 2 0 1 0 2 2"></path></svg>`,
    content: `
      <div class="skills-grid">
        <div class="skill-item">HTML</div>
        <div class="skill-item">CSS</div>
        <div class="skill-item">Java Script</div>
        <div class="skill-item">Python</div>
        <div class="skill-item">Lua</div>
        <div class="skill-item">UI/UX</div>
      </div>
    `
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"></path><path d="M4 18h8"></path><path d="M4 6h8"></path><path d="m14 9 3 3-3 3"></path></svg>`,
    content: `
      <div class="projects-list">
        <a href=#><div class="project-item">
          <h4 class="text-xl font-bold">Portfolio</h4>
          <p>Interactive portfolio website</p>
    `
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
    content: `
      <div class="contact-links">
        <a href="mailto:lutfifikar0@gmail.com" class="contact-email">
          <p class="text-xl font-bold">Email Me</p>
          <p class="text-sm">lutfifikar0@gmail.com</p>
        </a>
        <div class="social-links">
          <a href="https://www.instagram.com/lutfi_fikar/" class="social-link"><box-icon name='instagram' type='logo' color='#ffffff' ></box-icon> Instagram</a>
          <a href="https://github.com/Dzulkar9" class="social-link"><box-icon type='logo' name='github' color='#ffffff'></box-icon> GitHub</a>
          <a href="https://x.com/FikaruKara" class="social-link"><box-icon name='user-circle'color='#ffffff'></box-icon> Twitter</a>
        </div>
      </div>
    `
  }
];

// State
let currentIndex = 0;
let isZoomed = false;

// DOM Elements
const startButton = document.getElementById('startButton');
const introScreen = document.getElementById('intro');
const mainScreen = document.getElementById('main');
const cardsContainer = document.getElementById('cardsContainer');
const leftArea = document.querySelector('.area.left');
const rightArea = document.querySelector('.area.right');
const zoomOutButton = document.getElementById('zoomOutButton');
const interactiveAreas = document.querySelector('.interactive-areas');

// Initialize cards
function createCards() {
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.id = `card-${card.id}`;
    cardElement.style.zIndex = cards.length - index;
    
    cardElement.innerHTML = `
      <div class="card-inner ${card.id}">
        <div class="card-header">
          ${card.icon}
          <h2 class="card-title">${card.title}</h2>
        </div>
        <div class="card-content">
          ${card.content}
        </div>
      </div>
    `;
    
    cardsContainer.appendChild(cardElement);
  });
  updateCardPositions();
}

// Update card positions
function updateCardPositions() {
  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach((card, index) => {
    const offset = index - currentIndex;
    if (offset === 0) {
      card.style.transform = getCardTransform(0);
      card.style.zIndex = cards.length;
    } else {
      const direction = offset > 0 ? 1 : -1;
      card.style.transform = `translate(${direction * 100}%, 0) rotate(${direction * 10}deg)`;
      card.style.zIndex = cards.length - Math.abs(offset);
    }
  });
}

// Card transform helper
function getCardTransform(x = 0, rotation = 0, scale = 1) {
  return `translate(${x}px, 0) rotate(${rotation}deg) scale(${scale})`;
}

// Event Handlers
startButton.addEventListener('click', () => {
  introScreen.classList.remove('active');
  mainScreen.classList.add('active');
});

leftArea.addEventListener('mouseenter', () => {
  if (!isZoomed) {
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.style.transform = getCardTransform(-30, -5);
  }
});

rightArea.addEventListener('mouseenter', () => {
  if (!isZoomed) {
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.style.transform = getCardTransform(30, 5);
  }
});

leftArea.addEventListener('mouseleave', () => {
  if (!isZoomed) {
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.style.transform = getCardTransform();
  }
});

rightArea.addEventListener('mouseleave', () => {
  if (!isZoomed) {
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.style.transform = getCardTransform();
  }
});

leftArea.addEventListener('click', () => {
  if (!isZoomed) {
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.style.transform = `translate(${-window.innerWidth}px, 0) rotate(-10deg)`;
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCardPositions();
    }, 300);
  }
});

rightArea.addEventListener('click', () => {
  if (!isZoomed) {
    isZoomed = true;
    const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
    currentCard.classList.add('zoomed');
    currentCard.style.transform = getCardTransform(0, 0, 1.5);
    zoomOutButton.classList.remove('hidden');
    interactiveAreas.style.pointerEvents = 'none';
  }
});

zoomOutButton.addEventListener('click', () => {
  isZoomed = false;
  const currentCard = document.querySelector(`#card-${cards[currentIndex].id}`);
  currentCard.classList.remove('zoomed');
  currentCard.style.transform = getCardTransform();
  zoomOutButton.classList.add('hidden');
  interactiveAreas.style.pointerEvents = 'auto';
});

// Initialize
createCards();

function createCard(data) {
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = `
    <div class="card-content">
      <a href="${data.link}" class="card-link">
        <img src="${data.image}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.description}</p>
      </a>
    </div>
  `;
  
  return card;
}
