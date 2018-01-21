#!/usr/bin/env bash

# call -c for minification in production
# or if you really want to hate yourself while debugging
compress=false

while getopts ":c" opt; do
  case $opt in
    c) compress=true
      ;;
    \?) echo "I don't know what -$OPTARG is" >&2
      ;;
  esac
done

cd serene
npm install

if [ "$compress" = true ]; then
  browserify -g uglifyify main.js --standalone serene > ../js/serene.js
else
  browserify main.js --standalone serene > ../js/serene.js
fi

cd ..
