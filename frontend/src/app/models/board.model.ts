import { Column } from './column.model';

export class Board {
  constructor(public boardName: string, public columns: Column[]) {}
}
