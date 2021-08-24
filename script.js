niablePay = 0;
numberOfPeriods = 0;

//get the employees earnings
//check the week employee made a director is valid (i.e 1-52) 
//calculate the number of periods the employee is a director
function getEarnings() {
  niablePay = document.getElementById('gross-input').value;
  console.log(niablePay);
  if (document.getElementById('week-number').value < 1 || document.getElementById('week-number').value > 52) {
    alert('Please enter the week number the employee was made a director. This must be between 1 and 52')
  } else {
  numberOfPeriods = 53 - document.getElementById('week-number').value;
  }
  calculateAllowance();
}


//set the annual thresholds based on the year
var niPt = 0;
var niSt = 0;
var niUel = 0;
function calculateAllowance() {
  if (document.getElementById('20-21').checked == true) {
    niPt = 9500;
    niSt = 8788;
    niUel = 50000;
  } else if (document.getElementById('21-22').checked == true) {
    niPt = 9568;
    niSt = 8840;
    niUel = 50270;    
  } else {
    alert('Please Select a Tax Year')
  }

  //work out weekly allowances
    eesAllowancesLower = (niPt/52) * numberOfPeriods;
    ersAllowancesLower = (niSt/52) * numberOfPeriods;
    eesAllowancesUpper = (niUel/52) * numberOfPeriods;
  

  calculateEesNi()
  calculateErsNi()
}
var niDue =0;
var ersNiDue;

//calculate ees NI after checking which threshold they fall in
function calculateEesNi() {
  if(niablePay < eesAllowancesLower) { //niable is less than PT
    niDue = 0;
   console.log('zero niDue ' + niDue);
  } else if (niablePay > eesAllowancesLower && niablePay <= eesAllowancesUpper) { //niable greater than LEL but less than PT 
    niDue = ((niablePay - eesAllowancesLower) * 0.12).toFixed(2);
    console.log('lower niDue ' + niDue)
} else if (niablePay > eesAllowancesUpper) { // niable greater than UEL
  var niDueLower = (eesAllowancesUpper - eesAllowancesLower) * 0.12;
  var niDueUpper = (niablePay - eesAllowancesUpper) * 0.02;
  niDue = (niDueUpper + niDueLower).toFixed(2);
  console.log('upper niDue ' + niDue);
} 
  //reduce ees NI by the amount already paid and display the result
  niDue = niDue - document.getElementById('ees-paid').value;
  document.getElementById('ees-ni-owed').innerHTML = "£" + niDue;
}

//calculate ees NI after checking which threshold they fall in
function calculateErsNi() {
  if(niablePay < ersAllowancesLower) { //niable is less than ST
    ersNiDue = 0;
   console.log('zero ers niDue ' + ersNiDue);
  } else if (niablePay > ersAllowancesLower) { //niable greater than ST but less than UEL 
    ersNiDue = ((niablePay - ersAllowancesLower) * 0.138).toFixed(2);
    console.log('ers niDue ' + ersNiDue)
} 

  //reduce ees NI by the amount already paid and display the result
  ersNiDue = ersNiDue - document.getElementById('ers-paid').value;
  document.getElementById('ers-ni-owed').innerHTML = "£" + ersNiDue; 
}