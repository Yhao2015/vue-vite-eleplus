import ExcelJS from 'exceljs'

interface ExportExcel {
    filename: string
    columns: Array<any>
    dataFormat: Array<any>
    data ?: Array<any>
    keys: Array<string>
}

export const export_to_excel = (obj: ExportExcel) => {
    let { columns, dataFormat, filename, keys } = obj
    const wb = new ExcelJS.Workbook()

    const Sheet1 = wb.addWorksheet('Sheet1')
    const Sheet2 = wb.addWorksheet('Sheet2')
    
    let temp: any = []
    keys.map((key) => {
        temp.push({
            header: key,
            key: key,
            width: 20
        })
    })
    Sheet2.columns = temp
    Sheet2.addRows(dataFormat)

    Sheet1.columns = columns
    // Sheet1.addRows(data)

    new Array(1000).fill(0).forEach((_, idx) => {
        const row = idx + 2;
        // 渲染部门下拉框
        Sheet1.getCell(row, 3).dataValidation = {
            type: 'list',
            formulae: [`=Sheet2!$A$2:$A${dataFormat.length + 1}`]
        }
    })

    wb.xlsx.writeBuffer().then((data) => {
        let BlobPart: any = { type: "application/vnd.ms-excel" }
        const blob = new Blob([data, BlobPart]);
        const link = document.createElement("a"); // a标签下载
        link.href = window.URL.createObjectURL(blob); // href属性指定下载链接
        link.download = filename + ".xlsx"; // dowload属性指定文件名
        link.click(); // click()事件触发下载
        window.URL.revokeObjectURL(link.href); // 释放内存
    })
}