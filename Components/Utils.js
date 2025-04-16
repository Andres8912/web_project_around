
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

    document.querySelectorAll(".close-btn").forEach((overlay) => {
      overlay.addEventListener("click", () => closeModal(overlay.closest(".popup")));
    });
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const popup = document.querySelector(".popup__show");
        if (popup) closeModal(popup);
      }
    });

   
  }

