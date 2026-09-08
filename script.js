// ========================================
// Select Elements
// ========================================

const track =
    document.getElementById("testimonialTrack");

const cards =
    document.querySelectorAll(".testimonial-card");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const dotsContainer =
    document.getElementById("dots");


// ========================================
// Slider State
// ========================================

let currentIndex = 0;

let autoSlide;


// ========================================
// Create Navigation Dots
// ========================================

cards.forEach(function (card, index) {

    const dot =
        document.createElement("button");

    dot.classList.add("dot");

    dot.type = "button";

    dot.setAttribute(
        "aria-label",
        `Show testimonial ${index + 1}`
    );

    dot.addEventListener(
        "click",
        function () {

            currentIndex = index;

            updateSlider();

            restartAutoSlide();

        }
    );

    dotsContainer.appendChild(dot);

});


// Get all dots

const dots =
    document.querySelectorAll(".dot");


// ========================================
// Update Slider
// ========================================

function updateSlider() {

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;


    dots.forEach(function (dot, index) {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


// ========================================
// Next Testimonial
// ========================================

function showNext() {

    currentIndex++;

    if (currentIndex >= cards.length) {

        currentIndex = 0;

    }

    updateSlider();

}


// ========================================
// Previous Testimonial
// ========================================

function showPrevious() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = cards.length - 1;

    }

    updateSlider();

}


// ========================================
// Button Events
// ========================================

nextButton.addEventListener(
    "click",
    function () {

        showNext();

        restartAutoSlide();

    }
);


prevButton.addEventListener(
    "click",
    function () {

        showPrevious();

        restartAutoSlide();

    }
);


// ========================================
// Auto Slide
// ========================================

function startAutoSlide() {

    autoSlide =
        setInterval(
            showNext,
            5000
        );

}


function stopAutoSlide() {

    clearInterval(autoSlide);

}


function restartAutoSlide() {

    stopAutoSlide();

    startAutoSlide();

}


// ========================================
// Pause On Hover
// ========================================

const slider =
    document.querySelector(".testimonial-slider");


slider.addEventListener(
    "mouseenter",
    stopAutoSlide
);


slider.addEventListener(
    "mouseleave",
    startAutoSlide
);


// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            showNext();

            restartAutoSlide();

        }


        if (event.key === "ArrowLeft") {

            showPrevious();

            restartAutoSlide();

        }

    }
);


// ========================================
// Initialize
// ========================================

updateSlider();

startAutoSlide();