$(document).ready(function () {

    /* set up XMLHttpRequest */
    var url = "static/data/data_tests.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
        let info = readData();
        let lastModified = oReq.getResponseHeader("Last-Modified");
        let fechLM = document.querySelector('#lastModified');
        fechLM.innerHTML = `
        <p>${lastModified}</p>
        `;


        let res = document.querySelector('#contenidoTest');
        res.innerHTML = '';

        info.forEach(element => {
            res.innerHTML += `
			<tr>
                <td>${element.squad != undefined ? element.squad : ""}</td>
				<td>${element.puesto != undefined ? element.puesto : ""}</td>
				<td>${element.nombreUsuario != undefined ? element.nombreUsuario : ""}</td>
				<td>${element.manager != undefined ? element.manager : ""}</td>
				<td>${element.delegado != undefined ? element.delegado : ""}</td>
				<td>${element.user != undefined ? (element.user).slice(-3) : ""}</td>
				<td style= "text-align: center;">
                <a class="btn btn-primary" href="#" id="toggleNavPosition" onClick="window.open('https://test.salesforce.com/?startURL=%2Fhome%2Fhome.jsp&un=${element.user}&pw=${element.password}');">Iniciar Sesion</a>
				</td>
			</tr>
        `
        });


        function readData() {
            var arraybuffer = oReq.response;
            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            /* Call XLSX */
            var workbook = XLSX.read(bstr, { type: "binary" });
            /* DO SOMETHING WITH workbook HERE */
            var first_sheet_name = workbook.SheetNames[0];
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            return XLSX.utils.sheet_to_json(worksheet, { raw: true });
        }
    }

    oReq.send();
    setTimeout(() => {
        $('#dataTable').DataTable();
    }, 1000);

    //-------------------------------------------------------------------------------------------

});
