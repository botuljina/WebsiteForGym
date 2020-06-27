window.addEventListener("load", () => {
    document.getElementById("potvrdaForme").addEventListener("click", savePDF); 
})

function savePDF() {
    
    var form = document.forms["onlyForm"];
    var rows = [
        ["Ime", form["formName"].value],
        ["Prezime", form["formSurname"].value],
        ["Email", form["formMail"].value],
        ["Broj telefona", form["formNumber"].value],
        ["Datum", form["formDate"].value],
        ["Opis problema", form["opisProblema"].value]
    ];
    var colls = [
        {
          content: 'Zahtev',
          colSpan: 2,
          styles: { halign: 'center', fillColor: [22, 160, 133] },
        },
      ];
    

    var pdf = new jsPDF('l');

  
    pdf.autoTable({
        startY: 60,
        head: [
          [
            {
              content: 'Zahtev za pregled',
              colSpan: 2,
              styles: { halign: 'center', fillColor: [22, 160, 133] },
            },
          ],
        ],
        body: rows,
        theme: 'grid',
        styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
        columnStyles: { 1: { cellWidth: 'auto' } },
      })
  
    pdf.save('zahtev.pdf');
};