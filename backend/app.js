const debug = require('debug')('chatApp:server');
const express = require('express');
const socket = require('socket.io');
const fileSystem = require("fs");
const PORT = 9001;
const app = express();
const userListpath = './src/chatdb/userlist.json';
const server = app.listen(PORT, () => {
    console.log(`Server app is running http://localhost:${PORT}/`);
});

const io = socket(server);

io.on('connection', (socket) => {

    socket.on('userPresence', (data) => {
        fileSystem.readFile(userListpath, "utf8", (err, userlist) => {
            if (err) {
                io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fecthing user details' });
            } else if (userlist?.length) {
                userlist = JSON.parse(userlist);
                userlist = userlist.concat(data);
            } else {
                userlist = [data];
            }
            let userJson = JSON.stringify(userlist, null, 2);

            fileSystem.writeFile(userListpath, userJson, 'utf8', (err) => {
                if (err) {
                    io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fecthing User details' });
                } else {
                    try {
                        userJson = JSON.parse(userJson);
                        io.sockets.emit('onlineUsers', userJson);
                    } catch {
                        io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while Parsing online users' });
                    }
                }
            });
        });
    });
    socket.on('fetchAllUsers', () => {
        fileSystem.readFile(userListpath, "utf8", (err, onlineUsers) => {
            if (err) {
                io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fecthing Online users' });
            } else {
                try {
                    const userJson = JSON.parse(onlineUsers);
                    io.sockets.emit('onlineUsers', userJson);
                } catch {
                    io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while Parsing online users' });
                };
            };
        });
    });
    socket.on('manageFriendsList', (manageData) => {
        const data = manageData.friendData;
        const userpath = `./src/chatdb/users/${manageData.currentUserId}.json`;
        const manageFriendConfig = (userData) => {
            const userJson = JSON.stringify(userData, null, 2);
            fileSystem.writeFile(userpath, userJson, 'utf8', (err) => {
                if (err) {
                    io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while adding Friend', currentUserId: manageData.currentUserId });
                }
            });
        }
        fileSystem.readFile(userpath, "utf8", (err, userData) => {
            if (err) {
                if (!userData) {
                    fileSystem.createWriteStream(userpath);
                    userData = { currentUserId: manageData.currentUserId, FriendList: [data] };
                    manageFriendConfig(userData);
                }
            } else {
                if (userData) {
                    userData = JSON.parse(userData);
                    const friendExist = userData.FriendList.findIndex((friend) => friend.uid == data.uid);
                    if (friendExist == -1) {
                        userData.FriendList = userData.FriendList.concat(data);
                    }
                    manageFriendConfig(userData);
                } else {
                    userData = { currentUserId: manageData.currentUserId, FriendList: [data] };
                    manageFriendConfig(userData);
                }
            }
        });
    });
    socket.on('fetchActiveFriends', (currentUserId) => {
        const userpath = `./src/chatdb/users/${currentUserId}.json`;
        fileSystem.readFile(userpath, "utf8", (err, userData) => {
            if (err) {
                io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fecthing Active Friends' });
            } else {
                if (userData) {
                    const friendLists = JSON.parse(userData).FriendList;
                    io.sockets.emit('friendsCollections', friendLists, currentUserId);
                }
            }
        });
    });
    socket.on('storeMessageToDb', (messageData) => {
        const messagePath = `./src/chatdb/messages/messagedb.json`;
        fileSystem.readFile(messagePath, "utf8", (err, messageList) => {
            if (err) {
                io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while sending message', currentUserId: messageData.currentUserId });
            } else {
                if (messageList) {
                    messageList = JSON.parse(messageList);
                    messageList = messageList.concat(messageData.message);
                } else {
                    messageList = [messageData.message];
                }
                messageList = JSON.stringify(messageList, null, 2);
                fileSystem.writeFile(messagePath, messageList, 'utf8', (err) => {
                    if (err) {
                        io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while sending message', currentUserId: messageData.currentUserId });
                    } else {
                        try {
                            io.sockets.emit('onLastMessageReceive', messageData.message);
                            io.sockets.emit('OnRecieveMessage', messageData.message, messageData.currentUserId);
                        } catch {
                            io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while sending message', currentUserId: messageData.currentUserId });
                        }
                    }
                });
            }
        });
    });
    socket.on('getAllMessages', (guids) => {
        const messagePath = `./src/chatdb/messages/messagedb.json`;
        fileSystem.readFile(messagePath, "utf8", (err, message) => {
            if (err) {
                io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fetching messages' });
            } else {
                try {
                    const messageList = JSON.parse(message || '[]');
                    const chatMessage = messageList.filter((ele) => {
                        return ((ele.uid == guids.uid && ele.friendId == guids.friendUid) ||
                            (ele.uid == guids.friendUid && ele.friendId == guids.uid))
                    })
                    io.sockets.emit('OnRecieveAllMessage', chatMessage, guids.uid);
                } catch {
                    io.sockets.emit("onRecieveToasterMessage", { type: 'Error', message: 'Error while fetching messages', currentUserId: guids.uid });
                }
            }
        });
    });
    socket.on('fetchActiveUserFiends', (userId) => {
        const messagePath = `./src/chatdb/users/${userId}.json`;
        fileSystem.readFile(messagePath, "utf8", (err, friendLists) => {
            if (friendLists) {
                const friendData = JSON.parse(friendLists || '[]');
                io.sockets.emit('OnRecieveFriendsCollection', friendData);
            }
        })
    });
});