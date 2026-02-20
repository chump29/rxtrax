#!/usr/bin/env -S bash -e

_red="\e[4;91m"
_green="\e[4;92m"
_yellow="\e[4;93m"
_nc="\e[0m"
_title=✨
_start=🟢
_task="🛠️ "
_lint=🔍
_test=🧪
_stop=🔴
_done="✔️ "

clear

echo -e "${_title} ${_red}RxTrax BACKEND${_nc} ${_title}\n"

echo -e "${_task} ${_green}Installing dependencies${_nc}\n"
uv sync --extra dev --quiet

echo -e "${_lint} ${_green}Linting${_nc}:"
uv run pylint -- *.py

echo -e "${_test} ${_green}Testing${_nc}:\n"
uv run behave --stop

source docker.sh

echo -e "\n${_done} ${_yellow}Done${_nc}!\n"

unset _red
unset _green
unset _yellow
unset _nc
unset _title
unset _start
unset _task
unset _lint
unset _test
unset _stop
unset _image
unset _done
