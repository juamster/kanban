import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {

  /* Get All gets all comments on a particular taskId */
  async getAll(email, taskId) {
    //TODO: add a check for email later
    return await dbContext.Comments.find({ creatorEmail: email, task: taskId })
  }
  /* get one task for this users email */
  async getOne(email, commentId) {
    return await dbContext.Comments.findOne({
      _id: commentId,
      creatorEmail: email
    });

  }
  async create(commentsData) {
    return await dbContext.Comments.create(commentsData);
  }

  async delete(email, commentId) {
    return await dbContext.Comments.findByIdAndRemove({ creatorEmail: email, _id: commentId });
  }

  async update(commentId, newData) {
    return await dbContext.Comments.findByIdAndUpdate(commentId, newData), {
      new: true
    };

  }
}

export const commentsService = new CommentsService();