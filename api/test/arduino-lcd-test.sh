source pepetest.sh

TEST "arduino-lcd-message"

CASE "success on send message to LCD"

curl 'http://localhost:9000/arduino/controller/lcd' \
-H 'Content-Type: application/json' \
-d '{"message": "No tardare mucho"}' \
-v