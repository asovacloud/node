// First task
// const firstRow = prompt('Введите первую фразу', 'мама мыла раму');
// const secondRow = prompt('Введите вторую фразу', 'собака друг человека');
// const getFilteredSymbol = prompt('Введите букву по которой будем сортировать', 'a');

// function getRow(firstRow, secondRow, symbol) {
//   const countSymbols = (str) => {
//     let accum = 0;
//     for (let i = 0; i < str.length; i++) {
//       if (str.charAt(i) === symbol ) {
//         accum += 1;
//       }
//     }
//     return accum;
//   };

//   return (countSymbols(firstRow) >= countSymbols(secondRow)) ? firstRow : secondRow;
// }

// console.log(`У фразе '${getRow(firstRow, secondRow, getFilteredSymbol)}' больше букв '${getFilteredSymbol}'`);

// Second task
function formattedPhone(phone) {
  let formPhone = '';
  if (phone.length === 12) {
    for (let i = 0; i < phone.length; i++) {
      const currentSymbol = phone.charAt(i);
      if (i === 2) {
        formPhone += ` (${currentSymbol}`;
      } else if (i === 4) {
        formPhone += `${currentSymbol}) `;
      } else if (i === 7 || i === 9) {
        formPhone += `${currentSymbol}-`
      } else {
        formPhone += currentSymbol;
      }
    }

    return formPhone;
  } else if (phone.length === 11 && +phone.charAt(0) === 8 ||  +phone.charAt(0) === 7) {
    for (let i = 0; i < phone.length; i++) {
      const currentSymbol = phone.charAt(i);
      if (i === 0) {
        formPhone += '+7 (';
      } else if (i === 3) {
        formPhone += `${currentSymbol}) `;
      } else if (i === 6 || i === 8) {
        formPhone += `${currentSymbol}-`
      } else {
        formPhone += currentSymbol;
      }
    };

    return formPhone;
  } else if (phone.length === 10) {
    for (let i = 0; i < phone.length; i++) {
      const currentSymbol = phone.charAt(i);
      if (i === 0) {
        formPhone += `+7 (${currentSymbol}`;
      } else if (i === 2) {
        formPhone += `${currentSymbol}) `;
      } else if (i === 5 || i === 7) {
        formPhone += `${currentSymbol}-`
      } else {
        formPhone += currentSymbol;
      }
    };

    return formPhone;
  } else {
    return 'The format of number was wrong;';
  }

  return formPhone; 
}

console.log(formattedPhone(prompt('Enter a number', '89211234567')));

