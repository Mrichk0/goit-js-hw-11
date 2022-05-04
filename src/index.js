import Notiflix from 'notiflix';
import './sass/main.scss';
import { cardMarkup } from './js/markup';
import { getPhoto } from './js/getPhoto';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const input = document.getElementById('input');
const loadMoreButton = document.querySelector('.load-more');
const perPage = 40;

loadMoreButton.style.visibility = 'hidden';

loadMoreButton.addEventListener('click', onloadMoreButton);

let page = 1;

async function onloadMoreButton(event) {
  const searchText = input.value.trim();
  page += 1;
  const { totalHits, hits } = await getPhoto(searchText, page);
  gallery.innerHTML += cardMarkup(hits);
  if (page * perPage >= totalHits) {
    loadMoreButton.style.visibility = 'hidden';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

form.addEventListener('submit', onButtonClick);

async function onButtonClick(event) {
  event.preventDefault();
  const searchText = input.value.trim();
  if (searchText !== '') {
    try {
      const { totalHits, hits } = await getPhoto(searchText, page);
      gallery.innerHTML = cardMarkup(hits);
      if (totalHits <= perPage && !hits.length) {
        // searchText.reset();
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        loadMoreButton.style.visibility = 'hidden';
      } else {
        loadMoreButton.style.visibility = 'visible';
      }
    } catch (error) {
      Notiflix.Notify.failure('Sorry, there was a problem with your request. Please try again.');
    }
  } else {
    gallery.innerHTML = '';
  }
}
