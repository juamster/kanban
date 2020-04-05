import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListsService {

  async getAll(email, boardId) {
    //TODO: add a check for email later
    return await dbContext.Lists.find({ creatorEmail: email, board: boardId })
  }
  /* get one list for this users email */
  async getOne(email, listId) {


    return await dbContext.Lists.findOne({
      _id: listId,
      creatorEmail: email
    });

    // return await dbContext.Lists.findById({ listId });
  }
  async create(listData) {
    return await dbContext.Lists.create(listData);
  }

  async delete(email, id) {

    return await dbContext.Lists.findByIdAndRemove({ creatorEmail: email, _id: id });
  }

  async update(listId, newData) {

    return await dbContext.Lists.findByIdAndUpdate(listId, newData), {
      new: true
    };

  }
}

export const listsService = new ListsService();