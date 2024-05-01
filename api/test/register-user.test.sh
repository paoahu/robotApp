source pepetest.sh

TEST "register-user"

CASE "success on new user"

curl 'http://localhost:9000/users' \
-H 'Content-Type: application/json' \
-d '{ "name": "Gui Sante", "email": "gui@sante.com", "password": "123123123" }' \
-v



CASE "fail on already existing user"

curl 'http://localhost:9000/users' \
-H 'Content-Type: application/json' \
-d '{ "name": "Man Darina", "email": "man@darina.com", "password": "123123123" }' \
-v
