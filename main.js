var titleInput = document.querySelector('.main-input-title');
var bodyInput = document.querySelector('.main-input-body');
var saveButton = document.querySelector('#save-button');
var ideaCardGrid = document.querySelector('.idea-container');
var deleteButton = document.querySelector('.delete-btn');




//Event Listeners Go Here 👇
saveButton.addEventListener('click', createIdeaCard);
ideaCardGrid.addEventListener('click', handleIdeaCardGridClick);
titleInput.addEventListener('keyup', validateUserInput);
bodyInput.addEventListener('keyup', validateUserInput);


var testIdea = new Idea("test title", "test body");
var testIdea2 = new Idea("test title 2", "test body 2");
var ideas = [testIdea, testIdea2];
displayCards();

//Event Handlers Go Here 👇
function createIdeaCard(event) {
  event.preventDefault();

  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var savedIdea = new Idea(titleInput.value, bodyInput.value);
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
  for (var i = 0; i < ideas.length; i++) {
    ideaCardGrid.innerHTML +=
    `<div class="box-container" id="${ideas[i].id}">
      <div class="box-header-container">
      <input class="star-btn" type="image" name="star button" src="./assets/star.svg" alt="picture-of-a-star">
      <input class="delete-btn" type="image" name="delete button" src="./assets/delete.svg" alt="picture-of-an-x">
      </div>
      <div class="title-body-container">
        <label class="idea-title">${ideas[i].title}</label>
        <div class="idea-body-container">
          <p class"idea-body">${ideas[i].body}</p>
        </div>
      </div>
      <div class="box-footer-container">
        <button class="comment-btn"><img src="./assets/comment.svg"></button>
        <label class="comment-label">Comment</label>
      </div>
    </div>`;
  }
}

function deleteIdeaCard(ideaId) {
  for (var i = 0; i < ideas.length; i ++) {
    if (ideaId === ideas[i].id) {
      ideas.splice(i, 1);
      displayCards();
    }
  }
  // if (event.target.classList.contains('delete-btn')){
  //     event.target.parentNode.parentNode.classList.add('hidden')
  //   };
}
  // console.log(event.target);
  // if (event.target.classList.contains('delete-btn')){
  //     event.target.parentNode.parentNode.classList.add('hidden')
  //   };
    //when user clicks the delete button, card needs to disappear from page and be removed from local storage with localStorage.removeItem()
    //add the hidden class to the card after click
    //PERMANENTLY removed from ideas array .splice
    //for loop imminent
    //event.target.id

function handleIdeaCardGridClick(event) {

  //if(delete button is clicked) > do this
  if (event.target.classList.contains('delete-btn')) {
    var ideaId = Number(event.target.closest('.box-container').id);
    deleteIdeaCard(ideaId);
  }
  //if event.target is the delete-btn then delete the idea card using the event.target(id);
  //if(star button is clicked) > do this
  //if(comment button is clicked) > do this

  //delegates events based on what was clicked
  //get the id of the card that was clicked on
}









//var starredIdeas = [display when user clicks on "Show Starred Ideas"];
