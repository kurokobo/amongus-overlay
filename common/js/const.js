const ENDPOINT = "ws://localhost:42069/api"

const COLOR = {
    RED: 0,
    BLUE: 1,
    GREEN: 2,
    PINK: 3,
    ORANGE: 4,
    YELLOW: 5,
    BLACK: 6,
    WHITE: 7,
    PURPLE: 8,
    BROWN: 9,
    CYAN: 10,
    LIME: 11,
}

const COLOR_NAME = [
    "Red",
    "Blue",
    "Green",
    "Pink",
    "Orange",
    "Yellow",
    "Black",
    "White",
    "Purple",
    "Brown",
    "Cyan",
    "Lime",
]

const EVENT = {
    STATE: 0,
    PLAYER: 1,
    LOBBY: 2,
    GAMEOVER: 3,
}

const EVENT_MAME = [
    "STATE",
    "PLAYER",
    "LOBBY",
    "GAMEOVER",
]

const STATE = {
    LOBBY: 0,
    TASKS: 1,
    DISCUSSION: 2,
    MENU: 3,
    GAMEOVER: 4,
    UNKNOWN: 5,
}

const STATE_NAME = [
    "Lobby",
    "Tasks",
    "Discussion",
    "Menu",
    "Game Over",
    "Unknown",
]

const REGION = {
    NORTH_AMERICA: 0,
    ASIA: 1,
    EUROPE: 2,
}

const REGION_NAME = [
    "North America",
    "Asia",
    "Europe",
]

const MAP = {
    SKELD: 0,
    MIRA: 1,
    POLUS: 2,
    DLEKS: 3,
    AIRSHIP: 4,
}

const MAP_NAME = [
    "The Skeld",
    "MIRA HQ",
    "Polus",
    "ehT dlekS",
    "The Airship",
]

const ACTION = {
    JOINED: 0,
    LEFT: 1,
    DIED: 2,
    CHANGEDCOLOR: 3,
    FORCEUPDATED: 4,
    DISCONNECTED: 5,
    EXILED: 6,
}

const ACTION_NAME = [
    "Joined",
    "Left",
    "Died",
    "Changed Color",
    "Force Updated",
    "Disconnected",
    "Exiled",
]

const GAMEOVER_REASON = {
    CREWMATES_BY_VOTE: 0,
    CREWMATES_BY_TASK: 1,
    IMPOSTER_BY_VOTE: 2,
    IMPOSTER_BY_KILL: 3,
    IMPOSTER_BY_SABOTAGE: 4,
    IMPOSTER_BY_DISCONNECT: 5,
    CREWMATES_BY_DISCONNECT: 6,
    UNKNOWN: 7,
}

const GAMEOVER_REASON_NAME = [
    "🗳️ Voting off the last Imposter",
    "🔨 Completeng Tasks",
    "🗳️ Voteing off the last Crewmates",
    "🔪 Killing the last Crewmates",
    "🚨 Sabotage",
    "🔌 Disconnection of the last Crewmates",
    "🔌 Disconnection of the last Imposter",
    "❓ Unknown",
]

const ROLE = {
    CREWMATE: 0,
    IMPOSTER: 1,
    UNKNOWN: 2,
}

const ROLE_NAME = [
    "Crewmate",
    "Imposter",
    "Unknown",
]

const STATE_CLASS = [
    "only_lobby",
    "only_tasks",
    "only_discussion",
    "only_menu",
    "only_gameover"
]

const MAP_CLASS = [
    "only_skeld",
    "only_mira",
    "only_polus",
    "only_dleks",
    "only_airship"
]

const PROGRESS = {
    READY: 0,
    IN_GAME: 1,
}

const PROGRESS_NAME = [
    "🟥 READY",
    "🟢 IN GAME",
]

const DEFAULT_ASSETS = {
    black: {
        alive: "../common/assets/black.png",
        dead: "../common/assets/black-dead.png",
    },
    blue: {
        alive: "../common/assets/blue.png",
        dead: "../common/assets/blue-dead.png",
    },
    brown: {
        alive: "../common/assets/brown.png",
        dead: "../common/assets/brown-dead.png",
    },
    cyan: {
        alive: "../common/assets/cyan.png",
        dead: "../common/assets/cyan-dead.png",
    },
    green: {
        alive: "../common/assets/green.png",
        dead: "../common/assets/green-dead.png",
    },
    lime: {
        alive: "../common/assets/lime.png",
        dead: "../common/assets/lime-dead.png",
    },
    orange: {
        alive: "../common/assets/orange.png",
        dead: "../common/assets/orange-dead.png",
    },
    pink: {
        alive: "../common/assets/pink.png",
        dead: "../common/assets/pink-dead.png",
    },
    purple: {
        alive: "../common/assets/purple.png",
        dead: "../common/assets/purple-dead.png",
    },
    red: {
        alive: "../common/assets/red.png",
        dead: "../common/assets/red-dead.png",
    },
    white: {
        alive: "../common/assets/white.png",
        dead: "../common/assets/white-dead.png",
    },
    yellow: {
        alive: "../common/assets/yellow.png",
        dead: "../common/assets/yellow-dead.png",
    },
}
