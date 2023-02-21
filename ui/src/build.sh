#! /bin/bash -e

rm -rf ./build/html/
mkdir ./build/html/

browserify ./src/index.js -o  ./build/html/bundle.js
cp ./src/index.html ./build/html/
cp ./src/styles.css ./build/html/

echo "Done building \"./build/html\" at `date`"


