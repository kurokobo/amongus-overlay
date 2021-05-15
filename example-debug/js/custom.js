function GenericMessageHandler(payload) {
    Logger(payload.EventID + ": " + payload.EventData)
}

function Logger(msg) {
    document.getElementById("log").value = msg + "\n" + document.getElementById("log").value
}
