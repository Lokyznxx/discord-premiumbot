const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Bot Latency Ping.",
    run: async(client, interaction) => {

        let PingEmbed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`🐋 › Ws: **${client.ws.ping}ms**\n🛰 › Shards: **1/1**`)

        interaction.reply({ embeds: [PingEmbed], ephemeral: true, allowedMentions: { repliedUser: false } })    
    }
}