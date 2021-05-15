const auto_players = {
    // Set true if you want to always display specific colors in your Auto Players screen
    fixed: false,

    // Required if fixed is configured as true.
    // Specify Colors that you want to display. Players will be displayed in the order of this list.
    //colors: [
    //   "Red",
    //   "Green",
    //   "Blue",
    //   "Black",
    //],

    // Specify delay in seconds that player's image will be updated when entered discussion.
    // Seems 5 is the best.
    update_delay_on_discuss: 5,

    // Specify images path if you want to use your own image
    //assets = {
    //    black: {
    //        alive: "../common/assets/aublack.png",
    //        dead: "../common/assets/aublackdead.png",
    //    },
    //    blue: {
    //        alive: "../common/assets/aublack.png",
    //        dead: "../common/assets/aublackdead.png",
    //    },
    //    <color-name:> {
    //        alive: "<path>",
    //        dead: "<path>",
    //    },
    //}
},

const auto_state = {
    // Specify delay in seconds that HTML object with "only_discussion" class will be displayed.
    // Seems 5 is the best.
    update_delay_on_discuss: 5,
},

const auto_result = {
    // Set timeout in seconds to hide Result Screen
    timeout: 30,
},

// Define your own variables here.
// Since it's just JavaScript,
// you can write this any way you want in JavaScript syntax,
// but typically hash tables are useful.
// The variable name does not even have to be "config".
const config = {
    // hoge: "fuga",
    // foo: {
    //     bar: true,
    //     baz: 42,
    // },
}
