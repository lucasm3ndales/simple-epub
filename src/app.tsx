import './app.css'
import { AppHeaderComponent } from './components/app-header-component'
import { ActionBarComponent } from './components/action-bar-component'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased font-sans">
      <AppHeaderComponent />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-24 gap-6 max-w-4xl mx-auto w-full">
        <div className="w-full flex flex-col gap-6">
          {/* Dropzone will go here */}
          <div className="h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/30 gap-2">
            <p className="text-xl font-medium">{t('queue.dropzone.title')}</p>
            <p className="text-sm font-mono">{t('queue.dropzone.supported')}</p>
            <p className="text-xs opacity-70">{t('queue.dropzone.browse')}</p>
          </div>

          {/* Queue will go here */}
          <div className="flex-1 border rounded-xl p-4 bg-card min-h-[300px]">
            <h2 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">{t('queue.title')}</h2>
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground italic">
              {t('queue.empty')}
            </div>
          </div>
        </div>
      </main>

      <ActionBarComponent />
    </div>
  )
}

export default App
