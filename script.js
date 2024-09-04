const toggleNav = () => {
    document.body.dataset.nav = document.body.dataset.nav == "true" ? "false" : "true";
  };
  
  const firstLinkImg = document.querySelector('.nav-link:first-child > img');
  const firstLinkImgRight = firstLinkImg.getBoundingClientRect().right;
  const firstLinkImgWidth = firstLinkImg.offsetWidth / 100 * 40;
  const leftOffset = firstLinkImgRight - firstLinkImgWidth;
  
  const navToggle = document.getElementById('nav-toggle');
  const linksWrapper = document.getElementById('links-wrapper');
  const gallery = document.getElementById('nav-links');
  const nav = document.querySelector('nav');
  const galleryRect = gallery.getBoundingClientRect();
  gallery.style.transitionDuration = "780ms";
  gallery.style.transitionTimingFunction = "cubic-bezier(.13,.53,.38,.97)";
  const responsiveRatio = 48000   //  25/1920
  let responsiveLimitDx = responsiveRatio/window.innerWidth;
  
  function scrollGallery(e) {
    /* posizione mouse (+1 perchè la prende fino a 1919) - 20% del vw perchè da sinistra per i primi 20% di schermo
    deve spostarsi a destra il container */
    let mouseX = (e.clientX + 1) - window.innerWidth / 100 * 20;
    //limito il punto dopo il quale non deve aumentare perchè ho la seconda parte che è all 80% ma io calcolo tutto fratto il 70%
    if (mouseX > (window.innerWidth - window.innerWidth / 100 * responsiveLimitDx)){
      mouseX = window.innerWidth - window.innerWidth / 100 * responsiveLimitDx
    }
    //il 20 e il 20 di mouseX devo rimanere uguali
    const xFraction = mouseX > 0 ? mouseX / (window.innerWidth - window.innerWidth / 100 * responsiveLimitDx) : mouseX / (window.innerWidth / 100 * 20);
    let maxScroll = mouseX > 0 ? gallery.scrollWidth - nav.offsetWidth + (window.innerWidth / 100 * 2.5) : window.innerWidth / 100 * 2.5;
    const scrollX = maxScroll * xFraction * -1; 
    gallery.style.transform = `translateX(${scrollX}px)`;
  }
  
  function resetGalleryPosition() {
    gallery.style.transform = `translateX(${0}px)`;   
  }
  
  function calcLimitDx(){
    if(responsiveRatio/window.innerWidth > 40){
        responsiveLimitDx = 40
      }
    else if (responsiveRatio/window.innerWidth < 25){
        responsiveLimitDx = 25
      }
    else{
        responsiveLimitDx = responsiveRatio/window.innerWidth
    }
  }

  linksWrapper.addEventListener("mousemove", scrollGallery);
  linksWrapper.addEventListener("mouseleave", resetGalleryPosition);
  window.addEventListener("resize", calcLimitDx);

  navToggle.addEventListener("click", () => {
    gallery.style.removeProperty("transform");
  });
  
  document.body.onmousedown = function(e) {
    if (e.button === 1) return false;
  };
  
  nav.onmousewheel = e => {
    e.preventDefault();
  };
  
  function disableTouch() {
    linksWrapper.removeEventListener("mousemove", scrollGallery);
    linksWrapper.removeEventListener("mousemove", resetGalleryPosition);
    document.body.removeEventListener("touchstart", disableTouch);
  }
  
  document.body.addEventListener("touchstart", disableTouch);
  