# baseConvert.js

baseConvert.js by Dan Floyd (Floydman). Convert any real number between any two
bases from 2 to 36.

Usage: baseConvert(startingNumber, fromBase, toBase, fracLength)
- startingNumber is the number you want to convert. (MANDATORY)
- fromBase is the base you are converting from. (MANDATORY)
- toBase is the base you are converting to. (MANDATORY)
- fracLength is the maximum number of digits you would like after the
- radix point. (OPTIONAL)

Works with all bases from 2 to 36; numbers are represented with numerals 0 - 9
and letters A - Z. startingNumber must be a String if it contains any letters.
The result will be a String because it might contain letters if converting to
Bases 11 - 36.

Check console for errors.
