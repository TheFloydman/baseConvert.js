/*
*
* baseConvert.js by Dan Floyd (Floydman). This script is unique because it
* supports fractional values, so it provides more support than plain Javascript
* alone, which only supports integers.
*
* To use, simply call the function:
* baseConvert(startingNumber, fromBase, toBase)
*
* Works with all bases from 2 to 36; numbers are represented with numerals
* 0 - 9 and letters A - Z. startingNumber must be a String if it contains any
* letters. The result will be a String because it might contain letters if
* converting to Bases 11 - 36.
*
*/

function baseConvert (startingNumber, fromBase, toBase) {
  /* If fromBase and toBase are the same, no conversion is necessary. */
  if (fromBase == toBase) {
    return String(startingNumber);
  }

  /* Split number at decimal point. */
  var startingArray = baseConvertDetermineParts(String(startingNumber));
  var integralDec = baseConvertArrayToString(startingArray[0]);
  if (startingArray[1] == 'no') {
    var fractionalDec = '0';
  } else {
    var fractionalDec = startingArray[1];
  }

  /* If the number is already in Base 10, move on to convert it to its
  destination base; otherwise, convert it to Base 10. */
  if (fromBase != 10) {
    integralDec = parseInt(String(startingArray[0]),fromBase);
    if (startingArray[1] == 'no') {
      fractionalDec = '0';
    } else {
      fractionalDec = baseConvertConvertFractionalToDec(startingArray[1], fromBase);
    }
  }

  fractionalDecString = baseConvertArrayToString(fractionalDec);

  var integralFinal = integralDec.toString(toBase);
  if (startingArray[1] == 'no') {
    var fractionalFinal = '0';
  } else {
    var fractionalFinal = baseConvertConvertFractionalToFinalBase(fractionalDecString, toBase);
  }

  var convertedToFinalBase = integralFinal + '.' + fractionalFinal;
  for (var i = 0; i < fractionalFinal.length + 1; i++) {
    if (convertedToFinalBase.charAt(convertedToFinalBase.length - 1) == '0' || convertedToFinalBase.charAt(convertedToFinalBase.length - 1) == '.') {
      convertedToFinalBase = convertedToFinalBase.slice(0,convertedToFinalBase.length - 1);
    }
  }
  return convertedToFinalBase;
}

function baseConvertDetermineParts (startingNumber) {
  var integralNumber = startingNumber;
  var integralNumberArray = [];
  for (var i = 0; i < integralNumber.length; i++) {
    integralNumberArray[i] = integralNumber[i];
  }
  /* Use decimal point to determine the integral and fractional portions of the
  number. */
  var decimalPlace = startingNumber.indexOf('.');
  if (decimalPlace != -1) {
    var fractionalNumber = startingNumber.slice(decimalPlace + 1)
    var fractionalNumberArray = [];
    for (var i = 0; i < fractionalNumber.length; i++) {
      fractionalNumberArray[i] = fractionalNumber[i];
    }
    integralNumber = startingNumber.slice(0, decimalPlace);
    var integralNumberArray = [];
    for (var i = 0; i < integralNumber.length; i++) {
      integralNumberArray[i] = integralNumber[i];
    }
    return [integralNumberArray, fractionalNumberArray];
  }
  return [integralNumberArray, 'no'];
}

function baseConvertConvertFractionalToDec (fractionalNumber, fromBase) {
  /* Skip this function if there are only zeroes after the decimal point. */
  var lettersToNumbers = [];
  for (var i = 0; i < fractionalNumber.length; i++) {
    /* Converts letters A - Z into numbers 10 - 35. */
    lettersToNumbers[i] = parseInt(fractionalNumber[i],36);
  }
  fractionalNumber = lettersToNumbers;

  if (Number(baseConvertArrayToString(fractionalNumber)) == 0) {
    return '0';
  }

  var numberOfDigits = fractionalNumber.length;
  var fractionalDec = 0;
  for (var i = 0, j = 1; i < numberOfDigits; i++, j++) {
    if (isNaN(Number(fractionalNumber[i])) == false) {
      fractionalDec += Number(fractionalNumber[i]) / Math.pow(fromBase,j);
    }
  }
  return String(fractionalDec).slice(2);
}

function baseConvertArrayToString (startArray) {
  endString = '';
  for (var i = 0; i < startArray.length; i ++) {
    endString += String(startArray[i]);
  }
  return endString;
}

function baseConvertStringToArray (startString) {
  endArray = [];
  for (var i = 0; i < startString.length; i ++) {
    endArray[i] = startString[i];
  }
  return endArray;
}

function baseConvertConvertFractionalToFinalBase (fractionalDec, toBase) {
  var fractionalDecNumber = Number(fractionalDec);
  /* Skip this function if there are only zeroes after the decimal point. */
    if (fractionalDecNumber == 0) {
    return '0';
  }

  var d = 1;
  var r = [];
  /* Fractions don't always translate nicely from one base to another, so this
  For Loop will only run a maximum of 100 times to avoid getting stuck. */
  for (var i = 0; d != 0 && i < 100; i++) {
    a = Number('.' + String(fractionalDecNumber)) * toBase;
    r[i] = Math.floor(a);
    d = a - r[i];
    /* Converts number 10 - 35 into letters A - Z. */
    r[i] = r[i].toString(36).toUpperCase();
    fractionalDecNumber = Number(String(d).slice(2));
  }
  var fractionalFinal = baseConvertArrayToString(r);
  return fractionalFinal;
}

function baseConvertFlipArray (startingArray) {
	var endingArray = [];
	for (var i = 0, j = startingArray.length - 1; i < startingArray.length; i++, j--) {
		endingArray[i] = startingArray[j];
	}
	return endingArray;
}
