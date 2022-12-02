const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", e => {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const closeIcon = popupCloseIcon[i];
        closeIcon.addEventListener("click", e => {
            popupClose(closeIcon.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup) {
        bodyLock();
        searchProducts.classList.remove("active");
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", e => {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive) {
    popupActive.classList.remove('open');
    bodyUnlock();
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.component').offsetWidth + 'px';
    document.body.style.paddingRight = lockPaddingValue;
    document.body.classList.add('lock');
}

function bodyUnlock() {
    document.body.style.paddingRight = '0px';
    document.body.classList.remove('lock');
}