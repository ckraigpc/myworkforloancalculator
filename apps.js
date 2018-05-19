// listen for submit
document.getElementById('loan-form').addEventListener('submit',(e)=>{

  // hide results
  document.querySelector('.card-action').style.display = "none";

// show progressbar
  document.querySelector('.progress').style.display = "block";

  setTimeout(calculateResults,2000);

e.preventDefault();

});

// calculate results
function calculateResults (){
  // get Loan Calculator heading UI variables
  const amount =  document.getElementById('amount');
  const interest =  document.getElementById('interest');
  const years =  document.getElementById('yrtopay');

  // get Results heading UI variables
  const monthlyPayment =  document.getElementById('monthly-payment');
  const totalPayment =  document.getElementById('total-payment');
  const totalInterest =  document.getElementById('total-interest');

  /** parse or convert in a number type the value of "amount,interest,yearstopay"
   *  interest is calculate as divide 100 and divide by 12 
   * years to pay for payment is multiplied by 12
  **/
  const principal = parseFloat(amount.value);
  const caculatedInterest = parseFloat(interest.value)/ 100 / 12;
  const caculatedPayments = parseFloat(years.value) * 12;

  /** compute monthy payment
   *  use Math.pow -- google on how to use this 
   */
  const x = Math.pow(1 + caculatedInterest, caculatedPayments);
  const monthly = (principal *x*caculatedInterest) /(x-1);

  // validate if the monthly payment is finite use isFinite predefined method in javascript
  if(isFinite(monthly)){
    // set the value of montlypayment,totalpayment to monthly result with a decimal places of two
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * caculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * caculatedPayments)- principal).toFixed(2);

    // display the block of results
    document.querySelector('.card-action').style.display = "block";

    // hide the progress bar
    document.querySelector('.progress').style.display = "none";

  }else{
    // call a function that showError , make sure to create the function
    showError('Please check your number');
  }


}
// show error function
function showError(error){
  // hide progress bar 
  document.querySelector('.progress').style.display = "none";
  // create an element divgit remote add origin https://github.com/ckraigpc/myworkforloancalculator.git
  const errorDiv = document.createElement('div');

  // use card and span heading to display the message
  const card = document.querySelector('.card');
  const heading = document.querySelector('card-content');

  // add class on the div select on masterializecss
  errorDiv.className = "sample-error";
  // create a textcontent on it
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv,heading);

  // clear error after 3 seconds using setTimeout and execute remove method on the function clear error
  setTimeout(clearError,3000);

}
function clearError(){
  document.querySelector('.sample-error').remove();
}