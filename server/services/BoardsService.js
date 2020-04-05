import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BoardsService {

  async getAll(email) {
    // TODO BL goes here
    let boards = await dbContext.Boards.find({ creatorEmail: email });
    // return await dbContext.Boards.find({ query }).populate("creator", "name picture -email");
    return (boards);
  }
  /* get one board for this users email */
  async getOne(email, boardId) {
    // TODO BL goes here

    return await dbContext.Boards.findOne({
      _id: boardId,
      creatorEmail: email
    });
  }
  async create(boardData) {

    // let board = await dbContext.Boards.create(req.body);

    return await dbContext.Boards.create(boardData);
  }

  async delete(email, id) {

    return await dbContext.Boards.findByIdAndRemove({ creatorEmail: email, _id: id });
  }

  async update(boardId, newData) {

    return await dbContext.Boards.findByIdAndUpdate(boardId, newData, {
      new: true
    });

  }
}

export const boardsService = new BoardsService();