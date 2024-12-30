import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Card } from './ui/card'
import { useDebounce } from '@/hooks/use-debounce'

const defaultCode = `import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="p-4">
      <Button>Click me</Button>
    </div>
  )
}`

export function ComponentViewer() {
  const [code, setCode] = useState(defaultCode)
  const [error, setError] = useState<string | null>(null)
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const debouncedCode = useDebounce(code, 500)

  useEffect(() => {
    const transformAndExecute = async (sourceCode: string) => {
      try {
        // Create a blob with the component code
        const blob = new Blob([sourceCode], { type: 'text/javascript' })
        const url = URL.createObjectURL(blob)

        // Import the component dynamically
        const module = await import(/* @vite-ignore */ url)
        setComponent(() => module.default)
        setError(null)
      } catch (err) {
        console.error('Error loading component:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
        setComponent(null)
      }
    }

    transformAndExecute(debouncedCode)
  }, [debouncedCode])

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <div className="h-full">
        <Card className="h-full">
          <Editor
            height="100%"
            defaultLanguage="typescript"
            defaultValue={defaultCode}
            theme="vs-dark"
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
          />
        </Card>
      </div>
      <div className="h-full">
        <Card className="h-full p-4 flex flex-col">
          <div className="flex-1 relative">
            {error ? (
              <pre className="text-red-500 p-4 whitespace-pre-wrap">{error}</pre>
            ) : Component ? (
              <div className="p-4 bg-background rounded-lg">
                <Component />
              </div>
            ) : (
              <div className="text-muted-foreground">Loading...</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}