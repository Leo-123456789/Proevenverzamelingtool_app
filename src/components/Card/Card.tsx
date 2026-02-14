import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  elevated?: boolean
}

export const Card = ({ children, className = '', title, elevated = false }: CardProps) => {
  const baseStyles = 'bg-white rounded-lg p-6'
  const shadowStyles = elevated ? 'shadow-lg' : 'shadow'

  return (
    <div className={`${baseStyles} ${shadowStyles} ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>}
      {children}
    </div>
  )
}
