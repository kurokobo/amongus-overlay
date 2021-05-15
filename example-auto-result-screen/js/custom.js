// Useful Predefined Global Variables:
// - Note that those variables are updated dynamically when related event has sent from AUCapture
//
// - GAME: Current status of the Among Us
//   GAME: {
//     NEW_STATE: 1,         // Current State ID
//     OLD_STATE: 0,         // State ID before the state was transitioned to current State ID
//     REGION: 0,            // Region ID
//     MAP: 0,               // Map ID
//     LOBBY_CODE: "ABCDEF", // Lobby Code displayed in Lobby screen
//     PROGRESS: 0,          // Progress ID
//   }
//
// - GAMEOVER: Detailed information of the last Game Over event
//   GAMEOVER: {
//     REASON: 0,                             // Reason ID of the last Game Over event
//     WIN_ROLE: 0,                           // Role ID of the winner in the last Game Over event
//     LOSE_ROLE: 1,                          // Role ID of the loser in the last Game Over event
//     WIN_PLAYERS: ["hoge", "fuga", "piyo"], // List of Player Names who won the last game
//     LOSE_PLAYERS: ["foo"],                 // List of Player Names who lost the last game
//     CREWMATES: ["hoge", "fuga", "piyo"],   // List of Player Names who played as Crewmate in last game
//     IMPOSTERS: ["foo"],                    // List of Player Names who played as Imposter in last game
//     START: 1620572327575,                  // Start time of the last game in Unix Time (ms)
//     END: 1620579816458,                    // End time of the last game in Unix Time (ms)
//     DURATION: 7488883,                     // Duration of the last game in ms
//     EVENTS: [                              // List of In-Game Events and its time
//       {
//         Time: 1,
//         Event: "🔨 Tasks",
//         Class: "event_tasks"
//       },
//       {
//         Time: 175012,
//         Event: "🔪 kurokobo Died",
//         Class: "event_kill"
//       },
//       { ... },
//       { ... },
//     EXILED: [],                            // List of Player Names who exiled
//   }
//
// - PLAYERS: Status of each players who joined the game
//   PLAYERS: {
//     0: {                    // Color ID as the key of the player object
//       Name: "Player Red",   // Player's name
//       Color: 0,             // Player's Color ID
//       IsDead: false,        // Player is dead or not, true means dead
//       Disconnected: false,  // Player is disconnected or not, true means disconnected
//     },
//     7: {                    // Color ID as the key of the player object
//       Name: "Player White",
//       Color: 1,
//       IsDead: false,
//       Disconnected: false,
//     },
//     1: { ... },
//     4: { ... },
//     6: { ... },
//   }

// Useful Predefined Constants: See "common/js/const.js" for detail
//
// - COLOR, COLOR_NAME
//   - List of Color IDs and its names
//   - ex.) COLOR.RED = 0, COLOR_NAME[0] = "Red"
//
// - EVENT, EVENT_MAME
//   - List of Event IDs and its names
//   - ex.) EVENT.STATE = 0, EVENT_MAME[0] = "STATE"
//
// - STATE, STATE_NAME : 
//   - LList of State IDs and its names
//   - ex.) STATE.LOBBY = 0, STATE_NAME[0] = "Lobby"
//
// - REGION, REGION_NAME : 
//   - List of Region IDs and its names
//   - ex.) REGION.NORTH_AMERICA = 0, REGION_NAME[0] = "North America"
//
// - MAP, MAP_NAME : 
//   - List of Map IDs and its names
//   - ex.) MAP.SKELD = 0, MAP_NAME[0] = "The Skeld"
//
// - ACTION, ACTION_NAME : 
//   - List of Action IDs and its names
//   - ex.) ACTION.JOINED = 0, ACTION_NAME[0] = "Joined"
//
// - GAMEOVER_REASON, GAMEOVER_REASON_NAME
//   - List of Reason IDs of the Game Over Event and its descriptions
//   - ex.) GAMEOVER_REASON.CREWMATES_BY_VOTE = 0, GAMEOVER_REASON_NAME[0] = "🗳️ Voting off the last Imposter"
//
// - ROLE, ROLE_NAME
//   - List of Event IDs and its names
//   - ex.) ROLE.CREWMATE = 0, ROLE_NAME[0] = "Crewmate"

// Useful Functions: 
// - Implementing functions with reserved name can handle events easily
// - Unnecessary functions can be safely removed

// Initializer called very first of the whole of scripts.
// Used to initialize something in the page.
function Initializer() { }

// GenericMessageHandler will be called once per any types of message or event received from AUCapture.
// This will be called once per every message.
// Args:
//   payload: {
//     EventID: (Int) Event ID of the data
//     EventData: Raw event data as JSON Strings, have to be parsed like JSON.parse(payload.EventData)
//   }
function GenericMessageHandler(payload) { }

// GenericStateEventHandler will be called once per every state change event received from AUCapture..
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args:
//   payload: {
//     NewState: (Int) State ID
//   }
function GenericStateEventHandler(payload) { }

// GameStartHandler will be called when the state has changed from LOBBY to TASKS,
// means start of the new game..
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args:
//   payload: {
//     NewState: (Int) State ID, always 1 (means TASKS)
//   }
function GameStartHandler(payload) { }

// StateLobbyEventHandler will be called when entered LOBBY.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 0 (means LOBBY)
//   }
function StateLobbyEventHandler(payload) { }

// StateTasksEventHandler will be called when entered TASKS.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 1 (means TASKS)
//   }
function StateTasksEventHandler(payload) { }

// StateDiscussionEventHandler will be called when entered DISCUSSION.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 2 (means DISCUSSION)
//   }
function StateDiscussionEventHandler(payload) { }

// StateDiscussionEventHandler will be called when entered MENU.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 3 (means MENU)
//   }
function StateMenuEventHandler(payload) { }

// StateDiscussionEventHandler will be called when entered GAMEOVER screen.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// that displays "VICTORY" or "DEFEAT", and "PLAY AGAIN", "Quit".
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 4 (means GAMEOVER)
//   }
function StateGameOverEventHandler(payload) { }

// StateDiscussionEventHandler will be called when entered UNKNOWN state usually never used.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: {
//     NewState: (Int) State ID, always 5 (means UNKNOWN)
//   }
function StateUnknownEventHandler(payload) { }

// StateDiscussionEventHandler will be called when the state event includes unexpected State ID.
// This will be called after updating GAME.NEW_STATE and GAME.OLD_STATE global variable.
// Args: 
//   payload: Unpredictable, depends on the event
function StateDefaultEventHandler(payload) { }

// GenericPlayerEventHandler will be called once per every event about players received from AUCapture..
// This will be called after updating PLAYERS global variable.
// Args:
//   payload: {
//     Action: (Int) Action ID
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function GenericPlayerEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the new player joined in the game.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 0 (means JOINED)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerJoinedEventHandler(payload) { }

// PlayerLeftEventHandler will be called when the existing player left from the game.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 1 (means LEFT)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerLeftEventHandler(payload) { }

// PlayerDiedEventHandler will be called when the exisiting player died in the game.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 2 (means DIED)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerDiedEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the existing player changed the color.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 3 (means CHANGEDCOLOR)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerChangedColorEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the forcibly update is invoked for the one of the existing player.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 4 (means FORCEUPDATED)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerForceUpdatedEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the existing player disconnected from the game.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 5 (means DISCONNECTED)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerDisconnectedEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the existing player exiled by voting in the game.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: {
//     Action: (Int) Action ID, always 6 (means EXILED)
//     Name: (String) Player's in-game name
//     Color: (Int) Color ID
//     IsDead: (Bool) true or false, true means the player is dead
//     Disconnected: (Bool) true or false, true means the player is disconnected
//   }
function PlayerExiledEventHandler(payload) { }

// PlayerJoinedEventHandler will be called when the event about player includes unexpected Action ID.
// This will be called after updating PLAYERS global variable.
// Args: 
//   payload: Unpredictable, depends on the event
function PlayerDefaultEventHandler(payload) { }

// LobbyInfoHandler will be called when the new information about Lobby has received.
// This will be called after updating GAME.REGION, GAME.MAP, and GAME.LOBBY_CODE global variable.
// Args: 
//   payload: {
//     LobbyCode: (String) Lobby code
//     Region: (Int) Region ID
//     Map: (Int) Map ID
//   }
function LobbyInfoHandler(payload) { }

// GameOverInfoHandler will be called when the game is over and returned to the LOBBY or MENU,
// means require click "PLAY AGAIN" or "QUIT" on game over screen.
// This will be called after updating GAMEOVER global variable.
// Args: 
//   payload: {
//     GameOverReason: (Int) Reason ID of the Game Over event
//     PlayerInfos: [
//       {
//         Name: (String) Player's Name
//         IsImposter: (Bool) true or false, true means the player is Imposter
//       },
//       { ... },
//       { ... },
//     ]
//   }
function GameOverInfoHandler(payload) { }
