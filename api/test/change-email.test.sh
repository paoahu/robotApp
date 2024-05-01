source pepetest.sh

TEST "change-user-email"

CASE "success on correct data"

curl 'http://localhost:9000/users/me/change-email' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDg3NzU3MGMxODIzODkxODhmYjMiLCJpYXQiOjE3MTAyNzY3NDEsImV4cCI6MTcxMDI4MDM0MX0.yi4esoWQDnevxh_ls4P4FxT9mob6w8xE9taEVslocqc' \
-H 'Content-Type: application/json' \
-d '{ "newEmail": "man@darina3.com", "newEmailConfirm": "man@darina3.com", "password": "123123123"}' \
-X PATCH \
-v