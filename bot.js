const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const date = require('date-and-time')
const ordinal = require('ordinal')

let startTime = undefined;

// master - 696165017715998767
// team1 - 696164744653963365
// team2 - 696164824589008897
// team3 - 696164868625268826
// team4 - 696164907640553482
// team5 - 696164930835185664
// team6 - 696222676351451247
// team7 - 696222704168206366
// team8 - 696222728428191794

const masterID = '696165017715998767'

const teams = {'696164744653963365':{'progress':0, 'teamNum':1}, 
'696164824589008897':{'progress':0, 'teamNum':2}, 
'696164868625268826':{'progress':0, 'teamNum':3}, 
'696164907640553482':{'progress':0, 'teamNum':4}, 
'696164930835185664':{'progress':0, 'teamNum':5}, 
'696222676351451247':{'progress':0, 'teamNum':6}, 
'696222704168206366':{'progress':0, 'teamNum':7}, 
'696222728428191794':{'progress':0, 'teamNum':8}}

const placing = 0

const segment = [intro, sourceCode, seg2_story, luke22_3, 
    seg4_story, judaslunchwear, judasluncheat, seg7_story,
    cryptoJingle, seg9_story, morse, seg11_story, whereBarabbas, seg13_story]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.channels.fetch('696165017715998767').then(channel => {
        packageAndSend("I am ready - type !startgame to start the game\n(remember to run the html server before starting)", channel)
    })
});

client.on('message', msg => {
    if (msg.content.charAt(0) === '!') {
        messageContent = msg.content.substr(1).toLowerCase()

        if (msg.channel.id == '696165017715998767') { //Check if message is from master
            if (messageContent == 'startgame') {
                for (teamID in teams) {
                    client.channels.fetch(teamID).then(channel => {
                        segment[teams[channel.id]['progress']](channel)
                    })
                }

                startTime = new Date();
                packageAndSend(`Game Started at ${date.format(startTime, 'HH:mm:ss')}`, msg.channel)
            }

        } else {
            console.log(`Team ${teams[msg.channel.id]['teamNum']} input ${messageContent}`);

            if (checkAnswer(messageContent, teams[msg.channel.id]['progress'])) {
                //Progress to next segment
                teams[msg.channel.id]['progress']++

                segment[teams[msg.channel.id]['progress']](msg.channel)

                updateMasterwithProgress()
                
            } else {
                //Reject and send retry message
                packageAndSend("Sorry, please try again...", msg.channel)
            }
        }
    }
});

function getElapsedTime() {
    let now = new Date();
    let elapsedTime = date.subtract(now, startTime).toMinutes();
    let minutes = Math.floor(elapsedTime)
    let seconds = Math.floor((elapsedTime - minutes) * 60)

    return [minutes, seconds]
}

function updateMasterwithProgress() {
    elapsedTime = getElapsedTime()

    updateString = `Current Progress - Time Elapsed: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds\n`

    for (teamID in teams) {
        team = teams[teamID]
        updateString = updateString + `Team ${team['teamNum']} - ${team['progress']}\n`
    }

    client.channels.fetch('696165017715998767').then(channel => {
        packageAndSend(updateString, channel)
    })
}

function intro(channel) {
    packageAndSend("INTRO INTRO INTRO, type !continue to continue", channel)
}

function sourceCode(channel) {
    packageAndSend("STORY PROMPT FOR SOURCE CODE TRAILER - http://203.51.36.16/trailer", channel)
}

function seg2_story(channel) {
    packageAndSend("2 - STORY, type !continue to continue", channel)
}

function luke22_3(channel) {
    packageAndSend("STORY PROMPT FOR LUKE22:3 - http://203.51.36.16/XXXXXXXXXX", channel)
}

function seg4_story(channel) {
    packageAndSend("4 - STORY, type !continue to continue", channel)
}

function judaslunchwear(channel) {
    packageAndSend("STORY PROMPT FOR JUDAS LUNCH - what is he wearing? - http://203.51.36.16/judasfood", channel)
}

function judasluncheat(channel) {
    packageAndSend("STORY PROMPT FOR JUDAS LUNCH - where is he eating?", channel)
}

function seg7_story(channel) {
    packageAndSend("7 - STORY, type !continue to continue", channel)
}

function cryptoJingle(channel) {
    packageAndSend("STORY PROMPT FOR crypto - VRQJ: HHH HHH HJFGH - cryptography 3", channel)
}

function seg9_story(channel) {
    packageAndSend("9 - STORY, type !continue to continue", channel)
}

function morse(channel) {
    packageAndSend("STORY PROMPT FOR MORSE - http://203.51.36.16/morse", channel)
}

function seg11_story(channel) {
    packageAndSend("11 - STORY, type !continue to continue", channel)
}

function whereBarabbas(channel) {
    packageAndSend("STORY PROMPT FOR Where in the world Barabbas?", channel)
    packageAndSendImage("https://i.imgur.com/vrtmeAr.png", channel)
    packageAndSendImage("https://i.imgur.com/mOrE9eY.png", channel)
}

function seg13_story(channel) {
    elapsedTime = getElapsedTime()
    placing++

    packageAndSend("FINAL STORY BIT - THE END", channel)
    packageAndSend(`FINISH TIME: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds`, channel)

    if (placing < 4) {
        packageAndSend(`Congratulations, you finished ${ordinal(placing)}!`, channel)
    }
}

function packageAndSend(message, channel) {
    const embedMessage = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setDescription(message)
        .setTimestamp()
        .setFooter('Made for Tehillah Easter 2020')
    
    channel.send(embedMessage);
}

function packageAndSendImage(imagelink, channel) {    
    const embedMessage = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setImage(imagelink)
        .setTimestamp()
        .setFooter('Made for Tehillah Easter 2020')
    
    channel.send(embedMessage);
}


function checkAnswer(answer, segment) {
    correctAns = ''

    switch (segment) {
        case 0:
            correctAns = 'continue'
            break;
        case 1:
            correctAns = 'stephan bodzin'
            break;
        case 2:
            correctAns = 'continue'
            break;
        case 3:
            correctAns = '9304'
            break;
        case 4:
            correctAns = 'continue'
            break;
        case 5:
            correctAns = 'purple singlet'
            break;
        case 6:
            correctAns = 'Abu Hassan'
            break;
        case 7:
            correctAns = 'continue'
            break;
        case 8:
            correctAns = 'jingle bells'
            break;
        case 9:
            correctAns = 'continue'
            break;
        case 10:
            correctAns = 'pilate rd'
            break;
        case 11:
            correctAns = 'continue'
            break;
        case 12:
            correctAns = 'dome of the rock'
            break;
        case 13:
            correctAns = 'continue'
            break;
    }

    return correctAns == answer
}

client.login(auth.token);