import { scrollbarWidth, tabLoopControl } from './functions.js';

let lastActiveElement;

const modalWindow = {
   initModal() {
      document.addEventListener('click', function(e) {
         if (e.target.closest('[data-modal]')) {
            const modalBlockId = e.target.closest('[data-modal]').dataset.modal;
            if (modalBlockId) {
               const modalBlock = document.getElementById(modalBlockId);
               const modalBody = modalBlock.querySelector('._modal-body');
               const modalContent = modalBlock.querySelector('._modal-content');

               lastActiveElement = e.target;
               lastActiveElement.setAttribute('aria-expanded', 'true');
               modalWindow.openModal(modalBlock, modalContent);
            }
         }
         if (e.target.closest('._close-modal') || e.target.classList.contains('_modal-body')) {
            const modalBlock = e.target.closest('._modal-wrapper');
            const modalBody = modalBlock.querySelector('._modal-body');
            const modalContent = modalBlock.querySelector('._modal-content');
            modalWindow.closeModal(modalBlock, modalContent, lastActiveElement);
         }
      });

      document.addEventListener('keydown', function(e) {
         if (e.key === 'Escape' || e.keyCode === 27) {
            document.querySelectorAll('._modal-wrapper').forEach((modal) => {
               if (modal) {
                  const modalContent = modal.querySelector('._modal-content');
                  modalWindow.closeModal(modal, modalContent, lastActiveElement);
               }
            });
         }
      });
   },

   openModalIf(modalId) {
      if (modalId) {
         const modalBlock = document.getElementById(modalId);
         const modalBody = modalBlock.querySelector('._modal-body');
         const modalContent = modalBlock.querySelector('._modal-content');
         modalContent.setAttribute('aria-hidden', 'false');

         lastActiveElement = document.activeElement;
         lastActiveElement.setAttribute('aria-expanded', 'true');
         modalWindow.openModal(modalBlock, modalContent);
      }
   },

   openModal(modalBlock, modalContent) {
      document.body.style.paddingRight = `${scrollbarWidth()}px`;
      document.querySelector('.header__wrapper').style.paddingRight = `${scrollbarWidth()}px`;
      document.body.classList.add('_lock');
      modalBlock.classList.add('_show-modal');
      modalContent.classList.add('_show-modal');
      modalContent.setAttribute('aria-hidden', 'false');
      tabLoopControl(modalBlock);
   },

   closeModal(modalBlock, modalContent, lastActiveElement) {
      // check header behavier
      document.body.classList.remove('_lock');
      document.body.style.paddingRight = `${0}px`;
      document.querySelector('.header__wrapper').style.paddingRight = `${0}px`;
      modalBlock.classList.remove('_show-modal');
      modalContent.classList.remove('_show-modal');
      modalContent.setAttribute('aria-hidden', 'true');
      if (lastActiveElement) {
         lastActiveElement.setAttribute('aria-expanded', 'false');
         lastActiveElement.focus();
      }
   },
};

export const initModals = modalWindow.initModal;
export const openModalIf = modalWindow.openModalIf;