source pepetest.sh

TEST "change-password 2"

CASE "success on correct data"

curl 'http://localhost:9000/users/me/change-password' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDg3NzU3MGMxODIzODkxODhmYjMiLCJpYXQiOjE3MTAyODAyODMsImV4cCI6MTcxMDI4Mzg4M30.q6NDZoF0l5hKiebnVkcidLnbxCFhCiP64lWKNG6TUWk' \
-H 'Content-Type: application/json' \
-d '{ "password": "456456456", "newPassword": "123123123", "repeatNewPassword": "123123123"}' \
-X PATCH \
-v