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

  deleteFromStorage() {
    var retrievedIdeas = localStorage.getItem('stringifiedIdeas');
    var parsedIdeas = JSON.parse(retrievedIdeas);
    for (var i = 0; i < parsedIdeas.length; i ++) {
      if (this.id === parsedIdeas[i].id) {
        parsedIdeas.splice(i, 1);
      }
    }
    this.saveToStorage(parsedIdeas);
  }

  updateIdea() {
    var retrievedIdeas = localStorage.getItem('stringifiedIdeas');
    var parsedIdeas = JSON.parse(retrievedIdeas);
    for (var i = 0; i < parsedIdeas.length; i ++) {
      if (this.id === parsedIdeas[i].id) {
        parsedIdeas[i].star = !parsedIdeas[i].star;
      }
    }
    this.saveToStorage(parsedIdeas);
  }
}
