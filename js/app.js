//Two Cams
const bigCamItems = document.querySelectorAll(".cam__item")
const popUpLeft = document.querySelector(".cam__sliderOne")
const popUpRight = document.querySelector(".cam__sliderTwo")
const closeButtonLeft = document.querySelector(".cam__close")
const closeButtonRigth = document.querySelector(".cam__close--right")
//Form
const form = document.querySelector(".formTel__form")
const myPhone = document.getElementById('phone');
const message = document.querySelector('.formTel__message')
const danger = document.querySelector(".formTel__danger")

const formSuccess = document.querySelector(".formTel__success")


closeButtonLeft.addEventListener("click", () => closeBar())
closeButtonRigth.addEventListener("click", () => closeBar())


bigCamItems.forEach(item => {
  item.addEventListener("click", event => {
    event.stopPropagation();
    document.addEventListener("click", clickHandler);//при срабатывании ивента на камере на 21 строке, запускается второй лисенер, уже на весь документ - на закрытие попапа
    bigCamItems.forEach(item => item.style.display = "none")
    if (event.currentTarget === bigCamItems[0]) {
      popUpLeft.style.display = "block";
    } else if (event.currentTarget === bigCamItems[1]) {
      popUpRight.style.display = "block";
    }
  })
})


const clickHandler = (event) => {
  targetElement = event.target;  // clicked element
  do {
    if (targetElement == popUpLeft || targetElement == popUpRight) {
      // This is a click inside. Do nothing, just return.
      console.log("Cliked Inside");
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  // This is a click outside.
  console.log("Cliked Outside");
  closeBar();
}


const closeBar = () => {
  bigCamItems.forEach(item => item.style.display = "block")
  popUpLeft.style.display = "none";
  popUpRight.style.display = "none";
  document.removeEventListener("click", clickHandler) //удаляем второй лисенер со всего документа, первый лисенер на камерах продолжает висеть
}

// document.addEventListener("click", clickHandler)
// document.removeEventListener("click", clickHandler)

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const myPhoneValue = myPhone.value;

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
  console.log("Response result:", result);
  console.log("Response Status Code:", response.status);

  if (response.status > 200 && response.status < 300) {
    formSuccess.style.display = "block";
  }

  // Список пар ключ/значение
  for (let [name, value] of formData) {
    console.log(`"${name}": ${value}`); // key1=value1, потом key2=value2
  }
  form.reset();
}