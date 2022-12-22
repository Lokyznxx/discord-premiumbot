const serverSchema = require(`${process.cwd()}/modelos/servidor.js`)

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
      
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
let data = await serverSchema.findOne({guildID: message.guild.id});
  if(!data) {
  await new serverSchema({guildID: message.guild.id}).save();
  data = await serverSchema.findOne({guildID: message.guild.id});
  }
        //Se quiser que o bot não retorne nada caso o comando não existe
        //if (!command) { return }

        //Se quiser que o bot retorne alguma mensagem
    
      
        if (!command) {
            return message.reply({ content: `:x: **|** Comando não encontrado` })
        }
        
        //Se quiser que o bot não retorne nada ao usar um comando apenas para dev
        /*if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) { return }
        }*/

        //se quiser que o bot retorne alguma mensagem
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) {
                return message.reply({ content: `:x: **|** Apenas meu criador pode usar esse comando!` })
            }
        }
      if(command.premium){
            if(data.premium){
                if(data.premium <= Date.now()) return message.reply("❌ **Tu suscripción premium ha expirado!**")
            } else {
                return message.reply("❌ **Este es un comando premium!**")
            }
  }
        
        await command.run(client, message, args, data.idioma);
    }
}