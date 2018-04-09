import axios from 'axios';

function createNode(nickname, userData) {
    const postData = {
        user: userData,
        nickname
    };

    axios.post('/api/createNode', postData).then((users) => {
        console.log('user data', users.data);
    });
}

export function createUser(data, callback) {
    axios.post('/api/createUser', data).then((user) => {
        createNode(data.accountName, user.data);
    });
}