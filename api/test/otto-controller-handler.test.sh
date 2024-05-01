print_in_orange() {
  echo -e "\033[1;38;5;208m$1\033[0m"
}

print_in_yellow() {
  echo -e "\033[1;33m$1\033[0m"
}

function TEST() {
    print_in_yellow "TEST $1"
}

function CASE() {
  
  message="$*"
  print_in_orange "\n\nCASE $message"
}


walk_forward() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"walkForward"}'
    echo "Command to walk forward sent."
}

walk_backward() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"walkBackward"}'
    echo "Command to walk backward sent."
}

snake_move() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"snakeMove"}'
    echo "Command to turn right sent."
}

crusaito() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"crusaito"}'
    echo "Command to crusaito sent."
}

moonwalker() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"moonwalker"}'
    echo "Command to moonwalker sent."
}

stop() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"stop"}'
    echo "Command to stop sent."
}

endSequence() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"endSequence"}'
    echo "Command to endSequence sent."
}

executeSequenceById() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"executeSequenceById",  "sequenceId":"65e779b95ca9de5f2e0d0b44"}'
    echo "Command to executeSequenceById sent."
}

jump() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"jump"}'
    echo "Command to jump sent."
}

say_hi() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"sayHi", "message":"¡Hola, soy Otto!"}'
    echo "Command to say hi sent."
}

clear_lcd() {
    curl -X POST http://localhost:9000/arduino/controller/ottoController -H "Content-Type: application/json" -d '{"action":"clearLCD"}'
    echo "Command to clear LCD sent."
}


TEST "otto-controller"

CASE "success on otto controller"


while true; do
    read -p "Press 'w' to walk forward, 'b' to walk backward, 'r' to snake move, 's' to stop, 't' to crusaito, 'h' to say hi, 'c' to clear LCD,  'm' to moonwalk, 'e' to end sequence, 'q' to quit: " input
    case $input in
        [wW])
            echo "Walking forward..."
            walk_forward
            ;;
        [bB])
            echo "Walking backward..."
            walk_backward
            ;;
        [eE])
            echo "Saving sequence..."
            endSequence
            ;;

        [aA])
            echo "Reproducing sequence..."
            executeSequenceById
            ;;
        [rR])
            echo "Snake move..."
            snake_move
            ;;
        [jJ])
            echo "Jumping..."
            jump
            ;;
        [mM])
            echo "Moonwalk..."
            moonwalker
            ;;

        [tT])
            echo "Crusaito..."
            crusaito
            ;;

        [sS])
            echo "Stopping..."
            stop
            ;;
        [hH])
            echo "Saying hi..."
            say_hi
            ;;
        [cC])
            echo "Clearing LCD..."
            clear_lcd
            ;;
        [qQ])
            echo "Quitting..."
            break
            ;;
        *)
            echo "Invalid input."
            ;;
    esac
done