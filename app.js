const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');
const xml2js = require('xml2js');
const axios = require('axios'); // Added axios for HTTP requests

// IIFE to encapsulate the entire script
(function() {
    // Function to generate Fibonacci series within a given range
    function fibonacciSeriesInRange(start, end) {
        let fib = [0, 1];
        let result = [];

        // Generate Fibonacci numbers until the last number is greater than or equal to 'end'
        while (true) {
            let nextFib = fib[fib.length - 1] + fib[fib.length - 2];
            if (nextFib > end) break;
            fib.push(nextFib);
        }

        // Filter out the Fibonacci numbers within the specified range
        result = fib.filter(num => num >= start && num <= end);

        return result;
    }

    // Function to count characters and check for repeated alphabets
    function word(input) {
        let count = 0;
        let repeat = 0;
        let charCount = {};

        for (let char of input) {
            count++;
            if (charCount[char]) {
                charCount[char]++;
            } else {
                charCount[char] = 1;
            }
        }

        for (let char in charCount) {
            if (charCount[char] > 1) {
                repeat++;
            }
        }

        console.log(`Total number of characters: ${count}`);
        console.log(`Number of repeated characters: ${repeat}`);
    }

    // Curry function for counting repeated words
    const countRepeatedWords = (sentence) => {
        return (wordMap = {}) => {
            let words = sentence.split(" ");
            for (let word of words) {
                wordMap[word] = (wordMap[word] || 0) + 1;
            }
            return wordMap;
        };
    };

    // Function to create objects from user input and find common keys
    function handleCommonKeys() {
        let numObjects = parseInt(prompt("Enter the number of objects you want to create: "), 10);
        let objects = [];

        for (let i = 0; i < numObjects; i++) {
            let obj = {};
            console.log(`Enter keys and values for object ${i + 1} (enter 'stop' to end):`);
            while (true) {
                let key = prompt("Enter key: ");
                if (key.toLowerCase() === 'stop') break;
                let value = prompt("Enter value: ");
                obj[key] = value;
            }
            objects.push(obj);
        }

        let keyPools = {};
        objects.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!keyPools[key]) {
                    keyPools[key] = [];
                }
                keyPools[key].push(obj[key]);
            });
        });

        console.log("Pools of similar keys found in objects:");
        for (let key in keyPools) {
            console.log(`Key: ${key}, Values: ${keyPools[key].join(", ")}`);
        }
    }

    // Function to convert XML to JSON
    function convertXmlToJson(xml) {
        const parser = new xml2js.Parser();
        parser.parseString(xml, (err, result) => {
            if (err) {
                console.error("Error parsing XML:", err);
            } else {
                console.log("JSON Result:");
                console.log(JSON.stringify(result, null, 2));
            }
        });
    }

    // Function to print parts of speech using TextRazor API
    const axios = require('axios'); // Ensure axios is required

async function printPartsOfSpeech(paragraph) {
    const apiKey = '3f6c01506fe2d0878b7494148c25870e7e8081c1501de382681ba1e2';
    const url = 'https://api.textrazor.com/';
    
    try {
        const response = await axios.post(url, `extractors=entities,words&text=${encodeURIComponent(paragraph)}`, {
            headers: {
                'x-textrazor-key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = response.data;
        const words = data.response.sentences.flatMap(sentence => sentence.words);

        const nouns = words.filter(word => word.partOfSpeech.startsWith('NN')).map(word => word.token);
        const verbs = words.filter(word => word.partOfSpeech.startsWith('VB')).map(word => word.token);
        const adjectives = words.filter(word => word.partOfSpeech.startsWith('JJ')).map(word => word.token);
        const adverbs = words.filter(word => word.partOfSpeech.startsWith('RB')).map(word => word.token);
        const pronouns = words.filter(word => word.partOfSpeech.startsWith('PR')).map(word => word.token);
        const prepositions = words.filter(word => word.partOfSpeech.startsWith('IN')).map(word => word.token);
        const conjunctions = words.filter(word => word.partOfSpeech.startsWith('CC')).map(word => word.token);
        const determiners = words.filter(word => word.partOfSpeech.startsWith('DT')).map(word => word.token);

        console.log('Nouns:', nouns);
        console.log('Verbs:', verbs);
        console.log('Adjectives:', adjectives);
        console.log('Adverbs:', adverbs);
        console.log('Pronouns:', pronouns);
        console.log('Prepositions:', prepositions);
        console.log('Conjunctions:', conjunctions);
        console.log('Determiners:', determiners);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}


    // Higher-order function to execute the chosen function
    function executeOption(option, callback) {
        switch (option) {
            case "1":
                console.log("You have selected Fibonacci series.");
                const startRange = parseInt(prompt('Enter the start of the range: '), 10);
                const endRange = parseInt(prompt('Enter the end of the range: '), 10);
                if (isNaN(startRange) || isNaN(endRange) || startRange < 0 || endRange < startRange) {
                    console.log('Please enter valid range values.');
                } else {
                    console.log(fibonacciSeriesInRange(startRange, endRange));
                }
                break;
            case "2":
                console.log("You have selected word count.");
                let input = prompt("Enter your Text Here: ");
                input = input.replace(/ +/g, "");
                console.log(`Your text is: ${input}`);
                word(input);
                break;
            case "3":
                console.log("You have selected similar words count.");
                let sentence = prompt("Enter a sentence: ");
                let wordMap = countRepeatedWords(sentence)({});
                console.log(wordMap);
                break;
            case "4":
                console.log("You have selected Conversion.");
                const xmlData = prompt("Enter yout XML data here ");
                convertXmlToJson(xmlData);
                break;
            case "5":
                console.log("You have selected object pool.");
                handleCommonKeys();
                break;
            case "6":
                console.log("You have selected Part of Speech.");
                const paragraph = prompt("Please enter a paragraph: ");
                printPartsOfSpeech(paragraph);
                break;
            default:
                console.log("Invalid option selected");
                break;
        }

        if (callback) callback();
    }

    // Main function to handle user input and execute the corresponding function
    function main() {
        let options = prompt("Enter 1 for Fibonacci series\nEnter 2 for word count\nEnter 3 for similar words count\nEnter 4 for Conversion\nEnter 5 for object pool\nEnter 6 for Part of Speech\n");
        executeOption(options, () => console.log("Execution completed."));
    }

    // Run the main function
    main();
})();
