const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const async = require('async') // npm install async 

const scriptsFolder = './tests/' // add your scripts to folder named scripts

const files = fs.readdirSync(scriptsFolder) // reading files from folders
const jsFiles = files.filter(i => {
    if(path.extname(i) === '.js') return i
})
const funcs = jsFiles.map(function(file) {

  return exec.bind(null, `node ${scriptsFolder}${file}`) // execute node command
})

function getResults(err, data) {
  if (err) {
    return console.log(err)
  }

  const results = data.map(function(lines){
    return lines.join('') // joining each script lines
  })
  results.forEach(line => {
    console.log(line)
  })
}

// to run your scipts in parallel use
//async.parallel(funcs, getResults)

// to run your scipts in series use
async.series(funcs, getResults)