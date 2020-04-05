
import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/:taskId", this.getAllComments)
      .get("/:commentId", this.getOneComment)
      .delete("/:commentId", this.delete)
      .post("", this.create)
      .put("/:commentId", this.update);
  }
  /* gets all comments for a particular task */
  async getAllComments(req, res, next) {
    try {
      let comments = await commentsService.getAll(req.userInfo.email, req.params.taskId);
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
  async getOneComment(req, res, next) {
    try {
      let comment = await commentsService.getOne(req.userInfo.email, req.params.commentId);
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE ONLY TRUST THE SERVER TO DO THIS
      req.body.creatorEmail = req.userInfo.email;
      let comment = await commentsService.create(req.body);
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let comment = await commentsService.delete(req.userInfo.email, req.params.commentId);
      res.send(comment);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let comment = await commentsService.update(req.params.commentId, req.body);
      res.send(comment);
    } catch (e) {
      next(e);
    }
  }
}