var titleInput = document.querySelector('.main-input-title');
var bodyInput = document.querySelector('.main-input-body');
var saveButton = document.querySelector('.main-input-save');





//Event Listeners Go Here 👇
saveButton.addEventListener('click', createIdeaCard);


var ideas = [];





//Event Handlers Go Here 👇
function createIdeaCard(event) {
  console.log("it works")
  event.preventDefault();
  validateUserInput();
  var savedIdea = new Idea(titleInput.value, bodyInput.value)
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
  // when user saves card, fire this function to display new instance on the DOM, inside of a card
}

// As a user,
//
// When I click “Save”,
// If I entered information in both the “Title” and “Body” input fields,
// I should see a new Idea instance with the provided title and body appear in the ideas array
// I should see a new idea card with the provided title and body appear on the DOM









//var starredIdeas = [display when user clicks on "Show Starred Ideas"];
