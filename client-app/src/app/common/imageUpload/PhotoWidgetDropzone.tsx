import  {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props{
    setFiles: (files:any)=>void;
}

export default function PhotoWidgetDropzone({setFiles}:Props) {

  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "dashed 3px #eee",
    paddingTop: "30px",
    textAlign: "center" as "center",
    geight: "200px",
  }

  const dzActive={
    borderColor: "green"
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file:any)=>Object.assign(file, {
        preview : URL.createObjectURL(file)
    })))
  }, [setFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} />
        <Icon name='upload' size='huge'/>
        <Header content="drop image here"/>
    </div>
  )
}