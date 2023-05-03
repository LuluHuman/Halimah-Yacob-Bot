const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(user) {
        const client = user.client
        const cnWelcome = client.channels.cache.get('1100387637476470836')
        cnWelcome.send(`<:arrowJoin:1103247119097270294> Welcome, <@${user.id}>!`) 
    },
};