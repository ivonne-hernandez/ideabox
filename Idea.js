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
  localStorage.setItem('stringifiedIdeas', stringifiedIdeas);
}
// deleteFromStorage
deleteFromStorage() {
  var retrievedIdeas = localStorage.getItem('stringifiedIdeas');
  var parsedIdeas = JSON.parse(retrievedIdeas);
  for (var i = 0; i < parsedIdeas.length; i ++) {
    if (this.id === parsedIdeas[i].id) {
      parsedIdeas.splice(i, 1);
    }
  }
  this.saveToStorage(parsedIdeas);
  //this specific idea's identity will need to be handled in main.js, when invoked/found this param will be passed into this function
  // localStorage.removeItem(retrievedIdeas);
  // var parsedIdea = JSON.parse(retrievedIdea);
}
// updateIdea (should update the idea’s starred state)


}
//no DOM manipulation in classes
