# Project-Scripto

## Synopsis

A character sheet for Tablestory's Witchcraft and Wizardry.

## Note

This version of the sheet requires a Pro level account with Roll20, in order to utilize custom character sheets.

## Installation

1. Create a game.
2. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, set the Character Sheet Template to Custom. *(This step may be completed during game creation.)*    
3. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the HTML Layout tab.    
  * Copy the contents of [scripto.html](./scripto.html) and paste them into the text box.    
4. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the CSS Styling tab.    
  * Copy the contents of [scripto.css](./scripto.css) and paste them into the text box.    
5. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the Translation tab.    
  * Copy the contents of [translation.json](./translation.json) and paste them into the text box.
6. Click the Save Changes button below the text box.
7. Return to the game lobby, and navigate to the [API Scripts](https://wiki.roll20.net/Game_Management#API_Scripts) for the game.
8. Click on the New Script tab. You can give the script any name you like.
9. Copy the contents of [sortinghat.js](./sortinghat.js) and paste them into the upper text box.
10. Click the Save Script button below the textbox.

# API Script Specifications
`!sortchar <charactername>`

This script when given a valid character name will apply the Sorting Hat to that character's sheet. Note that the hat will whisper the person invoking the command, not the character's owner.
