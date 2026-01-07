#!/usr/bin/env bash

set -eo pipefail

transferApp() {
  scp inventedle.tar.gz franc:~/inventedle && rm inventedle.tar.gz
}

transferCron() {
  scp iotd-cron.tar.gz franc:~/inventedle && rm iotd-cron.tar.gz
}

loadApp() {
  ssh franc "cd ~/inventedle && docker tag inventedle:latest inventedle:rollback && docker load < inventedle.tar.gz && docker compose up app -d"
}

loadCron() {
  ssh franc "cd ~/inventedle && docker tag iotd-cron:latest iotd-cron:rollback && docker load < iotd-cron.tar.gz && docker compose up cron -d"
}

main() {
  # https://stackoverflow.com/a/14203146/7770440
  OPTIND=1 # Reset in case getopts has been used previously in the shell.
  cron=0
  app=1
  while getopts "ac" opt; do
    case "$opt" in
    a)
      cron=1
      app=1
      ;;
    c)
      cron=1
      app=0
      ;;
    *) ;;
    esac
  done
  shift $((OPTIND - 1))
  [ "${1:-}" = "--" ] && shift

  if [ $app -eq 1 ]; then
    echo "Deploying app"
    transferApp
    loadApp
  fi

  if [ $cron -eq 1 ]; then
    echo "Deploying cron"
    transferCron
    loadCron
  fi
}

main "$@"
