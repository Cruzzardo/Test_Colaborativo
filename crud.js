var materiasList = 
 [
    { 
        ID: '1', 
        "Nombre de la materia": 'AWS',
        "Nombre del profesor": 'Oscar Augusto Moreno Ortega',
        "Facultad": 'Ingenierias'
    },
    { 
        ID: '2', 
        "Nombre de la materia": 'Minería de datos',
        "Nombre del profesor": 'Oscar',
        "Facultad": 'Ingenierias'
    },
    { 
        ID: '3', 
        "Nombre de la materia": 'Ciudadanía',
        "Nombre del profesor": 'José Antonio Morales Carbajal',
        "Facultad": 'Humanidades'
    },
    { 
        ID: '4', 
        "Nombre de la materia": 'Prueba',
        "Nombre del profesor": 'Auxiliar para cambiar de materia',
        "Facultad": 'Testing'
    },
]

var crudMaterias = new function () {


    this.col = [];

    this.createTable = function () {
        
        for (var i = 0; i < materiasList.length; i++) {
            for (var key in materiasList[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        var table = document.createElement('table');
        table.setAttribute('id', 'materiasTable');
        table.setAttribute('class', 'table table-striped')

        var tr = table.insertRow(-1);

        for (var h = 0; h < this.col.length; h++) {
            // Add table header.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        for (var i = 0; i < materiasList.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = materiasList[i][this.col[j]];
            }

            this.td = document.createElement('td');

            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudMaterias.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancelar');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');
            btSave.setAttribute('value', 'Guardar');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudMaterias.Save(this)');
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');
            btUpdate.setAttribute('value', 'Actualizar');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudMaterias.Update(this)');
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');
            btDelete.setAttribute('value', 'Eliminar');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudMaterias.Delete(this)');
            this.td.appendChild(btDelete);
        }

        tr = table.insertRow(-1);

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {
                var tBox = document.createElement('input');
                tBox.setAttribute('type', 'text');
                tBox.setAttribute('value', '');
                newCell.appendChild(tBox);
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Crear');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudMaterias.CreateNew(this)');
        this.td.appendChild(btNew);

        var div = document.getElementById('materias');
        div.innerHTML = '';
        div.appendChild(table);
    };

    this.Cancel = function (oButton) {
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('materiasTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = materiasList[(activeRow - 1)][this.col[i]];
        }
    }

    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('materiasTable').rows[activeRow];

        for (i = 1; i < 4; i++) {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(ele);
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        oButton.setAttribute('style', 'display:none;');
        crudAlumnos.createTable()
    };

    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        materiasList.splice((activeRow - 1), 1);
        crudAlumnos.createTable()
        this.createTable();
    };

    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('materiasTable').rows[activeRow];
        
        oButton.setAttribute('style', 'display:none; float:none;');
        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'display:none; float:none;');

        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                materiasList[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;
            }
            td.innerHTML = materiasList[(activeRow - 1)][this.col[i]];
        }
        crudAlumnos.createTable()
        this.createTable();
    }

    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('materiasTable').rows[activeRow];
        var obj = {};

        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('Falta llenar algun campo');
                    break;
                }
            }
        }
        const index = materiasList.length - 1
        const conversion = materiasList[index]["ID"]
        const newIndex = parseInt(conversion);
        obj[this.col[0]] = newIndex + 1;

        if (Object.keys(obj).length > 0) {
            materiasList.push(obj);
            crudAlumnos.createTable()
            this.createTable();
        }
    }

}

crudMaterias.createTable();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var crudAlumnos = new function () {

    this.alumnos = [
        { 
            ID: '1', 
            "Nombre del alumno": 'Manuel Rodríguez',
            Semestre: '7mo', 
            "Materia 1": 'Ciudadanía', 
            "Calificación 1": 10,
            "Materia 2": 'AWS', 
            "Calificación 2": 8,
            "Materia 3": 'Minería de datos',
            "Calificación 3": 8.8,
        },
    ]

    this.semestre = ['1ro', '3ro', '5to', '7mo'];
    this.col = [];

    this.createTable = function () {
        console.log(materiasList)
        for (var i = 0; i < this.alumnos.length; i++) {
            for (var key in this.alumnos[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        var table = document.createElement('table');
        table.setAttribute('id', 'alumnosTable');
        table.setAttribute('class', 'table table-striped')

        var tr = table.insertRow(-1);

        for (var h = 0; h < this.col.length; h++) {
            // Add table header.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        for (var i = 0; i < this.alumnos.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.alumnos[i][this.col[j]];
            }

            this.td = document.createElement('td');

            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudAlumnos.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancelar');
            lblCancel.setAttribute('id', 'albl' + i);
            this.td.appendChild(lblCancel);

            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');
            btSave.setAttribute('value', 'Guardar');
            btSave.setAttribute('id', 'aSave' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudAlumnos.Save(this)');
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');
            btUpdate.setAttribute('value', 'Actualizar');
            btUpdate.setAttribute('id', 'aEdit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudAlumnos.Update(this)');
            this.td.appendChild(btUpdate);

            // *** DELETE.
            
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');
            btDelete.setAttribute('value', 'Eliminar');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudAlumnos.Delete(this)');
            this.td.appendChild(btDelete);
        }

        tr = table.insertRow(-1);

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) {

                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.semestre.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.semestre[k] + '">' + this.semestre[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else if (j == 3) {

                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < materiasList.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else if (j == 5) {

                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < materiasList.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else if (j == 7) {

                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < materiasList.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {
                    var tBox = document.createElement('input');
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Crear');
        btNew.setAttribute('id', 'aNew' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudAlumnos.CreateNew(this)');
        this.td.appendChild(btNew);

        var div = document.getElementById('alumnos');
        div.innerHTML = '';
        div.appendChild(table);
    };

    this.Cancel = function (oButton) {
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        var btSave = document.getElementById('aSave' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        var btUpdate = document.getElementById('aEdit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('alumnosTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.alumnos[(activeRow - 1)][this.col[i]];
        }
    }

    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('alumnosTable').rows[activeRow];

        for (i = 1; i < 9; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.semestre.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.semestre[k] + '">' + this.semestre[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else if (i == 3) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < materiasList.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else if (i == 5) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < materiasList.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else if (i == 7) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < materiasList.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + materiasList[k]['Nombre de la materia'] + '">' + materiasList[k]['Nombre de la materia'] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('albl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('aSave' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        oButton.setAttribute('style', 'display:none;');
    };

    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.alumnos.splice((activeRow - 1), 1);
        this.createTable();
    };

    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('alumnosTable').rows[activeRow];
        
        oButton.setAttribute('style', 'display:none; float:none;');
        var lblCancel = document.getElementById('albl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'display:none; float:none;');

        var btUpdate = document.getElementById('aEdit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                this.alumnos[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;
            }
            td.innerHTML = this.alumnos[(activeRow - 1)][this.col[i]];
        }
        this.createTable();
    }

    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('alumnosTable').rows[activeRow];
        var obj = {};

        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('Falta llenar algun campo');
                    break;
                }
            }
        }
        const index = this.alumnos.length - 1
        const conversion = this.alumnos[index]["ID"]
        const newIndex = parseInt(conversion);
        obj[this.col[0]] = newIndex + 1;

        if (Object.keys(obj).length > 0) {
            this.alumnos.push(obj);
            this.createTable();
        }
    }

}

crudAlumnos.createTable();