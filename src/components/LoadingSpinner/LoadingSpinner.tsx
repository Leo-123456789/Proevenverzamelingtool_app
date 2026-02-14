import React from 'react'

export const LoadingSpinner = ({ message = 'Laden...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )
}
