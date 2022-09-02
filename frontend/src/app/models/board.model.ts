import { Column } from './column.model';

export class Board {
  constructor(public boardName: string, public columns: Column[]) {}

  changeName(name: string): void {
    this.boardName = name;
  }

  arrayToColumns(objArray: any): Column[] {
    let arr: Column[] = [];
    for (const item of objArray) {
      arr.push(new Column(item[0], item[1]));
    }
    return arr;
  }
}
