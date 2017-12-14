# baseConvert.js
Convert any number (not just integers) between Bases 2 - 36.

baseConvert.js was written by Dan Floyd (aka Floydman). It is unique because it supports fractional values, so it provides more support than plain Javascript alone, which only supports integers.

To use, simply call the function:
baseConvert(startingNumber, fromBase, toBase)

baseConvert.js works with all bases from 2 to 36. Numbers are represented with numerals 0 - 9 and letters A - Z. startingNumber must be a String if it contains any letters. The result will be a String because it might contain letters if converting to Bases 11 - 36.
