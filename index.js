'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
console.log(accounts);
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = acc => {
  containerMovements.innerHTML = '';
  acc.movements.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movement}$</div>
        </div>
      `;
    containerMovements.innerHTML += html;
  });
};

const createUser = account => {
  account.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(name => name[0].toLowerCase())
      .join('');
  });
};
createUser(accounts);
const calcCurrentBalance = acc => {
  const balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.innerHTML = `${balance}$`;
};

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(movement => movement > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const outcomes = acc.movements
    .filter(movement => movement < 0)
    .reduce((acc, curr) => acc + curr, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(item => (item * acc.interestRate) / 100)
    .filter(item => item >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.innerHTML = `${interest}$`;
  labelSumIn.innerHTML = `${incomes}$`;
  labelSumOut.innerHTML = `${Math.abs(outcomes)}$`;
};

let curAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  curAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (curAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 1;
    labelWelcome.innerHTML = `Welcome ${curAccount.owner}`;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    displayMovements(curAccount);
    calcDisplaySummary(curAccount);
    calcCurrentBalance(curAccount);
  }
});
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// currencies.forEach((val, key) => {
//   console.log(`${key}: ${val}`);
// });

// //slice
// let arr = ['a', 'b', 'c', 'd', 'e'];
// let arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr);
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// splice
// console.log(arr.splice(2));
// console.log(arr.splice(2, 0, 4, 4));
// console.log(arr.reverse());
// let letters = [...arr, ...arr2];
// console.log(letters.join(''));

// const arr = [24, 12, 53];
// console.log(arr.at(-2));
// console.log(arr[0]);
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);

// movements.forEach(mov => {
//   if (mov > 0) {
//     console.log('+ ' + mov);
//   } else {
//     console.log('- ' + mov);
//   }
// });
// for (let [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(i + 1 + ' ' + mov);
//   } else {
//     console.log(i + 1 + ' ' + mov);
//   }
// }
