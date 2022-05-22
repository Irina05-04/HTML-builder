const fs = require('fs');
const path = require('path');
const { stdout } = process;
const folder = path.join(__dirname, 'secret-folder');
fs.readdir(folder, {withFileTypes: true}, function(err, items){
  for (let j=0; j < items.length; j++) {
    if(items[j].isFile()){
      let buff = path.extname(items[j].name).toString().length;
      let nameFile = (path.basename(items[j].name).toString().slice(0,path.basename(items[j].name).toString().length - buff));
      let typeFile = (path.extname(items[j].name).toString().slice(1));
      let sizeFile;
      let filePath = path.join(__dirname, 'secret-folder',`${items[j].name}`);
      fs.stat( filePath, (err,stats) => {
        if (err) console.log('error');
        sizeFile = (stats.size);
        stdout.write(`${nameFile} - ${typeFile} - ${sizeFile}b\n`);
      });  
    } 
  }
});
