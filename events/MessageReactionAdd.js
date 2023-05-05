const { Events, ActivityType } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: Events.MessageReactionAdd,
    execute: async (reaction, user) => {
        const message = reaction.message;
        if (message.channel.id !== '1100391491421093969') return
        user = await message.guild.members.fetch(user.id);

        var role
        const roles = {
            red: "1100454896764977223",
            orange: "1100454899059273890",
            yellow: "1100454899554193489",
            green: "1100454898140721162",
            cyan: "1100454900049121350",
            purple: "1100454897679356064",
            pink: "1100454898589515856",
            orange: "1100454899059273890",
            "🧡": "1100455324034543710",
            "💛": "1100455325045375087",
            "💜": "1100455325737431241",
            "💚": "1100455326446276638",
        }
        
        if (roles[reaction.emoji.name]) {
            role = message.guild.roles.cache.get(roles[reaction.emoji.name])
        }

        user.roles.add(role)
            .catch(err => require('../modules/handleError')({ commandName: __filename }, err))

        user.send(`You have been given the role \`${role.name}\` in \`${message.guild.name}\``)
            .catch(err => require('../modules/handleError')({ commandName: __filename }, err))
    },
};