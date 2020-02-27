const AdmZip = require('adm-zip');

const zip = new AdmZip();

// Remove files that should not be in the release

// Add folder to zip

zip.addLocalFile('C:/Release/MijnZvdZv2/Remotion.Linq.dll');
zip.writeZip('C:/Release/MijnZvdZv2/MijnZvdZv2.zip');
