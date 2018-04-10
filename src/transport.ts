'use strict';
/* Imports */
import { Level, Meta, Scope } from './logger.service';


export abstract class Transport {
  abstract log(
    level: Level,
    scope: Scope,
    subject: string,
    meta?: Meta
  ): Promise<void> | void;
}
