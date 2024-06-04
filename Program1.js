const prompt = require("prompt-sync")();
const xmlConvert = require('xml-js');
const nlp = require('compromise');  // text analyze and manipulate

 // ------------------ function 1 -----------------------
const FibonacciSeries = (firstNum, lastNum, callback) => {
    let a = 0, b = 1;
    let series = []; 

   
    while (a <= lastNum) {
        if (a >= firstNum) {
            series.push(a); 
        }
        let temp = a + b;
        a = b;
        b = temp;
    }
    
    callback(series); 
}



const printSeries = (series) => {
    console.log(`Fibonacci series : ${series.join(', ')}`);
}

// ------------------------function 2------------------
const jsonResult = (xmlData) => (option) => xmlConvert.xml2json(xmlData, option);


const convertXmlToJson = () => {
  
    const xmlData = prompt("Enter XML data: ");
    const option = { compact: true, spaces: 4 };
    console.log(jsonResult(xmlData)(option));
};






// --------------------------function 3-------------------------
const findRepeatedWords = (()=>{
    return () => {
   
let string = prompt("enter your paragraph: ");
let words = string.split(" ")
let count = {};

for(let x in words){
    let word = words[x];

    if(count[word]){
        count[word]++
    }else{
        count[word] = 1
    }
}

let repeateWords = Object.keys(count).filter((word)=>{
   return count[word] > 1
})

repeateWords.forEach((word)=>{
  console.log(`\n${word} => ${count[word]}`)
})
    }
})();


// ----------------------function 4 -------------------
const winkPosTagger = require('wink-pos-tagger');
const tagger = winkPosTagger();

function categorizePOS(sentence) {
  
    const taggedWords = tagger.tagSentence(sentence);

  
    const posCategories = {
        nouns: [],
        verbs: [],
        adjectives: [],
        adverbs: [],
        pronouns: [],
        interjections: []
    };

    // Categorize words based on their POS tags
    taggedWords.forEach(taggedWord => {
        switch(taggedWord.pos) {
            case 'NN':
            case 'NNS':
            case 'NNP':
            case 'NNPS':
                posCategories.nouns.push(taggedWord.value);
                break;
            case 'VB':
            case 'VBD':
            case 'VBG':
            case 'VBN':
            case 'VBP':
            case 'VBZ':
                posCategories.verbs.push(taggedWord.value);
                break;
            case 'JJ':
            case 'JJR':
            case 'JJS':
                posCategories.adjectives.push(taggedWord.value);
                break;
            case 'RB':
            case 'RBR':
            case 'RBS':
                posCategories.adverbs.push(taggedWord.value);
                break;
            case 'PRP':
            case 'PRP$':
            case 'WP':
            case 'WP$':
                posCategories.pronouns.push(taggedWord.value);
                break;
            case 'UH':
                posCategories.interjections.push(taggedWord.value);
                break;
            default:
                break;
        }
    });

    return posCategories;
}
const printPOS =()=>{
    const sentence = prompt("Enter Pragraph");

  
    const categorizedWords = categorizePOS(sentence);
    
   
    console.log('Nouns:', categorizedWords.nouns);
    console.log('Verbs:', categorizedWords.verbs);
    console.log('Adjectives:', categorizedWords.adjectives);
    console.log('Adverbs:', categorizedWords.adverbs);
    console.log('Pronouns:', categorizedWords.pronouns);
    console.log('Interjections:', categorizedWords.interjections);
    
    
    
}



//---------------------- function 5 --------------------------
const createObjectPool = (data, sameProperty) => {
    let pool = {};

    data.forEach((value) => {
        let matchObjectValue = value[sameProperty];
        if (!pool[matchObjectValue]) {
            pool[matchObjectValue] = [];
        }
        pool[matchObjectValue].push(value);
    });

    return pool;
};

function printAllObjects() {
    const userData = getUserData();
    const property = prompt("Enter the property name to group by: ");
    const printObjects = createObjectPool(userData, property);
    console.log(printObjects);
}

function getUserData() {
    let userData = [];
    let numObjects = prompt("Enter the number of objects: ");
    numObjects = parseInt(numObjects);

    for (let i = 1; i <= numObjects; i++) {
        let obj = {};
        console.log(`Object ${i}:`);
        obj.id = prompt("Enter id: ");
        obj.firstName = prompt("Enter first name: ");
        obj.age = prompt("Enter age: ");
        userData.push(obj);
    }

    return userData;
}




// ----------------user choice ----------------
const showOptions = () => {
    for (let i = 1; i <= 5; i++) {
        console.log(`Option ${i}: Run function ${i}`);
    }
    let show = parseInt(prompt("You have five options, so select only one option:  " ));

    switch (show) {
        case 1:
            let firstNum = parseInt(prompt("\nEnter Your firstNumber:"));
            let lastNum = parseInt(prompt("Enter Your lastNumber:"));
            FibonacciSeries(firstNum, lastNum, printSeries);
            break;
        case 2:
            convertXmlToJson();
            break;
        case 3:
            
            findRepeatedWords();
            break;
        case 4:
            printPOS();
            break;   
        case 5:
            printAllObjects();
            break;

        default:
            console.log("You selected a wrong option.");
    }
}

showOptions();