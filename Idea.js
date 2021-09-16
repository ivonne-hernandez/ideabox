// var ideas = [];

class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

saveToStorage(ideas) {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringifiedIdeas);
}
// deleteFromStorage
deleteFromStorage(retrieveIdea) {
  var retrievedIdea = localStorage.getItem('idea');
  //this specific idea's identity will need to be handled in main.js, when invoked/found this param will be passed into this function
  localStorage.removeItem(retrievedIdea);
  var parsedIdea = JSON.parse(retrievedIdea);
}
// updateIdea (should update the idea’s starred state)


}
//no DOM manipulation in classes
