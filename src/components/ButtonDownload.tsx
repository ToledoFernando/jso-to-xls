import ExcelJS from "exceljs"

function ButtonDownload({jsonData, nameXls}: any) {

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    const columns = Object.keys(jsonData[0]).map(key => ({
      header: key,
      key: key
    }));
    worksheet.addRow(columns.map((e) => e.header));

    jsonData.forEach((data: any) => {
      // worksheet.addRow(data);
      const row = [];
      for (let a in data) row.push(data[a])
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nameXls ?? "json-to-xls"}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };


  return (
    <button className="disabled:bg-gray-600 text-white px-8 py-3 rounded-full disabled:cursor-not-allowed bg-gradient-to-tr from-green-600 to-green-800 text-xl" 
    disabled={jsonData.length === 0}
    onClick={downloadExcel}>ButtonDownload</button>
  )
}

export default ButtonDownload

  

