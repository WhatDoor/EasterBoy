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

const teams = {'696164744653963365':{'progress':0, 'teamNum':1, 'storyProgress':0}, 
'696164824589008897':{'progress':0, 'teamNum':2, 'storyProgress':0}, 
'696164868625268826':{'progress':0, 'teamNum':3, 'storyProgress':0}, 
'696164907640553482':{'progress':0, 'teamNum':4, 'storyProgress':0}, 
'696164930835185664':{'progress':0, 'teamNum':5, 'storyProgress':0}, 
'696222676351451247':{'progress':0, 'teamNum':6, 'storyProgress':0}, 
'696222704168206366':{'progress':0, 'teamNum':7, 'storyProgress':0}, 
'696222728428191794':{'progress':0, 'teamNum':8, 'storyProgress':0}}

let placing = 0

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
                        segment[teams[teamID]['progress']](channel, teams[teamID])
                    })
                }

                startTime = new Date();
                packageAndSend(`Game Started at ${date.format(startTime, 'HH:mm:ss')}`, msg.channel)
            }

        } else {
            currentTeam = teams[msg.channel.id]
            console.log(`Team ${currentTeam['teamNum']} input ${messageContent}`);

            if (!currentTeam['blocking']) {
                if (checkAnswer(messageContent, currentTeam['progress'])) {                
                    //If the team is receiving a story segment:
                    //  storyProgress should be 0 - X
                    //  otherwise, -1 to indicate the end of the segment/ waiting for answer + need to progress to next segment
                    //             -2 to indicate that they have finished the game
                    if (currentTeam['storyProgress'] == -1) {
                        //Progress to next segment
                        currentTeam['progress']++
    
                        segment[currentTeam['progress']](msg.channel, currentTeam) //If the new segment is a story, that segment will change storyProgress from -1 to 0 at the start
    
                        updateMasterwithProgress()
                    } else if (currentTeam['storyProgress'] == -2) {
                        //Tell players that their game is over
                        packageAndSend("Sorry, but you've already completed the game!", msg.channel)
    
                    }else {
                        //Progress to next story bit
                        currentTeam['storyProgress']++
    
                        segment[currentTeam['progress']](msg.channel, currentTeam)
                    }
                } else {
                    //Reject and send retry message
                    packageAndSend(generateRetryMessage(currentTeam['progress']), msg.channel)
                }
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

async function intro(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    if (currentTeam['storyProgress'] == 0) {
        packageAndSend("It is Saturday night, 7:35pm. You are sitting in front of your computer, logged into the Tehillah Discord server. You are barely paying attention, watching Youtube in a different window while someone blares on about another .io game. Outside a dog barks.", channel)
        await sleep(10000)
        packageAndSend("Suddenly, your screen goes black, except for a blinking terminal cursor...", channel)
        await sleep(4000)
        packageAndSend("You wiggle your mouse and press your keyboard. Nothing.", channel)
        await sleep(4000)
        packageAndSend("Word by word, a message slowly prints itself on your screen in searing white text.", channel)
        await sleep(4000)
        packageAndSend("```          SAVE EASTER```", channel)
        await sleep(6000)
        packageAndSend("A bright light erupts from your screen and you feel yourself becoming lightheaded...", channel)

    } else if (currentTeam['storyProgress'] == 1) {
        packageAndSend("You wake up in a dark dusty room. You are with two friends. Outside your room you see Peter and John gathering bread and wine. One of your friends mentions something about the last Passover. Could it be? Have you been transported back two thousand years to 33 AD?", channel)
        await sleep(8000)
        packageAndSend("You find scraps of paper on the ground. One of them is a note in capital letters:", channel)
        await sleep(4000)
        packageAndSend("```A GROUP OF MISINFORMED CHRISTIANS HAVE TRAVELLED BACK IN TIME TO PREVENT THE CRUCIFIXION OF JESUS. IN ORDER TO SAVE EASTER, YOU MUST FOIL THEIR PLANS```", channel)
        await sleep(8000)
        packageAndSend("You turn to one of your friends. They are panic-stricken. “If Jesus isn’t crucified, then who will atone for our sins? How can Jesus rise from the grave if he was never crucified?” You fumble through the other pieces of paper. They are individually numbered, each containing notes and diagrams. It dawns on you that together they constitute a scheme concocted by the misinformed Christians to interfere with Jesus’ crucifixion.", channel)
        await sleep(8000)
        packageAndSend("Outside, you see the chief priests having lunch at a kebab restaurant. Your friend turns to you urgently – “What are we going to do?”", channel)

        //END OF SEGMENT
        currentTeam['storyProgress'] = -1
    }
}

async function sourceCode(channel, currentTeam) {
    packageAndSend("You find a scrap of paper one the ground which outlines a plan to steal money from the chief priests. You read that they plan to steal money from the Treasurer of the priests, but their name is illegible.", channel)
    await sleep(6000)
    packageAndSend("You furrow your brow, closely studying the paper. Is that an “a” or an “e”?\n\nhttp://tehillaheaster2020.xyz/trailer", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function seg2_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    if (currentTeam['storyProgress'] == 0) {
        packageAndSend("Stephan Bodzin! That’s what it says! You look out of the window. Which one of the priests could he be? Suddenly, a group of young adults swarm the table. You can only just make out what’s going on – until you see one of them steal a bag from the table. That must be Stephan’s bag! Before you can gather your thoughts, the group disappears into the crowd.", channel)
        await sleep(3000)
        packageAndSend("enter !continue to continue", channel)
    } else if (currentTeam['storyProgress'] == 1) {
        packageAndSend("Your group thinks of a different idea. What if you deposited 30 silver right into the Treasurer’s safe? After all, the plan conveniently makes note its address. You open the door to face the bright Isreali sun, and make your way there.", channel)
        await sleep(2000)
        packageAndSend("enter !continue to continue", channel)

        //END OF SEGMENT
        currentTeam['storyProgress'] = -1
    }
}

async function luke22_3(channel, currentTeam) {
    packageAndSend("After some searching, you finally find the safe. On the safe door is a primitive combination lock, requiring a 4 digit code. You look back at your slip of paper, and on it reads “__L__uke 22:3”.", channel)
    packageAndSend("http://tehillaheaster2020.xyz/XXXXXXXXXX", channel)
    
    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function seg4_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    packageAndSend("You feel like a genius as you input the code numbers into the safe.", channel)
    packageAndSendImage("https://www.ellenwhite.info/images/chapt-illus/COL/SX-ChestOfCoins_1018791.jpg", channel)
    await sleep(1000)
    packageAndSend("Together, your group scrounges up 30 silver to put into the safe.", channel)
    await sleep(1000)
    packageAndSend("enter !continue to continue", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function judaslunchwear(channel, currentTeam) {
    packageAndSend("You and your friends are now at a hummus table, proud of your efforts in foiling the Christian bandits. Suddenly, the bandits rush by. “That’s them!” your friend shouts. A piece of paper floats out of one of their bags, and it lands on your table. You discover that they plan to assassinate Judas! “Quick, we have to warn Judas before they find him!”", channel)
    await sleep(3000)
    packageAndSend("But where is Judas? And even if we know where he is, how are we supposed to know what he looks like?", channel)
    await sleep(1000)
    packageAndSend("On the back of the paper you find a grainy picture.\nhttp://tehillaheaster2020.xyz/judasfood", channel)
    await sleep(1000)
    packageAndSend("First things first, what is Judas wearing?", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function judasluncheat(channel, currentTeam) {
    packageAndSend("Great! Now, where will Judas be?", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function seg7_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    packageAndSend("You find Judas and tell him to put on a different singlet and eat at the restaurant across the road. He thanks you and runs across the road. Perfect! One of your friends taps you on the shoulder. “I found this piece of paper on the floor,” they say. Another plan! You study it carefully. It looks like a map from somewhere. Some sort of garden? You look closer. The Garden of Gethsemane! One of the entrances is circled in bright red pen. Without thinking twice, you rush to the nearest guide so they can take you there.", channel)
    await sleep(3000)
    packageAndSend("enter !continue to continue", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function cryptoJingle(channel, currentTeam) {
    packageAndSend("It has taken you 5 hours to reach the Garden, but you are finally here. It is the dead of night and you must squint your eyes to make out the path. You navigate to the entrance to find a large arch made of brick. On one of the sides you find a crude bomb with a big bright LED screen. Large red numbers are counting down from. It looks like the bomb is set for 8 hours from now. “Quick, we have to diffuse it!” You take out the piece of paper from your pocket to study it again. On the side of the bomb is a combination lock which accepts letters.", channel)
    packageAndSend("Puzzle 4 - VRQJ: HHH HHH HJFGH\ncryptography 3", channel)
}

async function seg9_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    if (currentTeam['storyProgress'] == 0) {
        packageAndSend("You enter the letters one by one. The numbers freeze. After an eternity, they reset to zero, and you breathe a sigh of relief. You start the long trek back to the town as the sun rises.", channel)
        await sleep(2000)
        packageAndSend("enter !continue to continue", channel)
    } else if (currentTeam['storyProgress'] == 1) {
        packageAndSend("After a night in the town, you hear that Jesus has been captured in the Garden of Gethsemane and is being brought to Pilate for his second trial. Everything going to plan, you think to yourself. You decide to visit the trial in order to witness it yourself.", channel)
        await sleep(3000)
        packageAndSend("enter !continue to continue", channel)
    } else if (currentTeam['storyProgress'] == 2) {
        packageAndSend("You are standing in the crowd at the trial. The stands are packed. Luckily, you find yourself right at the front, so close that you can overhear Pilate as he prepares to address the crowd. He looks concerned. “What do you mean you can’t find Barabbas? Find him now!” You turn to your friends. “Without Barabbas to set free, Pilate will have no choice but to release Jesus!” Somehow, you must find Barabbas.", channel)
        await sleep(3000)
        packageAndSend("enter !continue to continue", channel)

        //END OF SEGMENT
        currentTeam['storyProgress'] = -1
    }
}

async function morse(channel, currentTeam) {
    packageAndSend("Pushing your way out of the crowds, you make your way to a small clearing to gather you thoughts. Lo and behold, you stumble across more papers! This time, you find a small smartphone playing a weird noise. On the back, it says in ugly handwriting: baraBbas lOCation.\nhttp://tehillaheaster2020.xyz/morse", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function seg11_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    packageAndSend("Pilate Rd! Of course! You consult your paper map. It’s a small alleyway near the Abu Hassan. You rush over...", channel)
    await sleep(1000)
    packageAndSend("enter !continue to continue", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function whereBarabbas(channel, currentTeam) {
    packageAndSend("...only to find that nothing is there! Rats! On the ground you find a book. “Lonely Planet’s Guide to Isreal”, except it only has one page in it. You open up the book to the page. On the top of the page someone has scrawled “hide him here!” Where are they talking about?", channel)
    await(3000)
    packageAndSendImage("https://i.imgur.com/vrtmeAr.png", channel)
    packageAndSendImage("https://i.imgur.com/mOrE9eY.png", channel)

    //END OF SEGMENT
    currentTeam['storyProgress'] = -1
}

async function seg13_story(channel, currentTeam) {
    if (currentTeam['storyProgress'] == -1) {
        currentTeam['storyProgress'] = 0
    }

    if (currentTeam['storyProgress'] == 0) {
        packageAndSend("You find Barabbas chained up at the Dome of the Rock. “Hurry, we need to bring him back to Pilate!” You scramble to uncuff him so you can bring him back to Pilate.", channel)
        await sleep(2000)
        packageAndSend("enter !continue to continue", channel)

    } else if (currentTeam['storyProgress'] == 0) {
        packageAndSend("SOMETHING TO CONCLUDE", channel)
        await sleep(2000)
        packageAndSend("enter !continue to continue", channel)

    } else {
        elapsedTime = getElapsedTime()
        placing++

        packageAndSend("THE END", channel)

        if (placing < 4) {
            packageAndSend(`Congratulations, you finished ${ordinal(placing)}!\nFINISH TIME: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds`, channel)
        } else {
            packageAndSend(`Thank you for playing!\nFINISH TIME: ${elapsedTime[0]} minutes and ${elapsedTime[1]} seconds`, channel)
        }

        //END OF GAME
        currentTeam['storyProgress'] = -2
    }   
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
            message = 'Please use the !continue command...'
            break;
        case 1:
            message = 'Sorry, I don\'t understand... What is the treasurer\'s name?'
            break;
        case 2:
            message = 'Please use the !continue command...'
            break;
        case 3:
            message = 'I don\'t think that\'s it, we need the code to the safe...'
            break;
        case 4:
            message = 'Please use the !continue command...'
            break;
        case 5:
            message = 'I don\'t understand... what is Judas wearing?'
            break;
        case 6:
            message = 'I don\'t understand... what is Judas going to be?'
            break;
        case 7:
            message = 'Please use the !continue command...'
            break;
        case 8:
            message = 'The letters you entered flash red and disappear as soon as you enter them...'
            break;
        case 9:
            message = 'Please use the !continue command...'
            break;
        case 10:
            message = 'That does\'nt seem like the place we need to go...'
            break;
        case 11:
            message = 'Please use the !continue command...'
            break;
        case 12:
            message = 'I don\'t think he would be there... Where in the world is Barrabas??'
            break;
        case 13:
            message = 'Please use the !continue command...'
            break;
    }

    return message
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
            correctAns = 'abu hassan'
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