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
  }
}