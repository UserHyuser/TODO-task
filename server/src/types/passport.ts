import * as mongoose from 'mongoose';
import { User } from '../models/UserModel';

export type SerializeUserDone = (err: any, id: mongoose.Types.ObjectId) => void;
export type DeserializeUserDone = (err: any, user?: User) => void;
export type PassportStrategyDone = (err: any, user?: User, options?: { message: string }) => void;
