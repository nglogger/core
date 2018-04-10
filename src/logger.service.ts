'use strict';
/* tslint:disable:ter-padded-blocks max-classes-per-file */
/* Imports */
import { Injectable } from '@angular/core';

import { Transport } from './transport';


/* Interfaces */
export type Scope = string;
export type Level =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'verbose'
  | 'trace'
  | 'debug'
  ;
export type Meta = object | Error;
export type LogLevel = (scope: Scope, subject: string, meta?: Meta) => void;
export type ScopedLogLevel = (subject: string, meta?: Meta) => void;

export interface LoggerLevels {
  fatal:   LogLevel;
  error:   LogLevel;
  warn:    LogLevel;
  info:    LogLevel;
  verbose: LogLevel;
  trace:   LogLevel;
  debug:   LogLevel;
}

export interface ScopedLoggerLevels {
  fatal:   ScopedLogLevel;
  error:   ScopedLogLevel;
  warn:    ScopedLogLevel;
  info:    ScopedLogLevel;
  verbose: ScopedLogLevel;
  trace:   ScopedLogLevel;
  debug:   ScopedLogLevel;
}

export interface Scopable {
  scope(scope: Scope): ScoppedLogger;
}


/* Helpers */
const stubUndefined = () => undefined;


/* Loggers */
export class ScoppedLogger implements ScopedLoggerLevels, Scopable {
  constructor(
    private _logger: Logger,
    private _scope:  Scope
  ) {}

  fatal(subject: string, meta?: Meta): void {
    return this._logger.fatal(this._scope, subject, meta);
  }

  error(subject: string, meta?: Meta): void {
    return this._logger.error(this._scope, subject, meta);
  }

  warn(subject: string, meta?: Meta): void {
    return this._logger.warn(this._scope, subject, meta);
  }

  info(subject: string, meta?: Meta): void {
    return this._logger.info(this._scope, subject, meta);
  }

  verbose(subject: string, meta?: Meta): void {
    return this._logger.verbose(this._scope, subject, meta);
  }

  trace(subject: string, meta?: Meta): void {
    return this._logger.trace(this._scope, subject, meta);
  }

  debug(subject: string, meta?: Meta): void {
    return this._logger.debug(this._scope, subject, meta);
  }

  scope(scope: Scope): ScoppedLogger {
    return new ScoppedLogger(this._logger, scope);
  }
}


@Injectable()
export class Logger implements LoggerLevels, Scopable {
  constructor(
    private _transports: Transport[]
  ) {}

  fatal(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('fatal', scope, subject, meta);
  }

  error(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('error', scope, subject, meta);
  }

  warn(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('warn', scope, subject, meta);
  }

  info(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('info', scope, subject, meta);
  }

  verbose(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('verbose', scope, subject, meta);
  }

  trace(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('trace', scope, subject, meta);
  }

  debug(scope: Scope, subject: string, meta?: Meta): void {
    return this._log('debug', scope, subject, meta);
  }

  scope(scope: Scope): ScoppedLogger {
    return new ScoppedLogger(this, scope);
  }

  private _log(
    level: Level,
    scope: Scope,
    subject: string,
    meta?: Meta
  ): void {
    Promise.all(this._transports.map((transport) => (
      transport.log(level, scope, subject, meta)
    )))
      .then(stubUndefined)
      .catch(stubUndefined);
  }
}
