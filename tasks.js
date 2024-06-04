const prompt = require('prompt-sync')();
const { convert } = require('xml-js');

//XML to json
//------------------------------------------------------------------------------------------------
const xmlconverter = (xmlData, cb) => {
  const jsonResult = convert.xml2json(xmlData, {
    compact: true,
    spaces: 2
  });
  cb(jsonResult);
}
const result = (jsonResult) => {
  console.log(`Converted XML data to JSON : ${jsonResult}`);
}
//------------------------------------------------------------------------------------------------

//Paragraph word count
const countRepeatedWords = (sentence) => {
  let words = sentence.split(" ");
  let wordMap = {};
  for (let i = 0; i < words.length; i++) {
    let currentWordCount = wordMap[words[i]];
    let count = currentWordCount ? currentWordCount : 0;
    wordMap[words[i]] = count + 1;
  }
  let repeatedWords = {};
  for (let word in wordMap) {
    if (wordMap[word] > 1) {
      repeatedWords[word] = wordMap[word];
    }
  }

  return repeatedWords;
}
//------------------------------------------------------------------------------------------------

// identify parts of speech
const apiKey = 'a1462a76aade5dc0394441900223649da02695ff7d93f5980de5d566';

const identifyPos = (inputSentence, cb) => {
  fetch('http://api.textrazor.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-textrazor-key': apiKey
    },
    body: new URLSearchParams({
      text: inputSentence,
      extractors: 'words'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.response && data.response.sentences) {
        const wordsMap = new Map();
        data.response.sentences[0].words.forEach(word => {
          let fullForm = getFullForm(word.partOfSpeech);


          if (fullForm === 'Unknown' && /^[A-Z]/.test(word.token)) {
            fullForm = 'Proper Noun';
          }

          const token = word.token.toLowerCase();
          if (!wordsMap.has(token)) {
            wordsMap.set(token, `${word.token} = ${fullForm}`);
          }
        });
        cb([...wordsMap.values()].join('\n'));
      } else {
        cb('');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      cb('');
    });
};

const getFullForm = (abbreviation) => {
  switch (abbreviation) {
    case 'PRP':
      return 'Pronoun';
    case 'VBP':
      return 'Verb, Non-3rd Person Singular Present';
    case 'JJ':
      return 'Adjective';
    case 'VBG':
      return 'Verb, Gerund or Present Participle';
    case 'NN':
      return 'Noun, Singular or Mass';
    case '.':
      return 'Punctuation Mark (Period)';
    case ',':
    case '?':
      return 'Punctuation Mark';
    case 'VBZ':
      return 'Verb, 3rd Person Singular Present';
    case 'IN':
      return 'Preposition or Subordinating Conjunction';
    case 'DT':
      return 'Determiner';
    default:
      return 'Unknown';
  }
};
//------------------------------------------------------------------------------------------------
//obj pool
// Curried function 
const poolSameTypeData = obj1 => obj2 => {
  const pool = {};
  // Iterate over keys of obj1 and compare with obj2
  Object.keys(obj1).forEach(key => {
    if (obj2.hasOwnProperty(key)) {
      if (obj1[key] === obj2[key]) {
        pool[key] = [obj1[key], obj2[key]];
      }
    }
  });

  return pool;
};
const createUserObject = (userNumber) => {
  console.log(`Enter data for user ${userNumber}:`);
  const user = {};
  user.name = prompt('Name: ');
  user.age = parseInt(prompt('Age: '), 10);
  user.isStudent = prompt('Is student (true/false): ') === 'true';
  user.email = prompt("Enter Email: ")
  return user;
};
const run = () => {
  const user1 = createUserObject(1);
  const user2 = createUserObject(2);

  const pooledData = poolSameTypeData(user1)(user2);
  console.log('Pooled Data:', pooledData);
};
//------------------------------------------------------------------------------------------------


const main = () => {
  const choice = parseInt(prompt("1. Generate Fibonacci series\n2. Convert XML to JSON\n3.Detect same words in paragraph\n4.identify Parts of Speech in a Sentence\n5.Identify same data of user\nEnter number from 1-5 according to your choice (1-5):"));

  switch (choice) {
    case 1:
      (function Fibonacci() {
        const firstNumber = parseInt(prompt('Enter the first number of the series: '), 10);
        const lastNumber = parseInt(prompt('Enter the last number of the series: '), 10);

        if (firstNumber < 0 || lastNumber < 0) {
          console.log("The first and last numbers must be non-negative.");
          return;
        } else if (firstNumber > lastNumber) {
          console.log("The last number should not be greater than the first number.");
          return;
        }

        let a = 0, b = 1;
        while (b < lastNumber) {    //12
          if (b > firstNumber) { //1
            console.log(b);
          }
          const nextNumber = a + b;
          a = b;
          b = nextNumber;
        }
      })();
      break;
    case 2:
      const xmlData = prompt("enter data in XML to convert into JSON format")
      xmlToJson(xmlData, result);
      break;
    case 3:
      let words = prompt("Write few lines/paragraph : ");
      console.log(countRepeatedWords(words));
      break;
    case 4:
      const sentence = prompt("Write any sentence to identify parts of Speech: "); //The quick brown fox jumps over the lazy dog.
      identifyPos(sentence, (partsOfSpeech) => {
        console.log(partsOfSpeech);
      });
      break;
    case 5:
      run()
      break;

    default:
      console.log("Invalid choice. Please enter any numberfrom 1 to 5.");
  }
}

main();