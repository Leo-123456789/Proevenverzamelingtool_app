import * as XLSX from 'xlsx'

export interface ParsedExcelData {
  fileName: string
  headers: string[]
  data: unknown[][]
}

export const parseExcelFile = (file: File): Promise<ParsedExcelData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer
        const workbook = XLSX.read(buffer, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][]

        if (data.length === 0) {
          reject(new Error('Excel file is empty'))
          return
        }

        const headers = (data[0] as string[]) || []
        const rows = data.slice(1)

        resolve({
          fileName: file.name,
          headers,
          data: rows,
        })
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const validateExcelFile = (file: File): string | null => {
  if (file.size > 5 * 1024 * 1024) {
    return 'File is too large (max 5MB)'
  }

  const hasValidType = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
  ].includes(file.type)

  const hasValidExtension = ['.xlsx', '.xls', '.csv'].some((ext) => file.name.toLowerCase().endsWith(ext))

  if (!hasValidType && !hasValidExtension) {
    return 'Please upload a valid Excel file (.xlsx, .xls) or CSV'
  }

  return null
}
