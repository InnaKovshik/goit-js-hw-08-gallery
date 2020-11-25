'use strict';

import gallery from "./gallery-items.js";
const refs = {
  galleryHtml: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  buttonClose: document.querySelector(".lightbox__button"),
}

// Create from data array and template
const galleryItem = (({ preview, original, description }) =>
  `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`
);
const galleryList = gallery.reduce((acc, item) => acc + galleryItem(item), '');

// insert into HTML
refs.galleryHtml.insertAdjacentHTML('beforeEnd', galleryList);

// Opening a modal window by clicking on the gallery
const openModal = e => {
  e.preventDefault();
  const openWindow = e.target;
  if (openWindow.nodeName !== 'IMG') {
    return;
  }
  if (openWindow.nodeName === 'IMG') {
    refs.modal.classList.add('is-open');
    refs.lightboxImage.src = openWindow.getAttribute('data-source');
    refs.lightboxImage.alt = openWindow.alt;
  }
};
refs.galleryHtml.addEventListener('click', openModal);


// Close the modal window by clicking on the button
const closeModal = e => {
  const closeWindow = e.target;
  if (closeWindow.nodeName !== 'BUTTON') {
    return;
  }
  if (closeWindow.nodeName === 'BUTTON') {
    refs.modal.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
  }
  }
refs.buttonClose.addEventListener('click', closeModal);




