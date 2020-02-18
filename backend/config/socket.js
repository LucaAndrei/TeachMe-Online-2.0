const socketio = require('socket.io');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var ChatMessage = mongoose.model('ChatMessage');

let io;

// improvement : send the list of available messages to the client
const SOCKET_MESSAGES = {

    CONNECT: 'connection',
    DISCONNECT: 'disconnect',

    GET_CONTACTS: 'get-contacts',

    ADD_MESSAGE: 'add-message',

    LOGOUT: 'logout'
}

const SOCKET_MESSAGES_RESPONSE = {
    GET_CONTACTS_RESPONSE: 'get-contacts-response',
    CONTACT_CONNECTED: 'contact-connected',
    CONTACT_DISCONNECTED: 'contact-disconnected',

    ADD_MESSAGE_RESPONSE: 'add-message-response',

    ERROR: 'error'
}

function init(server) {
    io = socketio(server);


    this.io = io;

    io.use((socket, next) => {
        User.findOne({
            username: socket.request._query['username']
        }).then(function (user) {
            if (!user || !user.isValidated) { return res.sendStatus(401); }

            user.socketId = socket.id;
            return user.save().then(function () {
                return next();
            });
        }).catch(next);
    })

    io.on(SOCKET_MESSAGES.CONNECT, function (socket) {
        console.log('user connected', socket.id)
        // User.find({ isValidated: true }).then(users => {
        //     io.emit(SOCKET_MESSAGES_RESPONSE.CONTACT_CONNECTED, users.find(user => user.socketId === socket.id).toContactJSON())
        // })

        // socket.on(SOCKET_MESSAGES.DISCONNECT, () => {
        //     console.log("USER DISCONNECTED")
        //     User.find({isValidated: true}).then(users => {
        //         io.emit(SOCKET_MESSAGES_RESPONSE.CONTACT_DISCONNECTED, users.find(user => user.socketId === socket.id))
        //     })
        // });

        socket.on(SOCKET_MESSAGES.LOGOUT, username => {
            console.log(SOCKET_MESSAGES.LOGOUT, username)
            User.findOne({ username: username, isValidated: true }).then(user => {
                if (!user || !user.isValidated) {
                    io.emit(`${SOCKET_MESSAGES.LOGOUT} - ${SOCKET_MESSAGES_RESPONSE.ERROR}`, `Logout -> User ${username} not found`)
                    return;
                }
                console.log(SOCKET_MESSAGES.LOGOUT, user)
                user.isOnline = false;
                user.save().then(() => {
                    User.find({ isValidated: true }).then(users => {
                        io.emit(SOCKET_MESSAGES_RESPONSE.CONTACT_DISCONNECTED, users.find(user => user.username === username).toContactJSON())
                    });
                });
            })
        })

        socket.on(SOCKET_MESSAGES.GET_CONTACTS, username => {
            console.log(SOCKET_MESSAGES.GET_CONTACTS, username)

            if (username === '') {
                io.emit(SOCKET_MESSAGES_RESPONSE.ERROR, `Logout -> User ${username} not found`)
            } else {
                try {
                    User.find({
                        isValidated: true
                    }).then(function (users) {
                        console.log(`${SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE} -> users -> socket.id`, socket.id)
                        io.emit(SOCKET_MESSAGES_RESPONSE.CONTACT_CONNECTED, users.find(user => user.username === username))
                        io.to(socket.id).emit(SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE,
                            users.filter(user => user.username !== username).map(user => user.toContactJSON()));
                    });
                } catch (error) {
                    console.log(`${SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE} -> error`, error)
                    io.to(socket.id).emit(SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE, []);
                }
            }
        });

        socket.on(SOCKET_MESSAGES.ADD_MESSAGE, async (data) => {
            if (data.text === '' || data.from === '' || data.to === '') {
                io.emit(SOCKET_MESSAGES_RESPONSE.ERROR, `ADD_MESSAGE -> Message ${data} does not have all required fields`)
            } else {
                try {
                    User.findOne({
                        username: data.to
                    }).then(function (toUser) {
                        if (!toUser || !toUser.isValidated) {
                            io.emit(SOCKET_MESSAGES_RESPONSE.ERROR, `Logout -> User ${username} not found`);
                            return;
                        }
                        var chatMessage = new ChatMessage({ from: data.from, to: data.to, text: data.text });
                        chatMessage.save().then(function () {
                            io.to(toUser.socketId).emit(SOCKET_MESSAGES_RESPONSE.ADD_MESSAGE_RESPONSE, data);
                        }).catch(error => {
                            io.to(socket.id).emit(SOCKET_MESSAGES_RESPONSE.ERROR, 'message store error 0');
                        })
                    }).catch(error => {
                        io.to(socket.id).emit(SOCKET_MESSAGES_RESPONSE.ERROR, 'message store error 1');
                    });
                } catch (error) {
                    io.to(socket.id).emit(SOCKET_MESSAGES_RESPONSE.ERROR, 'message store error 2');
                }
            }
        })

    })

}

module.exports = {
    init
}