'use strict';

// Variables
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const yearsDisplay = document.querySelector('.years');
const monthsDisplay = document.querySelector('.months');
const daysDisplay = document.querySelector('.days');
const btn = document.querySelector('.btn');
const requiredTxt = document.querySelectorAll('.required');
const requiredTxt2 = document.querySelectorAll('.required2');
const errorMsgTxt = document.querySelectorAll('.error-mgs');
const labelErrMsg = document.querySelectorAll('.label');
const inputErr = document.querySelectorAll('.input');

const mustBeValid = document.querySelector('.must-be-valid');
const body = document.querySelector('body');

// Functions
const calcAge = (birthday) => {
  const now = new Date();
  const ageInDays = (now - birthday) / (1000 * 60 * 60 * 24);

  const years = Math.floor(ageInDays / 365.25);
  const months = Math.floor((ageInDays % 365.25) / 30.44);
  const days = Math.floor((ageInDays % 365.25) % 30.44);

  yearsDisplay.textContent = `${years} `;
  monthsDisplay.textContent = `${months} `;
  daysDisplay.textContent = `${days} `;
};

const labelDisplayError = function (arr) {
  arr.forEach((arr) => {
    arr.classList.add('error');
  });
};

const inputDisplayError = function (arr) {
  arr.forEach((arr) => {
    arr.classList.add('input-error');
  });
};
const removeInputDispErr = function (arr) {
  arr.forEach((arr) => {
    arr.classList.remove('input-error');
  });
};
const removelabelDispErr = function (arr) {
  arr.forEach((arr) => {
    arr.classList.remove('error');
  });
};

// Event handler
btn.addEventListener('click', function () {
  // Check if any field is empty
  if (
    yearInput.value === '' ||
    monthInput.value === '' ||
    dayInput.value === ''
  ) {
    [...requiredTxt].forEach((cur) => {
      cur.classList.remove('hidden');
    });

    labelDisplayError([...labelErrMsg]);

    inputDisplayError([...inputErr]);
  } else {
    [...requiredTxt].forEach((cur) => {
      cur.classList.add('hidden');
    });

    removelabelDispErr([...labelErrMsg]);

    removeInputDispErr([...inputErr]);

    // Check if inputs are valid
    if (
      yearInput.value > new Date().getFullYear() ||
      monthInput.value > 12 ||
      dayInput.value > 31
    ) {
      [...requiredTxt2].forEach((cur) => {
        cur.classList.remove('hidden');
      });

      mustBeValid.classList.add('hidden');

      labelDisplayError([...labelErrMsg]);

      inputDisplayError([...inputErr]);
    } else {
      [...requiredTxt2].forEach((cur) => {
        cur.classList.add('hidden');
      });

      removelabelDispErr([...labelErrMsg]);

      removeInputDispErr([...inputErr]);

      // Check if its a valid day
      if (
        monthInput.value == 4 ||
        monthInput.value == 6 ||
        monthInput.value == 9 ||
        (monthInput.value == 11 && dayInput.value > 30)
      ) {
        mustBeValid.classList.remove('hidden');

        labelDisplayError([...labelErrMsg]);

        inputDisplayError([...inputErr]);
      } else {
        mustBeValid.classList.add('hidden');

        removelabelDispErr([...labelErrMsg]);

        removeInputDispErr([...inputErr]);

        // Check if it's february
        if (monthInput.value == 2 && dayInput.value > 28) {
          mustBeValid.classList.remove('hidden');

          labelDisplayError([...labelErrMsg]);

          inputDisplayError([...inputErr]);
        } else {
          mustBeValid.classList.add('hidden');

          removelabelDispErr([...labelErrMsg]);

          removeInputDispErr([...inputErr]);

          const birthday = [
            +yearInput.value,
            +monthInput.value - 1,
            +dayInput.value,
          ];

          calcAge(new Date(...birthday));
        }
      }
    }
  }
});

body.addEventListener('click', function() {
  removelabelDispErr([...labelErrMsg]);

  removeInputDispErr([...inputErr]);
})