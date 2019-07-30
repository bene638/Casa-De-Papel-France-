const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "!";
bot.login("NTkyMDUzMjMzMTQ5ODA0NTk0.XQ5umg.2Ejv575odK3L8zAXxNRjXPwa8QA")
var mention = "67 connectés"
var fucked = false;

//STATUE, SERVEURS
bot.on('ready', function() {
    bot.user.setActivity('.help')
    console.log("Je suis "+bot.user.tag+" je suis sur "+bot.guilds.size+" serveurs et j'ai "+bot.users.size+" membres ")
});



//Envoie un message privé lorsque que un membre arrive sur le serveur.
bot.on('guildMemberAdd', function (member) {
    member.createDM().then (function (channel) {
        return channel.send('Hey' + member.displayName + "Bienvenue sur ce Serveur-Pvp faction il es en devellopement t'inquiete pas :tada::hugging: !")
    }).catch(console.error)
});

//KICK BAN CLEAR
bot.on("message", async message => {

    if (message.content.startsWith(prefix + "kick")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send(`<@${message.author.id}> Utilisateur spécifié introuvable :thinking::thinking:`);
        let kReason = args.join(" ").slice(22);
        if (!kReason){var eReason = "Aucune raison spécifiée"};
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<@${message.author.id}> Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign::no_entry_sign:`);
        if(kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`<@${message.author.id}> Vous ne pouvez pas exclure cet utilisateur :hugging::hugging:`);
    
        let kickEmbed = new Discord.RichEmbed()
        .setTitle("Rapport d'exclusion")
        .setColor("RANDOM")
        .setFooter("by Safe", bot.user.avatarURL)
        .addField("Utilisateur exclu", `${kUser} (ID : ${kUser.id})`)
        .addField("Exclu par", `<@${message.author.id}> (ID : ${message.author.id})`)
        .addField("Exclu dans", message.channel)
        .addField("Exclu à", message.createdAt)
        .addField("Raison", kReason || eReason);
    
        //changer salon,  içi "logs"
        let logsChannel = message.guild.channels.find(`name`, "logs")
        if(!logsChannel) return message.channel.send("Le bot ne parviens pas a trouver le salon, veuller créer un salon **logs** " + logsChannel);
    
        message.guild.member(kUser).kick(kReason);
        logsChannel.send(kickEmbed)
    }

    if (message.content.startsWith(prefix + "ban")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(`<@${message.author.id}> Utilisateur spécifié introuvable :thinking::thinking:`);
        let bReason = args.join(" ").slice(22);
        if (!bReason){var eReason = "aucune raison spécifiée"};
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<@${message.author.id}> Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign::no_entry_sign:`);
        if(bUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`<@${message.author.id}> Vous ne pouvez pas exclure cet utilisateur :hugging::hugging:`);
    
        let banEmbed = new Discord.RichEmbed()
        .setTitle("Rapport de bannisement")
        .setColor("RANDOM")
        .addField("Utilisateur banni", `${bUser} (ID : ${bUser.id})`)
        .setFooter("by Safe", bot.user.avatarURL)
        .addField("Banni par", `<@${message.author.id}> (ID : ${message.author.id})`)
        .addField("Banni dans", message.channel)
        .addField("Banni à", message.createdAt)
        .addField("Raison", bReason || eReason);
        
    
        //changer salon,  içi "logs"
        let logsChannel = message.guild.channels.find(`name`, "logs")
        if(!logsChannel) return message.channel.send("Le bot ne parviens pas a trouver le salon, veuller créer un salon **logs** " + logsChannel);
    
        message.guild.member(bUser).ban(bReason);
        logsChannel.send(banEmbed)
    }
    

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    if (message.content.startsWith(prefix + "clear")) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign::no_entry_sign:");
        if(!args[0]) return message.channel.send(`<@${message.author.id}> Veuillez préciser le nombre de méssages a supprimer \n Commande : !clear <nombre de messages>`);
        if(args[0] >= 501) return message.channel.send(`<@${message.author.id}> Veuillez indiquer un nombre compris entre 1 et 500`)
        message.channel.bulkDelete(args[0]).then( msg => {
            message.channel.send(`:white_check_mark: \`${msg.size}/${args[0]}\` messages on été supprimés !`);
        });
       
        let clearEmbed = new Discord.RichEmbed()
        .setTitle(`Rapport de suppression`)
        .setDescription(`Auteur de la suppression : ` + message.author)
        .addField("Nombre de messages supprimés : ", args)
        .addField("Commande effectué dans ", message.channel)
        .addField("Commande effectué le ", message.createdAt)
        .setFooter("by Safe", bot.user.avatarURL)
        .setColor('RANDOM')
               
   
        //changer salon,  içi "logs"
        let logsChannel = message.guild.channels.find(`name`, "logs")
        if(!logsChannel) return message.channel.send("Le bot ne parviens pas a trouver le salon, veuller créer un salon **logs** " + logsChannel);
               
        logsChannel.send(clearEmbed)
    };
});

//////////MUTE UNMUTE//////////
bot.on("message", async message => {

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let muteReason = args.join(" ").slice(22);
    if (!muteReason){var eReason = "aucune raison spécifiée"};
    
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<@${message.author.id}> Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign::no_entry_sign:`);
        
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send(`<@${message.author.id}> Utilisateur spécifié introuvable :thinking::thinking:`);
        let role = message.guild.roles.find(r => r.name === "Utilisateurs mutés");
        if(!role){
            try {
                role = await message.guild.createRole({
                    name: "Utilisateurs mutés",
                    color:"#000000",
                    permissions:[]
                });
                
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        
        if(toMute.roles.has(role.id)) return message.channel.send(`<@${message.author.id}> Cet utilisateur est déja muté :zipper_mouth::zipper_mouth:`);
        
        await(toMute.addRole(role));
        message.channel.send("L'utilisateur : **" + message.guild.member(message.mentions.users.first()) + "** a été muté :zipper_mouth::zipper_mouth:");
  
        
        let muteEmbed = new Discord.RichEmbed()
        .setTitle(`Rapport de mute`)
        .setDescription(`Auteur du mute : ` + message.author)
        .addField("La personne muté est : ", message.guild.member(message.mentions.users.first()))
        .addField("Raison", muteReason || eReason)
        .addField("Commande effectué dans ", message.channel)
        .addField("Commande effectué le ", message.createdAt)
        .setFooter("by Safe", bot.user.avatarURL)
        .setColor('RANDOM')
               
   
        //changer salon,  içi "logs"
        let logsChannel = message.guild.channels.find(`name`, "logs")
        if(!logsChannel) return message.channel.send("Le bot ne parviens pas a trouver le salon, veuller créer un salon **logs** " + logsChannel);
               
        logsChannel.send(muteEmbed)
    };
});
bot.on("message", async message => {

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let unmuteReason = args.join(" ").slice(22);
    if (!unmuteReason){var eReason = "aucune raison spécifiée"};

    if(message.content.startsWith(prefix + "unmute")){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<@${message.author.id}> Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign::no_entry_sign:`);
        
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send(`<@${message.author.id}> Utilisateur spécifié introuvable :thinking::thinking:`);
        let role = message.guild.roles.find(r => r.name === "Utilisateurs mutés");
        if(!role){
            try {
                role = await message.guild.createRole({
                    name: "Utilisateurs mutés",
                    color:"#000000",
                    permissions:[]
                });
                
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        
        if(!toMute.roles.has(role.id)) return message.channel.send('Cet utilisateur n est pas muté !');
        await(toMute.removeRole(role));
        message.channel.send("l'utilisateur : **" + message.guild.member(message.mentions.users.first()) + "** a été unmuté");


        let unmuteEmbed = new Discord.RichEmbed()
        .setTitle(`Rapport de unmute`)
        .setDescription(`Auteur du unmute : ` + message.author)
        .addField("La personne unmuté est : ", message.guild.member(message.mentions.users.first()))
        .addField("Raison", unmuteReason || eReason)
        .addField("Commande effectué dans ", message.channel)
        .addField("Commande effectué le ", message.createdAt)
        .setFooter("by Safe", bot.user.avatarURL)
        .setColor('RANDOM')
               
   
        //changer salon,  içi "logs"
        let logsChannel = message.guild.channels.find(`name`, "logs")
        if(!logsChannel) return message.channel.send("Le bot ne parviens pas a trouver le salon, veuller créer un salon **logs** " + logsChannel);
               
        logsChannel.send(unmuteEmbed)
    };
});


//COMMANDES, INVITE, LOGO
bot.on("message", async message => {

    if (message.content.startsWith(prefix + "help")) {
        var embedhelpmember = new Discord.RichEmbed()
            .setTitle("**Commandes basique de Zirconia**\n")
            .addField(" - help", "Affiche ce message (Utilisation correcte: **!help**)")
            .addField(" - ping", "Pour connaitre le ping du bot (Utilisation correcte: **!ping**)")
            .setColor(0x0000FF)
            .setFooter("Tu as besoin d'aide, n'est-ce pas?", bot.user.avatarURL)
        message.channel.send(embedhelpmember)
    }

    if (message.content.startsWith(prefix + "help")) {
        var embedhelpmember = new Discord.RichEmbed()
            .setTitle("**Commandes de Modération de Zirconia**")
            .addField(" - kick", "Permet de kick un membre (Utilisation correcte: **!kick <@username> <raison>**)")
            .addField(" - ban", "Permet de ban un membre (Utilisation correcte: **!ban <@username> <raison>**)")
            .addField(" - mute", "Permet de mute un membre (Utilisation correcte: **!mute <@username> <raison>**)")
            .addField(" - unmute", "Permet de unmute un membre (Utilisation correcte: **!unmute <@username> <raison>**)")
            .addField(" - clear", "Permet de supprimer un certain nombre de message (Utilisation correcte: **!clear <nombre de massage>**)")
            .setColor(0xFF0000)
            .setFooter("Pour le staff", bot.user.avatarURL)
        message.channel.send(embedhelpmember);
    }
});


//////////PING//////////
bot.on('message', message => {
    if(message.content === prefix + "ping"){
        var ping_embed = new Discord.RichEmbed()
        .setAuthor("Zirconia", bot.user.avatarURL)
        .setColor("RANDOM")
        .setFooter("by Safe", bot.user.avatarURL)
        .setTimestamp()
        .addField("Latence actuelle de Zirconia :", Math.round(bot.ping) + " Milliseconds")
        message.channel.send(ping_embed)
    }
});
