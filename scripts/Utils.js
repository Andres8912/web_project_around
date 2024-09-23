
export function handleOpenImage(title, link) {
    const popUpImage = document.querySelector(".popup__image");
    const popUpInfo = document.querySelector(".popup__info");
    const popUpNewPic = document.querySelector("#popup__pic");
  
    popUpImage.src = link;
    popUpInfo.textContent = title;
    popUpNewPic.classList.add("popup__show");
  }
  
  export function closeModal(popup) {
    popup.classList.remove("popup__show");
  }
  
  export function setOverlayAndEscapeClose() {
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => closeModal(overlay.closest(".popup")));
    });
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const popup = document.querySelector(".popup__show");
        if (popup) closeModal(popup);
      }
    });

    document.querySelector('form').addEventListener('submit', (event) =>{
        const input = document.querySelector('#someInputField');
        if (!input.value.trim()) {
          alert('Por favor, completa todos los campos requeridos.');
          event.preventDefault(); // Detiene el envío del formulario si la validación falla
        } else {
          // Aquí puedes añadir cualquier lógica adicional necesaria antes del envío
          console.log('Formulario listo para ser enviado.');
          // No se llama a event.preventDefault(), por lo que el formulario se enviará
        }
    });
  }

