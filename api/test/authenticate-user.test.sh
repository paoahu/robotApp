source pepetest.sh

TEST authenticate-user


CASE success on correct credentials

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{"email": "lechu@guita.com", "password": "123123123" }' \
-v


CASE  error on wrong email

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{"email": "coli2@flor.com", "password": "123123123" }' \
-v

CASE  error on wrong pasword

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{"email": "patata@frita.com", "password": "133456" }' \
-v

