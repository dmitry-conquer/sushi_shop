import { isMobile, tabLoopControl } from './functions.js';

export function initHeader() {
   const header = document.querySelector('.header');
   if (header) {
      const triggerSubmenu = document.querySelector('._open-sublist');
      const headerIcon = document.querySelector('._menu-icon');
      const headerMenu = document.querySelector('._menu-header');
      const menuItems = document.querySelectorAll('._menu-item');
      const headerContainer = document.querySelector('.header__top');

      const categoriesLinks = document.querySelectorAll('.bottom-header__link');


      if (window.innerWidth < 991.98) {
         headerMenu.style.visibility = 'hidden';
      }

      document.addEventListener('click', (e) => {
         const targetElement = e.target;
         // - - - - - - - [ICON ACTIONS] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
         if (targetElement.classList.contains('_menu-icon') || targetElement.closest('._menu-icon')) {
            document.body.classList.toggle('_lock');
            headerIcon.classList.toggle('_active-menu-icon');
            headerMenu.classList.toggle('_active-menu-header');

            // Animation of menu items on appearance
            menuItems.forEach((item, i) => {
               item.style.setProperty('--i', `${i}`);
               item.classList.toggle('_anim-menu-item');
            });


            // tab control (Accessibility)
            menuTabControl();
         }

         // - - - - - - - [MENU LINK CLOSE BURGER] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
         if (targetElement.closest('._menu-link')) {
            document.body.classList.remove('_lock');
            headerIcon.classList.remove('_active-menu-icon');
            headerMenu.classList.remove('_active-menu-header');
            menuItems.forEach((item) => {
               item.classList.remove('_anim-menu-item');
            });
         }
      });

      // - - - - - - - [change header on scroll] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      function callback(entries) {
         if (entries[0].isIntersecting) {
            header.classList.remove('_scroll');
         } else {
            header.classList.add('_scroll');
         }
      }
      const headerObserver = new IntersectionObserver(callback);
      headerObserver.observe(header);

      // - - - - - - - [menuTabControl] - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      function menuTabControl() {
         // Enable / disable tab navigation if menu is hidden
         if (headerMenu.classList.contains('_active-menu-header')) {
            headerMenu.style.visibility = 'visible';
            const headerContainer = document.querySelector('.header__top');
            tabLoopControl(headerContainer, false, true);
         } else {
            tabLoopControl(headerContainer, false, false);
            headerMenu.style.visibility = 'hidden';
         }
      }
   }
}