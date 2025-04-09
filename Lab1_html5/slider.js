document.addEventListener("DOMContentLoaded", function() {
    const largeContainer = document.querySelector('.large-image-container');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const playPauseBtn = document.getElementById('playPause');
    const repeatCheckbox = document.getElementById('repeat');
    const intervalSelect = document.getElementById('intervalSelect');
    // Array cu sursele imaginilor (din thumbnail-uri sau explicit)
    const images = Array.from(thumbnails).map(img => img.src);
    
    // Variabile
    let currentIndex = 0;
    let playing = false;
    let slideInterval = null;
    
    // Funcție de afișare a imaginii curente
    function showImage(index) {
    if (index < 0 || index >= images.length) return;
        currentIndex = index;
      // Setăm background-ul containerului mare
        largeContainer.style.backgroundImage = `url("${images[currentIndex]}")`;
    }
    
    // Funcție pentru următoarea imagine
    function nextImage() {
        let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
        if (!repeatCheckbox.checked) {
            pauseSlideshow();
            return;
        }
        nextIndex = 0;
        }
        showImage(nextIndex);
    }
    
    // Pornește slideshow-ul
    function startSlideshow() {
        const intervalTime = parseInt(intervalSelect.value);
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextImage, intervalTime);
        playing = true;
        playPauseBtn.textContent = "Pauză";
    }
    
    // Oprește slideshow-ul
    function pauseSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = null;
        playing = false;
        playPauseBtn.textContent = "Play";
    }
    
    // Handler pentru play/pause
    playPauseBtn.addEventListener("click", function() {
        if (playing) {
        pauseSlideshow();
        } else {
        startSlideshow();
        }
    });
    
    // Schimbare interval atunci când utilizatorul modifică valoarea din combobox
    intervalSelect.addEventListener("change", function() {
        if (playing) {
        startSlideshow();  // repornim intervalul cu noua valoare
        }
    });
    
    thumbnails.forEach((img, index) => {
        img.addEventListener("click", function() {
        showImage(index);
        pauseSlideshow();
    });
    });
    
    // Inițial, afișăm prima imagine
    showImage(currentIndex);
});
