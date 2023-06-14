// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const entries = new FormData(event.target);
//   const { dividend, divider } = Object.fromEntries(entries);

//   if (dividend=='' || divider=='') {

//      result.innerText = 'Division not performed. Both values are required in inputs. Try again'

//   } else if ( divider<0 ) {

//     result.innerText = 'Division not performed. Invalid number provided. Try again'
//     console.error ('Division not performed. Invalid number provided. Try again')

//   } else if ( (Number.isNaN(Number(dividend)) ) && (Number.isNaN(Number(divider))) ) {

//      result.innerText = 'Something critical went wrong. Please reload the page'
//      console.error ('Something critical went wrong. Please reload the page')

//   } else {
    
//     result.innerText = Math.floor(dividend / divider)};

// });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);
  
    try{
    if (dividend=='' || divider=='') {

     throw  'Division not performed. Both values are required in inputs. Try again'
     result.innerText = 'Division not performed. Both values are required in inputs. Try again'

  } else if ( divider<0 ) {

    
    result.innerText = 'Division not performed. Invalid number provided. Try again'
    console.error ('Division not performed. Invalid number provided. Try again')

  } else if ( (Number.isNaN(Number(dividend)) ) && (Number.isNaN(Number(divider))) ) {

     result.innerText = 'Something critical went wrong. Please reload the page'
     console.error ('Something critical went wrong. Please reload the page')

  } else {
    
    result.innerText = Math.floor(dividend / divider)};
} catch {


}  
  });