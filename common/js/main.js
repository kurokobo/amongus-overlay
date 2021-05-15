const GAME = {
    NEW_STATE: STATE.UNKNOWN,
    OLD_STATE: STATE.UNKNOWN,
    REGION: "N/A",
    MAP: "N/A",
    LOBBY_CODE: "N/A",
    PROGRESS: PROGRESS.READY,
}

const GAMEOVER = {
    REASON: GAMEOVER_REASON.UNKNOWN,
    WIN_ROLE: ROLE.UNKNOWN,
    LOSE_ROLE: ROLE.UNKNOWN,
    WIN_PLAYERS: ["N/A"],
    LOSE_PLAYERS: ["N/A"],
    CREWMATES: ["N/A"],
    IMPOSTERS: ["N/A"],
    PLAYERS: {},
    START: new Date(0),
    END: new Date(0),
    DURATION: 0,
    EVENTS: [],
    EXILED: [],
}

let PLAYERS = {}
let TEMP_EXILED_PLAYER_COLOR_ID = null

let AUTO_PLAYERS_FIXED = false
let AUTO_PLAYERS_COLORS = []
let AUTO_PLAYERS_DELAY_DISCUSS = 5
let AUTO_PLAYERS_ASSETS = DEFAULT_ASSETS

let AUTO_RESULT_TIMEOUT = 15
let AUTO_STATE_DELAY_DISCUSS = 5

function main() {
    if (typeof Initializer === "function") {
        Initializer()
    }

    if (typeof auto_players !== "undefined") {
        if (auto_players.fixed) {
            AUTO_PLAYERS_FIXED = true
            AUTO_PLAYERS_COLORS = auto_players.colors
        }
        if (auto_players.update_delay_on_discuss) {
            AUTO_PLAYERS_DELAY_DISCUSS = auto_players.update_delay_on_discuss
        }
        if (auto_players.assets) {
            AUTO_PLAYERS_ASSETS = auto_players.assets
        }
    }
    if (typeof auto_result !== "undefined") {
        if (auto_result.timeout) {
            AUTO_RESULT_TIMEOUT = auto_result.timeout
        }
    }
    if (typeof auto_state !== "undefined") {
        if (auto_state.update_delay_on_discuss) {
            AUTO_STATE_DELAY_DISCUSS = auto_state.update_delay_on_discuss
        }
    }

    CommonRedrawAllAutoPlayers()
    CommonUpdateAllAutoFill()
    CommonHideAllDom()

    const ws = new ReconnectingWebSocket(ENDPOINT);
    ws.onopen = function (event) {
        console.log("OPEN")
    };
    ws.onerror = function (error) {
        console.log(error.data)
    };
    ws.onmessage = function (event) {
        CommonMessageHandler(JSON.parse(event.data))
    };
    ws.onclose = function () {
        console.log("CLOSE")
    };
}

function CommonMessageHandler(payload) {
    // payload {
    //     EventID: (Int) Event ID
    //     EventData: (String) JSON String of the event
    // }
    console.log(`${EVENT_MAME[payload.EventID]}: ${payload.EventData}`)

    if (typeof GenericMessageHandler === "function") {
        GenericMessageHandler(payload)
    }

    switch (payload.EventID) {
        case EVENT.STATE:
            // payload.EventData: {
            //     NewState: (Int) State ID
            // }
            CommonStateEventHandler(JSON.parse(payload.EventData))
            break
        case EVENT.PLAYER:
            // payload.EventData: {
            //   Action: (Int) Action ID
            //   Name: (String) Player's in-game name
            //   Color: (Int) Color ID
            //   IsDead: (Bool) Player is dead or not
            //   Disconnected: (Bool) Player is disconnected or not
            // }
            CommonPlayerEventHandler(JSON.parse(payload.EventData))
            break
        case EVENT.LOBBY:
            // payload.EventData: {
            //   LobbyCode: (String) Lobby code
            //   Region: (Int) Region ID
            //   Map: (Int) Map ID
            // }
            CommonLobbyInfoHandler(JSON.parse(payload.EventData))
            break
        case EVENT.GAMEOVER:
            // payload.EventData: {
            //   GameOverReason: (Int) Reason ID of the Game Over event
            //   PlayerInfos: [
            //     {
            //       Name: (String) Player's Name
            //       IsImposter: (Bool) Player is Imposter or not
            //     },
            //     { ... },
            //     { ... },
            //   ]
            // }
            CommonGameOverInfoHandler(JSON.parse(payload.EventData))
    }
}

function CommonStateEventHandler(payload) {
    GAME.OLD_STATE = GAME.NEW_STATE
    GAME.NEW_STATE = payload.NewState
    console.log(`STATE: ${STATE_NAME[GAME.NEW_STATE]} (${GAME.NEW_STATE}) changed from ${STATE_NAME[GAME.OLD_STATE]} (${GAME.OLD_STATE}) `)

    if (CommonCheckInvalidStateTransition(GAME.OLD_STATE, GAME.NEW_STATE)) {
        console.log(`STATE: Invalid transition is detected, will ignore it`)
        return
    }

    kv = {
        auto_oldstate: STATE_NAME[GAME.OLD_STATE],
        auto_newstate: STATE_NAME[GAME.NEW_STATE],
    }
    for (const key in kv) {
        CommonUpdateAutoFill(key, kv[key])
    }

    CommonChangeDomVisibility("state", GAME.NEW_STATE)

    if (typeof GenericStateEventHandler === "function") {
        GenericStateEventHandler(payload)
    }

    switch (GAME.NEW_STATE) {
        case STATE.LOBBY:
            CommonForceReviveAllAutoPlayers()
            CommonRedrawAllAutoPlayers()
            if (typeof StateLobbyEventHandler === "function") {
                StateLobbyEventHandler(payload)
            }
            break
        case STATE.TASKS:
            CommonAddGameEvent(EVENT.STATE, payload)
            if (GAME.OLD_STATE == STATE.LOBBY) {
                CommonGameStartHandler()
                if (typeof GameStartHandler === "function") {
                    GameStartHandler()
                }
            } else if (GAME.OLD_STATE == STATE.DISCUSSION) {
                CommonMarkExiledAsDead()
            }
            CommonRedrawAllAutoPlayers()
            if (typeof StateTasksEventHandler === "function") {
                StateTasksEventHandler(payload)
            }
            break
        case STATE.DISCUSSION:
            CommonAddGameEvent(EVENT.STATE, payload)
            setTimeout(function () {
                CommonRedrawAllAutoPlayers()
            }, AUTO_PLAYERS_DELAY_DISCUSS * 1000)
            if (typeof StateDiscussionEventHandler === "function") {
                StateDiscussionEventHandler(payload)
            }
            break
        case STATE.MENU:
            CommonRedrawAllAutoPlayers()
            if (typeof StateMenuEventHandler === "function") {
                StateMenuEventHandler(payload)
            }
            break
        case STATE.GAMEOVER:
            CommonRedrawAllAutoPlayers()
            if (typeof StateGameOverEventHandler === "function") {
                StateGameOverEventHandler(payload)
            }
            break
        case STATE.UNKNOWN:
            CommonRedrawAllAutoPlayers()
            if (typeof StateUnknownEventHandler === "function") {
                StateUnknownEventHandler(payload)
            }
            break
        default:
            CommonRedrawAllAutoPlayers()
            if (typeof StateDefaultEventHandler === "function") {
                StateDefaultEventHandler(payload)
            }
            break
    }
}

function CommonPlayerEventHandler(payload) {
    console.log(`PLAYER: ${ACTION_NAME[payload.Action]}`)

    switch (payload.Action) {
        case ACTION.LEFT:
            if (payload.Color in PLAYERS) {
                delete PLAYERS[payload.Color]
            }
            break
        case ACTION.CHANGEDCOLOR:
            for (let key in PLAYERS) {
                if (PLAYERS[key].Name == payload.Name) {
                    delete PLAYERS[key]
                    break
                }
            }
            PLAYERS[payload.Color] = {
                Name: payload.Name,
                Color: payload.Color,
                IsDead: payload.IsDead,
                Disconnected: payload.Disconnected,
            }
            break
        case ACTION.EXILED:
            PLAYERS[payload.Color] = {
                Name: payload.Name,
                Color: payload.Color,
                IsDead: payload.IsDead,
                Disconnected: payload.Disconnected,
            }
            TEMP_EXILED_PLAYER_COLOR_ID = payload.Color
            break
        default:
            PLAYERS[payload.Color] = {
                Name: payload.Name,
                Color: payload.Color,
                IsDead: payload.IsDead,
                Disconnected: payload.Disconnected,
            }
    }

    if (typeof GenericPlayerEventHandler === "function") {
        GenericPlayerEventHandler(payload)
    }

    switch (payload.Action) {
        case ACTION.JOINED:
            CommonRedrawAllAutoPlayers()
            if (typeof PlayerJoinedEventHandler === "function") {
                PlayerJoinedEventHandler(payload)
            }
            break
        case ACTION.LEFT:
            if (!AUTO_PLAYERS_FIXED) {
                CommonRemoveAutoPlayerDom(payload)
            }
            CommonRedrawAllAutoPlayers()
            if (typeof PlayerLeftEventHandler === "function") {
                PlayerLeftEventHandler(payload)
            }
            break
        case ACTION.DIED:
            CommonAddGameEvent(EVENT.PLAYER, payload)
            if (typeof PlayerDiedEventHandler === "function") {
                PlayerDiedEventHandler(payload)
            }
            break
        case ACTION.CHANGEDCOLOR:
            CommonRedrawAllAutoPlayers()
            if (typeof PlayerChangedColorEventHandler === "function") {
                PlayerChangedColorEventHandler(payload)
            }
            break
        case ACTION.FORCEUPDATED:
            if (typeof PlayerForceUpdatedEventHandler === "function") {
                PlayerForceUpdatedEventHandler(payload)
            }
            break
        case ACTION.DISCONNECTED:
            CommonAddGameEvent(EVENT.PLAYER, payload)
            CommonAddClassAutoPlayerDom(payload, "status_disconnected")
            if (typeof PlayerDisconnectedEventHandler === "function") {
                PlayerDisconnectedEventHandler(payload)
            }
            break
        case ACTION.EXILED:
            CommonAddGameEvent(EVENT.PLAYER, payload)
            CommonAddClassAutoPlayerDom(payload, "status_exiled")
            if (typeof PlayerExiledEventHandler === "function") {
                PlayerExiledEventHandler(payload)
            }
            break
        default:
            if (typeof PlayerDefaultEventHandler === "function") {
                PlayerDefaultEventHandler(payload)
            }
            break
    }
}

function CommonLobbyInfoHandler(payload) {
    GAME.REGION = payload.Region
    GAME.MAP = payload.Map
    GAME.LOBBY_CODE = payload.LobbyCode

    kv = {
        auto_region: REGION_NAME[GAME.REGION],
        auto_map: MAP_NAME[GAME.MAP],
        auto_lobbycode: GAME.LOBBY_CODE,
    }
    for (const key in kv) {
        CommonUpdateAutoFill(key, kv[key])
    }

    CommonChangeDomVisibility("map", GAME.MAP)
    if (typeof LobbyInfoHandler === "function") {
        LobbyInfoHandler(payload)
    }
}

function CommonGameOverInfoHandler(payload) {

    GAMEOVER.REASON = payload.GameOverReason

    if (GAMEOVER.REASON == GAMEOVER_REASON.CREWMATES_BY_VOTE
        || GAMEOVER.REASON == GAMEOVER_REASON.CREWMATES_BY_TASK
        || GAMEOVER.REASON == GAMEOVER_REASON.CREWMATES_BY_DISCONNECT) {
        GAMEOVER.WIN_ROLE = ROLE.CREWMATE
        GAMEOVER.LOSE_ROLE = ROLE.IMPOSTER
    } else {
        GAMEOVER.WIN_ROLE = ROLE.IMPOSTER
        GAMEOVER.LOSE_ROLE = ROLE.CREWMATE
    }

    GAMEOVER.PLAYERS = PLAYERS
    GAMEOVER.IMPOSTERS = []
    GAMEOVER.CREWMATES = []
    GAMEOVER.WIN_PLAYERS = []
    GAMEOVER.LOSE_PLAYERS = []

    for (const player of payload.PlayerInfos) {
        if (player.IsImpostor && GAMEOVER.WIN_ROLE == ROLE.IMPOSTER) {
            GAMEOVER.IMPOSTERS.push(player.Name)
            GAMEOVER.WIN_PLAYERS.push(player.Name)
        } else if (player.IsImpostor && GAMEOVER.WIN_ROLE == ROLE.CREWMATE) {
            GAMEOVER.IMPOSTERS.push(player.Name)
            GAMEOVER.LOSE_PLAYERS.push(player.Name)
        } else if (!player.IsImpostor && GAMEOVER.WIN_ROLE == ROLE.IMPOSTER) {
            GAMEOVER.CREWMATES.push(player.Name)
            GAMEOVER.LOSE_PLAYERS.push(player.Name)
        } else {
            GAMEOVER.CREWMATES.push(player.Name)
            GAMEOVER.WIN_PLAYERS.push(player.Name)
        }
    }

    GAME.PROGRESS = PROGRESS.READY
    GAMEOVER.END = new Date()
    GAMEOVER.DURATION = GAMEOVER.END - GAMEOVER.START

    kv = {
        auto_reason: GAMEOVER_REASON_NAME[GAMEOVER.REASON],
        auto_winrole: ROLE_NAME[GAMEOVER.WIN_ROLE],
        auto_loserole: ROLE_NAME[GAMEOVER.LOSE_ROLE],
        auto_winplayers: GAMEOVER.WIN_PLAYERS.join(", "),
        auto_loseplayers: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_crewmates: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_imposters: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_starttime: CommonFormatDate(GAMEOVER.START),
        auto_endtime: CommonFormatDate(GAMEOVER.END),
        auto_duration: CommonFormatDuration(GAMEOVER.DURATION),
    }
    for (const key in kv) {
        CommonUpdateAutoFill(key, kv[key])
    }
    CommonUpdateAutoFillGameEvents()

    const container = document.querySelector('#auto_result_container')
    if (container != null) {
        container.style.display = null
        if (AUTO_RESULT_TIMEOUT != -1) {
            CommonHideAutoResultContainer(AUTO_RESULT_TIMEOUT)
        }
    }

    if (typeof GameOverInfoHandler === "function") {
        GameOverInfoHandler(payload)
    }
}

function CommonCheckInvalidStateTransition(oldState, newState) {
    switch (newState) {
        case STATE.LOBBY:
            switch (oldState) {
                case STATE.TASKS:
                case STATE.DISCUSSION:
                    return true
                default:
                    return false
            }
        default:
            return false
    }
}

function CommonHideAutoResultContainer(timeout) {
    const container = document.querySelector("#auto_result_container")
    const timer = document.querySelector("#auto_result_timer")
    if (container != null) {
        const start = new Date()
        const end = new Date(start.getTime() + timeout * 1000)

        let count = timeout;
        const interval = setInterval(function () {
            count--
            if (timer != null) {
                timer.innerText = count
            }
            now = new Date();
            if (now.getTime() >= end.getTime()) {
                clearInterval(interval);
                container.style.display = "none"
            }
        }, 1000);
    }
}

function CommonChangeDomVisibility(type, id) {
    let baseClass
    let classes
    let delay = 0
    switch (type) {
        case "state":
            baseClass = "per_state"
            classes = STATE_CLASS
            if (id == STATE.DISCUSSION) {
                delay = AUTO_STATE_DELAY_DISCUSS
            }
            break
        case "map":
            baseClass = "per_map"
            classes = MAP_CLASS
            break
    }
    targetClass = classes[id]
    if (targetClass != null) {
        elements = document.getElementsByClassName(baseClass)
        Array.prototype.forEach.call(elements, function (element) {
            if (element.classList.contains(targetClass)) {
                if (delay == 0) {
                    element.style.display = null
                } else {
                    setTimeout(function () {
                        element.style.display = null
                    }, delay * 1000)
                }
            } else if (!element.classList.contains(targetClass)) {
                element.style.display = "none"
            }
        })
    }
}

function CommonHideAllDom() {
    elements = document.querySelectorAll(".per_state, .per_map, #auto_result_container")
    if (elements != null) {
        Array.prototype.forEach.call(elements, function (element) {
            element.style.display = "none"
        })
    }
}

function CommonUpdateAutoFill(className, value) {
    elements = document.getElementsByClassName(className)
    Array.prototype.forEach.call(elements, function (element) {
        element.innerText = value
    })
}

function CommonUpdateAllAutoFill() {
    kv = {
        auto_progress: PROGRESS_NAME[GAME.PROGRESS],
        auto_oldstate: STATE_NAME[GAME.OLD_STATE],
        auto_newstate: STATE_NAME[GAME.NEW_STATE],
        auto_region: REGION_NAME[GAME.REGION],
        auto_map: MAP_NAME[GAME.MAP],
        auto_lobbycode: GAME.LOBBY_CODE,
        auto_reason: GAMEOVER_REASON_NAME[GAMEOVER.REASON],
        auto_winrole: ROLE_NAME[GAMEOVER.WIN_ROLE],
        auto_loserole: ROLE_NAME[GAMEOVER.LOSE_ROLE],
        auto_winplayers: GAMEOVER.WIN_PLAYERS.join(", "),
        auto_loseplayers: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_crewmates: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_imposters: GAMEOVER.LOSE_PLAYERS.join(", "),
        auto_starttime: CommonFormatDate(GAMEOVER.START),
        auto_endtime: CommonFormatDate(GAMEOVER.END),
        auto_duration: CommonFormatDuration(GAMEOVER.DURATION),
    }
    for (const key in kv) {
        CommonUpdateAutoFill(key, kv[key])
    }
}

function CommonForceReviveAllAutoPlayers() {
    for (let key in PLAYERS) {
        PLAYERS[key].IsDead = false
        PLAYERS[key].Disconnected = false
    }
}

function CommonRedrawAllAutoPlayers() {
    const root = document.getElementById("auto_players_html")
    if (root != null) {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (AUTO_PLAYERS_FIXED) {
            for (let colorName of AUTO_PLAYERS_COLORS) {
                let player = PLAYERS[COLOR[colorName.toUpperCase()]]
                if (player == null) {
                    player = {
                        Name: "-",
                        Color: COLOR[colorName.toUpperCase()],
                        IsDead: false,
                        Disconnected: false,
                    }
                    PLAYERS[COLOR[colorName.toUpperCase()]] = player
                }
                CommonRedrawAutoPlayerDom(player)
            }
        } else {
            for (const key in PLAYERS) {
                CommonRedrawAutoPlayerDom(PLAYERS[key])
            }
        }
    }
}

function CommonRedrawAutoPlayerDom(player) {
    const colorName = COLOR_NAME[player.Color].toLowerCase()
    const root = document.querySelector(`#root-${colorName}`)
    if (root != null) {
        const img = document.querySelector(`#img-${colorName}`)
        if (img != null) {
            if (player.IsDead || player.Disconnected) {
                root.classList.remove("liveness_alive")
                root.classList.add("liveness_dead")
                img.src = AUTO_PLAYERS_ASSETS[colorName]["dead"]
            } else {
                root.classList.remove("liveness_dead")
                root.classList.add("liveness_alive")
                img.src = AUTO_PLAYERS_ASSETS[colorName]["alive"]
            }
        }
    } else {
        CommonAddAutoPlayerDom(player)
    }
}

function CommonAddAutoPlayerDom(player) {
    const colorName = COLOR_NAME[player.Color].toLowerCase()
    const root = document.querySelector('#auto_players_html')
    if (root != null) {
        const tmpl = document.querySelector("#auto_players_tmpl").content;
        const fragment = document.createDocumentFragment();

        const clone = document.importNode(tmpl, true);
        const auto_root = clone.querySelector(".auto_player_root")
        const auto_img = clone.querySelector(".auto_player_img")
        const auto_name = clone.querySelector(".auto_player_name")

        auto_root.id = `root-${colorName}`
        if (player.IsDead || player.Disconnected) {
            auto_root.classList.add("liveness_dead")
            auto_img.src = AUTO_PLAYERS_ASSETS[colorName]["dead"]
        } else {
            auto_root.classList.add("liveness_alive")
            auto_img.src = AUTO_PLAYERS_ASSETS[colorName]["alive"]
        }
        auto_img.id = `img-${colorName}`
        auto_name.id = `name-${colorName}`
        auto_name.innerText = player.Name

        fragment.appendChild(clone);
        root.appendChild(fragment);
    }
}

function CommonRemoveAutoPlayerDom(player) {
    const colorName = COLOR_NAME[player.Color].toLowerCase()
    const root = document.querySelector(`#root-${colorName}`)
    if (root != null) {
        root.remove()
    }
}

function CommonAddClassAutoPlayerDom(player, className) {
    const colorName = COLOR_NAME[player.Color].toLowerCase()
    const root = document.querySelector(`#root-${colorName}`)
    if (root != null) {
        root.classList.add(className)
    }
}

function CommonGameStartHandler() {
    GAME.PROGRESS = PROGRESS.IN_GAME
    GAMEOVER.START = new Date()
    GAMEOVER.END = new Date(0)
    GAMEOVER.EVENTS = []
    GAMEOVER.EXILED = []
    kv = {
        auto_progress: PROGRESS_NAME[GAME.PROGRESS],
    }
    for (const key in kv) {
        CommonUpdateAutoFill(key, kv[key])
    }
}

function CommonAddGameEvent(type, payload) {
    if (GAME.PROGRESS == PROGRESS.READY) {
        return
    }

    const time = Math.abs(GAMEOVER.START - new Date())
    let event = null
    let css = null

    switch (type) {
        case EVENT.STATE:
            switch (payload.NewState) {
                case STATE.TASKS:
                    event = `🔨 ${STATE_NAME[payload.NewState]}`
                    css = "event_tasks"
                    break
                case STATE.DISCUSSION:
                    event = `💬 ${STATE_NAME[payload.NewState]}`
                    css = "event_discussion"
                    break
            }
            break
        case EVENT.PLAYER:
            switch (payload.Action) {
                case ACTION.DIED:
                    if (!GAMEOVER.EXILED.includes(payload.Name)) {
                        event = `🔪 ${payload.Name} ${ACTION_NAME[payload.Action]}`
                        css = "event_kill"
                    }
                    break
                case ACTION.DISCONNECTED:
                    event = `🔌 ${payload.Name} ${ACTION_NAME[payload.Action]}`
                    css = "event_disconnect"
                    break
                case ACTION.EXILED:
                    GAMEOVER.EXILED.push(payload.Name)
                    event = `⛔ ${payload.Name} ${ACTION_NAME[payload.Action]}`
                    css = "event_exile"
                    break
            }
            break
    }
    if (event != null) {
        gameEvent = {
            Time: time,
            Event: event,
            Class: css,
        }
        GAMEOVER.EVENTS.push(gameEvent)
    }
}

function CommonFormatDate(date) {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hour = `0${date.getHours()}`.slice(-2)
    const minute = `0${date.getMinutes()}`.slice(-2)
    const second = `0${date.getSeconds()}`.slice(-2)

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

function CommonFormatDuration(duration) {
    const minutes = Math.floor(duration / 60000)
    duration -= minutes * 60000
    const seconds = `0${Math.floor(duration / 1000)}`.slice(-2)

    return `${minutes}:${seconds}`;
}

function CommonUpdateAutoFillGameEvents() {
    const root = document.querySelector('#auto_timeline_html')
    if (root != null) {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }

        const tmpl = document.querySelector("#auto_timeline_tmpl").content;
        const fragment = document.createDocumentFragment();

        for (const event of GAMEOVER.EVENTS) {
            const clone = document.importNode(tmpl, true);
            const auto_root = clone.querySelector(".auto_timeline_root")
            const auto_time = clone.querySelector(".auto_timeline_time")
            const auto_event = clone.querySelector(".auto_timeline_event")

            auto_root.classList.add(event.Class)
            auto_time.innerText = CommonFormatDuration(event.Time)
            auto_event.innerText = event.Event

            fragment.appendChild(clone);
        }
        root.appendChild(fragment);
    }
}

function CommonMarkExiledAsDead() {
    PLAYERS[TEMP_EXILED_PLAYER_COLOR_ID].IsDead = true
    TEMP_EXILED_PLAYER_COLOR_ID = null
}

main()
