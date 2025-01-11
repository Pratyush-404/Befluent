import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ReactNode } from 'react'
import { supa } from '../supabase'

function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
const logError = (error: Error, info: { componentStack?: string | null }) => {
  supa.functions.invoke('resend', {
    body: { html: JSON.stringify({ error, info }) },
  })
}
export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={logError}>
      {children}
    </ReactErrorBoundary>
  )
}
