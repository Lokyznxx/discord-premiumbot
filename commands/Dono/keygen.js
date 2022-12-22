const ms = require('ms')
const Discord = require('discord.js')
const keySchema = require(`${process.cwd()}/modelos/chaves.js`);
module.exports = {
    name: "keygen",
    aliases: ["chave", "gerarchave"],
    ownerOnly: true,
    run: async (client, message, args) => {
        if(!args.length) return message.reply(`❌ **Você deve especificar um duração Premium da chave Key!**\n**Exemplo:** \`30d\``);
        const tempo = ms(args[0]) 
        if(tempo) {
            let chave = gerar_chave();
            message.author.send({
                embeds: [new Discord.EmbedBuilder()
                .setTitle(`🔑 Nova Chave!`)
                .setDescription("```"+chave+"```")
                .addFields([
                    {name: "Gerado por", value: `\`${message.author.tag}\` \`${message.author.id}\``},
                    {name: `Assinatura`, value: `\`${args[0]}\``},
                    {name: `Estado`, value: `\`NÃO USADO\``}
                ])
                
                ]
            }).catch(() => {
                message.react("❌")
                return message.reply("❌ **Não consegui enviar a DM com os detalhes da chave!\nChave removida!**")
            });
            let data = new keySchema({
                chave,
                duração: tempo,
                ativado: false,
            });
            data.save();
            message.react("✅")
            return message.reply("✅ **Nova chave gerada pelo banco de dados**\n*As informações da chave foram enviadas em seus DMs!*")
        } else {
            return message.reply("❌ **O tempo de duração Premium que você especificou é inválido!**")
        }
    }
}

function gerar_chave(){
    //CHAVE: XXXX-XXXX-XXXX-XXXX
    let posiblidades = "ABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789";
    let parte1 = "";
    let parte2 = "";
    let parte3 = "";
    let parte4 = "";
    for(let i = 0; i < 4; i++){
        parte1 += posiblidades.charAt(Math.floor(Math.random() * posiblidades.length));
        parte2 += posiblidades.charAt(Math.floor(Math.random() * posiblidades.length));
        parte3 += posiblidades.charAt(Math.floor(Math.random() * posiblidades.length));
        parte4 += posiblidades.charAt(Math.floor(Math.random() * posiblidades.length));
    }
    
    return `${parte1}-${parte2}-${parte3}-${parte4}`
}