/* === Проверка мобильного браузера === */
export const isMobile = {
   Android() {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
   },
};

/*  === Возвращает ширину скролла === */
export function scrollbarWidth() {
   const documentWidth = parseInt(document.documentElement.clientWidth);
   const windowsWidth = parseInt(window.innerWidth);
   const scrollbarWidth = windowsWidth - documentWidth;
   return scrollbarWidth;
}

/*  === Проверка поддержки webp, добавление класса webp или no-webp для HTML === */
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function() {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   // Добавление класса _webp или _no-webp для HTML
   testWebP((support) => {
      const className = support === true ? 'webp' : 'no-webp';
      document.documentElement.classList.add(className);
   });
}

// - - - - - - - [tabLoopControl] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let tabControlListener; // сохраняем ссылку на обработчик событий;
export function tabLoopControl(target, toStart = true, stopTrigger = true) {
   const focusableElements = target.querySelectorAll('a, button, input, textarea, select');
   const firstFocusableElement = focusableElements[0];
   const lastFocusableElement = focusableElements[focusableElements.length - 1];
   if (toStart) {
      target.addEventListener('transitionend', function(e) {
         if (e.target.classList.contains('_show-modal')) {
            firstFocusableElement.focus();
         }
      });
   }
   if (stopTrigger) {
      tabControlListener = tabControl;
      target.addEventListener('keydown', tabControlListener)
   } else {
      target.removeEventListener('keydown', tabControlListener)
   }

   function tabControl(e) {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) {
         return;
      }
      if (e.shiftKey) {
         /* shift + tab */
         if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
         }
      } /* tab */
      else {
         if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
         }
      }
   }
}