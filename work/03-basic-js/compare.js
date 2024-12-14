"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
/* --- assume the compare function will always be passed two words( word, guess ) ---
   --- assume the compare function will always be passed two words of the same length ( ‘TOO’, ‘TWO’ ) ---  */

  //1. convert two words to same case, like upperCase();
  word = word.toUpperCase();
  guess = guess.toUpperCase();


  //2. let word, convert string guess and string word to chararray
  let wordArray = word.split("");
  let guessArray = guess.split("");

  //3. loop through the wordArray and guessArray, compare if they are equal
  //3.1 create count to calculate the number of letters the words have in common
  let count = 0;
  //3.2Iterate over the wordArray
  for(let i = 0; i < wordArray.length; i++){
    //index of the first occurrence of guessArray found
    let index = guessArray.indexOf(wordArray[i]);
    //  return -1 if not found
    if(index !== -1){
      count++;
      guessArray.splice(index, 1);
    }
  }
  return count;
}
