// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

/* Initial Attempt WITHOUT 'Try' method 

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend=='' || divider=='') {

     result.innerText = 'Division not performed. Both values are required in inputs. Try again'

  } else if ( divider<0 ) {

    result.innerText = 'Division not performed. Invalid number provided. Try again'
    console.error ('Division not performed. Invalid number provided. Try again')

  } else if ( (Number.isNaN(Number(dividend)) ) && (Number.isNaN(Number(divider))) ) {

     result.innerText = 'Something critical went wrong. Please reload the page'
     console.error ('Something critical went wrong. Please reload the page')

  } else {
    
    result.innerText = Math.floor(dividend / divider)};

});
*/

// @ts-check

/**
 * @param {number} dividend - The number being divided
 * @param {number} [divider]  - The number dividing the dividend
 * @param {number} result - The result of the division
 */

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    try{
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    if (!dividend || !divider) {
      
     result.innerText = 'Division not performed. Both values are required in inputs. Try again' 
     throw new error ('Division not performed. Both values are required in inputs. Try again')

  } 
  
     if ((dividend<0) || (divider<=0)) {

    
    result.innerText = 'Division not performed. Invalid number provided. Try again'
    throw new error ('Division not performed. Invalid number provided. Try again')

  } 
  
    if ( (Number.isNaN(Number(dividend)) ) || (Number.isNaN(Number(divider))) ) {

     result.innerText = 'Something critical went wrong. Please reload the page'
     console.error ('Something critical went wrong. Please reload the page')

    }
    
    result.innerText = Math.floor(dividend / divider);

  } catch(error) {

    //Only result.innerText always shows this message
    result.innerText = 'Division not performed. Invalid number provided. Try again';
    console.log(error); 
}  
});