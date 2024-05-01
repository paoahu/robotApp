import pkg from 'johnny-five'
const { Board, Servo, LCD, Pin, Piezo } = pkg

const FORWARD = 1
const BACKWARD = -1
const LEFT = 1
const RIGHT = -1

function delay(ms) {
    return new Promise(resolve => {
        console.log(`Waiting ${ms} milliseconds...`)
        setTimeout(() => {
            console.log("Wait over, continuing with the next action.")
            resolve()
        }, ms)
    })
}

async function firstPart(ottoInstance) {

    if (!ottoInstance) {
        throw new Error("Otto is not initialized")
    }

    let steps = 8
    let T = 1000
    let h = 30
    let dir = 1
    let tempo = 1000



    console.log("Otto is preparing to dance first part")


    const servoLeftLeg = new Servo(2)
    const servoRightLeg = new Servo(3)
    const servoLeftFoot = new Servo(4)
    const servoRightFoot = new Servo(5)



    servoLeftLeg.to(50)
    servoRightLeg.to(130)
    servoLeftFoot.to(70)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(50)
    servoRightLeg.to(130)
    servoLeftFoot.to(50)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(130)
    servoLeftFoot.to(50)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 1000))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(110)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(110)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(90)
    servoRightFoot.to(90)



    await new Promise(resolve => setTimeout(resolve, 500))

    const angleStartLeft = dir === LEFT ? 90 - h : 90 + h
    const angleStartRight = dir === LEFT ? 90 + h : 90 - h
    const angleEndLeft = dir === LEFT ? 90 + h / 2 : 90 - h / 2
    const angleEndRight = dir === LEFT ? 90 - h / 2 : 90 + h / 2

    for (let currentStep = 0; currentStep < steps; currentStep++) {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(angleStartLeft)
            servoRightFoot.to(angleStartRight)
        } else {
            servoLeftFoot.to(angleEndLeft)
            servoRightFoot.to(angleEndRight)
        }
        await new Promise(resolve => setTimeout(resolve, T / steps))
    }


    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 1000))

    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(30)

    await new Promise(resolve => setTimeout(resolve, 2000))

    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))

    ottoInstance.oscillators.forEach((oscillator, index) => {
        const isRightLeg = index % 2 !== 0
        oscillator.setParameters({
            amplitude: isRightLeg ? 20 : 40,
            period: 600,
            phase: isRightLeg ? Math.PI / 2 : 0,
            offset: 90
        })
        oscillator.start()
    })


    await new Promise(resolve => setTimeout(resolve, 2000))

    ottoInstance.oscillators.forEach(oscillator => oscillator.stop())

    await new Promise(resolve => setTimeout(resolve, 500))

    let movements = [
        { right: 50, left: 70 },
        { right: 80, left: 70 },
        { right: 30, left: 70 },
        { right: 80, left: 70 },
        { right: 30, left: 70 },
        { right: 80, left: 70 }
    ]


    for (let movement of movements) {
        servoRightLeg.to(movement.right)
        servoLeftLeg.to(movement.left)
        await delay(tempo / 4)
    }

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(50)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(120)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(50)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(50)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(120)
    servoRightFoot.to(50)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(120)
    servoRightFoot.to(50)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(150)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(90)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))

    const positions = [
        { leftFoot: 120, rightFoot: 140 },
        { leftFoot: 140, rightFoot: 140 },
        { leftFoot: 120, rightFoot: 140 },
        { leftFoot: 90, rightFoot: 90 }
    ]

    tempo = 2000


    for (const position of positions) {
        const servoLeftFoot = new Servo(4)
        const servoRightFoot = new Servo(5)
        servoLeftFoot.to(position.leftFoot)
        servoRightFoot.to(position.rightFoot)


        await delay(tempo)
    }

    await new Promise(resolve => setTimeout(resolve, 500))


    let currentStep = 0
    steps = 4
    T = 1000

    const intervalId = setInterval(() => {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(0)
            servoRightFoot.to(180)
        } else {
            servoLeftFoot.to(180)
            servoRightFoot.to(0)
        }
        currentStep++

        if (currentStep >= steps) {
            clearInterval(intervalId)

            servoLeftFoot.to(90)
            servoRightFoot.to(90)

            console.log("UpDown movement completed")
        }
    }, T / steps)


    await new Promise(resolve => setTimeout(resolve, 2000))


    steps = 2
    let period = 2000


    ottoInstance.oscillators.forEach((oscillator, index) => {
        const isLeg = index < 2
        const adjustment = isLeg ? 0 : 5
        const phaseAdjustment = Math.PI + (isLeg ? 0 : Math.PI / 4)

        oscillator.setParameters({
            amplitude: 20 + adjustment,
            period: 1000,
            phase: phaseAdjustment,
            offset: 90
        })
        oscillator.start()
    })


    await new Promise(resolve => setTimeout(() => {
        ottoInstance.oscillators.forEach(oscillator => oscillator.stop())
        resolve()
    }, period * steps))




    await new Promise(resolve => setTimeout(resolve, 500))

    steps = 10
    T = 2000
    h = 70
    dir = 1

    currentStep = 0
    const angleIncrement = h / 2
    const baseAngle = 90

    const moveFeet = () => {
        const angleOffset = (currentStep % 2 === 0) ? angleIncrement : -angleIncrement
        const leftFootAngle = dir === LEFT ? baseAngle - angleOffset : baseAngle + angleOffset
        const rightFootAngle = dir === LEFT ? baseAngle + angleOffset : baseAngle - angleOffset

        servoLeftFoot.to(leftFootAngle)
        servoRightFoot.to(rightFootAngle)

        currentStep++
    }

    for (let i = 0; i < steps; i++) {
        setTimeout(moveFeet, (T / steps) * i)
    }


    await new Promise(resolve => setTimeout(resolve, 500))


    steps = 4
    T = 1000
    h = 40

    const angleUp = 90 + h
    const angleDown = 90 - h

    for (let currentStep = 0; currentStep < steps; currentStep++) {
        if (currentStep % 2 === 0) {
            servoLeftFoot.to(angleUp)
            servoRightFoot.to(angleUp)
        } else {
            servoLeftFoot.to(angleDown)
            servoRightFoot.to(angleDown)
        }
        await new Promise(resolve => setTimeout(resolve, T / steps));
    }



    await new Promise(resolve => setTimeout(resolve, 500))

    servoLeftLeg.to(50)
    servoRightLeg.to(130)
    servoLeftFoot.to(70)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(50)
    servoRightLeg.to(130)
    servoLeftFoot.to(50)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(130)
    servoLeftFoot.to(50)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(100)

    await new Promise(resolve => setTimeout(resolve, 1000))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(90)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(100)
    servoRightLeg.to(90)
    servoLeftFoot.to(70)
    servoRightFoot.to(110)

    await new Promise(resolve => setTimeout(resolve, 500))


    servoLeftLeg.to(90)
    servoRightLeg.to(90)
    servoLeftFoot.to(90)
    servoRightFoot.to(90)







    console.log("Otto has danced")




}

export default firstPart