const fs = require('fs');
const path = require('path');
const { embed: { titleEmbed } } = require('../../modules/messageHandler')
module.exports = async (client, message) => {
    if (message.channel.id !== "1100462666486661190") return
    //message.channel.send({ embeds: [titleEmbed(client, "colorBG", "success", "I'M TAKING OVER NOW\nNext number: `205`")]});
    const db = client.db
    const curNum = db.curNum;
    const lastUser = db.lastUser;
    if (Number.isNaN(parseInt(message.content))) return
    if (message.author.id == lastUser) {
        const newNum = Math.floor(curNum / 50) * 50
        ruinEmed(newNum, "\nYou can't count twice in a row!")
        message.react('❌')
            .catch(err => require('../../modules/handleError')(message, err))
        db.curNum = newNum
        db.lastUser = 0
        await fs.writeFileSync(path.join(__dirname, '../../db.json'), JSON.stringify(db));
        return;
    }

    if (parseInt(message.content) == (curNum)) {
        db.curNum = curNum + 1;
        db.lastUser = message.author.id;
        await fs.writeFileSync(path.join(__dirname, '../../db.json'), JSON.stringify(db));
        if (curNum % 50 == 0) message.react('✔️');
        message.react('✅')
            .catch(err => require('../../modules/handleError')(message, err))
    } else {
        const newNum = Math.floor(curNum / 50) * 50
        ruinEmed(newNum)
        message.react('❌')
            .catch(err => require('../../modules/handleError')(message, err))
        db.curNum = newNum
        db.lastUser = 0
        await fs.writeFileSync(path.join(__dirname, '../../db.json'), JSON.stringify(db));
    }

    function ruinEmed(newNum, aboutRuin) {
        message.channel.send({
            embeds: [titleEmbed(client, "colorBG", "error",
                `${message.author.tag} RUINED IT AT \`${curNum}\`!! Next number is \`${newNum}\`.` + aboutRuin
            )]
        })
            .catch(err => require('../../modules/handleError')(message, err))
    }
}