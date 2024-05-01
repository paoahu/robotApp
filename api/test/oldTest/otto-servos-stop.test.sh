source pepetest.sh

TEST "otto-stop-servos"

CASE "success on otto stops"

curl 'http://localhost:9000/arduino/controller/ottoStop' \
-H 'Content-Type: application/json' \
-d '{}' \
-v