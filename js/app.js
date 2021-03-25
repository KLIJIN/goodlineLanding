const modalBtn = document.querySelectorAll(".cam__item")
const camSliderOne = document.querySelector(".cam__sliderOne")
const camSliderTwo = document.querySelector(".cam__sliderTwo")
const camClose = document.querySelector(".cam__close")
const camCloseR = document.querySelector(".cam__close--right")
const form = document.querySelector(".formTel__form")

const myPhone = document.getElementById('phone');
const message = document.querySelector('.message')
const danger = document.querySelector(".formTel__danger")

const formSuccess = document.querySelector(".formTel__success")


camClose.addEventListener("click", () => closeBar())
camCloseR.addEventListener("click", () => closeBar())

const closeBar = () => {
  modalBtn.forEach(item => item.style.display = "block")
  camSliderOne.style.display = "none";
  camSliderTwo.style.display = "none";
}

modalBtn.forEach(item => {
  item.addEventListener("click", event => {
    event.stopPropagation();
    if (event.currentTarget === modalBtn[0]) {
      // console.log(modalBtn[1])
      modalBtn.forEach(item => item.style.display = "none")
      camSliderOne.style.display = "block";
      handler()
    } else if (event.currentTarget === modalBtn[1]) {
      // console.log(modalBtn[0])
      modalBtn.forEach(item => item.style.display = "none")
      camSliderTwo.style.display = "block";
      handler()
    }
  })
})


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




form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const myPhoneValue = document.getElementById('phone').value;

  if (ValidPhone(myPhoneValue)) {
    fetchingData()
  }
})

const ValidPhone = (myPhoneValue) => {
  const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  let valid = regex.test(myPhoneValue);
  if (!valid) {
    message.innerText = 'Проверьте набранный номер';
    message.style.color = "#363636";
    myPhone.style.border = "4px solid #BF4444";
    danger.style.display = "block";
  } else {
    message.innerText = 'Контактный телефон';
    message.style.color = "#DAE0E5";
    myPhone.style.border = "4px solid #47B247";
    danger.style.display = "none";
  }
  return valid;
}


const fetchingData = async () => {
  let formData = new FormData(form);

  let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  });

  let result = await response.json();
  console.log("result", result);
  console.log("Status Code:", response.status);

  if (response.status > 200 && response.status < 300) {
    formSuccess.style.display = "block";
  }

  // Список пар ключ/значение
  for (let [name, value] of formData) {
    console.log(`"${name}": ${value}`); // key1=value1, потом key2=value2
  }
  form.reset();
}