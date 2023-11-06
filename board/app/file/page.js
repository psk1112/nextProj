'use client'

import { useState } from "react"

export default function File(){
    const [files, setFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);

    //파일업로드 미리보기
    async function handleFileChange(e){
        const selectedFiles = e.target.files;
        if(selectedFiles){
            setFiles(selectedFiles);

            const filePreviewList = [];
            
            for(let i = 0; i < selectedFiles.length; i++){
                const file = selectedFiles[i];
                console.log(file)
                filePreviewList.push({name: file.name, file});
            }
            setFilePreviews(filePreviewList);
        } else {
            setFiles([]);
            setFilePreviews([]);
        }   
    }

    //파일 미리보기 삭제
    function handleRemoveFile(index){
        const updatedFilePreviews = [...filePreviews];
            updatedFilePreviews.splice(index, 1);
            setFilePreviews(updatedFilePreviews);

        const updatedFiles = [...files];
            updatedFiles.splice(index, 1);
            setFiles(updatedFiles);
    }

    //파일업로드 클릭
    async function handleUpload(){

        setFilePreviews([])
        setFiles([])
        
        if (files.length > 0) {
            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            try {
                await fetch('api/file/upload', { 
                    method: 'POST', 
                    body: formData
                })
                .then(response=> response.json())
                .then(result=>{
                    if(result.statusCode === 200){
                        alert(result.message)
                        window.location.href = '/file/list';
                    }
                })
            } catch (error) {
                
            }
        }
    }

    return(
        <div>
            <div className="uploadBtn">
                <input type="file" name="files" onChange={handleFileChange} multiple id="fileUpload" className="fileBtn"/>
                <label htmlFor="fileUpload" className="customBtn">파일선택</label>
            </div>
            <div className="previewArea">
            {
                filePreviews.length > 0 &&
                filePreviews.map((preview, index) => (
                    <div key={index} className="previewDiv">
                        <button onClick={() => handleRemoveFile(index)} className="cancelBtn">✕</button>
                        <span>{preview.name}</span>
                    </div>
                ))
            }
            </div>    
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}