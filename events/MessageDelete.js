const { Events, ActivityType } = require('discord.js');
const { embed: { titleEmbed } } = require('../modules/messageHandler')
const fs = require('fs');
const path = require('path');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.author.bot) return;
        const client = message.client;
        
        if (message.channel.id == "1100462666486661190") {
            const db = client.db
            const curNum = db.curNum;
            
            const lastNum = parseInt(message.content);
            if (lastNum == curNum - 1) {
                message.channel.send({
                    embeds: [titleEmbed(client, "colorBG", "error",
                        `${message.author.tag} deleted the message for \`${lastNum}\`\n Next number is \`${curNum}\`.`
                    )]
                });
            }
        }
    },
};