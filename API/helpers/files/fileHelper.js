
const fileInfoToArray = (files, oldFiles) => {

    const fileName = oldFiles ? oldFiles : [];
    const filePath = files[0] ? files[0].destination : "";
    files.forEach(file => {
        fileName.push(file.filename);
    });

    return [fileName, filePath];
};

module.exports = fileInfoToArray;