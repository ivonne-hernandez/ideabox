var titleInput = document.querySelector('.main-input-title');
var bodyInput = document.querySelector('.main-input-body');
var saveButton = document.querySelector('#save-button');
var ideaCardGrid = document.querySelector('.idea-container');
var deleteButton = document.querySelector('.delete-btn');
var searchBox = document.querySelector('#search-box');
var showStarredIdeasButton = document.querySelector('#show-starred-ideas-button');

//Event Listeners
saveButton.addEventListener('click', createIdeaCard);
ideaCardGrid.addEventListener('click', handleIdeaCardGridClick);
titleInput.addEventListener('keyup', validateUserInput);
bodyInput.addEventListener('keyup', validateUserInput);
searchBox.addEventListener('keyup', activeSearchFilter);
showStarredIdeasButton.addEventListener('click', showStarredIdeas);//

var ideas = [];
persistOnPageLoad();

//Event Handlers
function createIdeaCard(event) {
  event.preventDefault();
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var id = Date.now();
  var star = false;

  var savedIdea = new Idea(userTitle, userBody, id, star);
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
    return;
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
}

function generateInnerHTML(idea) {
  var starSource;
  if (idea.star) {
    starSource = "./assets/star-active.svg";
  } else {
    starSource = "./assets/star.svg";
  }
  return `<div class="box-container" id="${idea.id}">
    <div class="box-header-container">
      <input class="star-btn" type="image" name="star button" src="${starSource}" alt="picture-of-a-star">
      <input class="delete-btn" type="image" name="delete button" src="./assets/delete.svg" alt="picture-of-an-x">
    </div>
    <div class="title-body-container">
      <label class="idea-title">${idea.title}</label>
      <div class="idea-body-container">
        <p class="idea-body">${idea.body}</p>
      </div>
    </div>
    <div class="box-footer-container">
      <button class="comment-btn"><img src="./assets/comment.svg"></button>
      <label class="comment-label">Comment</label>
    </div>
  </div>`;
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
  var ideaId = Number(event.target.closest('.box-container').id);
  if (event.target.classList.contains('delete-btn')) {
    deleteIdeaCard(ideaId);
  }

  if (event.target.classList.contains('star-btn')) {
    favoriteIdeaCard(ideaId);
  }

  displayCards();
}

function persistOnPageLoad() {
  var ideasFromStorage = localStorage.getItem('stringifiedIdeas');
  if (ideasFromStorage !== null) {
    var parsedIdeasFromStorage = JSON.parse(ideasFromStorage);
    for (var i = 0; i < parsedIdeasFromStorage.length; i++) {
      var title = parsedIdeasFromStorage[i].title;
      var body = parsedIdeasFromStorage[i].body;
      var id = parsedIdeasFromStorage[i].id;
      var star = parsedIdeasFromStorage[i].star;

      var reinstantiatedIdea = new Idea(title, body, id, star);
      ideas.push(reinstantiatedIdea);
    }
    displayCards();
  }
}

function activeSearchFilter() {
  var titleArray = document.querySelectorAll('.idea-title');
  var bodyArray = document.querySelectorAll('.idea-body');
  var titleCharacters;
  var bodyCharacters;
  for(i = 0; i < titleArray.length; i++) {
    titleCharacters = titleArray[i].innerText.toLowerCase();
    bodyCharacters = bodyArray[i].innerText.toLowerCase();
      if(titleCharacters.includes(event.target.value.toLowerCase()) || bodyCharacters.includes(event.target.value.toLowerCase())) {
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
