const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

// master - 696165017715998767
// team1 - 696164744653963365
// team2 - 696164824589008897
// team3 - 696164868625268826
// team4 - 696164907640553482
// team5 - 696164930835185664
// team6 - 696222676351451247
// team7 - 696222704168206366
// team8 - 696222728428191794

masterID = '696165017715998767'

const teams = {'696164744653963365':{'progress':0, 'teamNum':1}, 
'696164824589008897':{'progress':0, 'teamNum':2}, 
'696164868625268826':{'progress':0, 'teamNum':3}, 
'696164907640553482':{'progress':0, 'teamNum':4}, 
'696164930835185664':{'progress':0, 'teamNum':5}, 
'696222676351451247':{'progress':0, 'teamNum':6}, 
'696222704168206366':{'progress':0, 'teamNum':7}, 
'696222728428191794':{'progress':0, 'teamNum':8}}

const segment = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.content.charAt(0) === '!') {
        messageContent = msg.content.substr(1)

        if (checkAnswer(messageContent, teams[msg.channel.id].progress)) {
            //Progress to next segment
            teams[msg.channel.id].progress++
            
        } else {
            //Reject and send retry message
            msg.channel.send("Sorry, please try again...")
        }
    }
});

function intro() {

}

function sourceCode() {
    
}

function seg2_story() {
    
}

function luke22_3() {
    
}

function seg4_story() {
    
}

function judaslunchwear() {
    
}

function judasluncheat() {
    
}

function seg7_story() {
    
}

function cryptoJingle() {
    
}

function seg9_story() {
    
}

function morse() {
    
}

function seg11_story() {
    
}

function whereBarabbas() {
    
}

function seg13_story() {
    
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