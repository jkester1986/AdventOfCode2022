fs = require('fs');
get = require("lodash.get")

let fileSizes = [];

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
    // console.log({path, folder}, "\n")
  });
  // console.log(folders)

  getFolderSize(folders);
  console.log({fileSizes})

})

function getFolderSize(folder) {
  const folderContents = Object.keys(folder).map(key => folder[key]);
  const innerFolders = folderContents.filter(content => content === "object");
  const files = folderContents.filter(content => content !== "object");
  let innerFolderSize = 0;
  let filesSize = 0;

  innerFolders.forEach(innerFolder => {
    innerFolderSize += getFolderSize(innerFolder);
  });

  files.forEach(file => {
    console.log({file})
    filesSize += file;
  });

  console.log({innerFolderSize, filesSize})
  
  const tot = innerFolderSize + filesSize;
  if (tot < 100000) fileSizes.push(tot);
  return tot;
}