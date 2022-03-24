// function to remove style properties
HTMLElement.prototype.nostyle = function () {
  this.style.removeProperty("background");
  this.style.removeProperty("animation");
};

// universal parameters
let exponat;
let current_barrel = 15; // index of the current barrel
let index; // index for the timeline element above/below current year
let circle_clicked = 0; // which touchpoint was clicked
let carousel_version = 0;
let tsX;
let cprevEvent;

// HTML elements

// left part
let barrel_images = document.getElementById("barrel_images");
let circle1 = document.getElementById("circle-1");
let circle2 = document.getElementById("circle-2");
let circle3 = document.getElementById("circle-3");
// main part
let exhibitname = document.getElementById("exhibit-name");
let year = document.getElementById("year");

let contentbox = document.getElementById("content");
let headline = document.getElementById("headline");
let subline = document.getElementById("subline");
let textblock = document.getElementById("description");

let carousel = document.getElementById("carousel");
let carousel_card1 = document.getElementById("carousel_card1");
let carousel_headline = document.getElementById("carousel_headline");
let carousel_textblock = document.getElementById("carousel_description");
let carousel_img1 = document.getElementById("carousel_img1");
let carousel_img2 = document.getElementById("carousel_img2");

// right part
let logo = document.getElementById("logo");
let current_year = document.getElementById("current_year");
let other_years = document.getElementsByClassName("other_years");

function start(jsonObj) {
  barrel_images.classList.remove("fadeIn");
  barrel_images.classList.add("fadeIn");
  sendClick("Fass-" + current_barrel, "on");

  // put text and sources from JSON in HTML
  exhibitname.innerHTML = jsonObj.exponatname;
  barrel_images.src = jsonObj.barrels[current_barrel].image;
  carousel_img1.src = jsonObj.barrels[current_barrel].news_images[0];
  carousel_img2.src = jsonObj.barrels[current_barrel].news_images[1];

  // positions of the touchpoints from the JSON
  circle1.style.marginTop = jsonObj.barrels[current_barrel].circle_1_top;
  circle1.style.marginLeft = jsonObj.barrels[current_barrel].circle_1_left;

  circle2.style.marginTop = jsonObj.barrels[current_barrel].circle_2_top;
  circle2.style.marginLeft = jsonObj.barrels[current_barrel].circle_2_left;

  circle3.style.marginTop = jsonObj.barrels[current_barrel].circle_3_top;
  circle3.style.marginLeft = jsonObj.barrels[current_barrel].circle_3_left;

  // put the current year in the main-area and in the timeline
  // removing all spaces and newlines
  year.innerHTML = jsonObj.barrels[current_barrel].year;
  current_year.innerHTML = jsonObj.barrels[current_barrel].year.replace(
    /\n|&#160;+/g,
    ""
  );

  // timeline elements above current year
  for (let j = 3; j >= 0; j--) {
    index = current_barrel - (4 - j);
    if (index >= 1 && index < jsonObj.barrels.length) {
      let str1 = jsonObj.barrels[index].year;
      other_years[j].innerHTML = str1.replace(/\n|&#160;+/g, ""); // removing all spaces and newlines
    } else {
      other_years[j].innerHTML = "&nbsp"; // spaces in empty elements (positions doesn't change)
    }
  }

  // timeline elements below current year
  for (let i = 4; i < 8; i++) {
    index = current_barrel + (i - 3);
    if (index >= 0 && index < jsonObj.barrels.length) {
      let str2 = jsonObj.barrels[index].year;
      other_years[i].innerHTML = str2.replace(/\n|&#160;+/g, ""); // removing all spaces and newlines
    } else {
      other_years[i].innerHTML = "&nbsp"; // spaces in empty elements (positions doesn't change)
    }
  }

  // first touchpoint = barrel description in main-area
  circle1.addEventListener("click", function addText() {
    circle_clicked = 1;

    circle1.style.animation = "none";
    circle1.style.background = "#1c1c1c";
    circle1.style.transition = "background 0.5s ease";

    circle2.nostyle();
    circle3.nostyle();

    contentbox.style.display = "block";
    carousel.style.display = "none";
    subline.style.display = "none";

    headline.innerHTML = "Rund ums Fass";
    textblock.innerHTML = jsonObj.barrels[current_barrel].description;

    exhibitname.style.display = "none";
    year.style.display = "none";
  });
  // second touchpoint = barrel news
  circle2.addEventListener("click", function addText() {
    circle_clicked = 2;

    circle2.style.animation = "none";
    circle2.style.background = "#1c1c1c";
    circle2.style.transition = "background 0.5s ease";

    circle1.nostyle();
    circle3.nostyle();

    contentbox.style.display = "none";
    carousel.style.display = "flex";

    if (carousel_img1.src == "http://localhost:3001/") {
      carousel_img1.style.display = "none";
    }
    if (carousel_img2.src == "http://localhost:3001/") {
      carousel_img2.style.display = "none";
    } else {
      carousel_img2.style.display = "block";
    }
    carousel_headline.innerHTML = "Ingelheim und die Welt";
    carousel_textblock.innerHTML = jsonObj.barrels[current_barrel].news;

    carouselstart();

    exhibitname.style.display = "none";
    year.style.display = "none";
  });

  // third touchpoint = barrel quote
  circle3.addEventListener("click", function addText() {
    circle_clicked = 3;

    circle3.style.animation = "none";
    circle3.style.background = "#1c1c1c";
    circle3.style.transition = "background 0.5s ease";

    circle1.nostyle();
    circle2.nostyle();

    contentbox.style.display = "block";
    carousel.style.display = "none";
    subline.style.display = "block";

    headline.innerHTML = "Rund ums Fass";
    subline.innerHTML = jsonObj.barrels[current_barrel].quote;
    textblock.innerHTML = jsonObj.barrels[current_barrel].quote_explanation;

    exhibitname.style.display = "none";
    year.style.display = "none";
  });
  // logo = back to startscreen
  logo.addEventListener("click", function startscreen() {
    contentbox.style.display = "none";
    carousel.style.display = "none";
    exhibitname.style.display = "block";
    year.style.display = "block";
    circle_clicked = 0;
    circle1.nostyle();
    circle2.nostyle();
    circle3.nostyle();
  });
}

function carouselstart() {
  carousel_card1.classList = "carousel_front";
  carousel_img1.classList = "carousel_right";
  carousel_img2.classList = "carousel_left";
  carousel_version = 1;
  carousel_card1.ontouchstart = "";
  carousel_img1.ontouchstart = carouseltoleft;
  carousel_img2.ontouchstart = carouseltoright;
}

function carouseltoleft() {
  carousel_img1.classList = "carousel_front";
  carousel_card1.classList = "carousel_left";
  carousel_img2.classList = "carousel_right";
  carousel_version = 2;
  carousel_img1.ontouchstart = "";
  carousel_img2.ontouchstart = carouseltoright;
  carousel_card1.ontouchstart = carouselstart;
}
function carouseltoright() {
  carousel_img2.classList = "carousel_front";
  carousel_img1.classList = "carousel_left";
  carousel_card1.classList = "carousel_right";
  carousel_version = 3;
  carousel_img2.ontouchstart = "";
  carousel_img1.ontouchstart = carouseltoleft;
  carousel_card1.ontouchstart = carouselstart;
}

carousel.addEventListener("mousedown", function (e) {
  // tsX = e.touches[0].clientX;
  tsX = e.clientX;
  cprevEvent = e;
  e.preventDefault();
});

carousel.addEventListener("mouseup", function (e) {
  let swipeX = e.clientX;
  // let swipeX = e.changedTouches[0].clientX; // swipeX = the Coord when the finger was moved and touch ended
  // swipe right
  if (swipeX >= tsX + 200 && carousel_version == 1) {
    carouseltoright();
  } else if (swipeX >= tsX + 200 && carousel_version == 2) {
    carouselstart();
  } else if (swipeX >= tsX + 200 && carousel_version == 3) {
    carouseltoleft();
  }
  // swipe left
  else if (swipeX <= tsX - 200 && carousel_version == 1) {
    carouseltoleft();
  } else if (swipeX <= tsX - 200 && carousel_version == 2) {
    carouseltoright();
  } else if (swipeX <= tsX - 200 && carousel_version == 3) {
    carouselstart();
  } else {
    let target = cprevEvent.target.classList[0];
    if (target == "descriptions") {
      target = cprevEvent.target.parentNode.classList[0];
    }
    if (target == "carousel_left") {
      // swipe left
      if (carousel_version == 1) {
        carouseltoright();
      } else if (carousel_version == 2) {
        carouselstart();
      } else if (carousel_version == 3) {
        carouseltoleft();
      }
    } else if (target == "carousel_right") {
      if (carousel_version == 1) {
        carouseltoleft();
      } else if (carousel_version == 2) {
        carouseltoright();
      } else if (carousel_version == 3) {
        carouselstart();
      }
    }
  }

  e.preventDefault();
});

// function from clicking the top arrow in the timeline
function barrel_before() {
  if (current_barrel > 1) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel - 1;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.barrel_before = barrel_before;

// function from clicking the bottom arrow in the timeline
function barrel_after() {
  if (current_barrel < 22) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel + 1;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.barrel_after = barrel_after;

//clicking on the year in the sidebar changes current_barrel
function minus4() {
  if (current_barrel >= 5) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel - 4;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.minus4 = minus4;

function minus3() {
  if (current_barrel >= 4) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel - 3;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.minus3 = minus3;

function minus2() {
  if (current_barrel >= 3) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel - 2;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.minus2 = minus2;

function minus1() {
  if (current_barrel >= 2) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel - 1;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.minus1 = minus1;

function plus1() {
  if (current_barrel <= 21) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel + 1;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.plus1 = plus1;

function plus2() {
  if (current_barrel <= 20) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel + 2;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.plus2 = plus2;

function plus3() {
  if (current_barrel <= 19) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel + 3;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.plus3 = plus3;

function plus4() {
  if (current_barrel <= 18) {
    carousel_img1.src = "http://localhost:3001/";
    carousel_img2.src = "http://localhost:3001/";
    current_barrel = current_barrel + 4;

    // repeat function; animations starting again
    start(exponat);

    // if a circle was clicked the page will stay in this section; not returning to the startscreen
    if (circle_clicked === 1) {
      circle1.click();
    } else if (circle_clicked === 2) {
      circle2.click();
    } else if (circle_clicked === 3) {
      circle3.click();
    }
  }
}
window.plus4 = plus4;

// XML request so the JSON is usable in the js
let xmlhttp = new XMLHttpRequest();
xmlhttp.responseType = "json";
let method = "GET";
let url = "exponat.json";

xmlhttp.open(method, url);
xmlhttp.send();

xmlhttp.addEventListener("load", function () {
  // JSON Object with the exponatname and an array of barrels
  exponat = xmlhttp.response;
  start(exponat);
});

// Which Barrel is which year?
// What are the informations we can use?
/* jsonObj.barrels[0] = 1959
    jsonObj.barrels[21] = 1982-1983
  */
/* jsonObj.barrels[].year
     jsonObj.barrels[].image
     jsonObj.barrels[].description[]
     jsonObj.barrels[].quote
     jsonObj.barrels[].quote_explanation
     jsonObj.barrels[].news
     jsonObj.barrels[].news_images[]
  */
// jsonObj.exponatname = "24 Fass voll Geschichte"
