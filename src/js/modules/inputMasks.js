import IMask from "imask";
export function inputMask(form) {
  form.addEventListener("focusin", (e) => {
    if (e.target.dataset.mask === "tel") {
      const maskOptions = {
        mask: "+{38}(000)000-00-00",
        lazy: false,
      };
      IMask(e.target, maskOptions);
    }
  });
}
