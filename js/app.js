const modalBtn = document.querySelectorAll(".cam__item")
const camSliderOne = document.querySelector(".cam__sliderOne")
const camSliderTwo = document.querySelector(".cam__sliderTwo")
const camClose = document.querySelector(".cam__close")
const camCloseR = document.querySelector(".cam__close--right")

modalBtn.forEach(item => {
  item.addEventListener("click", event => {
    event.stopPropagation();
    if (event.currentTarget === modalBtn[0]) {
      console.log(modalBtn[1])
      modalBtn.forEach(item => item.style.display = "none")
      camSliderOne.style.display = "block";
      handler()
    } else if (event.currentTarget === modalBtn[1]) {
      console.log(modalBtn[0])
      modalBtn.forEach(item => item.style.display = "none")
      camSliderTwo.style.display = "block";
      handler()
    }
  })
})

camClose.addEventListener("click", () => closeBar())
camCloseR.addEventListener("click", () => closeBar())

let handler = () => {
  (document.addEventListener("click", event => {
    targetElement = event.target;  // clicked element
    do {
      if (targetElement == camSliderOne || targetElement == camSliderTwo) {
        // This is a click inside. Do nothing, just return.
        console.log("Cliked Inside")
        return;
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    console.log("Cliked Outside")
    closeBar()
  })

  )
}


const closeBar = () => {
  modalBtn.forEach(item => item.style.display = "block")
  camSliderOne.style.display = "none";
  camSliderTwo.style.display = "none";
}