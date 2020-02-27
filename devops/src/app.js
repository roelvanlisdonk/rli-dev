"use strict";
const AdmZip = require('adm-zip');
const zip = new AdmZip();
zip.addLocalFile('C:/Release/MijnZvdZv2/Remotion.Linq.dll');
zip.writeZip('C:/Release/MijnZvdZv2/MijnZvdZv2.zip');
//# sourceMappingURL=app.js.map