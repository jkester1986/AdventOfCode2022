fs = require('fs');
get = require("lodash.get")

let fileSizes = [];
let currentSizeToDelete = 100000000000000000000;

fs.readFile('Day7.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let folders = {};
  let folder = folders;

  let path = "";

  lines.forEach((line, i) => {
    pattern = /(\d+)\s(.+)/;
    const match = line.match(pattern);
    if (line.startsWith("$ cd")) {
      let newFolder = line.split(" ")[2];
      if (newFolder === "..") {
        splitPath = path.split(".");
        splitPath.pop();
        path = splitPath.join(".") || ".";
        folder = path === "." ? folders : get(folders, path.substring(1));
      } 
      else {
        if (path === "") {
          path = ".";
          folder = folders;
        }
        else {
          path += `${path.charAt(path.length-1) === "." ? "" : "."}${newFolder}`
          folder[newFolder] = {};
          folder = folder[newFolder];
        }

      }
    }
    else if (match) {
      folder[match[2]] = Number(match[1]);
    }
  });

  const fullDirSize = getFolderSize(folders);
  const sum = fileSizes.reduce((sum, a) => sum + a, 0);
  console.log("P1:", sum)
  getFolderSize(folders, 30000000 - (70000000 - fullDirSize));
  console.log("P2:", currentSizeToDelete)

})

function getFolderSize(folder, sizeToDelete) {
  const folderContents = Object.keys(folder).map(key => folder[key]);
  const innerFolders = folderContents.filter(content => typeof content === "object");
  const files = folderContents.filter(content => typeof content !== "object");
  let innerFolderSize = 0;
  let filesSize = 0;

  innerFolders.forEach(innerFolder => {
    innerFolderSize += getFolderSize(innerFolder, sizeToDelete);
  });

  files.forEach(file => {
    filesSize += file;
  });

  const tot = innerFolderSize + filesSize;
  if (!sizeToDelete && tot < 100000) fileSizes.push(tot);
  if (sizeToDelete) {
    if (tot >= sizeToDelete && tot < currentSizeToDelete) currentSizeToDelete = tot;
  }
  return tot;
}