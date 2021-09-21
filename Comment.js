class Comment {
  constructor(content, ideaId) {
    this.content = content;
    this.ideaId = ideaId;
  }

  saveToStorage(comments) {
    var stringifiedComments = JSON.stringify(comments);
    localStorage.setItem('stringifiedComments', stringifiedComments);
  }

  deleteFromStorage() {
    var retrievedComments = localStorage.getItem('stringifiedComments');
    var parsedComments = JSON.parse(retrievedComments);
    for (var i = 0; i < parsedComments.length; i ++) {
      if (this.id === parsedComments[i].id) {
        parsedComments.splice(i, 1);
      }
    }
    this.saveToStorage(parsedComments);
  }
}


// When I click the “Add” icon on an idea card,
// A form to add a comment appears