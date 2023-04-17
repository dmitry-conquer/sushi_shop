const spoilers = {
   spoiler() {
      document.addEventListener("click", function(e) {
         const spoilerTrigger = e.target.closest("[data-spoiler]");
         if (spoilerTrigger) {
            const spoilerData = spoilerTrigger.dataset.spoiler;
            if (!spoilerData || window.innerWidth <= spoilerData) {
               spoilers.openSpoiler(spoilerTrigger);
            }
         }
      });
   },

   dropdown() {
      let dropdownContent;
      let dropdownTrigger;
      document.addEventListener('click', function(e) {
         if (e.target.closest('[data-dropdown]')) {
            dropdownTrigger = e.target.closest('[data-dropdown]');
            dropdownTrigger.setAttribute('aria-expanded', dropdownTrigger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            dropdownContent = dropdownTrigger.nextElementSibling;
            dropdownTrigger.classList.toggle('_active-dropdown');
            dropdownContent.classList.toggle('_active-dropdown-content');
         } else if (document.querySelector('._active-dropdown-content') && !e.target.closest('._active-dropdown-content')) {
            const dropdownTriggers = document.querySelectorAll('._active-dropdown');
            dropdownTriggers.forEach((trigger) => {
               trigger.classList.remove('_active-dropdown');
               trigger.setAttribute('aria-expanded', 'false');
               trigger.nextElementSibling.classList.remove('_active-dropdown-content');
            })
         }
      });
   },

   openSpoiler(spoilerTrigger) {
      spoilerTrigger.classList.toggle('_active-spoiler');
      spoilerTrigger.setAttribute('aria-expanded', spoilerTrigger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      const spoilerContent = spoilerTrigger.nextElementSibling;
      spoilerContent.style.maxHeight = spoilerContent.style.maxHeight ? null : `${spoilerContent.scrollHeight}px`;

   }

}

export const initSpoiler = spoilers.spoiler;
export const initDdropdown = spoilers.dropdown;