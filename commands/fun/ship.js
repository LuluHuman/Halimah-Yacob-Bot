//Improvement of https://github.com/LuluHuman/MasonBot/blob/main/Mason-Bot/commands/fun/ship.js

const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('ships users!!!')
        .addUserOption(option => option.setName('user1').setDescription('The first user to ship').setRequired(true))
        .addUserOption(option => option.setName('user2').setDescription('The second user to ship').setRequired(true)),

    async execute(interaction) {
        const client = interaction.client;
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        var name1 = user1.nickname ? user1.nickname : user1.username;
        var name2 = user2.nickname ? user2.nickname : user2.username;
        var name = combinename(name1, name2);
        interaction.reply("**" + name1 + "** 💞 **" + name2 + "** = **" + name + "**")
            .catch(err => require('../../modules/handleError')(interaction, err))


        function combinename(name1, name2) {
            var count1 = -1, count2 = -1;
            var mid1 = Math.ceil(name1.length / 2) - 1;
            var mid2 = Math.ceil(name2.length / 2) - 1;
            var noVowel1 = false, noVowel2 = false;
            var vowels = "aeiou"
            for (i = mid1; i >= 0; i--) {
                count1++;
                if (vowels.includes(name1.charAt(i).toLowerCase())) {
                    i = -1;
                } else if (i == 0) {
                    noVowel1 = true;
                }
            }
            for (i = mid2; i < name2.length; i++) {
                count2++;
                if (vowels.includes(name2.charAt(i).toLowerCase())) {
                    i = name2.length;
                } else if (i == name2.length - 1) {
                    noVowel2 = true;
                }
            }

            var name = "";
            if (noVowel1 && noVowel2) {
                name = name1.substring(0, mid1 + 1);
                name += name2.substring(mid2);
            } else if (count1 <= count2) {
                name = name1.substring(0, mid1 - count1 + 1);
                name += name2.substring(mid2);
            } else {
                name = name1.substring(0, mid1 + 1);
                name += name2.substring(mid2 + count2);
            }
            return name;
        }
    }
}