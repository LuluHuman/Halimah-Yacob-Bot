const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed } } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption(option =>
      option.setName('song')
        .setDescription('Song URL/Name')
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const keyword = interaction.options.getString(
      "song"
    );

    const voiceChannel = interaction.member.voice.channel;
    const queue = await client.distube.getQueue(interaction);

    if (!voiceChannel) {
      return interaction.reply({
        embeds: [titleEmbed(client, "colorError", "error", 'You need to be in a voice channel to play music')],
        ephemeral: true,
      });
    }

    if (queue) {
      if (
        interaction.guild.members.me.voice.channelId !==
        interaction.member.voice.channelId
      ) {
        return interaction.reply({
          embeds: [titleEmbed(client, "colorError", "error", 'You are not in the same voice channel')],
          ephemeral: true,
        });
      }
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.settings.colorBG)
          .setDescription(`🔍 | Looking for a song...`),
      ],
      ephemeral: true,
    });

    client.distube.play(voiceChannel, keyword, {
      textChannel: interaction.channel,
      member: interaction.member,
    });
    await interaction.deleteReply();
  },
}
