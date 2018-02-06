import { HttpParams } from '@angular/common/http';

export function parameterize(obj: any): HttpParams {
  return obj
    ? Object.keys(obj).reduce((p: HttpParams, key: string) => {
        if (obj[key] instanceof Date) {
          p = p.set(key, (obj[key] as Date).toISOString());
        } else if (
          obj[key] !== '' &&
          obj[key] !== undefined &&
          obj[key] !== null &&
          typeof obj[key] !== 'function'
        ) {
          p = p.set(key, obj[key]);
        }

        return p;
      }, new HttpParams())
    : new HttpParams();
}

export function serialize(obj: any): any {
  return !obj
    ? obj
    : Object.keys(obj).reduce((p: any, key: string) => {
        if (key === 'dateCreated' || key === 'dateModified') {
          return p;
        }

        if (
          obj[key] !== '' &&
          obj[key] !== undefined &&
          obj[key] !== null &&
          typeof obj[key] !== 'function'
        ) {
          p[key] = obj[key];
        }

        return p;
      }, {});
}
