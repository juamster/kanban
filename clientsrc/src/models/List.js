export class List {
  /* the creator is the profile object */
  /* the creatorEmail is just the email part */
  /* the first part is setting up defaults */
  /* you can get a new board with no details filled in */

  constructor({
    id = "",
    name = "",
    board = {},
    creator = {},
    creatorEmail = ""
  } = {}) {
    this.id = id;
    this.name = name;
    this.board = board;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}