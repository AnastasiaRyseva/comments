let formForComment = document.getElementById('form-comments');
let blockComments = document.querySelector('.comments');

formForComment.addEventListener('click', (e) => {
    if(e.target.className == 'publish') {
        e.preventDefault();
        saveAndCheckData();
    }
})

formForComment.onkeydown = function(e) {
    if(e.keyCode === 13) {
        e.preventDefault();
        saveAndCheckData();
    }
} 

function saveAndCheckData () {
    let user = formForComment.querySelector('#name').value;
    let message = formForComment.querySelector('#text').value;
    let date = document.querySelector('input[type="date"]').value;
    if(user.length < 1 || inputName.value.length > 20 ||
        message.length < 1) {
        createErrowMessage();
        return
    }

    publishComment(user, date, message);
}

const danger = document.querySelector('.danger');

function createErrowMessage() {
    danger.innerHTML = 'Вы не заполнили необходимые поля!';
    return
}

let inputName = document.getElementById('name');
let error = document.querySelector('.error');
let textarea = document.getElementById('text')

inputName.onblur = function() {
    if(inputName.value.length < 1 || inputName.value.length > 20) {
        error.innerHTML = 'Ваше имя должно содержать от 1 до 20 символов'
    } 
}
inputName.onfocus = function() {
    error.innerHTML = '';
    if(document.querySelector('.danger')) {
        document.querySelector('.danger').remove();
    }
}
textarea.onblur = function() {
    if(!textarea.value) {
        createErrowMessage()
    }
}
textarea.onfocus = function() {
    if(document.querySelector('.danger')) {
        document.querySelector('.danger').remove();
    }
}

function publishComment(userName, commentDate, message) {
    let comment = document.createElement('div');
    comment.className = 'comment';
    let dateAtNow = new Date();
    
        if(commentDate) {
            let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            let arrDate = commentDate.split('-');
            if(arrDate[0] == yesterday.getFullYear() && arrDate[1] == yesterday.getMonth() + 1 && arrDate[2] == yesterday.getDate()) {
                commentDate = 'Вчера';
            }
            if(arrDate[0] == dateAtNow.getFullYear() && arrDate[1] == dateAtNow.getMonth() + 1 && arrDate[2] == dateAtNow.getDate()) {
                commentDate = 'Сегодня';
            }
        } else {
            commentDate = 'Сегодня';
        }
   
    comment.innerHTML = `
    <span class="comment-date">${commentDate}, </span>
    <span class="comments-time">${dateAtNow.toLocaleTimeString().slice(0, 5)}</span>
    <p class="comment-name">${userName}</p>
    <div class="message">
        ${message}
    </div>
    <div class="comment-reaction">
    <div>
        <img src="./images/like.svg" alt="like" class="like">
        <span class="liked"></span>
        </div>
        <div class="delete">
            <img src="./images/basket.png" class ='delete' alt="on click delete comment" width="30px" height="30px">
        </div>
    </div>
    `;
    blockComments.appendChild(comment);
}


blockComments.addEventListener('click', (e) => {
    if(e.target.className == 'like') {
        let target = e.target;
        target.nextElementSibling.innerHTML++;
    }
    if(e.target.className == 'delete') {
        e.target.closest('.comment').remove();
    }
})