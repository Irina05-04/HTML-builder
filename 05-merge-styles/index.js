const path = require('path');
const fs = require('fs');
let folder = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));
fs.readdir(folder, {withFileTypes: true}, function(err, items){
  if(err) throw err;
  for(let el of items){
    if(el.isFile()){
      if((path.extname(el.name).toString()) == '.css'){
        let input = fs.createReadStream(path.join(__dirname, 'styles',`${el.name}`), 'utf-8');
        input.on('data', chunk => output.write(chunk));
      }
    } 
  }
});