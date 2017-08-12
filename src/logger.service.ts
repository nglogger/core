'use strict';
/** Imports */
import { Injectable } from '@angular/core';

import { Transport } from './transport';


/** Interfaces */
export type IScope = string;
export type ILevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'verbose'
  | 'trace'
  | 'debug'
  ;
export type IMeta = object | Error;
export type ILogLevel = (scope: IScope, subject: string, meta?: IMeta) => Promise<void>;
export type IScopedLogLevel = (subject: string, meta?: IMeta) => Promise<void>;

export interface ILogger {
  fatal:   ILogLevel;
  error:   ILogLevel;
  warn:    ILogLevel;
  info:    ILogLevel;
  verbose: ILogLevel;
  trace:   ILogLevel;
  debug:   ILogLevel;
}

export interface IScopedLogger {
  fatal:   IScopedLogLevel;
  error:   IScopedLogLevel;
  warn:    IScopedLogLevel;
  info:    IScopedLogLevel;
  verbose: IScopedLogLevel;
  trace:   IScopedLogLevel;
  debug:   IScopedLogLevel;
}


/** Loggers */
export class ScoppedLogger implements IScopedLogger {
  constructor(
    private _logger: Logger,
    private _scope:  IScope
  ) {}

  fatal(subject: string, meta?: IMeta)   { return this._logger.fatal(this._scope, subject, meta); }
  error(subject: string, meta?: IMeta)   { return this._logger.error(this._scope, subject, meta); }
  warn(subject: string, meta?: IMeta)    { return this._logger.warn(this._scope, subject, meta); }
  info(subject: string, meta?: IMeta)    { return this._logger.info(this._scope, subject, meta); }
  verbose(subject: string, meta?: IMeta) { return this._logger.verbose(this._scope, subject, meta); }
  trace(subject: string, meta?: IMeta)   { return this._logger.trace(this._scope, subject, meta); }
  debug(subject: string, meta?: IMeta)   { return this._logger.debug(this._scope, subject, meta); }
}


@Injectable()
export class Logger implements ILogger {
  constructor(
    private _transports: Transport[]
  ) {}

  fatal(scope: IScope, subject: string, meta?: IMeta)   { return this._log('fatal', scope, subject, meta); }
  error(scope: IScope, subject: string, meta?: IMeta)   { return this._log('error', scope, subject, meta); }
  warn(scope: IScope, subject: string, meta?: IMeta)    { return this._log('warn', scope, subject, meta); }
  info(scope: IScope, subject: string, meta?: IMeta)    { return this._log('info', scope, subject, meta); }
  verbose(scope: IScope, subject: string, meta?: IMeta) { return this._log('verbose', scope, subject, meta); }
  trace(scope: IScope, subject: string, meta?: IMeta)   { return this._log('trace', scope, subject, meta); }
  debug(scope: IScope, subject: string, meta?: IMeta)   { return this._log('debug', scope, subject, meta); }

  scope(scope: IScope): ScoppedLogger {
    return new ScoppedLogger(this, scope);
  }

  private _log(level: ILevel, scope: IScope, subject: string, meta?: IMeta): Promise<void> {
    return Promise.all(this._transports.map((transport) => (
      transport.log(level, scope, subject, meta)
    )))
      .then(() => undefined);
  }
}
