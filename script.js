document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const gap = 12; // Adjust this value to match the gap set in CSS

    // Calculate the width of each card based on the grid-auto-columns property
    const cardWidth = carousel.offsetWidth - gap;

    // Update the width of each card
    carousel.querySelectorAll('.card').forEach(card => {
        card.style.width = `${cardWidth}px`;
    });

    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

    // Insert copies of the last few cards to the beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to the end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel to the appropriate position to hide the first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false, return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += cardWidth, 2500);
    };
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    // carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Scroll to the contact card when the "Contact" link is clicked
    var contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            var contactCard = document.querySelector('.card[name="contact"]');
            if (contactCard) {
                // Calculate the offset of the target card relative to the carousel
                var offset = contactCard.offsetLeft - carousel.offsetLeft;
                // Scroll the carousel to the target card
                carousel.scrollLeft = offset;
            }
        });
    }
    var button = document.getElementById("About");
    // Add event listener to the button
    button.addEventListener("click", function() {
        // Code to execute when the button is clicked
        console.log("Button clicked!");
        carousel.scrollLeft +=(cardWidth);
    });
    var button = document.getElementById("Skill");
    // Add event listener to the button
    button.addEventListener("click", function() {
        // Code to execute when the button is clicked
        console.log("Button clicked!");
        carousel.scrollLeft +=(2*cardWidth);
    });
    var button = document.getElementById("Projects");
    // Add event listener to the button
    button.addEventListener("click", function() {
        // Code to execute when the button is clicked
        console.log("Button clicked!");
        carousel.scrollLeft +=(3*cardWidth);
    });
    
    var button = document.getElementById("Contact");
    // Add event listener to the button
    button.addEventListener("click", function() {
        // Code to execute when the button is clicked
        console.log("Button clicked!");
        carousel.scrollLeft -=(cardWidth);
    });
    var button = document.getElementById("click");
    // Add event listener to the button
    button.addEventListener("click", function() {
        // Code to execute when the button is clicked
        console.log("Button clicked!");
        carousel.scrollLeft;
    });

           
});


