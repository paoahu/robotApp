import pkg from 'johnny-five'
const { Board, Servos } = pkg

const ottoServosStop = () => {

    return new Promise((resolve, reject) => {
        const board = new Board()

        board.on("ready", () => {
            const servos = new Servos([2, 3, 4, 5]);

            // Servo alternate constructor with options
            /*
            var servo = new five.Servo({
              id: "MyServo",     // User defined id
              pin: 10,           // Which pin is it attached to?
              type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
              range: [0,180],    // Default: 0-180
              fps: 100,          // Used to calculate rate of movement between positions
              invert: false,     // Invert all specified positions
              startAt: 90,       // Immediately move to a degree
              center: true,      // overrides startAt if true and moves the servo to the center of the range
            });
            */

            // Add servo to REPL (optional)
            board.repl.inject({
                servos
            })


            // Servo API

            // min()
            //
            // set the servo to the minimum degrees
            // defaults to 0
            //
            // eg. servo.min();

            // max()
            //
            // set the servo to the maximum degrees
            // defaults to 180
            //
            // eg. servo.max();

            // center()
            //
            // centers the servo to 90°
            //
            // servo.center();

            // to( deg )
            //
            // Moves the servo to position by degrees
            //
            // servo.to( 90 );

            // step( deg )
            //
            // step all servos by deg
            //
            // eg. array.step( -20 );

            //servo.sweep()
            servos.stop()

            resolve(servos)
        })

        board.on("error", error => {
            console.error('Board initialization failed:', error.message)
            reject(error); //rechaza la promesa
        })


    })

}

export default ottoServosStop