const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Bot Latency Ping.",
    run: async(client, message) => {

        let PingEmbed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`🐋 › Ws: **${client.ws.ping}ms**\n🛰 › Shards: **1/1**`)

        message.reply({ embeds: [PingEmbed] })    
    }
}