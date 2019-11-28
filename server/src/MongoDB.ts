import * as mongoose from 'mongoose';
import {Mongoose} from 'mongoose';
import config from './config';

class MongoDB {
  private dbUri: string;

  constructor(uri?: string) {
    this.dbUri = uri || config.get('db.uri');
  }

  public connect(): Promise<Mongoose> {
    return mongoose.connect(this.dbUri);
  }

  public disconnect(): Promise<void> {
    return mongoose.disconnect();
  }

  public migrate() : void {
    return; // todo: migration example
  }
}

export default MongoDB;
