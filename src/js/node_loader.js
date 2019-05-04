const fs = require("fs");
const path = require("path");

module.exports = function nodeLoader() {
  const filename = path.basename(this.resourcePath);
  const src = fs.readFileSync(this.resourcePath, {encoding: "binary"});
  return `
const nodeFilename = ${JSON.stringify(filename)};
const src = ${JSON.stringify(src)};
require("fs").writeFileSync(nodeFilename, src, "binary");
try {
  global.process.dlopen(
    module,
    nodeFilename
  );
} catch(e) {
  throw new Error('node-loader: Cannot open ' + nodeFilename + ': ' + e);
}
`;
};