import fs from 'fs';

async function main() {
  let fileContent: string ='Not loaded';

  fs.readFile('package.json', (err,data) => {
   fileContent = data.toString();
  })

  console.log(fileContent);
}

main();