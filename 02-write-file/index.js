const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname,'result.txt'));
stdout.write('Какой твой любимый цвет?\n');
stdin.on('data', data => {
  if(data.toString().toLowerCase().trim() != 'exit') {
    output.write(data);
  }
  else{
    console.log('данные записаны');
    process.exit(1);
  }
});
process.on('SIGINT', () => {
  console.log('данные записаны');
  process.exit(1);
});
 
