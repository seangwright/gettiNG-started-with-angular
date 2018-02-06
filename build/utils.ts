/**
 *  Logging and correct file path generation utilities for the custom build processes
 */

// tslint:disable:no-console

import { cyan, gray, green, red, yellow } from 'colors/safe';
import { join } from 'path';

class Logger {
  private indentationCount = 0;

  title(msg: string, option: 'reset' | 'clear' | 'continue' = 'reset') {
    if (option === 'continue') {
      msg = this.indent(msg);

      this.indentationCount++;
    } else if (option === 'reset') {
      this.indentationCount = this.indentationCount
        ? this.indentationCount - 1
        : 0;

      msg = `\n${this.indent(msg)}`;

      this.indentationCount++;
    } else if (option === 'clear') {
      this.indentationCount = 0;

      msg = `\n${msg}\n`;

      this.indentationCount++;
    }

    console.log(cyan(msg));
  }

  info(msg: string) {
    console.log(gray(this.indent(msg)));
  }

  success(msg: string) {
    console.log(green(this.indent(msg)));
  }

  warning(msg: string) {
    console.log(yellow(this.indent(msg)));
  }

  error(msg: string) {
    console.log(red(this.indent(msg)));
  }

  newLine(count = 1) {
    console.log(this.repeat('\n', count));
  }

  indent(msg: string) {
    return this.indentationCount
      ? `${this.repeat('~', this.indentationCount)} ${msg}`
      : msg;
  }

  private repeat(char = '', count = 1) {
    return Array.from(Array(count).keys())
      .map(_ => char)
      .join('');
  }
}

export const log = new Logger();

/**
 * Prefixes the given path with the process cwd
 */
export const appPath = (path: string) => join(`${process.cwd()}${path}`);
