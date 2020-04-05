import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {

  /* Get All gets all tasks on a particular listId */
  async getAll(email, listId) {
    //TODO: add a check for email later
    return await dbContext.Tasks.find({ creatorEmail: email, list: listId })
  }

  async getAllByBoardId(email, boardId) {
    //TODO: add a check for email later
    return await dbContext.Tasks.find({ creatorEmail: email, board: boardId })
  }
  /* get one task for this users email */
  async getOne(email, taskId) {
    return await dbContext.Tasks.findOne({
      _id: taskId,
      creatorEmail: email
    });

  }
  async create(taskData) {
    return await dbContext.Tasks.create(taskData);
  }

  async delete(email, taskId) {
    return await dbContext.Tasks.findByIdAndRemove({ creatorEmail: email, _id: taskId });
  }

  async update(taskId, newData) {
    return await dbContext.Tasks.findByIdAndUpdate(taskId, newData), {
      new: true
    };

  }
}

export const tasksService = new TasksService();