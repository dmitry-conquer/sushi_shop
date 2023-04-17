import Swiper, { Navigation, Parallax } from 'swiper';

export function initSliders() {
   if (document.querySelector('.slider-hero')) {
      new Swiper('.slider-hero', {
         modules: [Navigation, Parallax],
         wrapperClass: 'slider-hero__wrapper',
         slideClass: 'slider-hero__slide',
         // slidesPerView: 1,
         spaceBetween: 24,
         speed: 800,
         parallax: true,
         navigation: {
            prevEl: '.slider-hero__navigation_prev',
            nextEl: '.slider-hero__navigation_next'
         },
      });
   }
   if (document.querySelector('.slider-top')) {
      new Swiper('.slider-top', {
         modules: [Navigation],

         // Custom classes
         wrapperClass: 'slider-top__wrapper',
         slideClass: 'slide-top',

         // Common settings
         slidesPerView: 3,
         spaceBetween: 30,
         speed: 800,
         observer: true,
         observeParents: true,


         navigation: {
            prevEl: '.slider-top__button_prev',
            nextEl: '.slider-top__button_next',
         },

         // Breakpoints
         breakpoints: {
            320: {
               slidesPerView: 1.2,
               spaceBetween: 20,
            },
            575.98: {
               slidesPerView: 2.2,
            },
            767.98: {
               slidesPerView: 2,
            },
            991.98: {
               slidesPerView: 3,
               spaceBetween: 24,
            },
         },

      });
   }
   if (document.querySelector('.slider-combo')) {
      new Swiper('.slider-combo', {
         modules: [Navigation],

         // Custom classes
         wrapperClass: 'slider-combo__wrapper',
         slideClass: 'slide-combo',

         // Common settings
         slidesPerView: 3,
         spaceBetween: 30,
         speed: 800,
         observer: true,
         observeParents: true,
         navigation: {
            prevEl: '.slider-combo__button_prev',
            nextEl: '.slider-combo__button_next',
         },

         // Breakpoints
         breakpoints: {
            320: {
               slidesPerView: 1.2,
               spaceBetween: 20,
            },
            575.98: {
               slidesPerView: 2.2,
            },
            767.98: {
               slidesPerView: 2,
            },
            991.98: {
               slidesPerView: 3,
               spaceBetween: 24,
            },
         },

      });
   }
   if (document.querySelector('.slider-product')) {
      new Swiper('.slider-product', {
         modules: [Navigation],

         // Custom classes
         wrapperClass: 'slider-product__wrapper',
         slideClass: 'slide-product',

         // Common settings
         slidesPerView: 1,
         spaceBetween: 30,
         speed: 800,
         observer: true,
         observeParents: true,
         navigation: {
            prevEl: '.slider-product__button_prev',
            nextEl: '.slider-product__button_next',
         },
      });
   }
}