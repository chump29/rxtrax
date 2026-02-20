#!/usr/bin/env -S bash -e

_yellow="\e[4;93m"
_nc="\e[0m"
_build=📦
_start="▶️ "

echo -e "${_build} ${_yellow}Building${_nc}:\n"
./Dockerfile

echo -e "\n${_start} ${_yellow}Starting${_nc}:\n"
docker container rm --force rxtrax-frontend > /dev/null 2>&1
docker container run --rm --name rxtrax-frontend --publish 90:80 --env TZ=America/Chicago --detach --network=rxtrax_default rxtrax-frontend

unset _yellow
unset _nc
unset _build
unset _start
