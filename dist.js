require('shelljs/global');
var path = require('path')
var package = require(path.join(__dirname, 'package.json'))

if (!which('7z')) {
  echo('Sorry, this script requires 7z');
  exit(1);
}

cd('public');

var inPath = '**'// folder to zip

var licenseFree = path.join(__dirname, 'license-free.txt')

var licensePremium = path.join(__dirname, 'license-premium.txt')
var sourcePremium = path.join(__dirname, 'styles/')

var outPathFree = path.join(__dirname, package.name + '_free_' + package.version.split('.').join('-') + '.zip') // name of output zip file
var outPathPremium = path.join(__dirname, package.name + '_premium_' + package.version.split('.').join('-') + '.zip') // name of output zip file

rm(outPathFree)

rm(outPathPremium)


// Run external tool synchronously for free version
if (exec('7z a "'+ outPathFree + '" "' + inPath +'"').code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}

if (exec('7z a "'+ outPathFree + '" "' + licenseFree +'"').code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}

// Run external tool synchronously for premium version
if (exec('7z a "'+ outPathPremium + '" "' + inPath +'"').code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}


if (exec('7z a "'+ outPathPremium + '" "' + sourcePremium +'"').code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}

if (exec('7z a "'+ outPathPremium + '" "' + licensePremium +'"').code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}