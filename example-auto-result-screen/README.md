# (Example) Automatic Result Screen

![Result Screen](https://github.com/kurokobo/blob-storage/blob/main/amongus-overlay/example-auto-result-screen.gif)

The Result Screen includes players who won the game, roles, and events in the game, etc.

![Result Screen](https://user-images.githubusercontent.com/2920259/118368479-2b130a00-b5dd-11eb-8949-aa98286ca7cb.png)

## How this works

AmongUsOverlay automatically generates the HTML to display the summary of the last game by creating a template by specifying specific classes or IDs in the HTML tag.

In this example, a template with the following tags automatically completes the result screen.

Result screen (`#auto_result_container`) will be displayed only when you click `PLAY AGAIN` or `QUIT` on `Victory/Defeat` screen and be removed after timeout that specified in `config.js`.

```html
<div id="auto_result_container">
    <div id="timer"><span id="auto_result_timer"></span></div>

    <h1>
        🏆 <span class="auto_winrole"></span> won by
        <span class="auto_reason"></span>
    </h1>
    <p class="players">
        <span class="auto_winplayers"></span>
    </p>

    <h1>🤢 <span class="auto_loserole"></span></h1>
    <p class="players">
        <span class="auto_loseplayers"></span>
    </p>

    <h1>⏲️ Timelines</h1>
    <ul id="auto_timeline_html">

    </ul>
    <template id="auto_timeline_tmpl">
        <li class="auto_timeline_root">
            🕙 <span class="auto_timeline_time"></span> <span class="auto_timeline_event"></span>
        </li>
    </template>

    <div id="footer">
        Start: <span class="auto_starttime"></span>,
        End: <span class="auto_endtime"></span>,
        Lasted: <span class="auto_duration"></span>
    </div>
</div>
```

## Ideas to Customize This Example

* Replace `../common/assets/background.png` with your own image
* Change the layout using `css/custom.css`
* Change the timeout in seconds in `config.js`

## OBS Configuration for This Example

| Key | Value |
|-|-|
| Source | Browser |
| URL | `http://localhost:42080/example-auto-result-screen/` |
| Width | `1280` |
| Height | `720` |
