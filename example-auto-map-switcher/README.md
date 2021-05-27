# (Example) Automatic Map Switcher

![Map Switcher](https://github.com/kurokobo/blob-storage/blob/main/amongus-overlay/example-auto-map-switcher.gif)

## How this works

AmongUsOverlay allows you to specify a specific class for any tags in HTML, and make that tag visible only in a specific phase and specific map.

In this example, the following tag makes the `<div>` and `<img>` visible only in the specific phase in specific map.

```html
<!-- Mini map for lobby and tasks-->
<div class="per_state only_lobby only_tasks map_mini">
    <img class="per_map only_skeld" src="assets/skeld.png">
    <img class="per_map only_mira" src="assets/mira.png">
    <img class="per_map only_polus" src="assets/polus.png">
    <img class="per_map only_airship" src="assets/airship.png">
</div>

<!-- Large map for discussion-->
<div class="per_state only_discussion map_full">
    <img class="per_map only_skeld" src="assets/skeld-full.png">
    <img class="per_map only_mira" src="assets/mira-full.png">
    <img class="per_map only_polus" src="assets/polus-full.png">
    <img class="per_map only_airship" src="assets/airship-full.png">
</div>
```

## Ideas to Customize This Example

* Replace `assets/*.png` with your own image
* Change the size and layout of the images c `css/custom.css`

## OBS Configuration for This Example

| Key | Value |
|-|-|
| Source | Browser |
| URL | `http://localhost:42080/example-auto-map-switcher/` |
| Width | `1920` |
| Height | `1080` |
