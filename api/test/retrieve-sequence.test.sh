source pepetest.sh

TEST "retrieve-user-sequence"

CASE "success on correct user id"

curl 'http://localhost:9000/arduino/controller/ottoController/:sequenceId/movements' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4ZTNjOGU1YzdhNDZhMDVmNTNiMGMiLCJpYXQiOjE3MDk4MjM0NjgsImV4cCI6MTcwOTgyNzA2OH0.IXWyZCeH5G702Sj2BywHiuYbHM_okuUSRAplVNFWUlk' \
-v

