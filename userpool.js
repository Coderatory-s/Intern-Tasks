const readline = require("readline");

function createPools(users) {
    const pools = {};

    users.forEach(user => {
        const key = user.key;

        if (!pools[key]) {
            pools[key] = [];
        }
        pools[key].push(user);
    });

    return pools;
}

function getUserInput(callback) {

    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let users = [];

    const askUser = () => {

        r1.question('Enter user detail in format name:key (or type "done" to finish): ', (answer) => {

            if (answer.trim() === 'done') {
                const pools = createPools(users);
                callback(pools);
                r1.close(); // Close the readline interface
                return;
            }

            const [name, key] = answer.split(":");

            if (name && key) {
                users.push({ name, key });
            } else {
                console.log("Invalid input. Please enter in this format: name:key");
            }

            askUser(); // Ask the user for input recursively
        });
    };

    askUser(); // Call askUser function to start asking for user input
}


function handleResult(pools) {
    console.log('User pools:', JSON.stringify(pools, null, 2));
}

getUserInput(handleResult);
