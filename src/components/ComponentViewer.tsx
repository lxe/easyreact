import { useState, useEffect, useRef } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import { Card } from './ui/card'
import { useDebounce } from '@/hooks/use-debounce'
import { Preview } from '@/preview/Preview'

// Set up Monaco workers
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string) {
    const version = '0.45.0'
    if (label === 'typescript' || label === 'javascript') {
      return `https://unpkg.com/monaco-editor@${version}/min/vs/language/typescript/ts.worker.js`
    }
    return `https://unpkg.com/monaco-editor@${version}/min/vs/editor/editor.worker.js`
  }
}

const defaultCode = `import { Button } from "@/components/ui/button"

export function Preview() {
  return (
    <div className="p-4">
      <Button variant="default">Click me</Button>
    </div>
  )
}`

const REACT_TYPES = `
type ReactNode = React.ReactNode
type FC<P = {}> = React.FC<P>
declare namespace React {
  type ReactNode = string | number | boolean | ReactElement | ReactFragment | ReactPortal | null | undefined
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T
    props: P
    key: Key | null
  }
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null)
  type Key = string | number
  type ReactFragment = {} | ReactNodeArray
  interface ReactNodeArray extends Array<ReactNode> {}
  interface ReactPortal extends ReactElement {
    key: Key | null
    children: ReactNode
  }
  type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined }
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
  }
  type FC<P = {}> = FunctionComponent<P>
  interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
    defaultProps?: Partial<P> | undefined
    propTypes?: WeakValidationMap<P> | undefined
  }
  interface RefAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined
  }
  type Ref<T> = RefCallback<T> | RefObject<T> | null
  type RefCallback<T> = (instance: T | null) => void
  interface RefObject<T> {
    readonly current: T | null
  }
  interface Attributes {
    key?: Key | null | undefined
  }
  interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
    displayName?: string | undefined
  }
  interface ExoticComponent<P = {}> {
    (props: P): ReactElement | null
  }
  type WeakValidationMap<T> = {
    [K in keyof T]?: null extends T[K]
      ? Validator<T[K] | null | undefined>
      : undefined extends T[K]
      ? Validator<T[K] | null | undefined>
      : Validator<T[K]>
  }
  interface Validator<T> {
    (props: { [key: string]: any }, propName: string, componentName: string, location: string, propFullName: string): Error | null
  }
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'submit' | 'reset' | 'button' | undefined
  }
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string | undefined
    onClick?: ((event: MouseEvent) => void) | undefined
  }
  interface AriaAttributes {}
  interface DOMAttributes<T> {}
  type MouseEvent = any
}
`

const BUTTON_TYPES = `
declare module "@/components/ui/button" {
  import { type ReactNode } from 'react'
  
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
    children?: ReactNode
  }
  
  export const Button: React.FC<ButtonProps>
}
`

function setupMonaco(monaco: Monaco) {
  const compilerOptions: monaco.languages.typescript.CompilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    reactNamespace: "React",
    allowJs: true,
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"]
    }
  }

  // Configure TypeScript defaults
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions)
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions)

  // Set up our virtual file system
  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    { content: REACT_TYPES, filePath: 'file:///node_modules/@types/react/index.d.ts' },
    { content: BUTTON_TYPES, filePath: 'file:///src/components/ui/button.d.ts' }
  ])
}

export function ComponentViewer() {
  const [code, setCode] = useState(defaultCode)
  const [error, setError] = useState<string | null>(null)
  const debouncedCode = useDebounce(code, 500)
  const monacoRef = useRef<Monaco | null>(null)

  useEffect(() => {
    const savePreview = async () => {
      try {
        const response = await fetch('/_preview/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: debouncedCode })
        })
        
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to save preview')
        }
        
        setError(null)
      } catch (err) {
        console.error('Error saving preview:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    savePreview()
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
            beforeMount={(monaco) => {
              monacoRef.current = monaco
              setupMonaco(monaco)
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              tabSize: 2,
              formatOnPaste: true,
              formatOnType: true,
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnCommitCharacter: true,
              wordBasedSuggestions: true,
              parameterHints: {
                enabled: true
              },
              suggest: {
                showKeywords: true,
                showSnippets: true,
                showClasses: true,
                showFunctions: true,
                showVariables: true,
                showModules: true
              }
            }}
          />
        </Card>
      </div>
      <div className="h-full">
        <Card className="h-full p-4 flex flex-col">
          <div className="flex-1 relative">
            {error ? (
              <pre className="text-red-500 p-4 whitespace-pre-wrap">{error}</pre>
            ) : (
              <div className="p-4 bg-background rounded-lg">
                <Preview />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}