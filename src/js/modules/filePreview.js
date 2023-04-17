const uploadFiles = {
  filePreview(fileInput) {
    const filePreview =
      fileInput.nextElementSibling.querySelector(".file-preview");
    if (filePreview.querySelector(".file-preview__image")) {
      filePreview.removeChild(filePreview.firstElementChild);
    }
    if (fileInput.value !== "") {
      if (uploadFiles.fileUpload(fileInput)) {
        const reader = new FileReader();
        const file = fileInput.files[0];
        if (file) {
          reader.readAsDataURL(file);
        } else {
          return false;
        }
        reader.onloadend = function (e) {
          filePreview.insertAdjacentHTML(
            "beforeend",
            `<img class="file-preview__image" src="${e.target.result}" alt = "image">`
          );
        };
        reader.onerror = function () {
          alert("Error!");
        };
      }
    }
  },

  fileUpload(fileInput) {
    if (fileInput !== "") {
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(
          fileInput.files[0].type
        )
      ) {
        fileInput.value = "";
        fileInput.dataset.error = "Только изображения";
        // formValidation.addError(fileInput);
        alert("file errro format");
        return false;
      }
      if (fileInput.files[0].size > 2 * 1024 * 1024) {
        fileInput.value = "";
        fileInput.dataset.error = "Меньше 2 мб";
        // formValidation.addError(fileInput);
        alert("file errro size");
        return false;
      }
      return true;
    }
  },
};

export const filePreview = uploadFiles.filePreview;
