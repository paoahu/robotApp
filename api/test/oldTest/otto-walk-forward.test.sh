source pepetest.sh

TEST "otto-move-forward"

CASE "success on otto moves forward"

curl 'http://localhost:9000/arduino/controller/ottoForward' \
-H 'Content-Type: application/json' \
-d '{}' \
-v