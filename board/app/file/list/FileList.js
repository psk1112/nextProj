'use client'

import * as ExcelJS from 'exceljs';

export default function Handler({result}) {

const downloadExcel = () => {
    const data = [];
    
    // 데이터를 엑셀 데이터로 변환
    result.forEach((file) => {
        data.push([file.originalFileName, file.uploadUser, file.uploadAt]);
    });
    
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('파일업로드 목록');

    // 데이터를 워크시트에 추가
    ws.addRow(['파일명', 'UserID', '업로드 일자']);
    data.forEach((row) => {
        ws.addRow(row);
    });

    // 엑셀 파일 생성
    wb.xlsx.writeBuffer()
    .then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);

        // 엑셀 파일 다운로드
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file_uploads.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    })
    .catch((error) => {
        console.error('Error writing Excel file:', error);
    });
};

    return(
        <div>
            <button onClick={downloadExcel}>엑셀다운로드</button>
            <table border={1}>
                <thead>
                    <tr>
                        <td>파일명</td>
                        <td>UserID</td>
                        <td>업로드 일자</td>
                    </tr>
                </thead>
                <tbody>
                {
                    result.map((file, i)=>{
                        return(
                            <tr key={i}>
                                <td>
                                    <a href={`/api/file/download/${file._id}`} download>
                                        {file.originalFileName}
                                    </a>
                                </td>
                                <td>{file.uploadUser}</td>
                                <td>{file.uploadAt}</td>
                            </tr>
                        )
                    })
                }
                </tbody>    
            </table>
        </div>
    )
}