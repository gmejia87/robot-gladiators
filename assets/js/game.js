// players
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Andriod", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
    while(enemyHealth > 0 && enemyHealth > 0) {
        //ask player if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
        //if player choses to "skip" confirm and then stop the loop
        if (promptFight === 'skip' || promptFight === 'SKIP') {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are ou sure you'd like to quit?");
    
            //if yes (true), leave fight
            if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney);
            break;
            }
        }

        //remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
    
        //check enemy's health
        if (enemyHealth <= 0)  {
            window.alert(enemyName + " has died!");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() lopp if player is dead
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left."); 
        }
    } // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function() {
    //rest player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
    //fight each enemy robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyNames.length; i++) {
        //f player still alive, keep fighting
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            //pick new enemy from enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before new fight
            enemyHealth = 50;

            //pass the pickedEnemyName varibale's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            //if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        //if player not alive, break out of the loop and let endGame function run
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function () {
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back again soon!");
    }
};

var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                
                //increase health and descrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;  
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;
        
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase attack and descrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;

        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// start the game when the page loads
startGame ();