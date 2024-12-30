import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Copy, 
  Download, 
  Upload, 
  Loader2,
  MonitorPlay,
  FileCode2
} from 'lucide-react'

interface ToolbarProps {
  onThemeChange: (theme: string) => void
  onReset: () => void
  onCopy: () => void
  onImport: () => void
  onExport: () => void
  isLoading?: boolean
}

export function Toolbar({
  onThemeChange,
  onReset,
  onCopy,
  onImport,
  onExport,
  isLoading
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center space-x-2">
        <FileCode2 className="h-5 w-5" />
        <span className="font-semibold">Component Viewer</span>
      </div>
      <div className="flex items-center space-x-2">
        <Select defaultValue="vs-dark" onValueChange={onThemeChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vs-dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onImport}>
          <Upload className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onExport}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MonitorPlay className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}