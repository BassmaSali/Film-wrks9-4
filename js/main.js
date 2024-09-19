const apiKey = "407f47bc84851cff2dbcfd732a7719db";
const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en_US&page=1&api_key=${apiKey}`;
const movieContainer = document.getElementById("movies");

async function fetchMovies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    movieContainer.innerHTML = ""; // Corrected to movieContainer

    data.results.slice(0, 8).forEach(media => {
      const movieCard = createMovieCard(media);
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createMovieCard(movie) {
  const { title, backdrop_path } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`; // Correct URL format

  const movieCard = document.createElement("div");
  movieCard.classList.add("cards");

  movieCard.innerHTML = `
    <div class="card-img">
      <img src="${imgUrl}" alt="${title}">
    </div>
    <div class="card-title">
      <h3>${title}</h3>
    </div>
  `;

  return movieCard;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies(); // Ensure this is called after DOM is loaded
});


document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".logo a");
  splitTextIntoSpans(".hero-copy h1");
  animateText();
});

function splitTextIntoSpans(selector) {
  var element = document.querySelector(selector);
  if (element) {
    var text = element.textContent;
    var splitText = text
      .split("")
      .map((char) => `<span class="letter-span">${char}</span>`)
      .join("");
    element.innerHTML = splitText;
  }
}

function animateText() {
  setTimeout(() => {
    gsap.to(".hero img", {
      scale: 1,
      ease: "power3.inOut",
      duration: 2,
    });

    // Text animation
    gsap.to(".hero-copy h1 .letter-span", {
      top: "0",
      stagger: 0.02,
      ease: "power3.inOut",
      duration: 1.5,
      delay: 0.03,
    });

    //navbar animation
    gsap.to("nav", {
      top: "0",
      ease: "power3.inOut",
      duration: 2,
      delay: 0.03,
    });

    //Movie details fade in
    gsap.to(".hero-copy .movie-details ", {
      opacity: 1,
      duration: 0.3,
      ease: "power3.inOut",
      delay: 1,
    });

    //book-tickets button
    gsap.to(".book-tickets ", {
      opacity: 1,
      duration: 0.3,
      ease: "power3.inOut",
      delay: 1, 
    });

    setTimeout(() => {
      const heroImage = document.querySelector(".hero img");
      const heroVideo = document.querySelector(".hero video");

      // Fade out the image
      gsap.to(heroImage, {
        opacity: 0,
        duration: 0.2,
        ease: "power3.inOut",
        onComplete: () => {
          // After image fades out, fade in the video and start playing
          gsap.to(heroVideo, {
            opacity: 0.8,
            duration: 0.2,
            ease: "power3.inOut",
            onComplete: () => {
              heroVideo.play();
            },
          });
        },
      });

      // Listen for when the video ends
      heroVideo.addEventListener("ended", () => {
        // Fade out the video
        gsap.to(heroVideo, {
          opacity: 0,
          duration: 0.2,
          ease: "power3.inOut",
          onComplete: () => {
            // Fade the image back in after the video ends
            gsap.to(heroImage, {
              opacity: 0.4,
              duration: 0.01,
              ease: "power3.inOut",
            });
          },
        });
      });
    }, 3000); // 3-second delay before switching from image to video
  }, 300); // Initial delay before starting the animations
}
