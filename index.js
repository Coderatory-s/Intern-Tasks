const prompt = require('prompt-sync')();
const convert = require('xml-js');


// fibonacci series //

function FibonacciSeries(first, last, callback) {
    let a = 0, b = 1;

    while (a <= last) {
        if (a >= first) {
            callback(a);
        }
        let temp = a;
        a = b;
        b = temp + b;
    }
}

function printFibonacciNumber(number) {
    console.log(number);
}

const firstTerm = parseInt(prompt('Enter the first term of the Fibonacci sequence: '));
const lastTerm = parseInt(prompt('Enter the last term of the Fibonacci sequence: '));

FibonacciSeries(firstTerm, lastTerm, printFibonacciNumber);


// convert xml data to json //
 

function xmlToJson(xmlData, callback) {
    try {
        const jsonResult = convert.xml2json(xmlData, {
            compact: true,
            spaces: 2
        });
        callback(JSON.parse(jsonResult));
    } catch (error) {
        console.error('Error converting XML to JSON:', error);
    }
}

const xmlData = prompt('Enter your XML data'); 

xmlToJson(xmlData, function(jsonResult) {
    console.log(jsonResult);
});


// Paragraph count //

let words = [
  { word: "I", pos: "pronoun" },
  { word: "am", pos: "verb" },
  { word: "not", pos: "adverb" },
  { word: "gonna", pos: "verb" },
  { word: "live", pos: "verb" },
  { word: "forever", pos: "adverb" },
  { word: "but", pos: "conjunction" },
  { word: "I", pos: "pronoun" },
  { word: "wanna", pos: "verb" },
  { word: "live", pos: "verb" },
  { word: "while", pos: "conjunction" },
  { word: "I", pos: "pronoun" },
  { word: "am", pos: "verb" },
  { word: "alive", pos: "adjective" }
];

// function countRepeatedWords(wordArray) {
//   let wordMap = {};

//   wordArray.forEach(item => {
//     let word = item.word.toLowerCase();
//     let pos = item.pos;

    
//     let key = `${word}-${pos}`; 
    
    
//     let count = wordArray.filter(w => w.word.toLowerCase() === word && w.pos === pos).length;
    
//     wordMap[key] = count;
//   });

//   return wordMap;
// }

// console.log(countRepeatedWords(words));


// const axios = require('axios');

// const text = "I am not gonna live forever but I wanna live while I am alive.";

// axios.post('http://localhost:3000/pos', { text })
//   .then(response => {
//     console.log('Tagged words:', response.data.taggedWords);
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });


const axios = require('axios');

// Sample text to be analyzed
const text = "I am not gonna live forever but I wanna live while I am alive.";

// Function to count repeated words with their parts of speech
function countRepeatedWords(wordArray) {
  let wordMap = {};

  wordArray.forEach(item => {
    let word = (item.word || '').toLowerCase(); // Add a check for the existence of the 'word' property
    let pos = item.pos;

    let key = `${word}-${pos}`;
    let count = wordArray.filter(w => (w.word || '').toLowerCase() === word && w.pos === pos).length;
    wordMap[key] = count;
  });

  return wordMap;
}



// Function to call POS tagging API
function callPosApi(text) {
  return axios.post('http://localhost:3000/pos', { text })
    .then(response => {
      const taggedWords = response.data.taggedWords;
      console.log('Tagged words:', taggedWords); // Log tagged words
      return taggedWords;
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}


// Call the POS tagging API and count repeated words
callPosApi(text)
  .then(taggedWords => {
    if (taggedWords) {
      const repeatedWordsCount = countRepeatedWords(taggedWords);
      console.log('Repeated Words Count:', repeatedWordsCount);
    }
  });
