def calccost():
    global kw, hours, kwh, cost
    m = 0
    kw = WATTS / 1000
    hours = m / 60
    kwh = kw * hours
    cost = kwh * COSTPERKWH
    return cost
starttime = 0
totaltime = 0
endtime = 0
timing = False
cost = 0
kwh = 0
hours = 0
kw = 0
COSTPERKWH = 0
WATTS = 0
basic.show_string("C")
LIGHT = 114
WATTS = 1000
COSTPERKWH = 0.18
HYSTERESIS = 8
LIGHT += HYSTERESIS / 2
DARK = LIGHT - HYSTERESIS
reading = input.light_level()
basic.pause(1000)
displaying = True

def on_forever():
    if displaying:
        if timing:
            basic.show_leds("""
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                """)
        else:
            basic.show_leds("""
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                """)
basic.forever(on_forever)

def on_forever2():
    global reading, endtime, totaltime, timing, starttime
    reading = input.light_level()
    if reading < DARK:
        if timing:
            endtime = input.running_time()
            totaltime += endtime - starttime
            timing = False
    elif reading >= LIGHT:
        if not (timing):
            starttime = input.running_time()
            timing = True
basic.forever(on_forever2)
