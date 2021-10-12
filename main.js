var titleInput = document.querySelector('#main-input-title');
var bodyInput = document.querySelector('#main-input-body');
var saveButton = document.querySelector('#save-button');
var ideaCardGrid = document.querySelector('#idea-container');
var deleteButton = document.querySelector('#delete-btn');
var searchBox = document.querySelector('#search-box');
var showStarredIdeasButton = document.querySelector('#show-starred-ideas-button');
var ideaForm = document.querySelector('#main-page-form');
var commentForm = document.querySelector('#comment-form');
var commentInput = document.querySelector('#user-comment');
var addACommentButton = document.querySelector('#save-comment-button');
var cancelButton = document.querySelector('#cancel-button');
var listOfComments = document.querySelector('#list-of-comments');

window.addEventListener('load', persistOnPageLoad);
saveButton.addEventListener('click', createIdeaCard);
ideaCardGrid.addEventListener('click', handleIdeaCardGridClick);
titleInput.addEventListener('keyup', validateUserInput);
bodyInput.addEventListener('keyup', validateUserInput);
searchBox.addEventListener('keyup', activeSearchFilter);
showStarredIdeasButton.addEventListener('click', showStarredIdeas);
commentInput.addEventListener('keyup', validateUserComment);
addACommentButton.addEventListener('click', createIdeaComment);
cancelButton.addEventListener('click', returnToMainPageForm);

var ideas = [];
var allComments = [];
var ideaIdWithComment;

function createIdeaCard(event) {
  event.preventDefault();
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var id = Date.now();
  var star = false;
  var comments = [];

  var savedIdea = new Idea(userTitle, userBody, id, star, comments);
  ideas.push(savedIdea);
  displayCards();
  savedIdea.saveToStorage(ideas);
  if(titleInput && bodyInput){
    titleInput.value = "";
    bodyInput.value = "";
    saveButton.disabled = true;
  }
}

function validateUserInput() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  if (userTitle && userBody) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

function displayCards() {
  ideaCardGrid.innerHTML = "";
  var shouldShowAllIdeas = showStarredIdeasButton.innerText === `Show Starred Ideas`;
  var shouldShowStarredIdeas = showStarredIdeasButton.innerText === `Show All Ideas`;
  for (var i = 0; i < ideas.length; i++) {
    if (shouldShowAllIdeas) {
      ideaCardGrid.innerHTML += generateInnerHTML(ideas[i]);
    } else if (shouldShowStarredIdeas && ideas[i].star) {
      ideaCardGrid.innerHTML += generateInnerHTML(ideas[i]);
    }
  }
  if (searchBox.value) {
    activeSearchFilter();
  }
}

function generateInnerHTML(idea) {
  var starSource;
  if (idea.star) {
    starSource = "./assets/star-active.svg";
  } else {
    starSource = "./assets/star.svg";
  }
  return `<article class="box-container" id="${idea.id}">
    <div class="box-header-container">
      <input class="star-btn" type="image" name="star button" src="${starSource}" alt="picture-of-a-star">
      <input class="delete-btn" id="delete-btn" type="image" name="delete button" src="./assets/delete.svg" alt="picture-of-an-x">
    </div>
    <div class="title-body-container">
      <label class="idea-title" id="idea-title">${idea.title}</label>
      <div class="idea-body-container">
        <p class="idea-body" id="idea-body">${idea.body}</p>
      </div>
    </div>
    <div class="box-footer-container">
      <input type="image" class="comment-btn" src="./assets/comment.svg" alt="picture of a plus sign"/>
      <label class="comment-label">Comment</label>
    </div>
  </article>`;
}

function deleteIdeaCard(ideaId) {
  for (var i = 0; i < ideas.length; i ++) {
    if (ideaId === ideas[i].id) {
      var ideaToDelete = ideas[i];
      ideaToDelete.deleteFromStorage();
      ideas.splice(i, 1);
    }
  }
}

function favoriteIdeaCard(ideaId) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideaId === ideas[i].id) {
      ideas[i].star = !ideas[i].star;
      ideas[i].updateIdea();
    }
  }
}

function handleIdeaCardGridClick(event) {
  var ideaId;
  if (event.target.closest('.box-container')) {
    ideaId = Number(event.target.closest('.box-container').id);
  }
  if (event.target.classList.contains('delete-btn')) {
    deleteIdeaCard(ideaId);
  }

  if (event.target.classList.contains('star-btn')) {
    favoriteIdeaCard(ideaId);
  }

  if (event.target.classList.contains('comment-btn')) {
    ideaIdWithComment = ideaId;
    showCommentForm();
  }

  displayCards();
}

function persistOnPageLoad() {
  var ideasFromStorage = localStorage.getItem('stringifiedIdeas');
  var commentsFromStorage = localStorage.getItem('stringifiedComments');

  if (ideasFromStorage !== null) {
    var parsedIdeasFromStorage = JSON.parse(ideasFromStorage);
    var parsedComments = JSON.parse(commentsFromStorage);

    for (var i = 0; i < parsedIdeasFromStorage.length; i++) {
      var title = parsedIdeasFromStorage[i].title;
      var body = parsedIdeasFromStorage[i].body;
      var id = parsedIdeasFromStorage[i].id;
      var star = parsedIdeasFromStorage[i].star;

      var ideaComments = [];
      if (parsedComments !== null) {
        for (var j = 0; j < parsedComments.length; j++) {
          if (parsedComments[j].ideaId === id) {
            var content = parsedComments[j].content;
            var reinstantiatedComment = new Comment(content, id);
            ideaComments.push(reinstantiatedComment);
            allComments.push(reinstantiatedComment);
          }
        }
      }
      var reinstantiatedIdea = new Idea(title, body, id, star, ideaComments);
      ideas.push(reinstantiatedIdea);

    }
    displayCards();
  }
}

function activeSearchFilter() {
  var titleArray = document.querySelectorAll('#idea-title');
  var bodyArray = document.querySelectorAll('#idea-body');
  var titleCharacters;
  var bodyCharacters;
  for (i = 0; i < titleArray.length; i++) {
    titleCharacters = titleArray[i].innerText.toLowerCase();
    bodyCharacters = bodyArray[i].innerText.toLowerCase();
    if (titleCharacters.includes(searchBox.value.toLowerCase()) || bodyCharacters.includes(searchBox.value.toLowerCase())) {
      titleArray[i].parentNode.parentNode.classList.remove('hidden');
    } else {
      titleArray[i].parentNode.parentNode.classList.add('hidden');
    }
  }
}

function showStarredIdeas() {
  if (showStarredIdeasButton.innerText === `Show Starred Ideas`) {
    showStarredIdeasButton.innerText = `Show All Ideas`;
  } else {
    showStarredIdeasButton.innerText = `Show Starred Ideas`;
  }
  displayCards();
}

function createIdeaComment(event) {
  event.preventDefault();

  var content = commentInput.value;
  var savedComment = new Comment(content, ideaIdWithComment);
  allComments.push(savedComment);

  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaIdWithComment && !ideas[i].comments.length) {
      ideas[i].comments = [savedComment];
      ideas[i].saveToStorage(ideas);

    } else if (ideas[i].id === ideaIdWithComment && ideas[i].comments.length) {
      ideas[i].comments.push(savedComment);
      ideas[i].saveToStorage(ideas);
    }
  }
  savedComment.saveToStorage(allComments);
  commentInput.value = "";
  addACommentButton.disabled = true;
  displayComments();
}

function showCommentForm() {
  ideaForm.classList.add('hidden');
  commentForm.classList.remove('hidden');
  displayComments();
}

function validateUserComment() {
  if (commentInput.value) {
    addACommentButton.disabled = false;
  } else {
    addACommentButton.disabled = true;
  }
}

function returnToMainPageForm(event) {
  event.preventDefault();
  ideaForm.classList.remove('hidden');
  commentForm.classList.add('hidden');
}

function displayComments() {
  listOfComments.innerHTML = "";
  for (var i = 0; i < allComments.length; i++) {
    if (allComments[i].ideaId === ideaIdWithComment) {
      listOfComments.innerHTML += `<li>${allComments[i].content}</li>`;
    }
  }
}
