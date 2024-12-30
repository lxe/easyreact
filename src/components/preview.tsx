import { ErrorBoundary } from './error-boundary'
import { Card } from './ui/card'

interface PreviewProps {
  Component: React.ComponentType | null
  error: string | null
}

export function Preview({ Component, error }: PreviewProps) {
  return (
    <Card className="h-full p-4 flex flex-col">
      <div className="flex-1 relative">
        {error ? (
          <pre className="text-red-500 p-4 whitespace-pre-wrap overflow-auto max-h-full">
            {error}
          </pre>
        ) : Component ? (
          <ErrorBoundary>
            <div className="p-4 bg-background rounded-lg overflow-auto max-h-full">
              <Component />
            </div>
          </ErrorBoundary>
        ) : (
          <div className="text-muted-foreground">Loading...</div>
        )}
      </div>
    </Card>
  )
}