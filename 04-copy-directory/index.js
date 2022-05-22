const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const folder = path.join(__dirname, 'files');
function copyDir (){
  fsPromises.mkdir(path.join(__dirname, 'files-copy'),{recursive:true}).then(function() {
    fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, function(err, itemsFile){
      for (let j=0; j < itemsFile.length; j++) {
        fs.unlink(path.join(__dirname, 'files-copy',`${itemsFile[j].name}`), function(err){
          if (err) {
            console.log(err);
          } 
        });
      }
    });
    fs.readdir('end',() => { 
      fs.readdir(folder, {withFileTypes: true}, function(err, items){
        for (let i=0; i < items.length; i++) {
          fs.open(`${items[i].name}`, 'w', (err) => {
            if(err) throw err;
            fs.copyFile(path.join(__dirname, 'files',`${items[i].name}`),path.join(__dirname, 'files-copy',`${items[i].name}`), err => {
              if(err) console.log('error');
            });
          });
        }
      });
    });
  }).catch(function() {
    console.log('error');
  });
}
copyDir();
