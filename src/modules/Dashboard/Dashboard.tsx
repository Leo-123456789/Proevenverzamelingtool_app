import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFileData, setError, setLoading, clearError } from '../../store/slices/dataSlice'
import { showAlert } from '../../store/slices/uiSlice'
import { RootState } from '../../store'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Alert } from '../../components/Alert/Alert'
import { DataTable } from '../../components/DataTable/DataTable'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { parseExcelFile, validateExcelFile } from '../../utils/excel'
import { downloadExcel } from '../../utils/export'
import { DUMMY_DATA } from '../../utils/dummyData'

export const Dashboard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { fileName, headers, data, isLoading, error } = useSelector((state: RootState) => state.data)
  const { showAlert: showAlertUI, alertMessage, alertType } = useSelector((state: RootState) => state.ui)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateExcelFile(file)
    if (validationError) {
      dispatch(showAlert({ message: validationError, type: 'error' }))
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    dispatch(setLoading(true))
    try {
      const result = await parseExcelFile(file)
      dispatch(
        setFileData({
          fileName: result.fileName,
          headers: result.headers,
          data: result.data,
        })
      )
      dispatch(showAlert({ message: 'File successfully uploaded', type: 'success' }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process file'
      dispatch(setError(errorMessage))
      dispatch(showAlert({ message: errorMessage, type: 'error' }))
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleLoadDummyData = () => {
    dispatch(
      setFileData({
        fileName: DUMMY_DATA.fileName,
        headers: DUMMY_DATA.headers,
        data: DUMMY_DATA.data,
      })
    )
    dispatch(showAlert({ message: 'Sample data loaded successfully', type: 'success' }))
  }

  const handleExport = () => {
    if (headers.length === 0 || data.length === 0) {
      dispatch(showAlert({ message: 'No data to export', type: 'warning' }))
      return
    }
    const exportFileName = fileName?.replace(/\.[^/.]+$/, '') || 'export'
    downloadExcel(headers, data, exportFileName)
    dispatch(showAlert({ message: 'Data exported successfully', type: 'success' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Proevenverzamelingtool</h1>
          <p className="text-lg text-gray-600">Upload and view Excel data with ease</p>
        </div>

        {/* Alert */}
        {showAlertUI && alertMessage && (
          <div className="mb-6">
            <Alert
              message={alertMessage}
              type={alertType}
              onClose={() => dispatch({ type: 'ui/hideAlert' })}
            />
          </div>
        )}

        {/* Upload Section */}
        <Card className="mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Excel File</h2>
              <p className="text-gray-600 mb-6">Select an Excel file (.xlsx, .xls) or CSV file to upload and view the data.</p>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".xlsx,.xls,.csv"
                className="hidden"
                aria-label="Upload Excel file"
              />

              <div className="flex gap-4">
                <Button
                  label="Choose File"
                  onClick={() => fileInputRef.current?.click()}
                  variant="primary"
                  size="large"
                  ariaLabel="Click to select spreadsheet file"
                />
                <Button
                  label="Load Sample Data"
                  onClick={handleLoadDummyData}
                  variant="secondary"
                  size="large"
                  ariaLabel="Load example data for demonstration"
                />
              </div>

              {fileName && (
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Selected file:</span> {fileName}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Data Display Section */}
        {isLoading && (
          <Card className="mb-8">
            <LoadingSpinner message="Processing your file..." />
          </Card>
        )}

        {error && !isLoading && (
          <Card className="mb-8">
            <Alert
              message={error}
              type="error"
              onClose={() => dispatch(clearError())}
            />
          </Card>
        )}

        {headers.length > 0 && data.length > 0 && !isLoading && (
          <Card className="mb-8" title="Data Preview">
            <div className="space-y-6">
              <DataTable headers={headers} data={data} />

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Button
                  label="Export to CSV"
                  onClick={handleExport}
                  variant="primary"
                  ariaLabel="Download the data as CSV file"
                />
                <Button
                  label="Upload Another File"
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary"
                  ariaLabel="Select a different spreadsheet file"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {headers.length === 0 && data.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-gray-600 mb-6">No data loaded yet. Upload a file or load sample data to get started.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
