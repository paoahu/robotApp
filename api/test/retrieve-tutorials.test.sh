source pepetest.sh

TEST "retrieve-tutorials"

CASE "success on correct user id"

curl 'http://localhost:9000/tutorials' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MDk0MDQwNDcsImV4cCI6MTcwOTQwNzY0N30.p8mjQC-dBXb_3zfpHiRNEHyyDyTp2zEvRzz8VHvJpq0' \
-v