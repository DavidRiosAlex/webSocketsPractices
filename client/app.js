'use strict';

let socket = io('ws://localhost:8080/', {
    transportOptions: {
      polling: {
        extraHeaders: {
          'x-access-token': window.btoa(`username:password`)
        }
      }
    }
  });

const chatBox = document.querySelector('.chat-container');

document.querySelector('#joinroom').onclick = (event) => {
    event.preventDefault();
    socket.emit('login', {
        name: document.querySelector('#nickname').value,
        room: document.querySelector('#room').value
    })
}

document.querySelector('#messageform').onsubmit = (event) => {
    event.preventDefault();
    const input = document.querySelector('#messageBox')
    if (input.value){
        const nickname = document.querySelector('#nickname');
        socket.emit('chat:message', { name: nickname.value, message: input.value});
        input.value = '';
        chatBox.scrollBottom = chatBox.scrollHeight;
        input.focus();
    }
}

socket.on('chat:message', comment => {
    const div = document.createElement('div');
    const nickname = document.querySelector('#nickname').value;
    div.classList.add( comment.name === nickname ? 'message-right' : 'message-left' );
    div.innerHTML = comment.message;
    document.querySelector('#messages').appendChild(div);

    if (chatBox.scrollBottom < chatBox.scrollHeight) {
        console.log(chatBox.scrollHeight)
        chatBox.scrollTo(0, chatBox.scrollHeight)
    }
});

