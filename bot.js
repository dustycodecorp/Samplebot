const Discord       = require('discord.js');
// require fs to be able to write/read from files (optional)
let fs              = require('fs');
//Require config file
let config          = require('./config.json');

//Initialize the client
const client        = new Discord.Client();

//Actions to do when the bot is connected to the discord network
client.on('ready', () => {
    console.log('Beep boop Samplebot is online');
    var add_me_url = 'https://discordapp.com/api/oauth2/authorize?client_id='+config.client_id+'&scope=bot&permissions=0';
    console.log('Add me to your server using this url => '+add_me_url);
});


//Reacts to messages sent in senver (ex commands)

client.on('message', message => {

    var args = "";

    //Ping command
    if (message.content === config.prefix + 'ping') {
        //Pong response
        message.reply('Pong')
            .then(msg => console.log(`Sent a reply to ${message.author}`))
            .catch(console.error);
    }

    //add role
    if (message.content.startsWith(config.prefix + 'addRole')) {
        args = message.content.substr(config.prefix.length).split(' ');
        args = args.slice(1, args.length).join(' ');
        //Find role in server
        var role = message.guild.roles.find('name', args);

        // If the role exists we added it to the user
        if (role != null) {
            message.member.addRole(role)
                .then(message => {
                    replyToUser(message, `Congratulations you have been assigned the role ${args}`);
                    console.log(`Assign role ${args} to ${message.author.username}`)
                })
                .catch(console.error);
        } else {
            replyToUser(message, `Sorry the role ${args} does not exists`);
        }
    }

    //kick user
    if (message.content.startsWith(config.prefix + 'kick')) {
        //Get the user that will be kicked
        args = message.content.substr(config.prefix.length).split(' ');
        args = args.slice(1, args.length).join(' ');

        //Make sure the user who wrote the command is an Admin (configurable in config.json)
        if (message.member.roles.find('name', config.admin_role)) {
            //Find the user to kick, make sure to passit without @ (example !kick JhonDoe)
            let user = message.guild.members.find('displayName', args)
            if (user) {
                user.kick()
                    .then(() => {
                        replyToUser(message, `${args} was kicked of the server`);
                        console.log(`User ${args} was kicked by ${message.author.username}`)
                    })
                    .catch(console.error)
            } else {
                replyToUser(message, `User ${args} cannot be found.`)
            }
        } else {
            replyToUser(message, "Sorry you are not and admin :(")
        }
    }

});


//Greets user that enter your server, sending them a private message
client.on('guildMemberAdd', (member) => {
    //Read content from greetings.txt if we cant we will send a
    // predefined message

    fs.readFile('greetings.txt', 'utf8', function (err, data) {
        var msg_content = '';
        if (err) {
            msg_content = 'Hello new user!';
        } else {
            msg_content = data;
        }
        member.sendMessage(msg_content)
            .then(
                message => console.log(`Direct message sent with content: ${message.content}`)
            )
            .catch(console.error);
        }
    );
});

//Reply to user, as a function to not repeat code everytime.
function replyToUser(message, content) {
    message.reply(content)
        .then(msg => console.log(`Sent a reply to ${message.author.username}`))
        .catch(console.error);
}

// Log bot into discord network
client.login(config.token);
