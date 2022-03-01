const billInput = document.querySelector(".bill");
const customInput = document.querySelector(".custom__input");
const peopleInput = document.querySelector(".people");
const tipOptions = document.querySelectorAll(".main__content__list--item");
const price = document.querySelector(".price");
const total = document.querySelector(".total");
const reset = document.querySelector(".reset");
const error = document.querySelector(".error");

let billValue = 0;
let tipValue = 0;
let tipAmount = 0;
let numberOfPeople = 0;
let totalAmount = 0;

billInput.addEventListener("input", function () {
  billValue = Number(billInput.value);
  calculateResult();
});

customInput.addEventListener("input", function () {
  tipValue = Number(customInput.value);
  calculateResult();
});

const removeActive = function () {
  tipOptions.forEach((item) => {
    item.classList.remove("active");
  });
};

peopleInput.addEventListener("input", function () {
  numberOfPeople = Number(peopleInput.value);
  if (numberOfPeople === 0) {
    error.classList.remove("hidden");
    peopleInput.style.outline = "2px solid red";
  } else {
    error.classList.add("hidden");
    peopleInput.style.outline = "";
  }
  calculateResult();
});

reset.addEventListener("click", function () {
  billValue = 0;
  billInput.value = 0;
  tipValue = 0;
  numberOfPeople = 0;
  peopleInput.value = 0;
  customInput.value = "";
  tipAmount = 0;
  totalAmount = 0;
  price.textContent = "$0.00";
  total.textContent = "$0.00";
  error.classList.add("hidden");
  peopleInput.style.outline = "";
  reset.style.opacity = "0.2";
  removeActive();
});

const calculateResult = function () {
  if (numberOfPeople > 0) {
    reset.style.opacity = "1";
    tipAmount = (billValue * (tipValue / 100)) / numberOfPeople;
    totalAmount = (billValue + (tipValue / 100) * billValue) / numberOfPeople;
    price.textContent = `$${tipAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
  }
};

for (let i = 0; i < tipOptions.length; i++) {
  tipOptions[i].addEventListener("click", function () {
    tipOptions[i].classList.toggle("active");
    if (!tipOptions[i].classList.contains("active")) {
      tipValue = 0;
    } else {
      tipValue = tipOptions[i].value;
    }
    calculateResult();
  });
}
