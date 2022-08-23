const inputTexto = document.querySelector(".input-texto");
const mensaje = document.querySelector(".mensaje");
const verdesencriptado = document.querySelector(".desencriptado");



//----------BOTO DE COPIAR----------

function copiar() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value);
    mensaje.value = "";
    verdesencriptado.style.display = "none";
    inputTexto.style.height = "300px";
    alerta()
}


//----------STYLE A CAMBIAR----------

verdesencriptado.style.display = "none";
inputTexto.style.height = "300px";


//----------FUNCION ENCRIPTAR----------

function btnEncriptar() {
    const textoEncriptado = encriptar(inputTexto.value)
    mensaje.value = textoEncriptado
    inputTexto.value = ""
    verdesencriptado.style.display = "block";
    inputTexto.style.height = "150px";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada;
}


//----------FUNCION DESENCRIPTAR----------

function btnDesencriptar() {
    const textoEncriptado = desencriptar(inputTexto.value)
    mensaje.value = textoEncriptado
    inputTexto.value = ""
    verdesencriptado.style.display = "block";
    inputTexto.style.height = "150px";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada;
}


//--------------- ALERT FUNCTION -----------------

function alerta() {
    let timerInterval
    Swal.fire({
        title: 'Copiado!',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}

function alertaError() {
    Swal.fire({
        icon: 'error',
        title: '<span class="errorI">Error!</span>',
        text: 'Ingresar solo texto en minuscula.',
        footer: '<span class="error">No ingresar caracteres especiales, ni acentos, ni numeros!</span>',
        confirmButtonText: '<span class="errorok">Confirmar</span>',
        confirmButtonColor: '#0f0',
        
    })
}


// ------------------FUNCION SOLO LETRAS------------------

function SoloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "abcdefghijklmnopqrstuvwxyz ,.";

    especiales = [8, 13];
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        alertaError();
        return false;
    }
}

