source pepetest.sh

TEST "delete-tutorial"

CASE "success on delete post"

curl 'http://localhost:9000/tutorials/65e3535d626e6236ba898b28' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MDk1ODE2NDIsImV4cCI6MTcwOTU4NTI0Mn0.E0Xg6ZwzlKMphwHtX3OssDopJPkIAmcXAgH17saS4nc' \
-X DELETE \
-v