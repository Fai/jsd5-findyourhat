// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo> : https://github.com/Fai/jsd5-findyourhat

// JavaScript Assessment Rubric : https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

/* Please break down your thinking process step-by-step (mandatory)
note : a more detailed steps are commented within the method

step 1 : Create a method print() to print out each element in the field by run through a two-dimensional array from the first row to the last row, each row will start from the left-most element to the right most element using loop and array iterators. (Add an extra string to print out the border of the game map and more game play status.)
step 1A : apply .join() to join the string in each row for displaying.
step 1B : create a test field to print and inspect.

step 2 : Create a method move() to receive input from user, using prompt. Console.log the value for inspect the value.
step 2A : use .toLowercase() to capture the direction key of user in both uppercase and lowercase

step 3.1 : using prompt-sync to prompt for user input and save in a variable.
step 3.2 : Use the value that user input to move the player's position to the new location which represent by [positionY,positionX] according to the map field. Using switch to match the key value for the direction and adjust the value of positionX or positionY accordingly.

step 4 : Create another method checkPosition() to check game condition in the user's current location [PositionY,PositionX]. i create a "win" variable at constructor to check if the game is match with the winning or losing condition or not, in order to continue the current game in a loop during gameplay.

step 4.1 : check if the location is "out of bound". I created a helper function if the value of the position is out of range of the field array that is less than 0 or more than the last index which equals to array length - 1. Print the message to inform the user and end the current game. 
step 4.2 : if the location is a movable field. The value of the field array at that position [posiitonY][positionX] should be the same string as the "fieldCharacter" variable. 
step 4.3 : check if the location is a hole. the value of the field array at that position [posiitonY][positionX] should be the same string as the "hole" variable. Print the message to inform the user and end the current game.
step 4.4 : check if the location is a hat. the value of the field array at that position [posiitonY][positionX] should be the same string as the "hat" variable. Print the congratulation message to the user and end the current game.

step 5 : Create a method to play the game.
step 5E : for an easy mode
step 5E-1 : print() the field for user first.
step 5E-2 : receive command from user using move()
step 5E-3 : check the game condition and continue loop the gameplay from step 1-3 until game winning condition is either win (1) or lost (-1);

step 6.1 : Create a static method generateField() to generate a new field according to the width, height (map size) and difficulty level (% of holes in a field), 
step 6.2 : i also created another variable in the constructor keep up with these variable called 'playWidth', 'playHeight' and 'playLevel'.

step 6.3 : Generate a blank map, full of fieldCharacter first.
step 6.3.1 : at first i using a nested loop, but later changed to an Array method.
step 6.3.2 : i use Array(height).fill(null) to create a row of empty array according to the map height first.
step 6.3.3 : then call another .map(() => new Array(width).fill(fieldCharacter) method to mup that empty array in each row to another array of "fieldCharacter" element with a range the same as the map width
step 6.4 : set another element of the map by adjust the value of the field, using Math.floor and Math.random to generate random X and Y position in a field.
step 6.4.1 : set the start location of the game
step 6.4.2 : set the hat location of the game that not the same as start location.
step 6.4.3 : set the hole location of the game that not the same as start and hat location

step 7 : create another method to check if there's a solution to win a game.
step 7.1 : i research a maze-solving and searching algorithm and implement BFS search in this method.
step 7.2 : i create two new variable visited and queue to implement to logic of the BFS. queue start from the initial position
step 7.2.1 : shift the first value from the queue for the current position
step 7.2.2 : change value of the visited array at that position to visited if not out of bound, holes or already visited.
step 7.2.3 explore the neightbor (upper, lower, left and right position) and added position to the queue
step 7.2.4 continue until find the hat or out of location to explore and return true and false in according to condition.

step 8 : add extra feature : random staring location (random spawn), step 8.1 : add a method to change the value of positionX and positionY to a random number within the field range and called it randomStart()

step 9 : add extra feature : setting map size, add prompt for receive the value to adjust the playWidth and playHeight in a method called settings()

step 10 : add extra feature : continuous playing, prompt user if they want to play again and adjust the looping condition
step 10.1 : create a resetGame() method to reset the map by generate a new field and check if the map is playable.
step 10.2 : add a gameplay count, winning and losing count.

step 11 : add extra feature : hard mode, add a option to prompt user if they want to turn on hard mode.
step 11.1 : in hard mode, every n turn (currently set to 3), another hold will be randomly generated using the same logic like when generate the field. (can't the same location as hat, path)

step 12 : add extra feature : graphic improment
step 12.1 : adjust the graphic by changing the string of the display in the field 
step 12.2 : import the terminal-kit and implement method to change the text color of the game to create contrast and hightlight the game condition.
step 12.3 : change the display of the hole that randomly generated later to make the game more enjoyable and make text more realistic.

step 13 : might need to fix some bugs.

step 14 : i'm not a snake so i erase the trial along the path using a new method noFootprint()

*/

// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true });
const term = require( 'terminal-kit' ).terminal ;
const clear = require('clear-screen');

const hat = '💎';
const hole = '🔥';
const blackhole = '🌊';
const fieldCharacter = '⬜️';
const pathCharacter = '👾';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.positionX = 0;
        this.positionY = 0;
        this.field[0][0] = pathCharacter;
        this.win = 0;
        this.lastmove = '';
        this.playCount = 1;
        this.winCount = 0;
        this.loseCount = 0;
        this.playHardMode = 0;
        this.playWidth = 20;
        this.playHeight = 20;
        this.playLevel = 0.4;
        this.turn = 0;
    }

    // extra feature 

    // erase footprint
    noFootprint(){
        switch (this.lastmove) {
            // update location
            case 'u':
                this.field[this.positionY+1][this.positionX] = fieldCharacter;
                break;
            case 'd':
                this.field[this.positionY-1][this.positionX] = fieldCharacter;
                break;
            case 'l':
                this.field[this.positionY][this.positionX+1] = fieldCharacter;
                break;
            case 'r':
                this.field[this.positionY][this.positionX-1] = fieldCharacter;
                break;
        }
    }

    // random start character
    randomStart(){
        this.positionX = Math.floor(Math.random() * this.playWidth);
        this.positionY = Math.floor(Math.random() * this.playHeight);
        this.field[0][0] = fieldCharacter;
        this.field[this.positionY][this.positionX] = pathCharacter;
    }

    
    resetGame(){
        // generate new field to play
        this.field = Field.generateField(this.playWidth, this.playHeight, this.playLevel);
        this.randomStart();
        // check if the field is valid
        while (!Field.isPathToHatPossible(this.field)) {
            this.field = Field.generateField(this.playWidth, this.playHeight, this.playLevel);
            this.randomStart();
        }
        this.win = 0;
        this.turn = 0;
    }

    // set map width
    settings(){
        do{
            this.playWidth = parseInt(prompt("Map Width:"));
            if(typeof this.playWidth != 'number')
                console.log(`Please enter width in number`);
            else if(this.playWidth < 3)
                console.log(`Map is too small, suggest 3 or more`);
            else if(this.playWidth > 20)
                console.log(`Map is too big`);
            else
                break;
        }while(true);
        // set map height
        do{
            this.playHeight = parseInt(prompt("Map Height:"));
            if(typeof this.playHeight != 'number')
                console.log(`Please enter width in number`);
            else if(this.playHeight < 3)
                console.log(`Map is too small, suggest 3 or more`);
            else if(this.playHeight > 20)
                console.log(`Map is too big`);
            else   
                break;
        }while(true);
    }

    // Basic Function

    print() {
        // clear screen
        clear();
        // console.log(`Game : ${this.playCount} Win : ${this.winCount} Lost : ${this.loseCount}`)
        term.green.bold(`Game : ${this.playCount}\nWin : ${this.winCount} Lost : ${this.loseCount} \n`)
        // console.log(`Player Position ${this.positionX} ${this.positionY}`);

        // print each row of field
        console.log('🟥'.repeat(this.field[0].length+2));
        for (const row of this.field) {
            console.log('🟥'+row.join('')+'🟥');
        }
        console.log('🟥'.repeat(this.field.length+2));
    }

    //  Receive the Key from User to Calculate the New Location
    move() {
        // receive key
        const move = prompt("Which way? (Use 'u', 'd', 'l', or 'r': ");
        move.toLowerCase();
        this.lastmove = move;
        switch (move) {
            // update location
            case 'u':
                this.positionY--;
                break;
            case 'd':
                this.positionY++;
                break;
            case 'l':
                this.positionX--;
                break;
            case 'r':
                this.positionX++;
                break;
            // log invalid key
            default:
                console.log("Invalid move. Use 'u', 'd', 'l', or 'r'.");
        }
    } 

    // Check if the New Location is a Path, Hole, Hat, or Out of Bound
    checkPosition() {
        // out of bound
        if (this.isOutOfBounds()) {
            term.red.bold("Out of bounds!\n");
            this.loseCount++;
            // console.log(`Last Position ${this.positionX} ${this.positionY}`);
            this.win = -1;
        } else {
            const playerLocation = this.field[this.positionY][this.positionX];
            switch (playerLocation) {
                // path
                case fieldCharacter:
                    this.field[this.positionY][this.positionX] = pathCharacter;
                    this.noFootprint();
                    break;
                // hole
                case hole:
                    term.red.bold("Sorry, you can't continue. Don't play with fire.\n");
                    // console.log(`Last Position ${this.positionX} ${this.positionY}`);
                    this.win = -1;
                    this.loseCount++;
                    break;
                case blackhole:
                    term.blue.bold("Sorry, you're lost. don't play with water.\n");
                    // console.log(`Last Position ${this.positionX} ${this.positionY}`);
                    this.win = -1;
                    this.loseCount++;
                    break;
                // hat
                case hat:
                    term.yellow.bold("Congrats, you found your treasure.\n");
                    // console.log(`Last Position ${this.positionX} ${this.positionY}`);
                    this.win = 1;
                    this.winCount++;
                    break;
            }
        }
    }

    isOutOfBounds() {
        return (
            // check if the position is in the field 
            this.positionX < 0 || 
            this.positionY < 0 || 
            this.positionX >= this.field[0].length || 
            this.positionY >= this.field.length
        );
    }

    play() {
        if(prompt("Hard mode? (h):") == 'h') this.playHardMode = 1;
        this.settings();
        do{
            this.resetGame();
            
            // play the field
            do {
                if(this.playHardMode == 1 && this.turn != 0) this.hardMode();            
                this.print();
                this.move();
                this.checkPosition();
                this.turn++;
            } while (this.win === 0);   
            
            this.playCount++;
            // prompt if user want to continue playing
        }while(prompt("play again? enter y to continue: ") == 'y')
        
    }

    // Generate a New Map
    static generateField(height, width, level = 0.1) {
        // create blank map using an Array and .fill 
        let newField = new Array(height).fill(null).map(() => new Array(width).fill(fieldCharacter));
        
        // for(let row = 0 ; row < height ; row ++){
        //     for(let column = 0; column < width ; column++){
        //         newField[row][column] = fieldCharacter;
        //     }
        // }
        
        // set start location
        newField[0][0] = pathCharacter;
        // set hat location
        let randomX;
        let randomY;
        do{
        randomX = Math.floor(Math.random() * width);
        randomY = Math.floor(Math.random() * height);
        } while(randomX ==  0 && randomY == 0);
        newField[randomY][randomX] = hat;
        // random locaton of the hole
        for(let numberOfhole = 0 ; numberOfhole < (height * width * level); numberOfhole ++){
        do{
            randomX = Math.floor(Math.random() * width);
            randomY = Math.floor(Math.random() * height);
        } while(newField[randomY][randomX] == pathCharacter || newField[randomY][randomX] == hat);
        newField[randomY][randomX] = hole;
        }
        return newField;
    }

    // Check Whether the New Map is Playable using BFS
    static isPathToHatPossible(field) {
        // uses a visited array to keep track of visited positions and a queue to explore neighboring positions.
        const visited = new Array(field.length).fill(false).map(() => new Array(field[0].length).fill(false));
        //  queue starts with the initial position and iteratively explores neighboring positions.
        const queue = [{ x: 0, y: 0 }];

        while (queue.length > 0) {
            const { x, y } = queue.shift();

            // If a neighboring position is out of bounds, has already been visited, or is a hole, it's skipped.
            if (x < 0 || x >= field[0].length || y < 0 || y >= field.length || visited[y][x] || field[y][x] === hole || field[y][x] == blackhole) {
            continue;
            }

            visited[y][x] = true;

            // If the neighboring position contains the hat, the function returns true.
            if (field[y][x] === hat) {
                return true;
            }
            
            // Otherwise, the neighboring positions are added to the queue for further exploration.
            queue.push({ x: x + 1, y });
            queue.push({ x: x - 1, y });
            queue.push({ x, y: y + 1 });
            queue.push({ x, y: y - 1 });
        }
        // If the queue is empty and no path to the hat is found, the function returns false.
        return false;
    }

    // hardmode
    hardMode(){
        let randomX;
        let randomY;
        if (this.turn % 3 === 0) { // i specific to add a hole every 3 turn
        do {
            randomX = Math.floor(Math.random() * this.playHeight);
            randomY = Math.floor(Math.random() * this.playWidth);
        } while (this.field[randomY][randomX] == pathCharacter || this.field[randomY][randomX] == hat);

        // Create a copy of the field to check first if the field is playable
        const fieldCopy = this.field.map(row => [...row]);

        // Add the hole to the copied field
        fieldCopy[randomY][randomX] = blackhole;

        if (!Field.isPathToHatPossible(fieldCopy)) {
            // If the hole blocks the path, revert the hole to a field character
            this.field[randomY][randomX] = fieldCharacter;
        } else {
            // If the path is not blocked, update the original field
            this.field[randomY][randomX] = blackhole;
        }
    }
    }
}

const myField = new Field;
myField.play()