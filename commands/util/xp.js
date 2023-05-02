const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const fs = require("fs")
const path = require('path')
const { createCanvas, loadImage } = require('canvas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xp')
        .setDescription('shows your xp')
        .addUserOption(option => option.setName('user').setDescription('user to show xp of').setRequired(false)),

    async execute(interaction) {
        const  user = interaction.options.getUser('user') || interaction.user
        const { xpAnnouncemennts } = interaction.client.config
        await interaction.deferReply();


        const xpPath = path.join(__dirname, `../../xpDatabase/${user.id}`)
        if (fs.existsSync(xpPath) == false) {
            fs.mkdirSync(xpPath)
            fs.writeFileSync(`${xpPath}\\xp`, "0")
        }
        var xp = fs.readFileSync(`${xpPath}\\xp`, "utf8")
        xp = parseInt(xp)

        var lvl = xpAnnouncemennts[Math.floor(xp / 1000) * 1000]
        if (lvl == undefined) lvl = "MAX"

        const img = await loadImage("https://raw.githubusercontent.com/LuluHuman/Halimah-Yacob-Bot/main/Emotes/xpbg.png")
        const avatarUrl = await user.displayAvatarURL({ extension: 'jpg' })
        var avatar = await loadImage(avatarUrl)

        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        ctx.fillStyle = 'White';
        ctx.textAlign = 'left';
        ctx.font = '50pt Arial';
        ctx.fillText(`${user.username}#${user.discriminator}`, 480, 105);
        ctx.fillText(`LVL: ${lvl}`, 480, 245);
        ctx.fillText(`XP: ${xp}/ ${(Math.floor(xp / 1000) * 1000) + 1000}`, 480, 377);
        ctx.drawImage(avatar, 44.3, 44.3, 354.4, 354.4);
        
        buf = canvas.toBuffer();
        const attachment = new AttachmentBuilder(buf, "xp.png")
        interaction.editReply({
            files: [attachment]
        })

    }
}