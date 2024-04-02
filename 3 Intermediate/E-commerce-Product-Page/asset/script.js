// ======= Product Images =======
let heroImg = document.getElementById("product-img");
const thumbnailDivs = document.querySelectorAll(".thumbnails > div");

thumbnailDivs.forEach((div, index) => {
  div.addEventListener("click", () => {
    // Remove 'active' class from all thumbnail divs
    thumbnailDivs.forEach((otherDiv) => {
      otherDiv.classList.remove("active");

      heroImg.src = `images/image-product-${index + 1}.jpg`;
    });
    // Add 'active' class to the clicked thumbnail div
    div.classList.add("active");
  });
});

// ======== Light Box ===================
let heroImg2 = document.getElementById("product-img2");
const thumbnailDivs2 = document.querySelectorAll(".thumbnails2 > div");
let hWrapper = document.querySelector(".hero-wrapper");
let closeimg = document.querySelector(".close-img");

let pre = document.getElementById("pre");
let nxt = document.getElementById("nxt");
let imageindex = 0;

heroImg.addEventListener("click", () => {
  hWrapper.style.opacity = 1;
  hWrapper.style.visibility = "visible";
});
closeimg.addEventListener("click", () => {
  hWrapper.style.opacity = 0;
  hWrapper.style.visibility = "hidden";
});

thumbnailDivs2.forEach((div, index) => {
  div.addEventListener("click", () => {
    // Remove 'active' class from all thumbnail divs
    thumbnailDivs.forEach((otherDiv) => {
      thumbnailDivs2.forEach((div) => {
        div.classList.remove("active");
      });

      heroImg2.src = `images/image-product-${index + 1}.jpg`;
      imageindex = index;
    });
    // Add 'active' class to the clicked thumbnail div
    div.classList.add("active");
  });
});

pre.addEventListener("click", () => {
  if (imageindex == 0) {
    imageindex = 3;
  } else {
    imageindex--;
  }

  heroImg2.src = `images/image-product-${imageindex + 1}.jpg`;
  thumbnailDivs2.forEach((div) => {
    div.classList.remove("active");
  });
  thumbnailDivs2[imageindex].classList.add("active");
});
nxt.addEventListener("click", () => {
  if (imageindex == 3) {
    imageindex = 0;
  } else {
    imageindex++;
  }

  heroImg2.src = `images/image-product-${imageindex + 1}.jpg`;
  thumbnailDivs2.forEach((div) => {
    div.classList.remove("active");
  });
  thumbnailDivs2[imageindex].classList.add("active");
});

// ===== Cart ======
let btnMins = document.getElementById("minus");
let btnPlus = document.getElementById("plus");
let cartV = document.getElementById("cart-value");
let cartntf = document.getElementById("cart-notf");

let cartSpan = document.querySelector("h3 span");
let carTotal = document.querySelector("h3 b");
let delCart = document.getElementById("delCart");
let cartProduct = document.querySelector(".wrapper");
let mt = document.getElementById("mt");

cartntf.innerHTML = cartV.innerHTML;

btnMins.addEventListener("click", () => {
  if (cartV.innerHTML > 1) {
    cartV.innerHTML--;
    btnMins.classList.remove("dis");
  } else {
    if (cartV.innerHTML > 0) {
      cartV.innerHTML--;
    }
    btnMins.classList.add("dis");
  }

  //   ======
  if (cartV.innerHTML == 0) {
    cartntf.style.display = "none";
    cartProduct.style.display = "none";
    mt.style.display = "block";
  } else {
    cartntf.style.display = "block";
    cartProduct.style.display = "block";
    mt.style.display = "none";

    cartntf.innerHTML = cartV.innerHTML;
    cartSpan.innerHTML = cartV.innerHTML;
    carTotal.innerHTML = "$" + cartSpan.innerHTML * 125 + ".00";
  }
});

btnPlus.addEventListener("click", () => {
  cartV.innerHTML++;
  if (cartV.innerHTML >= 0) {
    btnMins.classList.remove("dis");
  }

  //   ======
  if (cartV.innerHTML == 0) {
    cartntf.style.display = "none";
    cartProduct.style.display = "none";
    mt.style.display = "block";
  } else {
    cartntf.style.display = "block";
    cartProduct.style.display = "block";
    mt.style.display = "none";
    cartntf.innerHTML = cartV.innerHTML;
    cartSpan.innerHTML = cartV.innerHTML;
    carTotal.innerHTML = "$" + cartSpan.innerHTML * 125 + ".00";
  }
});

delCart.addEventListener("click", () => {
  cartV.innerHTML = 0;
  cartSpan.innerHTML = 0;
  cartntf.style.display = "none";
  cartProduct.style.display = "none";
  mt.style.display = "block";
});

// ======= Cart =====
let profile = document.getElementById("profile");
let cartIcon = document.getElementById("cart-icon");
let cartSection = document.querySelector(".cart-section");
let cartAddBtn = document.getElementById("cart-add-btn");
let closeBtn = document.getElementById("close");

profile.addEventListener("click", () => {
  cartSection.classList.toggle("active");
  profile.classList.toggle("active");
});
cartIcon.addEventListener("click", () => {
  cartSection.classList.toggle("active");
  profile.classList.toggle("active");
});
cartAddBtn.addEventListener("click", () => {
  cartSection.classList.add("active");
  profile.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  cartSection.classList.remove("active");
  profile.classList.remove("active");
});

// ========== Navigation =======

window.addEventListener("scroll", () => {
  let navbar = document.querySelector("nav");
  if (window.scrollY > 30) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// ======= Sidebar =====
let menu = document.querySelector(".menu");
let clsMenu = document.querySelector(".close-btn");
let clsMenu2 = document.querySelector(".sidebar-back");
let sidebar = document.querySelector(".sidebar");

menu.addEventListener("click", () => {
  sidebar.classList.add("show");
  cartSection.classList.remove("active");
  document.querySelectorAll(".sidebar ul li a")[0].focus();
});
clsMenu.addEventListener("click", () => {
  sidebar.classList.remove("show");
});
clsMenu2.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

// ==============
// Mobile Device Image Slider
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.getElementById("slider");

let pre2 = document.getElementById("pre2");
let nxt2 = document.getElementById("nxt2");

pre2.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

nxt2.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

function updateSlider() {
  const translatePercentage = currentIndex * -25;
  slider.style.transform = `translateX(${translatePercentage}%)`;
}
