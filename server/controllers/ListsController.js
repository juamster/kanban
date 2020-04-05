import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { listsService } from "../services/ListsService";

export class ListsController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/:boardId", this.getAllLists)
      .get("/:listId", this.getOneList)
      .delete("/:listId", this.delete)
      .post("", this.create)
      .put("/:listId", this.update);
  }

  /*  get all the lists on a board */
  async getAllLists(req, res, next) {
    try {
      let lists = await listsService.getAll(req.userInfo.email, req.params.boardId);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }
  async getOneList(req, res, next) {
    try {
      let list = await listsService.getOne(req.userInfo.email, req.params.listId);
      res.send(list);
    } catch (error) {
      next(error);
    }

  }
  async create(req, res, next) {
    try {
      // NOTE ONLY TRUST THE SERVER TO DO THIS
      req.body.creatorEmail = req.userInfo.email;
      let list = await listsService.create(req.body);
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let list = await listsService.delete(req.userInfo.email, req.params.listId);
      res.send(list);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let list = await listsService.update(req.params.listId, req.body);
      res.send(list);
    } catch (e) {
      next(e);
    }
  }
}