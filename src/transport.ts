'use strict';
/** Imports */
import { ILevel, IScope, IMeta } from './logger.service';


export abstract class Transport {
  abstract log(level: ILevel, scope: IScope, subject: string, meta?: IMeta): Promise<void>;
}
