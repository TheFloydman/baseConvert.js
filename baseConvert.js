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
  if (fromBase == toBase) {
    return startingNumber;
  }

  /* Split number at decimal point. */
  var startingArray = determineParts(String(startingNumber));
  var integralDec = arrayToString(startingArray[0]);
  if (startingArray[1] == 'no') {
    var fractionalDec = '0';
  } else {
    var fractionalDec = startingArray[1];
  }

  /* If the number is already in Base 10, move on to convert it to its
  destination base; otherwise, convert it to Base 10. */
  if (fromBase != 10) {
    integralDec = convertIntegralToDec(startingArray[0], fromBase);
    if (startingArray[1] == 'no') {
      fractionalDec = '0';
    } else {
      fractionalDec = convertFractionalToDec(startingArray[1], fromBase);
    }
  }

  fractionalDecString = arrayToString(fractionalDec);

  var integralFinal = convertIntegralToFinalBase(integralDec, toBase);
    if (startingArray[1] == 'no') {
      var fractionalFinal = '0';
    } else {
      var fractionalFinal = convertFractionalToFinalBase(fractionalDecString, toBase);
    }

  var convertedToFinalBase = integralFinal + '.' + fractionalFinal;
  for (var i = 0; i < fractionalFinal.length + 1; i++) {
    if (convertedToFinalBase.charAt(convertedToFinalBase.length - 1) == '0' || convertedToFinalBase.charAt(convertedToFinalBase.length - 1) == '.') {
      convertedToFinalBase = convertedToFinalBase.slice(0,convertedToFinalBase.length - 1);
    }
  }
  return convertedToFinalBase;
}

function determineParts (startingNumber) {
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

function convertFractionalToDec (fractionalNumber, fromBase) {
  /* Skip this function if there are only zeroes after the decimal point. */
  var lettersToNumbers = [];
  for (var i = 0; i < fractionalNumber.length; i++) {
    lettersToNumbers[i] = convertLetterToDecNumber(fractionalNumber[i]);
  }
  fractionalNumber = lettersToNumbers;

  if (Number(arrayToString(fractionalNumber)) == 0) {
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

function convertIntegralToDec (integralNumber, fromBase) {
  /* Skip this function if there are only zeroes before the decimal point. */
  var lettersToNumbers = [];
  for (var i = 0; i < integralNumber.length; i++) {
    lettersToNumbers[i] = convertLetterToDecNumber(integralNumber[i]);
  }
  integralNumber = lettersToNumbers;

  if (Number(arrayToString(integralNumber)) == 0) {
    return '0';
  }

  var numberOfDigits = integralNumber.length;
  var integralDec = 0;
  for (var i = 0, j = numberOfDigits - 1; i < numberOfDigits; i++, j--) {
    integralDec += Number(integralNumber[i]) * Math.pow(fromBase,j);
  }
  return String(integralDec);
}

function convertLetterToDecNumber (letter) {
  var letterToNumber = letter;

  if (letter == 'A' || letter == 'a') {
    letterToNumber = 10;
  } else if (letter == 'B' || letter == 'b') {
    letterToNumber = 11;
  } else if (letter == 'C' || letter == 'c') {
    letterToNumber = 12;
  } else if (letter == 'D' || letter == 'd') {
    letterToNumber = 13;
  } else if (letter == 'E' || letter == 'e') {
    letterToNumber = 14;
  } else if (letter == 'F' || letter == 'f') {
    letterToNumber = 15;
  } else if (letter == 'G' || letter == 'g') {
    letterToNumber = 16;
  } else if (letter == 'H' || letter == 'h') {
    letterToNumber = 17;
  } else if (letter == 'I' || letter == 'i') {
    letterToNumber = 18;
  } else if (letter == 'J' || letter == 'j') {
    letterToNumber = 19;
  } else if (letter == 'K' || letter == 'k') {
    letterToNumber = 20;
  } else if (letter == 'L' || letter == 'l') {
    letterToNumber = 21;
  } else if (letter == 'M' || letter == 'm') {
    letterToNumber = 22;
  } else if (letter == 'N' || letter == 'n') {
    letterToNumber = 23;
  } else if (letter == 'O' || letter == 'o') {
    letterToNumber = 24;
  } else if (letter == 'P' || letter == 'p') {
    letterToNumber = 25;
  } else if (letter == 'Q' || letter == 'q') {
    letterToNumber = 26;
  } else if (letter == 'R' || letter == 'r') {
    letterToNumber = 27;
  } else if (letter == 'S' || letter == 's') {
    letterToNumber = 28;
  } else if (letter == 'T' || letter == 't') {
    letterToNumber = 29;
  } else if (letter == 'U' || letter == 'u') {
    letterToNumber = 30;
  } else if (letter == 'V' || letter == 'v') {
    letterToNumber = 31;
  } else if (letter == 'W' || letter == 'w') {
    letterToNumber = 32;
  } else if (letter == 'X' || letter == 'x') {
    letterToNumber = 33;
  } else if (letter == 'Y' || letter == 'y') {
    letterToNumber = 34;
  } else if (letter == 'Z' || letter == 'z') {
    letterToNumber = 35;
  }

  return letterToNumber;
}

function convertNumberToLetter (startNumber) {
  var numberToLetter = startNumber;

  if (Number(startNumber) == 10) {
    numberToLetter = 'A';
  } else if (Number(startNumber) == 11) {
    numberToLetter = 'B';
  } else if (Number(startNumber) == 12) {
    numberToLetter = 'C';
  } else if (Number(startNumber) == 13) {
    numberToLetter = 'D';
  } else if (Number(startNumber) == 14) {
    numberToLetter = 'E';
  } else if (Number(startNumber) == 15) {
    numberToLetter = 'F';
  } else if (Number(startNumber) == 16) {
    numberToLetter = 'G';
  } else if (Number(startNumber) == 17) {
    numberToLetter = 'H';
  } else if (Number(startNumber) == 18) {
    numberToLetter = 'I';
  } else if (Number(startNumber) == 19) {
    numberToLetter = 'J';
  } else if (Number(startNumber) == 20) {
    numberToLetter = 'K';
  } else if (Number(startNumber) == 21) {
    numberToLetter = 'L';
  } else if (Number(startNumber) == 22) {
    numberToLetter = 'M';
  } else if (Number(startNumber) == 23) {
    numberToLetter = 'N';
  } else if (Number(startNumber) == 24) {
    numberToLetter = 'O';
  } else if (Number(startNumber) == 25) {
    numberToLetter = 'P';
  } else if (Number(startNumber) == 26) {
    numberToLetter = 'Q';
  } else if (Number(startNumber) == 27) {
    numberToLetter = 'R';
  } else if (Number(startNumber) == 28) {
    numberToLetter = 'S';
  } else if (Number(startNumber) == 29) {
    numberToLetter = 'T';
  } else if (Number(startNumber) == 30) {
    numberToLetter = 'U';
  } else if (Number(startNumber) == 31) {
    numberToLetter = 'V';
  } else if (Number(startNumber) == 32) {
    numberToLetter = 'W';
  } else if (Number(startNumber) == 33) {
    numberToLetter = 'X';
  } else if (Number(startNumber) == 34) {
    numberToLetter = 'Y';
  } else if (Number(startNumber) == 35) {
    numberToLetter = 'Z';
  }

  return numberToLetter;
}

function arrayToString (startArray) {
  endString = '';
  for (var i = 0; i < startArray.length; i ++) {
    endString += String(startArray[i]);
  }
  return endString;
}

function stringToArray (startString) {
  endArray = [];
  for (var i = 0; i < startString.length; i ++) {
    endArray[i] = startString[i];
  }
  return endArray;
}

function convertIntegralToFinalBase (integralDec, toBase) {
  var integralDecNumber = Number(integralDec);
  /* Skip this function if there are only zeroes before the decimal point. */
    if (integralDecNumber == 0) {
    return '0';
  }

  var integralToBase = '';
  var d = 0;
  var r = [];

  for (var i = 0; integralDecNumber > 0; i++) {
    d = Math.floor(integralDecNumber/toBase);
    r[i] = integralDecNumber - (d * toBase);
    r[i] = convertNumberToLetter(r[i]);
    integralDecNumber = d;
  }

  var flippedR = flipArray(r);
  var integralFinal = arrayToString(flippedR);

  return integralFinal;
}

function convertFractionalToFinalBase (fractionalDec, toBase) {
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
    r[i] = convertNumberToLetter(r[i]);
    fractionalDecNumber = Number(String(d).slice(2));
  }
  var fractionalFinal = arrayToString(r);
  return fractionalFinal;
}

function flipArray (startingArray) {
	var endingArray = [];
	for (var i = 0, j = startingArray.length - 1; i < startingArray.length; i++, j--) {
		endingArray[i] = startingArray[j];
	}
	return endingArray;
}
