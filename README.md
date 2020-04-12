# EasterBoy
A discord bot game for a Tehillah Easter Event

# Usage
1. Follow this guide until step 4 - https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
2. Create a file in the root folder named auth.json and paste the following:
    {
        "token": "YOUR_BOTS_AUTH_TOKEN"
    }
3. replace YOUR_BOTS_AUTH_TOKEN with the auth token you got in step 3 of the guide above
4. run: npm install
5. Create the following text channels - master, answerLog, team1, team2, team3, team4, team5, team6, team7, team8
6. Find the channel IDs for them (see below) and add them to the code, replacing the IDs as appropriate in bot.js
7. run: node server.js
8. run: node bot.js
9. type !startgame into master to start the game, then remember to start all answers with an '!'

Warning - typing any answers into answerLog, master after you started the game, or any other text channel not listed above will crash the bot. 

# Finding channel IDs
1. Run generateID.js
2. type an answer into each of the text channels you want to find the IDs for - e.g. !test
3. The console will log the channel IDs
4. Terminate generateID.js before running bot.js
