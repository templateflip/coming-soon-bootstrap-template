require('shelljs/global');
var path = require('path')
var package = require(path.join(__dirname, 'package.json'))

if (!which('7z')) {
  echo('Sorry, this script requires 7z');
  exit(1);
}

cd('public');

var inPath = '**'// folder to zip
var outPath = path.join(__dirname, package.name + '_' + package.version.split('.').join('-') + '.zip') // name of output zip file


// Run external tool synchronously
if (exec('7z a '+ outPath + ' ' + inPath).code !== 0) {
  echo('Error: 7z commit failed');
  exit(1);
}