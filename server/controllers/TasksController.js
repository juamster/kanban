import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { tasksService } from "../services/TasksService";

export class TasksController extends BaseController {
  // constructor() {
  //   super("api/tasks");
  //   this.router
  //     .use(Auth0Provider.getAuthorizedUserInfo)
  //     .get("/:listId", this.getAllTasks)
  //     .get("/:taskId", this.getOneTask)
  //     .delete("/:taskId", this.delete)
  //     .post("", this.create)
  //     .put("/:taskId", this.update);
  // }

  constructor() {
    super("api/");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("lists/:listId/tasks", this.getAllTasks)
      .get("boards/:boardId/tasks", this.getAllTasksOnBoard)
      .get("tasks/:taskId", this.getOneTask)
      .delete("tasks/:taskId", this.delete)
      .post("tasks/", this.create)
      .put("tasks/:taskId", this.update);
  }
  /* gets all tasks for a particular list */
  async getAllTasks(req, res, next) {
    try {
      let tasks = await tasksService.getAll(req.userInfo.email, req.params.listId);
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }
  /* get all the tasks for a particular board */
  async getAllTasksOnBoard(req, res, next) {
    try {
      let tasks = await tasksService.getAllOnBoard(req.userInfo.email, req.params.boardId);
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }
  async getOneTask(req, res, next) {
    try {

      let task = await tasksService.getOne(req.userInfo.email, req.params.taskId);
      res.send(task);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE ONLY TRUST THE SERVER TO DO THIS
      req.body.creatorEmail = req.userInfo.email;
      let task = await tasksService.create(req.body);
      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let task = await tasksService.delete(req.userInfo.email, req.params.taskId);
      res.send(task);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {

      let task = await tasksService.update(req.params.taskId, req.body);
      res.send(task);
    } catch (e) {
      next(e);
    }
  }
}