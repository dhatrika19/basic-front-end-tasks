document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");
  const carouselIndicators = document.getElementById("carouselIndicators");
  const toggleAutoplayBtn = document.getElementById("toggleAutoplay");
  const showCaptionsCheckbox = document.getElementById("showCaptions");

  if (carouselTrack) {
    const carouselImages = [
      { src: "p1.jpg", caption: "Ocean Sunset" },
      { src: "p2.jpg", caption: "Mountain Ridge" },
      { src: "p3.jpg", caption: "City Skyline" },
      { src: "p4.jpg", caption: "Mountain Range" },
      { src: "p5.jpg", caption: "River" },  
      { src: "p6.jpg", caption: "Waterfall" },
      { src: "p7.jpg", caption: "Roadway" },
      { src: "p8.jpg", caption: "Autumn Bridge" }
    ];

    let currentSlide = 0;
    let autoplay = false;
    let autoplayIntervalId = null;

    function buildCarousel() {
      carouselTrack.innerHTML = "";
      carouselIndicators.innerHTML = "";

      carouselImages.forEach((imgObj, idx) => {
        const slide = document.createElement("div");
        slide.className = "carousel-slide";

        const img = document.createElement("img");
        img.src = imgObj.src;
        img.alt = imgObj.caption || `Slide ${idx + 1}`;
        slide.appendChild(img);

        const caption = document.createElement("div");
        caption.className = "carousel-caption";
        caption.textContent = imgObj.caption || "";
        if (!showCaptionsCheckbox || !showCaptionsCheckbox.checked)
          caption.style.display = "none";
        slide.appendChild(caption);

        carouselTrack.appendChild(slide);

        const ind = document.createElement("button");
        ind.className = "indicator";
        ind.addEventListener("click", () => goToSlide(idx));
        carouselIndicators.appendChild(ind);
      });

      updateCarousel();
    }

    function updateCarousel() {
      const slideWidth = carouselTrack.clientWidth;
      carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

      const indicators = document.querySelectorAll(".indicator");
      indicators.forEach((ind, i) => {
        ind.classList.toggle("active", i === currentSlide);
      });
    }

    function goToSlide(idx) {
      if (idx < 0) idx = carouselImages.length - 1;
      if (idx >= carouselImages.length) idx = 0;
      currentSlide = idx;
      updateCarousel();
    }

    function startAutoplay() {
      if (autoplayIntervalId) return;
      autoplayIntervalId = setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselImages.length;
        updateCarousel();
      }, 3000);
      autoplay = true;
      toggleAutoplayBtn.textContent = "Stop Autoplay";
    }

    function stopAutoplay() {
      if (!autoplayIntervalId) return;
      clearInterval(autoplayIntervalId);
      autoplayIntervalId = null;
      autoplay = false;
      toggleAutoplayBtn.textContent = "Start Autoplay";
    }

    function resetAutoplay() {
      if (autoplay) {
        stopAutoplay();
        startAutoplay();
      }
    }

    carouselPrev?.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    carouselNext?.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });

    toggleAutoplayBtn?.addEventListener("click", () => {
      if (autoplay) stopAutoplay();
      else startAutoplay();
    });

    showCaptionsCheckbox?.addEventListener("change", () => {
      const caps = document.querySelectorAll(".carousel-caption");
      caps.forEach(c => {
        c.style.display = showCaptionsCheckbox.checked ? "" : "none";
      });
    });

    buildCarousel();
    window.addEventListener("resize", updateCarousel);
  }
});
