function calccost () {
    let m = 0
    kw = WATTS / 1000
    hours = m / 60
    kwh = kw * hours
    cost = kwh * COSTPERKWH
    return cost
}
let starttime = 0
let totaltime = 0
let endtime = 0
let timing = false
let cost = 0
let kwh = 0
let hours = 0
let kw = 0
let COSTPERKWH = 0
let WATTS = 0
basic.showString("C")
let LIGHT = 114
WATTS = 1000
COSTPERKWH = 0.18
let HYSTERESIS = 8
LIGHT += HYSTERESIS / 2
let DARK = LIGHT - HYSTERESIS
let reading = input.lightLevel()
basic.pause(1000)
let displaying = true
basic.forever(function () {
    if (displaying) {
        if (timing) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . # . .
                . . # . .
                . . . . .
                . . . . .
                `)
        }
    }
})
basic.forever(function () {
    reading = input.lightLevel()
    if (reading < DARK) {
        if (timing) {
            endtime = input.runningTime()
            totaltime += endtime - starttime
            timing = false
        }
    } else if (reading >= LIGHT) {
        if (!(timing)) {
            starttime = input.runningTime()
            timing = true
        }
    }
})
