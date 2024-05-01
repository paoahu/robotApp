source pepetest.sh

TEST "create-tutorial"

CASE "success on new tutorial"

curl 'http://localhost:9000/tutorials' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MDkzOTkyMzMsImV4cCI6MTcwOTQwMjgzM30.XZHgrP--1V_tscnLSQdOMYAuYYA20ZZskGlnlMNjAxk' \
-H 'Content-Type: application/json' \
-d '{ "title": "Prueba 2", "text": "Este es el texto del segundo tutorial"}' \
-v