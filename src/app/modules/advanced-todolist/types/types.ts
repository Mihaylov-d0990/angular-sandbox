export interface ITodoItem {
  id: number;
  datetime: Date;
  text: string;
  completed: boolean;
  extra?: string;
}

export class TodoItem implements ITodoItem {
  id: number;
  datetime: Date;
  text: string;
  completed: boolean;
  extra?: string;

  constructor(object: any) {
    for(const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        switch (key) {
          case 'datetime':
            this[key] = object[key] ? object[key].seconds ? new Date(object[key].seconds) : object[key] : null;
            break;
          default:
            this[key as keyof this] = object[key];
            break;
        }
      }
    }
  }
}