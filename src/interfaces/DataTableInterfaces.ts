export interface TableRow {
  [key: string]: string
}

export interface ColumnDef {
  field: string
  header: string
}

export interface DataResult {
  columns: ColumnDef[]
  data: TableRow[]
}


