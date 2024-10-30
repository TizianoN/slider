// # SLIDES ARRAY

const slidesData = [
  {
    img: '01.jpg',
    title: 'Title 1',
    description: 'Description 1',
  },
  {
    img: '02.png',
    title: 'Title 2',
    description: 'Description 2',
  },
  {
    img: '03.jpg',
    title: 'Title 3',
    description: 'Description 3',
  },
  {
    img: '04.jpg',
    title: 'Title 4',
    description: 'Description 4',
  },
  {
    img: '05.jpg',
    title: 'Title 5',
    description: 'Description 5',
  },
];

// # HTML ELEMENTS

const slider = document.getElementById('slider');
const sliderJumbo = document.querySelector('#slider .slider-jumbo');
const sliderThumbsContainer = document.querySelector('#slider .slider-thumbs');
const nextButton = document.querySelector('#slider .control-right');
const prevButton = document.querySelector('#slider .control-left');
const invertAutoplayButton = document.getElementById('invert-autoplay');

// # FUNCTIONS

const generateSlider = (slidesData, jumboContainer, thumbsContainer) => {
  // * genero l'HTML delle thumbs e lo stampo
  let thumbsHtml = ``;
  slidesData.forEach((slide, index) => {
    const activeClass = index === activeSlide ? 'active' : '';

    thumbsHtml += `
  <div class="thumb ${activeClass}" data-index="${index}">
    <img src="./img/${slide.img}" alt="" />
  </div>`;
  });

  thumbsContainer.innerHTML = thumbsHtml;

  // * recupero i nodi

  const thumbs = document.querySelectorAll('#slider .thumb');

  // * genero l'HTML del jumbo e lo stampo

  const activeSlideObject = slidesData[activeSlide];

  let jumboHtml = `
  <img src="./img/${activeSlideObject.img}" alt="" />
  <div class="jumbo-description">
    <h2>${activeSlideObject.title}</h2>
    <h3>${activeSlideObject.description}</h3>
  </div>
  `;
  jumboContainer.innerHTML = jumboHtml;

  // * recupero i nodi

  const jumboImg = document.querySelector('#slider .slider-jumbo img');
  const jumboTitle = document.querySelector('#slider .jumbo-description h2');
  const jumboDescription = document.querySelector('#slider .jumbo-description h3');

  const sliderConfig = {
    thumbs,
    jumbo: {
      img: jumboImg,
      title: jumboTitle,
      description: jumboDescription,
    },
    autoplay: {
      forward: true,
      active: true,
    },
  };

  return sliderConfig;
};

const goToSlide = (newIndex) => {
  // * recupero la vecchia e la nuova slide
  const oldSlide = sliderConfig.thumbs[activeSlide];
  activeSlide = newIndex;
  const newSlide = sliderConfig.thumbs[activeSlide];

  // * aggiorno le thumbnails
  oldSlide.classList.remove('active');
  newSlide.classList.add('active');

  // * aggiorno il jumbo
  const activeSlideObject = slidesData[activeSlide];

  sliderConfig.jumbo.img.src = getImagePath(activeSlideObject.img);
  sliderConfig.jumbo.title.innerText = activeSlideObject.title;
  sliderConfig.jumbo.description.innerText = activeSlideObject.description;
};

const getImagePath = (imageName) => `./img/${imageName}`;

const prevButtonClickHandler = () => {
  // * controllo di essere nel range dell'array delle slides
  let newIndex = activeSlide - 1 < 0 ? slidesData.length - 1 : activeSlide - 1;

  // * vado alla nuova slide
  goToSlide(newIndex);
};

const nextButtonClickHandler = () => {
  // * controllo di essere nel range dell'array delle slides
  let newIndex = activeSlide + 1 >= slidesData.length ? 0 : activeSlide + 1;

  // * vado alla nuova slide
  goToSlide(newIndex);
};

// # ON LOAD

// * definisco la slide attiva
let activeSlide = 0;

// * stampo lo slider e ne recupero i nodi
const sliderConfig = generateSlider(slidesData, sliderJumbo, sliderThumbsContainer);

// # ON THUMB CLICK

// * per ogni thumb
sliderConfig.thumbs.forEach((thumb) => {
  // * al click su una thumb
  thumb.addEventListener('click', function () {
    // * recupero l'indice associato alla thumb
    const newIndex = parseInt(this.getAttribute('data-index'));

    // * vado alla slide corrispondente
    goToSlide(newIndex);
  });
});

// # ON NEXT CLICK

// * eseguo la logica del click
nextButton.addEventListener('click', nextButtonClickHandler);

// # ON PREV CLICK

// * eseguo la logica del click
prevButton.addEventListener('click', prevButtonClickHandler);

// # ON INVERT AUTOPLAY CLICK

// * inverto lo stato "forward" nella configurazione dello slider
invertAutoplayButton.addEventListener('click', () => {
  sliderConfig.autoplay.forward = !sliderConfig.autoplay.forward;
});

// # ON SLIDER ENTER

// * disattivo lo stato "active" dell'autoplay nella configurazione dello slider
slider.addEventListener('mouseenter', () => {
  sliderConfig.autoplay.active = false;
});

// # ON SLIDER LEAVE

// * attivo lo stato "active" dell'autoplay nella configurazione dello slider
slider.addEventListener('mouseleave', () => {
  sliderConfig.autoplay.active = true;
});

// # SLIDER AUTOPLAY

// * ogni 3 secondi
setInterval(() => {
  // * se lo stato "active" dell'autoplay è attivo e la direzione è "forward" vado alla prossima slide
  if (sliderConfig.autoplay.active && sliderConfig.autoplay.forward) nextButtonClickHandler();

  // * se lo stato "active" dell'autoplay è attivo e la direzione non è "forward" vado alla slide precedente
  if (sliderConfig.autoplay.active && !sliderConfig.autoplay.forward) prevButtonClickHandler();
}, 3000);
