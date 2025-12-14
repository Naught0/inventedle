#!/usr/bin/env bash

set -eo pipefail

buildApp() {
  docker buildx build --platform linux/amd64 . -t inventedle:latest
}

buildCron() {
  docker buildx build --platform linux/amd64 . -f IOTD.Dockerfile -t iotd-cron:latest
}

compressApp() {
  rm -f inventedle.tar.gz
  docker save -o inventedle.tar inventedle:latest
  gzip inventedle.tar -f
}

compressCron() {
  rm -f iotd-cron.tar.gz
  docker save -o iotd-cron.tar iotd-cron:latest
  gzip iotd-cron.tar -f
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
    echo "Building app"
    buildApp
    compressApp
  fi

  if [ $cron -eq 1 ]; then
    echo "Building cron"
    buildCron
    compressCron
  fi
}

main "$@"
