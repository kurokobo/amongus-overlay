# Temlate to Build Your Own Overlay

This is the template to build your own overlay easily.

First of all, duplicate this template folder with a different name. Note that the name of the folder will be included in the URL that used by OBS.

## Build with HTML + CSS

There are lots of useful pre-defined classes and IDs to build your own overlay, i.e.:

* If you add a specific class to a tag that has `innerText` property, the text will be automatically updated.
* If you specify a certain class for any tag, that tag will only be visible in certain phases and maps.
* If you define a template with a specific class and ID, a list of players and a list of events in the game will be generated based on the template.
* Combine the above freely.

See the comments in `index.html` to get available classes/IDs and examples.

## Build with JavaScript

If you are familiar with JavaScript, you can customize your own overlay further more.

There are lots of useful pre-defined handlers and variables, i.e.:

* Handlers that are executed when a specific phase is started.
* Handlers that are executed when the status of the player has been changed like joining, death, disconnection, etc.
* Handlers that are executed when detailed lobby information is obtained.
* Handlers that are executed when the game starts or ends.
* Variables that stores all players.
* Variables that stores current status of the game.
* Variables that stores the result of the last game.

See the comments in `js/custom.js` to get available handlers.
