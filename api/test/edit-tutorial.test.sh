source pepetest.sh

TEST "edit-tutorial"

CASE "success on edit tutorial"

curl 'http://localhost:9000/tutorials/65eb7e79de71b35b1d978f5b' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MTAzNDkxNjAsImV4cCI6MTcxMDM1Mjc2MH0.3h1W5d4mLkHjUVEBKfo8IOsoZAmZBk7P4Hlfb_eZMrQ' \
-H 'Content-Type: application/json' \
-d '{"title": "Titulo de sh", "text": "texto de sh"}' \
-X PATCH \
-v