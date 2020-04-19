export class Task {
  /* the creator is the profile object */
  /* the creatorEmail is just the email part */
  /* the first part is setting up defaults */
  /* you can get a new Task with no details filled in */

  constructor({
    id = "",
    name = "",
    description = "",
    list = "",
    board = "",
    creator = {},
    creatorEmail = ""
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.board = board;
    this.list = list;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}