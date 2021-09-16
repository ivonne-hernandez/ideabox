var titleInput = document.querySelector('.main-input-title');
var bodyInput = document.querySelector('.main-input-body');
var saveButton = document.querySelector('.main-input-save');
var ideaCardGrid = document.querySelector('.idea-container');






//Event Listeners Go Here 👇
saveButton.addEventListener('click', createIdeaCard);
ideaCardGrid.addEventListener('click', handleIdeaCardGridClick);

var ideas = [];

//Event Handlers Go Here 👇
function createIdeaCard(event) {
  event.preventDefault();
  validateUserInput();
  var savedIdea = new Idea(titleInput.value, bodyInput.value);
  ideas.push(savedIdea);
  displayCards();
  savedIdea.saveToStorage(ideas);
}
//if user input fields true, create instance of Idea class, .push into ideas[]


function validateUserInput() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  if (!userTitle || !userBody) {
    alert("💡 Please Enter a Title and Body to Save Your Idea 💡");
    return;
  }
}
//make sure both input fields hold data before save button can be clicked:
//if !userInput, then display alert to let user know to first input data into each box.


function displayCards() {
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaCardGrid.innerHTML +=
    `<div class="box-container" id="${ideas[i].id}">
      <div class="box-header-container">
        <button class="star-btn"><img src="./assets/star-active.svg"></button>
        <button class="delete-btn"><img src="./assets/delete.svg"></button>
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

function deleteIdea() {
  //get the id of the target that the user clicked on (using a for loop).
  //splice the element from the array
  //savedIdea.deleteFromStorage();
}

function handleIdeaCardGridClick(event) {
  console.dir(event.target);
  //delegates events based on what was clicked
  //get the id of the card that was clicked on
}









//var starredIdeas = [display when user clicks on "Show Starred Ideas"];
