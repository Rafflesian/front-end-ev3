function CheckValues()
{
    // Cacheamos los procesos y los chequeamos después
    var bMail = CheckMail();
    var bPassword = CheckPassword();
    var bNumber = CheckNumbers();
    var bCommune = CheckCommune();
    var bPostal = CheckPostal();
    var bHobby = CheckHobby();
    var bAddress = CheckAddress();
    
    if(bMail && bPassword && bNumber && bCommune && bPostal && bHobby && bAddress)
    {
        // Estuve un buen rato buscando una forma simple de hacer un alert decente
        // Me dio flojera así que dejo este horrible alert
        alert("Formulario enviado");
        return true;
    }

    return false;
}

function CheckMail()
{
    var element = document.getElementById("inputMail");
    var div = document.getElementById("getMail");

    var bReturn = true;

    // Obtenemos el mail y removemos los espacios
    var mail = element.value;
    mail = mail.replaceAll(' ', '');

    // Vacío
    if(mail.length == 0)
    {
        div.innerHTML = "El mail no debe estar vacío";
        bReturn = false;
    }
    else
    {
        // Pude usar el index pero me quedó lindo este code que hice
        var cCount = 0;
        var start = 0;

        for(let i = 0; i < mail.length; i++)
        {
            if(mail[i] == '@')
            {
                cCount++;

                if(!start)
                    start = i;
            }
        }

        // No hay @
        if(cCount != 1)
        {
            div.innerHTML = "El mail no es válido";
            bReturn = false;
        }
        // El carácter @ está al principio
        else if(start == 0)
        {
            div.innerHTML = "El signo '@' no debe empezar en el inicio";
            bReturn = false;
        }
        else
        {
            var dot_start = 0;
            cCount = 0;

            // Empezamos desde el @ + 2
            // EJ: asdf@ea <- 'a' = @ + 2
            for(let i = start + 2; i < mail.length; i++)
            {
                if(mail[i] == '.')
                {
                    cCount++;

                    if(!dot_start)
                        dot_start = i;
                }
            }
                    
            // No hay puntos
            if(cCount != 1)
            {
                div.innerHTML = "El dominio del mail no es válido";
                bReturn = false;
            }
            else
            {
                cCount = 0;

                // Buscamos el sufijo desde el índice del '.' + 1
                for(let i = dot_start + 1; i < mail.length; i++)
                    cCount++;

                // No tiene
                if(cCount == 0)
                {
                    div.innerHTML = "El dominio no tiene el sufijo";
                    bReturn = false;
                }
                else
                {
                    // Limpiamos los mensajes
                    div.innerHTML = "";
                }
            }
        }
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");
    return bReturn;
}

function CheckPassword()
{
    var element = document.getElementById("inputPassword");
    var div = document.getElementById("getPassword");

    var bReturn = true;

    // Obtengo la contraseña y remuevo los espacios
    var password = element.value;
    password = password.replaceAll(' ', '');

    // La longitud está fuera de lugar
    if(password.length < 3 || password.length > 6)
    {
        div.innerHTML = "La contraseña debe ser mayor o igual a 3 carácteres y menor o igual a 6";
        bReturn = false;
    }
    else
    {
        // Chequeamos si hay una letra y digito
        var bNumber = false;
        var bLetter = false;

        for(let i = 0; i < password.length; i++)
        {
            // Número
            if(!isNaN(password[i]))
                bNumber = true;
            // Letra
            else if(password[i].toLowerCase() !== password[i].toUpperCase())
                bLetter = true;
        }

        // No hay números
        if(!bNumber)
        {
            div.innerHTML = "Tu contraseña debe contener un número";
            bReturn = false;
        }
        // No hay letras
        else if(!bLetter)
        {
            div.innerHTML = "Tu contraseña debe contener una letra";
            bReturn = false;
        }
        else
        {
            // Sacamos el texto si ya cumplimos las condiciones
            div.innerHTML = "";
        }
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");

    div.classList.add(bReturn ? "form-text" : "invalid-feedback");
    div.classList.remove(bReturn ? "invalid-feedback" : "form-text");

    var check_element = document.getElementById("checkPassword");
    var divequal = document.getElementById("getEqualPass");
    
    // No ha sido rellenada
    if(password == "")
    {
        divequal.innerHTML = "La contraseña no ha sido rellenada";
        bReturn = false;    
    }
    // No es la misma
    else if(password !== check_element.value)
    {
        divequal.innerHTML = "La contraseña no es la misma a la que rellenaste";
        
        bReturn = false;
    }
    else
    {
        // Removemos clases a la confirmación
        divequal.innerHTML = "";
    }
    
    // Cambiamos clases
    check_element.classList.add(bReturn ? "is-valid" : "is-invalid");
    check_element.classList.remove(bReturn ? "is-invalid" : "is-valid");
    return bReturn;
}

function CheckNumbers()
{
    var element_mobile = document.getElementById("inputNumberMobile");
    var div_mobile = document.getElementById("getNumberMobile");
    
    var element = document.getElementById("inputNumber");
    var div = document.getElementById("getNumber");
    
    var bResult = CheckNumberData(element, element.value, div, 9);
    var bResultMobile = CheckNumberData(element_mobile, element_mobile.value, div_mobile, 8);
    
    // Solo devuelvo false
    if(!bResult && !bResultMobile)
        return false;

    // Arreglamos la casilla de N° fijo
    if(!bResult)
        FixNumber(element, div);
    
    // Arreglamos la casilla de N° móvil
    if(!bResultMobile)
        FixNumber(element_mobile, div_mobile);

    // Devolvemos la condición final
    return bResult || bResultMobile;
}

function CheckNumberData(element, number, div, max)
{
    var bInteger = true, bReturn = true;
    var value, cCount = 0;

    // Saco todos los espacios
    number = number.replaceAll(' ', '');

    // Por alguna razón me tiró error, así que lo convertí a entero
    max = parseInt(max);

    for(let i = 0; i < number.length; i++)
    {
        // A entero
        value = parseInt(number[i]);

        // Es NaN / No es un entero (?)
        if(isNaN(value) || !Number.isInteger(value))
        {
            bInteger = false;
            break;
        }

        cCount++;
    }

    // No es válido
    if(!bInteger)
    {
        div.innerHTML = "El número ingresado no es válido";
        bReturn = false;
    }
    // Los carácteres no son los requeridos
    else if(cCount != max)
    {
        if(cCount)
            div.innerHTML = "El número ingresado no es de " + max + " cifras";
        else
            div.innerHTML = "Debes ingresar un número válido";

        bReturn = false;
    }
    else
    {
        // Limpiamos el texto
        div.innerHTML = "";
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");
    return bReturn;
}

function FixNumber(element, div)
{
    element.classList.remove("is-invalid");
    div.innerHTML = "";
}

function CheckCommune()
{
    var element = document.getElementById("selectCommune");
    var div = document.getElementById("getCommune");

    var bReturn = true;

    // No se ha seleccionado
    if(element.selectedIndex == 0)
    {
        div.innerHTML = "Debes seleccionar una comuna";
        bReturn = false;
    }
    else
    {
        // Limpiamos
        div.innerHTML = "";
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");
    return bReturn;
}

function CheckPostal()
{
    var element = document.getElementById("inputPostal");
    var div = document.getElementById("getPostal");
    
    var number = element.value;
    var bReturn = true;

    // Debe ser de 7 cifras
    if(number.length != 7)
    {
        div.innerHTML = "El postal debe ser de 7 cifras";
        
        bReturn = false;
    }
    // Debe ser un número
    else if(isNaN(number))
    {
        div.innerHTML = "El postal debe ser un número";
        bReturn = false;
    }
    // Los 4 últimos números deben ser 0
    // [3] = 4 | [4] = 5 | [5] = 6 | [6] = 7
    else if(number[3] != 0 || number[4] != 0 || number [5] != 0 || number[6] != 0)
    {
        div.innerHTML = "Los últimos 4 números deben ser '0'";
        bReturn = false;
    }
    else
    {
        // Dejamos vacío el texto
        div.innerHTML = "";
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");

    // Devolvemos la validación
    return bReturn;
}

function CheckAddress()
{
    var element = document.getElementById("inputAddress");
    var div = document.getElementById("getAddress");
    
    var bReturn = true;

    // Obtengo la dirección y borro los espacios al inicio y fin
    var address = element.value;
    address = address.trim();

    // Vacío
    if(address.length < 6)
    {
        div.innerHTML = "Debes ingresar una dirección formal";
        bReturn = false;
    }
    else
    {
        // Limpiamos el div
        div.innerHTML = "";
    }

    // Cambiamos clases
    element.classList.add(bReturn ? "is-valid" : "is-invalid");
    element.classList.remove(bReturn ? "is-invalid" : "is-valid");
    return bReturn;
}

function CheckHobby()
{
    var bReturn = true;
    var iCount = 0, iChecked = 0;
    var element;
    
    var div = document.getElementById("getHobby");

    // Loopeamos hasta que no existan hobbys
    do
    {
        // Hago un "formato" de string para buscarlo
        element = document.getElementById("hobbyCheck" + ++iCount);

        // Chequeo si no es nulo y está chequeado
        if(element != null && element.checked)
            iChecked++;
    }
    while(element != null)

    // Debe haber al menos 2 chequeados
    if(iChecked < 2)
    {
        bReturn = false;
        div.innerHTML = "Debes chequear al menos 2 aficiones";
    }
    else
    {
        // Limpio el div
        div.innerHTML = "";
    }
    
    // Reseteamos el conteo
    iCount = 0;

    // Loopeamos hasta que no existan hobbys (de nuevo)
    do
    {
        // Hago un "formato" de string para buscarlo
        element = document.getElementById("hobbyCheck" + ++iCount);

        // Chequeo si no es nulo y está chequeado
        if(element != null)
        {
            // Removemos
            if(element.checked)
            {
                element.classList.add('is-valid');
                element.classList.remove('is-invalid');
                continue;
            }
            
            if(!bReturn)
                element.classList.add('is-invalid');
            else
                element.classList.remove('is-invalid');
        }
    }
    while(element != null)

    return bReturn;
}