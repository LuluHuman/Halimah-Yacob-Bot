const { Events, ActivityType } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: Events.MessageReactionRemove,
    execute: async (reaction, user) => {
        const message = reaction.message;
        if (message.channel.id !== '1100391491421093969') return
        user = await message.guild.members.fetch(user.id);
        var role

        if (reaction.emoji.name == 'red') { role = message.guild.roles.cache.get("1100454896764977223"); }
        if (reaction.emoji.name == 'orange') { role = message.guild.roles.cache.get("1100454899059273890"); }
        if (reaction.emoji.name == 'yellow') { role = message.guild.roles.cache.get("1100454899554193489"); }
        if (reaction.emoji.name == 'green') { role = message.guild.roles.cache.get("1100454898140721162"); }
        if (reaction.emoji.name == 'cyan') { role = message.guild.roles.cache.get("1100454900049121350"); }
        if (reaction.emoji.name == 'purple') { role = message.guild.roles.cache.get("1100454897679356064"); }
        if (reaction.emoji.name == 'pink') { role = message.guild.roles.cache.get("1100454898589515856"); }
        if (reaction.emoji.name == '🧡') { role = message.guild.roles.cache.get("1100455324034543710"); }
        if (reaction.emoji.name == '💛') { role = message.guild.roles.cache.get("1100455325045375087"); }
        if (reaction.emoji.name == '💜') { role = message.guild.roles.cache.get("1100455325737431241"); }
        if (reaction.emoji.name == '💚') { role = message.guild.roles.cache.get("1100455326446276638"); }

        user.roles.remove(role).catch(console.error);
        user.send(`You have been removed from the role \`${role.name}\` in \`${message.guild.name}\``)
    },
};  