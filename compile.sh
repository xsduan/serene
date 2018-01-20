#!/usr/bin/env bash

cd serene
npm install
browserify main.js --standalone serene > ../js/serene.js
# call uglifyify in production, or if you really want to hate yourself while debugging
# browserify -g uglifyify main.js --standalone serene > ../js/serene.js
cd ..
