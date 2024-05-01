source pepetest.sh

TEST "retrieve-user"

CASE "success on correct user id"

curl 'http://localhost:9000/users' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQwZjA5MjkwOGE5ZTcwZTk3YTI5ZDYiLCJpYXQiOjE3MDgyMTM1OTYsImV4cCI6MTcwODIxNzE5Nn0.8j86ATQNjbg1UsOwWk8txS6qG-0OFUc0ff4QfFs9uwk' \
-v