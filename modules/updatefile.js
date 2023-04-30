const fs = require('fs');
const path = require('path');
const axios = require('axios');
const repo = "LuluHuman/Halimah-Yacob-Bot"
const url = `https://raw.githubusercontent.com/${repo}/main/`

fs.readFile(path.join(__dirname, '../.gitignore'), 'utf8', async (err, data) => {
    var gitignore
    if (err) throw err;
    gitignore = data.split('\r\n');
    gitignore.push('.gitignore');
    gitignore.push('.git');
    console.log("Ignored files/dir:", gitignore.join(', '));

    async function processDirectory(url, directory) {
        var files = {};

        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, items) => {
                if (err) {
                    reject(err);
                }

                var promises = [];

                items.forEach(name => {
                    if (gitignore.includes(name) || gitignore.includes("/" + name)) return;

                    const fullPath = path.join(directory, name);

                    if (fs.lstatSync(fullPath).isDirectory()) {
                        promises.push(processDirectory(url + name + '/', fullPath).then(dirFiles => {
                            files = Object.assign(files, dirFiles);
                        }));
                    } else {
                        files[path.join(directory, name)] = url + name;
                    }
                });

                Promise.all(promises).then(() => {
                    resolve(files);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }

    async function getFiles() {
        return await processDirectory(url, path.join(__dirname, '../'));
    }

    getFiles().then(files => {
        for (const localpath in files) {
            if (localpath.includes("node_modules")) continue;
            console.log(`Updating file ${localpath}`);

            const url = files[localpath];
            axios.get(url).then(res => {
                if (res.status == 200) {
                    fs.writeFileSync(localpath, res.data);
                    console.log(`Updated ${localpath}`);
                } else if (req.status == 404) {
                    console.log(`No file ${localpath}`);
                } else {
                    console.log(`Failed to update ${localpath}`);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });

});

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})
