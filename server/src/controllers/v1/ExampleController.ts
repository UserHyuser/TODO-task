import { Router, Request, Response, NextFunction } from 'express';
import * as VError from 'verror';
import axios from 'axios';
import { ExampleService } from '../../services';
import Logger from '../../Logger';
import BaseController from '../BaseController';
import config from '../../config';
import * as mongoose from 'mongoose';
import {Mongoose} from 'mongoose';


const logger = new Logger();
let Task = mongoose.model('Tasks');

class ExampleController extends BaseController {
  public init(): void {
    this.router.get('/', this.get);
    this.router.get('/sum', this.getSum);
    this.router.get('/bitcoin', this.getBitcoinPrice); // add ToDo
    this.router.get('/tasks', this.listAllTasks);
    this.router.post('/tasks', this.createTask);
    this.router.get('/tasks/:taskId', this.readTask);
    this.router.post('/tasks/:taskId', this.updateTask);
    this.router.get('/tasks/:taskId.remove', this.deleteTask);
  }

  public get(req: Request, res: Response, next: NextFunction): Response {
    logger.info('exampleController index route entered');

    return res.json({ result: 'exampleController' });
  }

  public getSum(req: Request, res: Response, next: NextFunction): Response {
    logger.info('exampleController /sum route entered');

    const first = 3;
    const second = 5;

    const sum = ExampleService.add(first, second);
    return res.json({ sum });
  }

  public async getBitcoinPrice(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    const bitcoinUrl = config.get('bitcoinUrl');

    try {
      const response = await axios.get(bitcoinUrl);

      return res.json({ price: response.data[0].price_usd });
    } catch (err) {
      return next(err instanceof Error ? err : new VError(err));
    }
  }
  // Мое
  public async listAllTasks (req : Request, res : Response) {
    const tasks = await Task.find({});
    res.json(tasks)
  };
  public async createTask (req : Request, res : Response) { // Коллбеки у асинхронных функций
    let new_task = new Task(req.body);
    new_task.save(function(err : Error, task) {
      if (err) res.send(err);
      res.json({ message: 'Task was successfully created' });
    });
  };
  
  public async readTask (req : Request, res : Response) {
    Task.findById(req.params.taskId, function(err : Error, task) {
      if (err) res.send(err);
      res.json(task);
    });
  };
  
  
  public async updateTask (req : Request, res : Response) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err : Error, task) {
      if (err) res.send(err);
      res.json({ message: 'Task was successfully updated' });
    });
  };
  
  public async deleteTask (req : Request, res : Response) : Promise<Response|void> {
    await Task.remove({
      _id: req.params.taskId
    }, function() {
      //if (err) res.send(err);//
      return res.json({ message: 'Task was successfully deleted' });
    });
  };
}

export default ExampleController;
