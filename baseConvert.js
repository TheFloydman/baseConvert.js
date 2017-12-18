/*
*
* baseConvert.js by Dan Floyd (Floydman). Convert any real number between any
* two bases from 2 to 36.
*
*
* Usage: baseConvert(startingNumber, fromBase, toBase, fractionalLength)
* : startingNumber is the number you want to convert. (MANDATORY)
* : fromBase is the base you are converting from. (MANDATORY)
* : toBase is the base you are converting to. (MANDATORY)
* : fractLength is the maximum number of digits you would like after the
* : radix point. (OPTIONAL)
*
* Works with all bases from 2 to 36; numbers are represented with numerals
* 0 - 9 and letters A - Z. startingNumber must be a String if it contains any
* letters. The result will be a String because it might contain letters if
* converting to Bases 11 - 36.
*
*/

function baseConvert (startingNumber, fromBase, toBase, fracLength) {
  /* Error detection. */
  var fatalError = false;
  if (typeof startingNumber == 'undefined') {
    console.log('baseConvert.js Error: startingNumber is undefined.');
    fatalError = true;
  }
  if (typeof fromBase == 'undefined') {
    console.log('baseConvert.js Error: fromBase is undefined.');
    fatalError = true;
  }
  if (typeof toBase == 'undefined') {
    console.log('baseConvert.js Error: toBase is undefined.');
    fatalError = true;
  }
  if (typeof startingNumber != 'number' && typeof startingNumber != 'string') {
    console.log('baseConvert.js Error: startingNumber is not a number nor a string.');
    fatalError = true;
  }
  if (fromBase < 2 || fromBase > 36) {
    console.log('baseConvert.js Error: fromBase is not between 2 and 36.');
    fatalError = true;
  }
  if (toBase < 2 || toBase > 36) {
    console.log('baseConvert.js Error: toBase is not between 2 and 36.');
    fatalError = true;
  }
  if (typeof fracLength == 'undefined') {
    console.log('baseConvert.js Message: fracLength not provided; defaulting to 50.');
    fracLength = 50;
  }
  if (fatalError == true) {
    return;
  }

  var startingNumberString = String(startingNumber);

  /* If fromBase and toBase are the same, or if startingNumber is equal to 0 or 1,
  conversion is complete! */
  if (Number(fromBase) == Number(toBase) || Number(startingNumber) == 0 || Number(startingNumber) == 1) {
    return startingNumberString;
  }

  /* Split number into integral and fractional parts. Returns strings. */
  var radixPlace = startingNumberString.indexOf('.');
  if (radixPlace != -1) {
    var intStart = startingNumberString.slice(0, radixPlace);
    intStart = (intStart == '') ? '0':intStart;
    var fracStart = '0.' + startingNumberString.slice(radixPlace + 1);
  } else {
    var fracStart = '0';
    var intStart = startingNumberString;
  }

  var intFinal = convertInt (intStart, fromBase, toBase);
  var fracFinal = fracToDecToBase (fracStart, fromBase, toBase);
  var wholeFinal = intFinal + '.' + fracFinal;
  // Remove the radix point if there is nothing after it.
  while (wholeFinal.charAt(wholeFinal.length - 1) == '.') {
    wholeFinal = wholeFinal.slice(0, wholeFinal.length - 1);
  }
  return wholeFinal;

  function convertInt (intStart, fromBase, toBase) {
    var intDec = parseInt(intStart, fromBase);
    var intFinal = intDec.toString(toBase).toUpperCase();
    return intFinal; // string
  }

  function fracToDecToBase (fracStart, fromBase, toBase) {
    /* Convert fractional value to Base 10. */
    var fracDec = 0;
    for (var i = 2, j = 1; i < fracStart.length; i++, j++) {
      fracDec += parseInt(fracStart[i],36) / Math.pow(fromBase, j);
    }
    if (fromBase == 10) {
      fracDec = Number(fracStart);
    }

    /* Convert fractional value to the final base. */
    var fracBase = '';
    if (toBase == 10) {
      return String(fracDec).slice(2);
    }
    for (var i = 0; fracDec > 0 && i < Number(fracLength); i++) {
      d = fracDec * toBase;
      fracBase += String(Math.floor(d).toString(36).toUpperCase());
      fracDec = d - Math.floor(d);
    }
    // Remove trailing zeroes.
    while (fracBase.charAt(fracBase.length - 1) == '0') {
      fracBase = fracBase.slice(0, fracBase.length - 1);
    }
    return fracBase; // string
  }
}
