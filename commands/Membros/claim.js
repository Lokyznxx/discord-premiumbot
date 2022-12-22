const serverSchema = require(`${process.cwd()}/modelos/servidor.js`)
const keySchema = require(`${process.cwd()}/modelos/chaves.js`)
module.exports = {
    name: "claim",
    aliases: ["reclamar", "claim-key"], 
    
    run: async (client, message, args, idioma) => {
        const chave = await keySchema.findOne({chave: args[0]});
        if(chave) {
            if(chave.ativado) {
                return message.reply(client.la[idioma]["comandos"]["ajustes"]["claim"]["variable1"]);
            } else {

                chave.ativado = true;
                chave.save();

                
                await serverSchema.findOneAndUpdate({guildID: message.guild.id}, {
                    premium: Math.round(Date.now() + Number(chave.duração))
                });
                return message.reply(eval(client.la[idioma]["comandos"]["ajustes"]["claim"]["variable2"]));
            }
        } else {
            return message.reply(client.la[idioma]["comandos"]["ajustes"]["claim"]["variable3"]);
        }
    }
            }