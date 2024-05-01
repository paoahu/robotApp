source pepetest.sh

TEST "toogle-like-tutorial"

CASE "success on correct data"

curl 'http://localhost:9000/tutorials/65e4bccbac8ea03606905796/likes' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZTNjOGU1YzdhNDZhMDVmNTNiMGMiLCJpYXQiOjE3MDk0OTg1MzYsImV4cCI6MTcwOTUwMjEzNn0.F_uRlo3n1K7wOj0YJIMXYQ87RgIi8iaN0tZf99NVEHs' \
-X PATCH \
-v