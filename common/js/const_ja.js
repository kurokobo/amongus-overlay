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
    MAROON: 12,
    ROSE: 13,
    BANANA: 14,
    GRAY: 15,
    TAN: 16,
    SUNSET: 17,
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
    "Maroon",
    "Rose",
    "Banana",
    "Gray",
    "Tan",
    "Sunset",
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
    "ロビー",
    "タスク",
    "緊急会議",
    "メニュー",
    "ゲームオーバー",
    "不明",
]

const REGION = {
    NORTH_AMERICA: 0,
    ASIA: 1,
    EUROPE: 2,
}

const REGION_NAME = [
    "北米",
    "アジア",
    "ヨーロッパ",
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
    "参加",
    "離脱",
    "死亡",
    "色変更",
    "強制更新",
    "切断",
    "追放",
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
    "🗳️ 最後のインポスターを追放",
    "🔨 タスクを完了",
    "🗳️ 最後のクルーを追放",
    "🔪 最後のクルーをキル",
    "🚨 サボタージュ",
    "🔌 最後のクルーの切断",
    "🔌 最後のインポスターの切断",
    "❓ 不明",
]

const ROLE = {
    CREWMATE: 0,
    IMPOSTER: 1,
    UNKNOWN: 2,
}

const ROLE_NAME = [
    "クルー",
    "インポスター",
    "不明",
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
    "🟥 準備完了",
    "🟢 ゲーム中",
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
    maroon: {
        alive: "../common/assets/maroon.png",
        dead: "../common/assets/maroon-dead.png",
    },
    rose: {
        alive: "../common/assets/rose.png",
        dead: "../common/assets/rose-dead.png",
    },
    banana: {
        alive: "../common/assets/banana.png",
        dead: "../common/assets/banana-dead.png",
    },
    gray: {
        alive: "../common/assets/gray.png",
        dead: "../common/assets/gray-dead.png",
    },
    tan: {
        alive: "../common/assets/tan.png",
        dead: "../common/assets/tan-dead.png",
    },
    sunset: {
        alive: "../common/assets/sunset.png",
        dead: "../common/assets/sunset-dead.png",
    },
}
