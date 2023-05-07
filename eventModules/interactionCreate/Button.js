const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { akiButton, akiButton2 } = require('../../modules/messageHandler')
module.exports = async (interaction) => {
    const client = interaction.client;
    if (interaction.customId === 'shf') return client.commands.get('shuffle').execute(interaction, true);
    if (interaction.customId === 'stp') return client.commands.get('stop').execute(interaction, true);
    if (interaction.customId === 'plpa') return client.commands.get('pause').execute(interaction, true);
    if (interaction.customId === 'skp') return client.commands.get('skip').execute(interaction, true);
    if (interaction.customId === 'que') return client.commands.get('queue').execute(interaction, true);
    if (interaction.customId === "morememes") {
        const embed = await require('../../modules/reddit')(client, "memes")
        const morememes = new ButtonBuilder()
            .setCustomId('morememes')
            .setLabel('More Memes')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err))
            .catch(err => require('../../modules/handleError')(interaction, err))

        interaction.message.edit({ components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "moreaww") {
        const embed = await require('../../modules/reddit')(client, "aww")
        const morememes = new ButtonBuilder()
            .setCustomId('moreaww')
            .setLabel('More Aww')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err))
            .catch(err => require('../../modules/handleError')(interaction, err))

        interaction.message.edit({ components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "truth") {
        require('../../modules/truthOrDare')('truth', interaction)
        interaction.message.edit({ components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }

    if (interaction.customId === "dare") {
        require('../../modules/truthOrDare')('dare', interaction)
        interaction.message.edit({ components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }

    if (interaction.customId === "randomtnd") {
        const tod = Math.floor(Math.random() * 2) == 0 ? 'truth' : 'dare'
        require('../../modules/truthOrDare')(tod, interaction)
        interaction.message.edit({ components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "yesaki" ||
        interaction.customId === "noaki" ||
        interaction.customId === "dkaki" ||
        interaction.customId === "probaki" ||
        interaction.customId === "probnotaki") {
        if (!client.akigames.get(interaction.user.id)) {
            return interaction.reply({ content: "You are not playing anything", ephemeral: true })
        }
        if (interaction.user.id !== client.akigames.get(interaction.user.id).message.user.id) {
            return interaction.reply({ content: "This is not you're game", ephemeral: true })
        }
        interaction.deferUpdate()
            .catch(err => require('../../modules/handleError')(interaction, err))
        var response = 0
        if (interaction.customId === 'yesaki') response = 0
        if (interaction.customId === 'noaki') response = 1
        if (interaction.customId === 'dkaki') response = 2
        if (interaction.customId === 'probaki') response = 3
        if (interaction.customId === 'probnotaki') response = 4

        const aki = client.akigames.get(interaction.user.id).aki
        const message = client.akigames.get(interaction.user.id).message
        await aki.step(response)
            .catch(err => require('../../modules/handleError')(interaction, err))


        if (aki.progress >= 80 || aki.currentStep >= 78) {
            await aki.win()
                .catch(err => require('../../modules/handleError')(interaction, err))

            const restart = new ButtonBuilder()
                .setCustomId('restartaki')
                .setLabel('Restart')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(restart);

            const embed = new EmbedBuilder()
                .setTitle(`I'm ${Math.floor(aki.progress)}% sure it's...`)
                .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking: #${aki.answers[0].ranking}\n`)
                .setColor('#00FF00')
                .setImage(aki.answers[0].absolute_picture_path)
                .setAuthor({
                    "name": interaction.user.username, "iconURL": interaction.user.avatarURL()
                })

            message.editReply({ embeds: [embed], components: [row] })
                .catch(err => require('../../modules/handleError')(interaction, err))
            client.akigames.delete(interaction.user.id)
            return
        }

        const row = akiButton()
        const row2 = akiButton2()

        const embedyes = new EmbedBuilder()
            .setTitle(aki.question)
            .setColor('#00FF00')
            .setThumbnail("https://cdn.discordapp.com/attachments/1035445683139915816/1035448156181233664/etonnement.default.default.png")
            .setAuthor({
                "name": interaction.user.username, "iconURL": interaction.user.avatarURL()
            })
            .setFooter({ text: `Question ${aki.currentStep} | Progression: ${Math.floor(aki.progress)}%` })

        await message.editReply({ embeds: [embedyes], components: [row, row2] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "restartaki") {
        const client = interaction.client;
        if (client.akigames.has(interaction.user.id)) {
            return interaction.reply({ content: "You are already playing a game of Akinator", ephemeral: true })
                .catch(err => require('../../modules/handleError')(interaction, err))
        }
        client.commands.get('aki').execute(interaction)
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "endaki") {
        const client = interaction.client;

        const embed = new EmbedBuilder()
            .setTitle(`Stopped`)
            .setDescription(`You stopped the game.`)
            .setColor('#00FF00')
            .setImage("https://cdn.discordapp.com/attachments/1035445683139915816/1035448156181233664/etonnement.default.default.png")
            .setAuthor({
                "name": interaction.user.username, "iconURL": interaction.user.avatarURL()
            })
        if (!client.akigames.has(interaction.user.id)) {
            return interaction.reply({ content: "You are not playing a game of Akinator", ephemeral: true })
        }
        client.akigames.delete(interaction.user.id)
        interaction.message.edit({ embeds: [embed], components: [] })
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }

    interaction.reply({
        content:
            `There was an error trying to execute that command
            \`No button matching id ${interaction.customId} was found.\`
            <@635303930879803412>`
    })
        .catch(err => require('../../modules/handleError')(`No button matching id ${interaction.customId} was found`, err))

}