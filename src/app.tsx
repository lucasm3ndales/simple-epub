import './app.css'
import { AppHeaderComponent } from './components/app-header-component'
import { ActionBarComponent } from './components/action-bar-component'
import { DropzoneComponent } from './components/dropzone-component'
import { FilesQueueComponent } from './components/files-queue-component'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased font-sans">
      <AppHeaderComponent />
      
      <main className="flex-1 flex flex-col items-start p-4 pb-24 gap-6 max-w-4xl mx-auto w-full">
        <div className="w-full flex flex-col gap-8 py-8">
          <DropzoneComponent />
          <FilesQueueComponent />
        </div>
      </main>

      <ActionBarComponent />
    </div>
  )
}

export default App
