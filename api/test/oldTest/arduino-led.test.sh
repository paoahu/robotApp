source pepetest.sh

TEST "arduino-led-blink"

CASE "success on triggering LED blink"

curl 'http://localhost:9000/arduino/controller/led' \
-H 'Content-Type: application/json' \
-d '{}' \
-v