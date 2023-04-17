'use strict';
// > - - - - - - - - [Import] - - - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - - - -
// import * as functions from './modules/functions.js';
import { initHeader } from './modules/header.js';
import { initSpoiler, initDdropdown } from './modules/spoilers.js';
import { initSliders } from './modules/slider.js';
import { initModals } from './modules/modal.js'; // openModalIf
import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import { inputMask } from './modules/inputMasks.js';
import { hasErrors, filePreview } from './modules/forms.js'; // viewPass, filePreview
// import AOS from 'aos';
import fslightbox from 'fslightbox';
import { consoleInfo } from './modules/console-info.js';

// > - - - - - - - - [app development] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
document.addEventListener('DOMContentLoaded', app);

function app() {
   // > - - - - - - [init functions 'START'] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
   consoleInfo();
   useDynamicAdapt('max');
   initHeader();
   initSliders();
   initDdropdown();
   initModals();
   const lightbox = new FsLightbox();
   // > - - - - - - [functions init 'END'] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


   // > - - - - - - - - [delegation 'START'] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
   document.addEventListener('click', delegation);

   function delegation(e) {
      const targetElement = e.target;
   }
   // > - - - - - - - - [delegation 'END'] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




   // - - - - - - - [other scripts] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   // logo appearance fix
   setTimeout(() => {
      document.querySelector('.header__logo').style.display = 'block';
   }, 100)



   // dynamic input name
   const cards = document.querySelectorAll('.info-product__size');

   cards.forEach((card, index) => {
      const sizes = card.querySelectorAll('.info-product__size input');
      sizes.forEach((size, sizeIndex) => {
         size.name = `pizza-size-${index+1}`;
      });
   });



   // star rate
   function setRating() {
      const ratings = document.querySelectorAll('[data-rating-value]');
      if (ratings.length > 0) {
         ratings.forEach((rating) => {
            const ratingValue = rating.dataset.ratingValue;
            const ratingBar = rating.firstElementChild;
            rating.setAttribute('aria-label', `Raiting is ${ratingValue} from 5`);
            const index = ratingValue / 0.05;
            ratingBar.style.width = `${index}%`;
         });
      }
   }
   setRating()



   // sort products
   const sortedProducts = Array.from(document.querySelectorAll('.product-item'));
   const productContainer = document.querySelector('.catalog__body');

   // shuffle products
   function shuffleProducts() {
      sortedProducts.sort(() => Math.random() - 0.5);
      productContainer.textContent = '';
      sortedProducts.forEach((product) => {
         productContainer.append(product);
      });
   }

   function sortByPrice(direction) {
      sortedProducts.sort((a, b) => {
         const priceA = parseInt(a.querySelector('.product-item__new-price span').textContent);
         const priceB = parseInt(b.querySelector('.product-item__new-price span').textContent);
         return direction === 'asc' ? priceA - priceB : priceB - priceA;
      });
      productContainer.textContent = '';
      sortedProducts.forEach((product) => {
         productContainer.append(product);
      });
   }

   const selectTrigger = document.querySelector('.filter-catalog__sort select');
   if (selectTrigger) {
      selectTrigger.addEventListener('change', (event) => {
         const direction = event.target.value;
         if (direction === 'shuffle') {
            shuffleProducts();
         } else {
            sortByPrice(direction);
         }
      });
   }
   // - - - - - - - [send form] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   const form = document.querySelector('.modal-comments__form');
   const offerForm = document.querySelector('.form-offer');
   if (offerForm) {
      inputMask(offerForm);
   }
   if (form) {
      const fileInput = form.querySelector('input[type="file"]');
      inputMask(form);
      filePreview(form);
      form.addEventListener('submit', async (event) => {
         event.preventDefault();
         if (hasErrors(form) == 0) {
            const formData = new FormData(form);
            console.log(formData);
            const files = Array.from(fileInput.files);
            files.forEach(file => {
               formData.append('files[]', file);
            });
            try {
               const response = await fetch('sendmail.php', {
                  method: 'POST',
                  body: formData
               });
               if (!response.ok) {
                  throw new Error('Ошибка сервера: ' + response.status);
               }
               const responseText = await response.text();
               console.log(responseText);
            } catch (error) {
               console.error(error);
            }
         } else {
            alert('Перевірте введені дані!')
         }
      });
   }

}