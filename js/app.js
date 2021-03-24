const modalBtn = document.querySelectorAll(".cam__item")
const cam__sliderOne = document.querySelector(".cam__sliderOne")
const cam__sliderTwo = document.querySelector(".cam__sliderTwo")
const cam__close = document.querySelector(".cam__close")
const cam__closeR = document.querySelector(".cam__close-right")

modalBtn.forEach(item => {
  item.addEventListener("click", event => {
    event.stopPropagation();
    if (event.currentTarget === modalBtn[0]) {
      console.log(modalBtn[1])
      modalBtn.forEach(item => item.style.display = "none")
      cam__sliderOne.style.display = "block";
      Handler()
    } else if (event.currentTarget === modalBtn[1]) {
      console.log(modalBtn[0])
      modalBtn.forEach(item => item.style.display = "none")
      cam__sliderTwo.style.display = "block";
      Handler()
    }
  })
})

cam__close.addEventListener("click", () => CloseBar())
cam__closeR.addEventListener("click", () => CloseBar())

let Handler = () => {
  (document.addEventListener("click", event => {
    // const cam__sliderOne = document.querySelector(".cam__sliderOne")
    // const cam__sliderTwo = document.querySelector(".cam__sliderTwo")
    targetElement = event.target;  // clicked element
    do {
      if (targetElement == cam__sliderOne || targetElement == cam__sliderTwo) {
        // This is a click inside. Do nothing, just return.
        console.log("Cliked Inside")
        return;
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    console.log("Cliked Outside")
    CloseBar()
  })

  )
}


const CloseBar = () => {
  modalBtn.forEach(item => item.style.display = "block")
  cam__sliderOne.style.display = "none";
  cam__sliderTwo.style.display = "none";
}