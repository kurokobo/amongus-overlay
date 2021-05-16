# (Example) Automatic Player Status

![Player Status](https://media.githubusercontent.com/media/kurokobo/storage/main/amongus-overlay/example-auto-player-status.gif)

## How this works

AmongUsOverlay automatically generates the HTML to display the player status by creating a template by specifying specific classes or IDs in the HTML tag.

In this example, a template with the following tags automatically completes the list of players.

To avoid spoilers, dead players will be updated after you enter the discussion.

```html
<!-- Template for Per-Player Status -->
<ul id="auto_players_html"></ul>
<template id="auto_players_tmpl">
    <li class="auto_player_root">
        <img class="auto_player_img"><br>
        <span class="auto_player_name"></span>
    </li>
</template>
```

## Configurable features

AmongUsOverlay has two modes called **Fixed** and **Dynamic** to display players' status.

![Fixed Mode](https://media.githubusercontent.com/media/kurokobo/storage/main/amongus-overlay/example-auto-player-status-fixed.gif)

![Dynamic Mode](https://media.githubusercontent.com/media/kurokobo/storage/main/amongus-overlay/example-auto-player-status-dynamic.gif)

This can be changed in `config.js`. See the comments in `config.js` for the detail.

## Ideas to Customize This Example

* Place your own images as `assets/*.png` and point those images in `config.js` (See comments in `config.js`)
* Change the layout of the players using `css/custom.css`
* Change the mode in `config.js`

## OBS Configuration for This Example

| Key | Value |
|-|-|
| Source | Browser |
| URL | `http://localhost:42080/example-auto-result-screen/` |
| Width | `150 * <# of Players>` |
| Height | `240` |
