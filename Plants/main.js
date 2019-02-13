window.onload = function () {
    /* #region TODO: */
    /*  Add main area of code that actually will run
        Consider more interactions
        Consider sunlight when making calculations
        Make a simple GUI to show what is happening
        Make a way for the game to increment (1/sec)
        Add a way to control speeds (0-9 ticks per second)
        FANCY: Add a way to control speeds (10^(1-num) ticks per second)*/
    /* #endregion */
    /* #region COMPLETED: */
    /*  Finish construction of GameEngine
        Add key reading
        Figure out how to do update rates(ticks per second)
            Map setup
        Structure of plants
        Construction of plants
        Construction of dirt
        Construction of water
        Construction of base types
        Plant spawning variablility
        Plant death
        Plant update
        Plant dirt interactions
        Added randomoizers for dirt and water*/
    /* #endregion */
    /* #region Constants */
    var displayTime = false;
    var lastPlant;
    var gameRunning = true;
    var gamePause = true;
    var instruct = "Some helpful instructions\n\'i\' for all plants info(fat)\nOnce all plants die the final plant alive will display it's info\n\'h\' will reprint these instructions\nnumbers to control game speed\n\'spacebar\' will toggle pause\nArrow keys are for manual control\n\'r\' will restart the current map\n\'t\' to toggle the tock display\n\'d\' to displaya current game tocks\nnumpad keys to change stage\n\'c\' to clear the console\nLeft click on spaces to see the object information.\n\'n\' will load a new map based on step increment (1-10) (arrow keys)";
    var stepIncrement = 1;
    var currentMap;
    const mapHeight = 13;
    const mapWidth = 13;
    const mapOffsetX = 0;
    const mapOffsetY = 25;
    const mapIncrementX = 50;
    const mapIncrementY = 50;
    var currentGameSpeed = 1;
    const mult = 2;
    const gameSpeed = [Math.pow(mult,0),Math.pow(mult,1),Math.pow(mult,2),Math.pow(mult,3),Math.pow(mult,4)
                      ,Math.pow(mult,5),Math.pow(mult,6),Math.pow(mult,7),Math.pow(mult,8),Math.pow(mult,9)]//Ticks per second

    const gePlacement = {
        dirt: 0,
        water: 1,
        plant: 2,
        key: 3
    }
    const mapPlacement = {
        dirt: 0,
        water: 1,
        plant: 2,
        misc: 3
    }
    /* #endregion */
    /* #region Map/Stage */
    function Stage() {
        this.mapComplexity = 3;
        /* #region Maps Large */
        this.mapLarge = //13x13
            [
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]]
            ]
        this.dirt1Large =
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]

        this.water1Large =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
            ]
        this.water2Large =
        [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water3Large =
        [
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0]
        ]
        this.water4Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
        ]
        this.water5Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water6Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water7Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water8Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water9Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water10Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.water11Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant1Large =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        this.plant2Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        ]
        this.plant3Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant4Large =
        [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
        ]
        this.plant5Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant6Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plantLarge =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant82Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant9Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant10Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plant11Large =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.plantSingleLarge =
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        this.defaultBlankLarge =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        /* #endregion */
        /* #region Maps Small */
        this.mapSmall = //5x5
            [
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]],
                [[{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }], [{/*dirt*/ }, {/*water*/ }, {/*plant*/ }, { occupied: true/*Misc: Occupied?*/ }]]
            ]
        this.dirtSmall1 =
            [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1]
            ];
        this.waterSmall1 =
            [
                [0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]
        this.plantSmall1 =
            [
                [0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0]
            ];
        this.plantSmallSingle =
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0]
            ];
        this.defaultBlankSmall =
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
        /* #endregion */

        /* #region Premade map []s */
        this.mapSet = [];
        this.mapSet.push(//0
            [this.mapLarge,
            this.dirt1Large,
            this.water1Large,
            this.plant1Large]
        );
        this.mapSet.push(//1
            [this.mapLarge,
            this.dirt1Large,
            this.water2Large,
            this.plant2Large]
        );
        this.mapSet.push(//2
            [this.mapLarge,
            this.dirt1Large,
            this.water3Large,
            this.plant3Large]
        );
        this.mapSet.push(//3
            [this.mapLarge,
            this.dirt1Large,
            this.water4Large,
            this.plant4Large]
        );
        this.mapSet.push(//4
            [this.mapLarge,
            this.dirt1Large,
            this.water2Large,
            this.plant4Large]
        );
        this.mapSet.push(//5
            [this.mapLarge,
            this.dirt1Large,
            this.water1Large,
            this.plant3Large]
        );
        this.mapSet.push(//6
            [this.mapLarge,
            this.dirt1Large,
            this.water4Large,
            this.plant2Large]
        );
        this.mapSet.push(//7
            [this.mapLarge,
            this.dirt1Large,
            this.water3Large,
            this.plant1Large]
        );
        this.mapSet.push(//8
            [this.mapLarge,
            this.dirt1Large,
            this.water1Large,
            this.plant2Large]
        );
        this.mapSet.push(//9
            [this.mapLarge,
            this.dirt1Large,
            this.water11Large,
            this.plant11Large]
        );
        /* #endregion */
    }
    Stage.prototype.createMap = function (theMap = [[[[]]], [[]], [[]], [[]]]) {
        let i = 0, j = 0;
        let pla;
        let dirt = theMap[1];
        let water = theMap[2];
        let plant = theMap[3];
        theMap = theMap[0];
        for (i in theMap) {
            for (j in theMap[i]) {
                if (dirt[i][j] === 1) {
                    placeUnit(cloneDirt(dirtBaseType), theMap, { x: j, y: i }, gePlacement.dirt);
                    theMap[i][j][mapPlacement.misc].occupied = false;
                }
                if (water[i][j] === 1) {
                    placeUnit(cloneWater(waterBaseType), theMap, { x: j, y: i }, gePlacement.water);
                    theMap[i][j][mapPlacement.misc].occupied = true;
                }
                if (plant[i][j] === 1 && !theMap[i][j][mapPlacement.misc].occupied) {
                    pla = placeUnit(clonePlant(plantBaseType), theMap, { x: j, y: i }, gePlacement.plant);
                    theMap[i][j][mapPlacement.misc].occupied = true;
                    pla.color['R'] = (255 / mapWidth) * j;
                    pla.color['G'] = ((255 / mapWidth) * j * i) % 255;
                    pla.color['B'] = (255 / mapWidth) * i;
                }
                j++;
            }
            j = 0;
            i++;
        }
    }
    /* #endregion */
    /* #region Key Controls */
    /* #region Key Control Manager */
    var keyControlArr = [];
    keyControlOnce = false;
    keyControlCount = 0;
    function KeyControlManager() {
    }
    KeyControlManager.prototype.addListener = function (obj) {
        keyControlArr[keyControlCount++] = obj;
    }
    KeyControlManager.prototype.removeListener = function (obj) {
        this.KeyControlManager.keyControlArr[this.KeyControlManager.keyControlArr.indexOf] = null;
    }
    KeyControlManager.prototype.updateAll = function () {
        for (a in keyControlArr) {
            keyControlArr[a].update();
        }
    }
    KeyControlManager.prototype.update = function () {
        this.updateAll();
    }
    KeyControlManager.prototype.onKey = function (key) {
        for (a in keyControlArr) {
            if (!keyControlOnce) {
                keyControlArr[a].onDownFunc(key);
            }
            keyControlArr[a].key = key;
            keyControlArr[a].keyIn = true;
        }
        if (!keyControlOnce) { keyControlOnce = !keyControlOnce; }
    }
    KeyControlManager.prototype.offKey = function (key) {
        for (a in keyControlArr) {
            if (keyControlOnce) {
                keyControlArr[a].onUpFunc(key);
            }
            keyControlArr[a].key = key;
            keyControlArr[a].keyIn = false;
        }
        if (keyControlOnce) { keyControlOnce = !keyControlOnce; }
    }
    /* #endregion */
    /* #region Key Control */
    function KeyControl(onDown, onUp, onStillDown) {
        this.onDown = onDown;
        this.onUp = onUp;
        this.onStillDown = onStillDown;
        //this.obj = obj;
        this.key = "z";
        this.keyIn = false;
        this.keyNew = true;
    }
    KeyControl.prototype.update = function () {
        //Somehow update key things
        if (this.keyIn) {
            this.stillDownFunc(this.key);
        }
    }
    KeyControl.prototype.onDownFunc = function (tKey) {
        this.onDown(tKey);
    }
    KeyControl.prototype.onUpFunc = function (tKey) {
        this.onUp(tKey);
    }
    KeyControl.prototype.stillDownFunc = function (tKey) {
        if (typeof this.onStillDown === 'function') {
            this.onStillDown(tKey);
        }
    }
    /* #endregion */
    /* #endregion */
    /* #region Game Engine */
    function GameEngine() {
        this.totalTicks = 0;
        this.unitArr = [[/*dirt*/], [/*water*/], [/*plants*/], [/*key manager*/]];
        this.keyMan = {};
        this.rainTime = 3000;
        this.rainAmount = 70; //240 * this number
        this.raining = false;
    }
    GameEngine.prototype.updateAll = function () {
        if ((this.totalTicks % currentGameSpeed === 0) && displayTime) {
            console.clear();
            console.log("Current game speed trying to be " + currentGameSpeed + " ticks per second");
            console.log("Tick tock " + this.totalTicks);
        }
        //if (displayTime) { console.log("Tick Tock " + this.totalTicks) };
        if (this.totalTicks > 50) {
            let gameCehck = false;
            let gamecuont = 0;
            for (o in this.unitArr[2]) {
                if (this.unitArr[2][o] !== null) {
                    gameCehck = true;
                    gamecuont++;
                }
            }
            if (gamecuont === 1){
                for (o in this.unitArr[2]) {
                    if (this.unitArr[2][o] !== null) {
                        lastPlant = this.unitArr[2][o];
                    }
                }
            }
            gameRunning = gameCehck;
            if (!gameRunning) {
                console.log(lastPlant);
                console.log(currentMap[0][lastPlant.mapPos.y][lastPlant.mapPos.x][0])
            }
        }
        
        this.totalTicks++;
        CONTEXT.fillStyle = "grey";
        CONTEXT.fillRect(mapOffsetX, 0, 650, 700 - mapIncrementY - mapOffsetY);
        if (this.totalTicks % this.rainTime === 0 || this.raining){
            this.raining = true;
            for (c in this.unitArr[gePlacement.dirt]){
                if (typeof this.unitArr[gePlacement.dirt][c].resourceTotal !== 'undefined'){
                    this.unitArr[gePlacement.dirt][c].chaos += randomSign()/100;
                    this.unitArr[gePlacement.dirt][c].resourceTotal += this.rainAmount * (this.unitArr[gePlacement.dirt][c].chaos) * Math.random();
                }
                
            }
        }
        if ((this.totalTicks - 240) % this.rainTime === 0){this.raining = false;}
        let a;
        for (a in this.unitArr) {
            for (b in this.unitArr[a]) {
                if (!(this.unitArr[a][b] === null) && typeof this.unitArr[a][b] === 'object' && typeof this.unitArr[a][b].update !== 'undefined') {
                    this.unitArr[a][b].update();
                    if (!(this.unitArr[a][b] === null) && typeof this.unitArr[a][b] === 'object' && typeof this.unitArr[a][b].draw !== 'undefined') {
                        this.unitArr[a][b].draw();
                    }
                }
            }
        }
        
    }
    GameEngine.prototype.keyDown = function (key) {
        //console.log("Key Pressed: " + key.which);
        if (key.which >= 48 && key.which <= 57) {//numbers
            currentGameSpeed = gameSpeed[key.which - 48];
        }
        if (key.which >= 96 && key.which <= 105) {//numpad
            selectMap(key.which - 96);
        }
        switch (key.which) {
            case 32: //Spacebar
                gamePause = !gamePause;
                (gamePause) ? console.log('Pause') : console.log("Unpause");
                break;
            case 37: //left arrow
                console.log("Step forward once");
                GE.updateAll();
                break;
            case 38: //up arrow
                stepIncrement++;
                console.log("Manual step increment = " + stepIncrement);
                break;
            case 39: //right arrow
                let p = 0;
                console.log("Step forward " + stepIncrement + " times");
                while (p < stepIncrement) {
                    p++;
                    GE.updateAll();}
                break;
            case 40: //down arrow
                stepIncrement--;
                if (stepIncrement < 1) { stepIncrement = 1; }
                console.log("Manual step increment = " + stepIncrement);
                break;
            case 72: //h
                console.log(instruct);
                break;
            case 82: //r
                restartMap();
                break;
            case 84: //t
                displayTime = !displayTime;
                break;
            case 68: //d
                console.log("Current game time is " + GE.totalTicks);
                break;
            case 67: //c
                console.clear();
                break;
            case 73: //i
                let anArr = [];
                for (n in GE.unitArr[gePlacement.plant]){
                    if (GE.unitArr[gePlacement.plant][n] !== null) {
                        anArr.push(GE.unitArr[gePlacement.plant][n]);
                    }
                }
                console.log(anArr);
                break;
            case 78:
                selectMap(stepIncrement%10);
                break;
        }
    }
    GameEngine.prototype.keyUp = function (key) {
    }
    GameEngine.prototype.addUnit = function (unit = {}, arrNum = 0) {
        this.unitArr[arrNum].push(unit);
    }
    GameEngine.prototype.removeUnit = function (unit = {}, arrNum = 0) {
        this.unitArr[arrNum][this.unitArr[arrNum].indexOf(unit)] = null;
    }
    GameEngine.prototype.removeAll = function () {
        this.unitArr = [[/*dirt*/], [/*water*/], [/*plants*/], [/*key manager*/]];
        this.totalTicks = 0;
    }
    GameEngine.prototype.onClick = function (e){
        let xPos = e.clientX;
        let yPos = e.clientY;
        let aCount = bCount = 0;
        if (xPos > 0 && yPos > 0 && yPos < mapIncrementY*mapHeight + mapOffsetY && xPos < mapIncrementX*mapWidth + mapOffsetX){
            while (aCount < mapHeight){
                while(bCount < mapWidth){
                    if (xPos > mapOffsetX + mapIncrementX * bCount &&
                        xPos < mapOffsetX + mapIncrementX * (bCount + 1) &&
                        yPos > mapOffsetY + mapIncrementY * (aCount - .5) &&
                        yPos < mapOffsetY + mapIncrementY * (aCount + .5)) {
                            console.log(currentMap[0][aCount][bCount][0]);
                            (typeof currentMap[0][aCount][bCount][1].splashCount === 'undefined') 
                            ? console.log(currentMap[0][aCount][bCount][2]) 
                            : console.log(currentMap[0][aCount][bCount][1]);
                        }


                    bCount++;
                }
                bCount = 0;
                aCount++;
            }
            aCount = 0;
        }
    }
    /* #endregion */
    /* #region Placing and cloning */
    function placeUnit(unit, map, mapPos, type) {
        map[mapPos.y][mapPos.x][type] = unit;
        if (type > 0) {
            map[mapPos.y][mapPos.x][mapPlacement.misc].occupied = true;
        }
        unit.updateLocation(map, mapPos);
        GE.addUnit(unit, type);
        return unit;
    }
    function removeUnit(unit, type) {
        unit.map[unit.mapPos.y][unit.mapPos.x][type] = null;
        if (type === mapPlacement.plant) {
            unit.map[unit.mapPos.y][unit.mapPos.x][mapPlacement.misc].occupied = false;
        }
        GE.removeUnit(unit, type);
    }
    function clonePlant(plant = {}) {
        let plant2 = new Plant();
        plant2.map = plant.map;
        plant2.mapPos.x = plant.mapPos.x;
        plant2.mapPos.y = plant.mapPos.y;
        plant2.localPos = calculateLocals(plant2.mapPos);
        plant2.growStr = plant.growStr;
        plant2.age = plant.age;
        plant2.consumptionRate = plant.consumptionRate;
        plant2.decayRate = plant.decayRate;
        plant2.depthReach = plant.depthReach;
        plant2.resourceAmount = plant.resourceAmount;
        plant2.height = plant.height;
        plant2.color['R'] = plant.color['R'];
        plant2.color['G'] = plant.color['G'];
        plant2.color['B'] = plant.color['B'];
        plant2.spawnTime = plant.spawnTime;
        plant2.spawnCount = plant.spawnCount;
        plant2.chaosResist = plant.chaosResist;
        plant2.chaos = plant.chaos;
        return plant2;
    }
    function cloneWater(water) {
        let map = water.map;
        let mapPos = water.mapPos;
        let water2 = new Water(map, mapPos);
        water2.map = map;
        water2.mapPos.x = water.mapPos.x;
        water2.mapPos.y = water.mapPos.y;
        water2.localPos = calculateLocals(mapPos);
        water2.radius = water.radius;
        water2.dropOff = water.dropOff;
        water2.waterRate = water.waterRate;
        water2.splashRate = water.splashRate;
        return water2;
    }
    function cloneDirt(dirt) {
        let dirt2 = new Dirt();
        dirt2.map = dirt.map;
        dirt2.mapPos.x = dirt.mapPos.x;
        dirt2.mapPos.y = dirt.mapPos.y;
        dirt2.naturalShade = dirt.naturalShade;
        dirt2.resourceTotal = dirt.resourceTotal;
        dirt2.resourceDepth = dirt.resourceDepth;
        dirt2.growDifficulty = dirt.growDifficulty;
        dirt2.chaos = dirt.chaos;
        return dirt2;
    }
    /* #endregion */
    /* #region Plant */
    function Plant(map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.ax;
        this.ay;
        this.map = map;
        this.mapPos = mapPos;
        this.dirt = map[mapPos.y][mapPos.x][mapPlacement.dirt];
        this.localPos = calculateLocals(mapPos);
        this.localValid = [];
        this.heritage = [];
        this.growStr = 0;
        this.age = 0;
        this.consumptionRate = 0;
        this.decayRate = 0;
        this.depthReach = 0;
        this.resourceAmount = 0;
        this.resourcePeak = 0;
        this.height = 0;
        this.spawnCost = 0;
        this.color = { 'R': 0, 'G': 0, 'B': 0 };
        this.spawnTime = 0;
        this.currentSpawnTime = 0;
        this.spawnCount = 0;
        this.totalSpawnCount = 0;
        this.chaosResist = 0;
        this.chaos = 0;
    }
    Plant.prototype.updateLocation = function (map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.map = map
        this.mapPos = mapPos;
        this.mapPos.x = parseInt(mapPos.x);
        this.mapPos.y = parseInt(mapPos.y);
        this.ax = parseInt(mapPos.x);
        this.ay = parseInt(mapPos.y);
        this.dirt = map[mapPos.y][mapPos.x][mapPlacement.dirt];
        this.localPos = calculateLocals(mapPos);
    }
    Plant.prototype.validateLocals = function () {
        for (i in this.localPos) {
            if (this.localPos[i].x >= 0 && this.localPos[i].x < mapWidth
                && this.localPos[i].y >= 0 && this.localPos[i].y < mapHeight
                && !this.map[this.localPos[i].y][this.localPos[i].x][mapPlacement.misc].occupied) {
                this.localValid[i] = i;
            } else {
                this.localValid[i] = -1;
            }
            i++
        }
    }
    Plant.prototype.spawnPlant = function () {

        let isValid = false;
        let i = 0, spawns = 0, guess, tol = 0;
        while (spawns < Math.floor(this.spawnCount)) {
            isValid = false;
            tol += 0.5;
            this.validateLocals();
            while (i < 8) {
                if (this.localValid[i] >= 0) {
                    isValid = true;
                    break;
                }
                i++;
            }
            i = 0;
            if (!isValid) { this.spawnCostCalc(spawns); return; }
            guess = Math.abs(Math.random() * 8);
            while (i < 8) {
                if (this.localValid[i] >= 0 && Math.abs(this.localValid[i] - guess) < tol) {
                    this.spawnOffspring(this.localPos[i]);
                    spawns++;
                    this.totalSpawnCount++;
                }
                i++
            }
            i = 0;
        }
        this.spawnCostCalc(spawns);
    }
    Plant.prototype.spawnCostCalc = function (count) {
        //Remove resources based on spawns
        switch (count) {
            case 0:
                this.resourceAmount = this.resourceAmount * (1 - .1);
                break;
            case 1:
                this.resourceAmount = this.resourceAmount * (1 - .5);
                break;
            case 2:
                this.resourceAmount = this.resourceAmount * (1 - .6);
                break;
            case 3:
                this.resourceAmount = this.resourceAmount * (1 - .65);
                break;
            case 4:
                this.resourceAmount = this.resourceAmount * (1 - .7);
                break;
            case 5:
                this.resourceAmount = this.resourceAmount * (1 - .8);
                break;
            case 6:
                this.resourceAmount = this.resourceAmount * (1 - .85);
                break;
            case 7:
                this.resourceAmount = this.resourceAmount * (1 - .9);
                break;
            case 8:
                this.resourceAmount = this.resourceAmount * (1 - .98);
                break;
        }
        this.resourceAmount -= this.spawnCost;
    }
    Plant.prototype.spawnOffspring = function (pos) {
        let plant2 = new Plant(this.map, pos);
        //Alter plant based on chaos and heritage and soil
        for (h in this.heritage) {
            plant2.heritage.push(this.heritage[h]);
        }
        plant2.heritage.push(this);
        let chaosCalc = this.chaos / (1 + this.chaosResist);
        plant2.dirt = this.map[pos.y][pos.x][mapPlacement.dirt];

        plant2.growStr = Math.abs(this.growStr + randomSign() * chaosCalc);
        plant2.resourceAmount = 25;
        plant2.consumptionRate = Math.abs(this.consumptionRate + randomSign() * chaosCalc / 2 + plant2.growStr * Math.random() / 2);
        plant2.decayRate = Math.abs(this.decayRate + randomSign() * chaosCalc / 2 + plant2.growStr * Math.random() / 2);
        plant2.depthReach = this.depthReach + randomSign() * chaosCalc / 10 + (5 - plant2.growStr) * Math.random() / 2;
        plant2.spawnTime = this.spawnTime + Math.random() * chaosCalc * 10 - plant2.consumptionRate * Math.random() + plant2.growStr * Math.random() / 2;
        plant2.spawnTime = Math.abs(plant2.spawnTime);

        plant2.spawnCount = this.spawnCount + randomSign() * chaosCalc / 10 + plant2.growStr * Math.random() / 10;
        plant2.spawnCost = this.spawnCost + randomSign() * chaosCalc + plant2.growStr * Math.random() / 2;
        plant2.chaosResist = Math.abs(this.chaosResist + chaosCalc * Math.random() / 10 + plant2.depthReach * Math.random() / 10);
        plant2.chaos = this.chaos + (randomSign() * chaosCalc / 10 + plant2.consumptionRate * Math.random() / 10 + plant2.dirt.chaos * Math.random() / 10)/10;
        if (plant2.spawnCount > 8 || plant2.spawnCount <= 0) { plant2.spawnCount = Math.ceil(Math.abs(plant2.spawnCount / 2)); plant2.chaos++; }

        plant2.color['R'] = this.color['R'] + (randomSign() * chaosCalc * 2 + plant2.growStr)/1;
        if (plant2.color['R'] > 255){
            plant2.color['R'] = plant2.color['R'] - (plant2.color['R'] - 255);
        } else if (plant2.color['R'] < 0) {
            plant2.color['R'] = Math.abs(plant2.color['R']);
        }
        plant2.color['G'] = this.color['G'] + (randomSign() * chaosCalc * 2 + plant2.spawnTime / 30)/1;
        if (plant2.color['G'] > 255){
            plant2.color['G'] = plant2.color['G'] - (plant2.color['G'] - 255);
        } else if (plant2.color['G'] < 0) {
            plant2.color['G'] = Math.abs(plant2.color['G']);
        }
        plant2.color['B'] = this.color['B'] + (randomSign() * chaosCalc * 2 + plant2.depthReach * 10)/1;
        if (plant2.color['B'] > 255){
            plant2.color['B'] = plant2.color['B'] - (plant2.color['B'] - 255);
        } else if (plant2.color['B'] < 0) {
            plant2.color['B'] = Math.abs(plant2.color['B']);
        }

        placeUnit(plant2, this.map, pos, gePlacement.plant);
    }
    Plant.prototype.update = function () {

        let mathSubstitutePlant = 0;
        if (this.dirt.resourceTotal >= this.consumptionRate) {//Resource Gather
            this.dirt.resourceTotal -= this.consumptionRate;
            if (this.dirt.resourceDepth <= 0) { this.dirt.resourceDepth = 0.5; this.dirt.chaos++; }
            if (this.dirt.growDifficult < 0) { this.dirt.growDifficult = 0.5; this.dirt.chaos++; }
            if (this.depthReach <= 0) { this.depthReach = 3; this.chaos++; }
            mathSubstitutePlant = 1 + this.dirt.growDifficulty;
            mathSubstitutePlant = mathSubstitutePlant / (this.growStr / 2);
            mathSubstitutePlant = this.consumptionRate / mathSubstitutePlant;
            if (this.dirt.resourceDepth / this.depthReach > 1) {
                mathSubstitutePlant = mathSubstitutePlant / (this.dirt.resourceDepth / this.depthReach);
            }
            this.resourceAmount += mathSubstitutePlant;
        }
        mathSubstitutePlant = this.decayRate * (Math.random() + .2);
        this.resourceAmount -= mathSubstitutePlant;
        this.resourceAmount = Math.round(this.resourceAmount);
        this.resourcePeak = Math.max(this.resourceAmount, this.resourcePeak);
        this.age++;
        this.currentSpawnTime++;
        this.height += this.growStr / 100;
        this.decayRate += this.height / 400;

        if (this.currentSpawnTime >= this.spawnTime && this.resourceAmount > this.spawnCost) {
            this.currentSpawnTime = 0;

            this.spawnPlant();
        }
        if (this.resourceAmount <= 0) {

            this.death();


        }



    }
    Plant.prototype.death = function () {
        if (this.totalSpawnCount > 0) {
            this.dirt += this.resourcePeak * (1 / this.totalSpawnCount);
        } else {
            this.dirt += this.resourcePeak;
        }
        this.dirt.growDifficulty = this.dirt.growDifficulty / (1 + this.growStr / 20);
        this.dirt.resourceDepth = this.dirt.resourceDepth / (1 + (this.depthReach - 5) / 5);
        this.dirt.chaos *= 0.95;
        removeUnit(this, mapPlacement.plant);
    }
    Plant.prototype.draw = function () {
        CONTEXT.font = "28px Georgia";
        CONTEXT.fillStyle = "rgba(" + this.color['R'] + ", " + this.color['G'] + ", " + this.color['B'] + ", 1)";
        //CONTEXT.fillStyle = "rgba(0, 255, 0, 1)";
        CONTEXT.fillText("P", mapOffsetX + mapIncrementX * this.mapPos.x, mapOffsetY + mapIncrementY * this.mapPos.y);
    }
    /* #endregion */
    /* #region Dirt */
    function Dirt(map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.map = map;
        this.mapPos = mapPos;
        this.naturalShade = 0;
        this.resourceTotal = 0;
        this.resourceDepth = 0;
        this.growDifficulty = 0;
        this.chaos = 0;
    }
    Dirt.prototype.mixDirt = function () {
        this.chaos++;
        this.resourceTotal += this.chaos * randomSign() * 1500
        this.resourceDepth += this.chaos * randomSign() / 10;
        this.growDifficulty += this.chaos * randomSign() / 10;
    }
    Dirt.prototype.updateLocation = function (map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.map = map
        this.mapPos = mapPos;
        this.mapPos.x = parseInt(mapPos.x);
        this.mapPos.y = parseInt(mapPos.y);
        this.localPos = calculateLocals(mapPos);
    }
    Dirt.prototype.draw = function () {
        let alph = this.resourceTotal/(17000*2);
        alph = 1 - Math.pow(2.71, (-alph));
        if (alph > 1){alph = 1;}
        CONTEXT.fillStyle = "rgba(139, 69, 19, " + alph + ")";
        CONTEXT.fillRect(mapOffsetX + mapIncrementX * this.mapPos.x, mapOffsetY + mapIncrementY * (this.mapPos.y - 1),mapIncrementX,mapIncrementY);
        CONTEXT.font = "10px Georgia";
        CONTEXT.fillStyle = "rgba(255, 248, 220, 1)";
        //CONTEXT.fillText("X: " + this.mapPos.x + ",\nY: " + this.mapPos.y,mapOffsetX + mapIncrementX * this.mapPos.x + mapIncrementX / 2, mapOffsetY + mapIncrementY * (this.mapPos.y - 1) - mapIncrementY/2);
    }
    Dirt.prototype.update = function () {

    }
    /* #endregion */
    /* #region Water */
    function Water(map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.map = map;
        this.mapPos = mapPos;
        this.radius = 0;
        this.dropOff = 0;
        this.waterRate = 0;
        this.splashRate = 0;
        this.splashCount = 0;
        this.localPos = calculateLocals(mapPos);
        this.localValid = [];
    }
    Water.prototype.updateLocation = function (map = [[[]]], mapPos = { x: 0, y: 0 }) {
        this.map = map
        this.mapPos = mapPos;
        this.mapPos.x = parseInt(mapPos.x);
        this.mapPos.y = parseInt(mapPos.y);
        this.localPos = calculateLocals(mapPos);
        this.validateLocals();
    }
    Water.prototype.validateLocals = function () {
        for (i in this.localPos) {
            if (this.localPos[i].x >= 0 && this.localPos[i].x < mapWidth
                && this.localPos[i].y >= 0 && this.localPos[i].y < mapHeight) {
                this.localValid[i] = parseInt(i);
            } else {
                this.localValid[i] = -1;
            }
            i++
        }
    }
    Water.prototype.update = function () {
        let i = 0, check;
        this.splashCount++;
        while (i < 8) {
            if (this.localValid[i] >= 0) {
                if (this.map[this.localPos[i].y][this.localPos[i].x][mapPlacement.dirt] != {}) {
                    this.map[this.localPos[i].y][this.localPos[i].x][mapPlacement.dirt].resourceTotal += this.waterRate;
                    if (this.splashCount >= this.splashRate) {
                        this.map[this.localPos[i].y][this.localPos[i].x][mapPlacement.dirt].resourceDepth *= 0.97;
                        this.map[this.localPos[i].y][this.localPos[i].x][mapPlacement.dirt].growDifficulty *= 0.97;
                        this.splashCount = 0;
                    }
                }
            }
            i++;
        }
    }
    Water.prototype.draw = function () {
        CONTEXT.font = "28px Georgia";
        CONTEXT.fillStyle = "rgba(0,0,200, 1)";
        //CONTEXT.fillStyle = "rgba(0, 255, 0, 1)";
        CONTEXT.fillText("W", mapOffsetX + mapIncrementX * this.mapPos.x, mapOffsetY + mapIncrementY * this.mapPos.y);
    }
    /* #endregion */
    /* #region Misc */
    function randomSign() {
        let a, b, c;
        a = Math.random();
        b = a - 0.5;
        c = Math.sign(b);
        return c * Math.random();
    }
    function calculateLocals(mapPos = { x: 0, y: 0 }) {
        let ax = parseInt(mapPos.x);
        let by = parseInt(mapPos.y);
        return [{ x: ax - 1, y: by + 1 }, { x: ax, y: by + 1 }, { x: ax + 1, y: by + 1 },//[0] is top left then clockwise
        { x: ax - 1, y: by },/*Space for understanding    */ { x: ax + 1, y: by },
        { x: ax - 1, y: by - 1 }, { x: ax, y: by - 1 }, { x: ax + 1, y: by - 1 }];
    }
    function restartMap() {
        GE.removeAll();
        MS.createMap(currentMap);
        gameRunning = true;
    }
    function selectMap(num = 0) {
        GE.removeAll();
        currentMap = MS.mapSet[num];
        gameRunning = true;
        MS.createMap(currentMap);
    }
    const theUpdateFunction = {
        act: new function () { },
        isFunc: false
    }
    /* #endregion */
    /* #region Base types */
    const plantBaseType = new Plant();
    plantBaseType.growStr = 10;
    plantBaseType.consumptionRate = 5;
    plantBaseType.resourceAmount = 50;
    plantBaseType.decayRate = 3;
    plantBaseType.depthReach = 2;
    plantBaseType.spawnTime = 100;
    plantBaseType.spawnCount = 2;
    plantBaseType.spawnCost = 50;
    plantBaseType.chaosResist = 0.2;
    plantBaseType.chaos = 4;
    plantBaseType.color['R'] = 0;
    plantBaseType.color['G'] = 200;
    plantBaseType.color['B'] = 0;
    const dirtBaseType = new Dirt();
    dirtBaseType.naturalShade = 1;
    dirtBaseType.resourceTotal = 17000*1.5;
    dirtBaseType.resourceDepth = 3;
    dirtBaseType.growDifficulty = 2;
    dirtBaseType.chaos = 4;
    const waterBaseType = new Water();
    waterBaseType.radius = 1;
    waterBaseType.dropOff = 0;
    waterBaseType.waterRate = 10;
    waterBaseType.splashRate = 60;
    /* #endregion */
    /* #region Clock */
    function ClockTicks() {
        function tick() {
            var now = Date.now();
            let amount = 1000 / (currentGameSpeed) - (now % (1000 / currentGameSpeed));
            if (amount <= 0) {
                amount = Math.abs(10 * 1000);
            }
            if (!gamePause && currentGameSpeed > 0 && gameRunning) {
                (theUpdateFunction.isFunc) ? GE.updateAll() : 0;
            }
            setTimeout(tick, amount);
            
        }

        tick();
    }
    /* #endregion */
    /* #region Main */
    const CANVAS = document.getElementById("canvas");
    const CONTEXT = CANVAS.getContext("2d");
    const MS = new Stage();
    const GE = new GameEngine();
    theUpdateFunction.act = GE.updateAll();
    theUpdateFunction.isFunc = true;
    GE.keyMan = new KeyControlManager();
    GE.unitArr[gePlacement.key].push(GE.keyMan);
    GE.keyMan.addListener(new KeyControl(GE.keyDown, GE.keyUp));
    currentMap = [MS.mapLarge, MS.dirt1Large, MS.water1Large, MS.plant1Large];
    MS.createMap(currentMap);
    window.onkeyup = GE.keyMan.offKey;
    window.onkeydown = GE.keyMan.onKey;
    window.onmousedown = GE.onClick;

    /* #region Instructions */
    console.clear();
    console.log(instruct);
    console.log("Game is currently paused");
    CONTEXT.font = "30px Georgia"
    CONTEXT.fillStyle = "rgba(255, 248, 220, 1)"
    CONTEXT.fillText("Info will go here",720,100);
    /* #endregion */
    /* #region Ticks */
    ClockTicks();
    /* #endregion */
    /* #endregion */
}
