var titleInput = document.querySelector('.main-input-title');
var bodyInput = document.querySelector('.main-input-body');
var saveButton = document.querySelector('.main-input-save');
var ideaCardGrid = document.querySelector('.idea-container');





//Event Listeners Go Here 👇
saveButton.addEventListener('click', createIdeaCard);


var ideas = [];





//Event Handlers Go Here 👇
function createIdeaCard(event) {
  event.preventDefault();
  validateUserInput();
  var savedIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(savedIdea);
  displayCard();
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


function displayCard() {
  var savedIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(savedIdea);
  ideaCardGrid.innerHTML +=
    `<div class="box-container">
    <div class="box-header-container">
      <button class="star-btn"><img src="./assets/star-active.svg"></button>
      <button class="delete-btn"><img src="./assets/delete.svg"></button>
    </div>
    <div class="title-body-container">
      <label class="idea-title">${savedIdea.title}</label>
      <div class="idea-body-container">
        <p class"idea-body">${savedIdea.body}</p>
      </div>
    </div>
    <div class="box-footer-container">
      <button class="comment-btn"><img src="./assets/comment.svg"></button>
      <label class="comment-label">Comment</label>
    </div>
  </div>`
}

  // when user saves card, fire this function to display new instance on the DOM, inside of a card


// As a user,
//
// When I click “Save”,
// If I entered information in both the “Title” and “Body” input fields,
// I should see a new Idea instance with the provided title and body appear in the ideas array
// I should see a new idea card with the provided title and body appear on the DOM









//var starredIdeas = [display when user clicks on "Show Starred Ideas"];
