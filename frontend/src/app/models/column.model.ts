export class Column {
  constructor(public name: string, public tasks: string[]) {}

  addColumn(object: any, name: string) {
    object.push(new Column(name, []));
  }
}
