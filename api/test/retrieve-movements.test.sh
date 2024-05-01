source pepetest.sh

TEST "retrieve-movements-sequence"

CASE "success on correct sequence id"

curl 'http://localhost:9000/arduino/controller/ottoController/65ec9788bcfbaf8e5d352a6c' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZDlkZmZkZmMwNTFjMmU2YzFlOTYiLCJpYXQiOjE3MTAyNTM2NTUsImV4cCI6MTcxMDI1NzI1NX0.8y1IuLcA-8jZNrx0TOEqXYGrBGXGno8jC5IKCThTjvc' \
-v
