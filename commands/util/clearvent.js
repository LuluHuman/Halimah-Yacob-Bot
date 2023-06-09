const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearvent')
        .setDescription('clear <#1100421652984115332>'),
    async execute(interaction) {
        const client = interaction.client
        if (interaction.channel.id !== "1100421652984115332") return interaction.reply("You can't use this command here")
            .catch(err => require('../../modules/handleError')(interaction, err))
            
        const couting = client.channels.cache.get('1100421652984115332')

        couting.messages.fetch().then(messages => {
            couting.bulkDelete(messages)
                .catch(err => require('../../modules/handleError')(interaction, err))
        })
        .catch(err => require('../../modules/handleError')(interaction, err))

        interaction.reply(`<:verifiedUser:1104663350807371858> Messages removed for privacy, request by <@${interaction.user.id}> 
\`\`\`Vent rules:
- Whatever is here stays here
- Do not discriminate\`\`\``)
            .catch(err => require('../../modules/handleError')(interaction, err))
    }
}
