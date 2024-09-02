import { useState } from 'react'
import ButtonDownload from './components/ButtonDownload'

function App() {
  const [jsonData, setJsonData] = useState<any[]>([])
  const [xlsName, setXlsName] = useState<string>("")
  const [namefile, setNameFile] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // console.log(file)
      setNameFile(file.name)
      setXlsName(file.name)
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setJsonData(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='h-screen bg-slate-950 flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center gap-5'>
        <label htmlFor='file-selector'>
          <input type="file" id="file-selector" className='hidden' accept=".json" onChange={handleFileUpload} />
          <span className='text-white bg-gray-700 rounded-md px-10 py-5 flex items-center justify-center'>Seleccionar archivo JSON</span>
        </label>
        <p className='text-gray-400'>{namefile}</p>
        {jsonData.length > 0 && <p className='text-gray-400'>{jsonData.length} Datos seleccionados</p>}
        <input type="text" className='bg-transparent border-b border-b-slate-600 w-[400px] text-slate-200 text-center' placeholder='Nombre del archivo (opcional)' value={xlsName} onChange={(e) => setXlsName(e.target.value)} />
        <ButtonDownload jsonData={jsonData} nameXls={xlsName} />
      </div>
      
    </div>
  )
}

export default App