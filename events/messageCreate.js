const { Events, ActivityType } = require('discord.js');
const { embed: { titleEmbed } } = require('../modules/messageHandler')
const fs = require('fs');
const path = require('path');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const client = message.client;

        message.channel.send({ embeds: [titleEmbed(client, "colorBG", "success", "I'M TAKING OVER NOW\nNext number: `205`")]});
        if (message.channel.id == "1100462666486661190"){
            const db = client.db
            const curNum = db.curNum;
            const lastUser = db.lastUser;

            if (message.author.id == lastUser){
                const newNum = Math.floor(curNum / 50) * 50
                message.channel.send({ embeds: [titleEmbed(client, "colorBG", "error", 
                    `${message.author.tag} RUINED IT AT \`${curNum}\`!! Next number is \`${newNum}\`. You can't count two numbers in a row.`
                )]});
                message.react('❌');
                db.curNum = newNum
                db.lastUser = 0
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
                return;
            }

            if (parseInt(message.content) == (curNum)){
                db.curNum = curNum + 1;
                db.lastUser = message.author.id;
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
                message.react('✅');
            } else {
                const newNum = Math.floor(curNum / 50) * 50
                message.channel.send({
                    embeds: [titleEmbed(client, "colorBG", "error",
                        `${message.author.tag} RUINED IT AT \`${curNum}\`!! Next number is \`${newNum}\`.`
                    )]
                });
                message.react('❌');
                db.curNum = newNum
                db.lastUser = 0
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
                await fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(db));
            }
        }
    },
};