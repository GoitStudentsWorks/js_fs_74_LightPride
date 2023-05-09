const refs = {  
  overlayPopUp: document.getElementById('overlayPopUp'),  
  closeModalPopUp: document.getElementById('closeModalPopUp'),
  openModalPopUp: document.getElementById('openModalPopUp'),
  modalPopUp: document.getElementById('modalPopUp'),
  btnPopUp: document.getElementById('mylibrary'),
  closeIconPopUp: document.querySelector('.pop-up-modal__close-icon'),
  blokPopUp: document.querySelector('.pop-up-modal__blok'), 
  aboutTxtPopUp: document.querySelector('.pop-up-modal__about-txt'),

  image: document.querySelector('.pop-up-modal__img'),
  titles: document.querySelector('.pop-up-modal__title'),
  vote: document.querySelector('.vote'),
  votes: document.querySelector('.votes'),
  popular: document.querySelector('.popularity'),
  genre: document.querySelector('.genres'),
};

const classes = {
  openModal: 'open-modal',
  visual: 'visual',
};
// ВИКЛИК МОДАЛКИ ТИМЧАСОВОЮ КНОПКОЮ (ПОТІМ ПРИБРАТИ)
refs.openModalPopUp.addEventListener('click', handlePopUpModal);

refs.closeModalPopUp.addEventListener('click', handlePopUpModal);
refs.overlayPopUp.addEventListener('click', handlePopUpModal);
document.addEventListener('keydown', handlePopUpModalClose)

function handlePopUpModalClose({code}) {  
  if (code === 'Escape' && modalPopUp.classList.contains(classes.visual)) {    
    handlePopUpModal();
  }
}

function handlePopUpModal() {
  getPopUpMovies();
  toogleLightPopUp();
  document.body.classList.toggle(classes.openModal);
  overlayPopUp.classList.toggle(classes.visual);
  modalPopUp.classList.toggle(classes.visual);  
  console.log(modalPopUp);  
};

// === Тимчасовий пробний запис в localStorage ===
// localStorage.setItem('film-id', 502356);
// localStorage.removeItem('film-id', 502356);
// POPUP MOVIES

const API_KEY = 'ec3ca0e4403710b7fc1497b1dbf32c54';
const POPUP_URL = `https://api.themoviedb.org/3/movie/`;
const POPUP_ID = localStorage.getItem('film-id');
let MYLIBRARY_ID;
console.log(POPUP_ID);
// 502356 840326 1008005

function fetchPopUpMovies() {
  return fetch(`${POPUP_URL}${POPUP_ID}?api_key=${API_KEY}`)
  .then(data => {    
    return data.json();      
  })
}

async function getPopUpMovies() {
  try {
    const { id, poster_path, title, overview, popularity, vote_average, vote_count, genres } = await fetchPopUpMovies();
    MYLIBRARY_ID = id;
    console.log(MYLIBRARY_ID);
    refs.image.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;      
    refs.titles.textContent = title;            
    refs.vote.textContent = vote_average;         
    refs.votes.textContent = vote_count;      
    refs.popular.textContent = popularity;    
    console.log(genres);       
    refs.genre.textContent = genres.map((genres) => genres.name).join(" ");   
    refs.aboutTxtPopUp.textContent = overview;      
  } catch (error) {
    console.log(error);
  }
}

// === set/remome в localStorage 'mylberyId' ====
refs.btnPopUp.addEventListener('click', pushMyLibrary);

function pushMyLibrary() {
  if (!refs.btnPopUp.classList.contains('add_mylibrary')) {
    refs.btnPopUp.classList.add('add_mylibrary');     
    localStorage.setItem('mylbery-id', MYLIBRARY_ID);  
    console.log(localStorage.mylberyId);
  } else {
    refs.btnPopUp.classList.remove('add_mylibrary');
    localStorage.removeItem('mylbery-id', MYLIBRARY_ID);
  }
}

// ===== Перемикач теми DARK/LIGHT =====
const toogle = document.getElementById('toggle');
toogle.addEventListener('click', toogleLight);

function toogleLight() {
document.body.classList.toggle('light_color');
toogleLightPopUp();
}

function toogleLightPopUp() {   
  if (document.body.classList.contains('light_color')) {
  refs.modalPopUp.classList.add('light_shadow', 'light_color');  
  refs.btnPopUp.classList.add('light_color');  
  refs.blokPopUp.classList.add('light_color');  
  refs.closeIconPopUp.classList.add('light_fill');   
  refs.aboutTxtPopUp.classList.add('light_color');  
 } else {
  console.log(refs.modalPopUp.classList.contains('light_shadow'));  
  refs.modalPopUp.classList.remove('light_shadow', 'light_color');  
  refs.btnPopUp.classList.remove('light_color');  
  refs.blokPopUp.classList.remove('light_color');  
  refs.closeIconPopUp.classList.remove('light_fill');   
  refs.aboutTxtPopUp.classList.remove('light_color');  
 }
};
