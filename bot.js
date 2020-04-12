const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const date = require('date-and-time')
const ordinal = require('ordinal')

let startTime = undefined;

// Need to replace these with your text channel IDs 
const masterID = '696165017715998767'
const answerLogID = '698412789491826719'

// THESE ARE THE ORIGINAL IDs I USED, but you have to generate the IDs for your own server and fill it into the teams object below
const teams = {'696164744653963365':{'progress':0, 'teamNum':1, 'storyProgress':0}, //team1
'696164824589008897':{'progress':0, 'teamNum':2, 'storyProgress':0}, //team2
'696164868625268826':{'progress':0, 'teamNum':3, 'storyProgress':0}, //team3
'696164907640553482':{'progress':0, 'teamNum':4, 'storyProgress':0}, //team4
'696164930835185664':{'progress':0, 'teamNum':5, 'storyProgress':0}, //team5
'696222676351451247':{'progress':0, 'teamNum':6, 'storyProgress':0}, //team6
'696222704168206366':{'progress':0, 'teamNum':7, 'storyProgress':0}, //team7
'696222728428191794':{'progress':0, 'teamNum':8, 'storyProgress':0}} //team8

let placing = 0

const DELAY_CONSTANT = 3000

const segment = [intro_sourceCode, seg2_story_luke22_3, 
    seg4_story_judaslunchwear, judasluncheat, seg7_story_cryptoJingle, 
    seg9_story_morse, seg11_story_whereBarabbas, seg13_story]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.channels.fetch('696165017715998767').then(channel => {
        packageAndSend("I am ready - type !startgame to start the game\n(remember to run the html server before starting)", channel)
    })
});

client.on('message', msg => {
    if (msg.content.charAt(0) === '!') {
        messageContent = msg.content.substr(1).toLowerCase()

        if (msg.channel.id == masterID) { //Check if message is from master
            if (messageContent == 'startgame') {
                for (teamID in teams) {
                    client.channels.fetch(teamID).then(channel => {
                        segment[teams[teamID]['progress']](channel, teams[teamID])
                    })
                }

                startTime = new Date();
                packageAndSend(`Game Started at ${date.format(startTime, 'HH:mm:ss')}`, msg.channel)
            }

        } else {
            currentTeam = teams[msg.channel.id]
            console.log(`Team ${currentTeam['teamNum']} input ${messageContent}`);
            client.channels.fetch(answerLogID).then(channel => {
                packageAndSend(`Team ${currentTeam['teamNum']} input ${messageContent}`, channel)
            })

            if (checkAnswer(messageContent, currentTeam['progress'])) {                
                if (currentTeam['storyProgress'] == -1) {
                    //Tell players that their game is over
                    packageAndSend("Sorry, but you've already completed the game!", msg.channel)

                }else {
                    //Progress to next segment
                    currentTeam['progress']++

                    segment[currentTeam['progress']](msg.channel, currentTeam)

                    updateMasterwithProgress()
                }
            } else {
                //Reject and send retry message
                packageAndSend(generateRetryMessage(currentTeam['progress']), msg.channel)
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

async function intro_sourceCode(channel, currentTeam) {
    packageAndSend("It is Saturday night, 8:05pm. You are sitting in front of your computer, logged into the Tehillah Discord server. You are barely paying attention, watching Youtube in a different window while someone blares on about another .io game. Outside a dog barks.", channel)
    await sleep(10000)
    packageAndSend("Suddenly, your screen goes black, except for a blinking terminal cursor.", channel)
    await sleep(4000)
    packageAndSend("You wiggle your mouse and press your keyboard. Nothing.", channel)
    await sleep(4000)
    packageAndSend("Word by word, a message slowly prints itself on your screen in searing white text.", channel)
    await sleep(4000)
    packageAndSend("```          SAVE EASTER```", channel)
    await sleep(10000)
    packageAndSend("A bright light erupts from your screen and you feel yourself becoming lightheaded...", channel)
    await sleep(10000)
    packageAndSendImage("https://i.imgur.com/4EvKL7f.png", channel)
    packageAndSend("You wake up in a dark dusty room. You are with two friends. Outside your room you see Peter and John gathering bread and wine. One of your friends mentions something about the last Passover. Could it be? Have you been transported back two thousand years to 33 AD?", channel)
    await sleep(10000)
    packageAndSend("You find two scraps of paper on the ground. One of them is a note in capital letters:", channel)
    await sleep(6000)
    packageAndSend("```A GROUP OF CHRISTIANS BANDITS HAVE TRAVELLED BACK IN TIME TO PREVENT THE CRUCIFIXION OF JESUS. IN ORDER TO SAVE EASTER, YOU MUST FOIL THEIR PLANS```", channel)
    await sleep(8000)
    packageAndSend("You turn to one of your friends. They are panic-stricken. “If Jesus isn’t crucified, then who will atone for our sins? How can Jesus rise from the grave if he was never crucified?” You fumble to read the other piece of paper. It’s covered in notes and diagrams. It dawns on you that the Christian bandits are trying to change the Easter timeline to interfere with Jesus’ crucifixion.", channel)
    await sleep(10000)
    packageAndSendImage("https://i.imgur.com/Oibaf8d.png", channel)
    packageAndSend("Outside, you see the chief priests having lunch at a kebab restaurant. Your friend turns to you urgently – “What are we going to do?”", channel)
    await sleep(8000)
    packageAndSend("You read on the paper that the bandits plan to steal money from one the chief priests. In fact, they plan to steal from the Treasurer of the priests, but their name is illegible. Maybe if you figure out who the Treasurer is, you can stop them from stealing his money! You furrow your brow, closely studying the paper. Unfortunately you can barely make anything out. Is that an “a” or an “e”?\n\nhttp://tehillaheaster2020.xyz/source_code", channel)
}

async function seg2_story_luke22_3(channel, currentTeam) {
    packageAndSend("Stephan Bodzin! That’s what it says! You look out of the window. Which one of the priests could he be? Suddenly, a group of young adults swarm the table. You can only just make out what’s going on – until you see one of them steal a bag from the table. That must be Stephan’s bag! Before you can gather your thoughts, the group disappears into the crowd.", channel)
    await sleep(14000)
    packageAndSend("Your group thinks of a different idea. What if you deposited 30 silver right into the Treasurer’s chest? After all, the plan conveniently notes its address. You open the door to face the bright Isreali sun, and make your way there.", channel)
    await sleep(7000)
    packageAndSendImage("https://i.imgur.com/yGfHB8W.png", channel)
    packageAndSend("After some searching, you finally locate the chest. On the chest door is a primitive combination lock, requiring a 4 digit code. You look back at your slip of paper, and on it reads “__L__uke 22:3” (NIV).\n\nhttp://tehillaheaster2020.xyz/insert10charactershere", channel)
}

async function seg4_story_judaslunchwear(channel, currentTeam) {
    packageAndSendImage("https://www.ellenwhite.info/images/chapt-illus/COL/SX-ChestOfCoins_1018791.jpg", channel)
    packageAndSend("You feel like a genius as you input the code numbers into the chest. Together, your group scrounges up 30 silver to put into the chest.", channel)
    await sleep(12000)
    packageAndSend("You and your friends are now at a hummus table, proud of your efforts in foiling the Christian bandits. Suddenly, the bandits rush by. “That’s them!” your friend shouts. A piece of paper floats out of one of their bags, and it lands on your table. You discover that they plan to assassinate Judas! “Quick, we have to warn Judas before they find him!”", channel)
    await sleep(8000)
    packageAndSend("But where is Judas? And even if we knew, how are we supposed to know what he looks like?", channel)
    await sleep(5000)
    packageAndSend("On the back of the paper you find a grainy picture.\n\nhttp://tehillaheaster2020.xyz/judasfood", channel)
    await sleep(5000)
    packageAndSend("First things first, what is Judas wearing?", channel)
}

async function judasluncheat(channel, currentTeam) {
    packageAndSend("Great! Now, where will Judas be?", channel)
}

async function seg7_story_cryptoJingle(channel, currentTeam) {
    packageAndSend("You find Judas and tell him to put on a different singlet and eat at the restaurant across the road. He thanks you and runs across the road. Perfect! One of your friends taps you on the shoulder. “I found this piece of paper on the floor,” they say. Another plan! You study it carefully. It looks like a map from somewhere. Some sort of garden? You look closer. The Garden of Gethsemane! One of the entrances is crossed in bright red pen. Without thinking twice, you rush to the nearest guide so they can take you there.", channel)
    await sleep(12000)
    packageAndSendImage("https://i.imgur.com/tgcfXaz.png", channel)
    packageAndSend("It has taken you 5 hours to reach the Garden, but you are finally here. It is the dead of night and you must squint your eyes to make out the path. You navigate to the entrance to find a large arch made of brick. On one of the sides you find a crude bomb with a big bright LED screen. Large red numbers tick down. It looks like the bomb is set for 8 hours from now.", channel)
    await sleep(14000)
    packageAndSendImage("https://i.imgur.com/5nZdSKk.png", channel)
    packageAndSend("“Quick, we have to defuse it!” You take out the piece of paper from your pocket to study it again. On the side of the bomb is a combination lock which accepts letters. On the piece of paper are a jumbled set of letters - perhaps they might be the key to defusing the bomb?\n\n```VRQJ: HHH HHH HJFGH\ncipher 3```", channel)
}

async function seg9_story_morse(channel, currentTeam) {
    packageAndSend("You enter the letters one by one. The numbers freeze. After an eternity, they reset to zero, and you breathe a sigh of relief. You start the long trek back to the town as the sun rises.", channel)
    await sleep(10000)

    packageAndSendImage("https://i.imgur.com/Ogo4vy5.png", channel)
    packageAndSend("After a night in the town, you hear that Jesus has been captured in the Garden of Gethsemane and is being brought to Pilate for his second trial. Everything going to plan, you think to yourself. You decide to visit the trial to witness it for yourself.", channel)
    await sleep(12000)

    packageAndSend("You are standing in the crowd at the trial. The stands are packed. Luckily, you find yourself right at the front, so close that you can overhear Pilate as he prepares to address the crowd. He is angrily shouting at an underling. “What do you mean you can’t find Barabbas? Find him now!” You turn to your friends. “Without Barabbas to set free, Pilate will have no choice but to release Jesus!” Somehow, you must find Barabbas.", channel)
    await sleep(12000)

    packageAndSend("Pushing your way out of the crowds, you make your way to a small clearing to gather your thoughts. Lo and behold, you stumble across more papers! This time, you find a small smartphone playing a weird noise. On the back, it says in ugly handwriting: baraBbas lOCation. But how on earth are you supposed to figure out his location from this random sound? Or perhaps the beeping means something?\n\nhttp://tehillaheaster2020.xyz/baraloc", channel)
}

async function seg11_story_whereBarabbas(channel, currentTeam) {
    packageAndSendImage("https://i.imgur.com/kjbJ09d.png", channel)
    packageAndSend("Pilate Rd! Of course! You consult your paper map. It’s a small alleyway near the Abu Hassan. You rush over…", channel)
    await sleep(10000)
    packageAndSendImage("https://i.imgur.com/hbobVUB.png", channel)
    packageAndSend("...only to find that nothing is there! Rats! You hate red herrings! You kick the dirt in frustration, only to end up kicking a book. Loose pages are thrown around the air; one lands on your head. You reach up to read what it says. “Lonely Planet’s Guide to Israel”. You walk around kicking at some of the pages to see whether any of them will be helpful. Out of the corner of you eye you spy that one has been written on. Picking it up, you see that someone has scrawled “hide him here!” The page looks like this:", channel)
    await sleep(15000)
    packageAndSendImage("https://i.imgur.com/Z6ozG2U.png", channel)
    packageAndSendImage("https://i.imgur.com/mOrE9eY.png", channel)
}

async function seg13_story(channel, currentTeam) {
    packageAndSend("You find Barabbas chained up at the Dome of the Rock. “Hurry, we need to bring him back to Pilate!” Barabbas looks hungry. You scramble to uncuff him, flagging over a horse and carriage to take you back to Pilate. After a short journey, you dump Barabbas near the stage, and almost instantly one of Pilate’s minions recognises him. They quickly grab him and haul him onto the stage.", channel)
    await sleep(10000)
    packageAndSend("Suddenly you find yourself back at your computer screen. It is still black, with a blinking cursor. More words appear on the screen:", channel)
    await sleep(6000)
    packageAndSend("```      Luke 22:66 - 24:50```", channel)
    await sleep(10000)
    packageAndSend("THE END", channel)
    elapsedTime = getElapsedTime()
    placing++
    await sleep(8000)

    if (placing < 4) {
        packageAndSend(`Congratulations, you finished ${ordinal(placing)}!\nFINISH TIME: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds\n\nThanks for playing!`, channel)
    } else {
        packageAndSend(`Thank you for playing!\nFINISH TIME: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds\n\nThanks for playing!`, channel)
    }

    //GAME OVER
    currentTeam['storyProgress'] = -1
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms + DELAY_CONSTANT));
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

function generateRetryMessage(segment) {
    message = ''

    switch (segment) {
        case 0:
            message = 'Sorry, I don\'t understand... What is the treasurer\'s name?'
            break;
        case 1:
            message = 'I don\'t think that\'s it, we need the code to the safe...'
            break;
        case 2:
            message = 'I don\'t understand... what is Judas wearing?'
            break;
        case 3:
            message = 'I don\'t understand... where is Judas going to be?'
            break;
        case 4:
            message = 'The letters you entered flash red and disappear as soon as you enter them...'
            break;
        case 5:
            message = 'That does\'nt seem like the place we need to go...'
            break;
        case 6:
            message = 'I don\'t think he would be there... Where in the world is Barrabas??'
            break;
    }
    return message
}

function checkAnswer(answer, segment) {
    correctAns = ''

    switch (segment) {
        case 0:
            correctAns = 'stephan bodzin'
            break;
        case 1:
            correctAns = '9304'
            break;
        case 2:
            correctAns = 'purple singlet'
            break;
        case 3:
            correctAns = 'abu hassan'
            break;
        case 4:
            correctAns = 'jingle bells'
            break;
        case 5:
            correctAns = 'pilate rd'
            break;
        case 6:
            correctAns = 'dome of the rock'
            break;
    }

    return correctAns == answer
}

client.login(auth.token);