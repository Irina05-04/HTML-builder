const path = require('path');
const fs = require('fs');
const read = fs.createReadStream(path.join(__dirname, 'template.html'));
let data = '';
const regex = /\{\{(.+)\}\}/gi;
fs.mkdir(path.join(__dirname, 'project-dist'),{recursive:true}, err =>{
  if(err) throw err; 
  read.on('data',part => data +=part);
  read.on('end', () => 
  {
    data = data.toString();
    let matchArray = data.match(regex);
    for(let el of matchArray){
      let fileName = el.toString().slice(2,el.length - 2);
      let text = '';
      let readHtml = fs.createReadStream(path.join(__dirname, 'components',`${fileName}.html`)); 
      readHtml.on('data', part => text += part);
      readHtml.on('end', () =>{
        data = data.replace(el,text);
        const output = fs.createWriteStream(path.join(__dirname, 'project-dist','index.html'));
        output.write(data);
      });
    }
  });
  let folder = path.join(__dirname, 'styles');
  const outputStyle = fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'));
  fs.readdir(folder, {withFileTypes: true}, function(err, items){
    if(err) throw err;
    for(let el of items){
      if(el.isFile()){
        if((path.extname(el.name).toString()) == '.css'){
          let input = fs.createReadStream(path.join(__dirname, 'styles',`${el.name}`), 'utf-8');
          input.on('data', data => outputStyle.write(data));
        }
      } 
    }
  });
  copyDir(path.join(__dirname, 'project-dist','assets'),path.join(__dirname, 'assets'));

});

function copyDir (pathFile,folder){
  fs.promises.mkdir(pathFile,{recursive:true}).then(function() {
    fs.readdir(folder, {withFileTypes: true}, function(err, items){
      for (let i=0; i < items.length; i++) {
        if(items[i].isFile()){
          fs.open(path.join(pathFile,`${items[i].name}`), 'w', (err) => {
            if(err) throw err;
            fs.copyFile(path.join(folder,`${items[i].name}`),path.join(pathFile,`${items[i].name}`), err => {
              if(err) console.log('error');
            });
          });
        }
        else{
          copyDir(path.join(__dirname, 'project-dist','assets',`${items[i].name}`),path.join(__dirname, 'assets',`${items[i].name}`));
        }
      }
    });
  }).catch(function() {
    console.log('error');
  });
 
}