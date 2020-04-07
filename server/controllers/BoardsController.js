import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { boardsService } from "../services/BoardsService";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getBoards)
      .get("/:boardId", this.getBoard)
      .delete("/:boardId", this.delete)
      .put("/:boardId", this.update)
      .post("", this.create);
  }

  async getBoards(req, res, next) {
    try {
      req.query.creatorEmail = req.userInfo.email;
      let boards = await boardsService.getAll(req.userInfo.email);
      res.send(boards);
    } catch (error) {
      next(error);
    }
  }
  async getBoard(req, res, next) {
    try {
      let board = await boardsService.getOne(req.userInfo.email, req.params.boardId);
      res.send(board);
    } catch (error) {
      next(error);
    }

  }
  async create(req, res, next) {
    try {
      // NOTE ONLY TRUST THE SERVER TO DO THIS
      req.body.creatorEmail = req.userInfo.email;
      let board = await boardsService.create(req.body);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let board = await boardsService.delete(req.userInfo.email, req.params.boardId);
      res.send(board);
    } catch (e) {
      next(e);
    }
  }
  async update(req, res, next) {
    try {
      let board = await boardsService.update(req.params.boardId, req.body);
      res.send(board);
    } catch (e) {
      next(e);
    }
  }

}