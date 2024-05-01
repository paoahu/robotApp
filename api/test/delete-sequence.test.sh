source pepetest.sh

TEST "delete-sequence"

CASE "success on delete sequence"

curl 'http://localhost:9000/arduino/controller/ottoController/65e8d3e656a3d14022a30d77' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZTNjOGU1YzdhNDZhMDVmNTNiMGMiLCJpYXQiOjE3MDk5Mjk4ODQsImV4cCI6MTcwOTkzMzQ4NH0.tk2uhZgK7iU1nPF0ubD2koQICGIjdThrwcoZmFbAwz8' \
-X DELETE \
-v