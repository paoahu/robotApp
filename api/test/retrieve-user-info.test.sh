source pepetest.sh

TEST "retrieve-user-info"

CASE "success on correct user id"

curl 'http://localhost:9000/users/me' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MDg4NDcwMzgsImV4cCI6MTcwODg1MDYzOH0.FL_HXvSQ0J0YSza8W0jngKWbpLZIxyC4Z12VGv5vn1s' \
-v