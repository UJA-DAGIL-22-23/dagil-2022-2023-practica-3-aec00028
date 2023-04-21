/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Álvaro Expósito Carrillo",
    email: "aec00028@red.ujaen.es",
    fecha: "28/03/2023"
}

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA": "### FECHA ###",
    "EQUIPO": "### EQUIPO ###",
    "PESO": "### PESO ###",
    "ALTURA": "### ALTURA ###",
    "POSICION": "### POSICION ###",
    "NUMTRAKLES": "### NUMTRAKLES ###",
    "HISTORIAL": "### HISTORIAL ###",
    "ZONA": "### ZONA ###"

    
}

Plantilla.crear = function ( num ) {
    return (num<10?"0":"")+num
}

// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="styled-table">
                    <thead>
                        <th width="20%">ID</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="20%">Fecha Nacimiento</th>
                        <th width="20%">Equipo</th>
                        <th width="20%">Peso</th>
                        <th width="20%">Altura</th>
                        <th width="20%">Posicion</th>
                        <th width="20%">Numero de Trakles</th>
                        <th width="20%">Historial de equipos</th>
                        <th width="20%">Zona</th>
                    </thead>
                    <tbody>
    `;

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
    <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
    <li><b>E-mail</b>: ${datosDescargados.email}</li>
    <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/Rugby/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/Rugby/acercade", this.mostrarAcercaDe);
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Plantilla.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas con todos los datos", msj)
}

Plantilla.imprimeMuchasPersonas2 = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza2(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
}
/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}

Plantilla.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Plantilla.sustituyeTags2(this.cuerpo2, persona)
}

//Funcion para ordenar Alfabeticamente los campos de la BBDD usando con la funcion Sort
Plantilla.listaAlfabeticamente = function(vector,campo){
    vector.sort(function(a,b)
     {
         let campoA = null; 
         let campoB = null;  
         if(campo == 'fecha'){
             campoA = a.data[campo].year + "" +  Plantilla.crear(a.data[campo].month) + ""+ Plantilla.crear(a.data[campo].day)
             campoB = b.data[campo].year + "" +   Plantilla.crear(b.data[campo].month) + ""+ Plantilla.crear(b.data[campo].day)
         }else{
             campoA = a.data[campo].toUpperCase();
             campoB = b.data[campo].toUpperCase();
         }
             if (campoA < campoB) {
                 return -1;
             }
             if (campoA > campoB) {
                 return 1;
             }
             return 0;
     });
  
 
         // Compongo el contenido que se va a mostrar dentro de la tabla
         let msj = Plantilla.plantillaTablaPersonas.cabecera
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
     }
         msj += Plantilla.plantillaTablaPersonas.pie
         // Para comprobar lo que hay en vector
         // Borro toda la info de Article y la sustituyo por la que me interesa
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
 
 }

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA, 'g'), persona.data.fecha.day + "-" + persona.data.fecha.month + "-" + persona.data.fecha.year)
        .replace(new RegExp(Plantilla.plantillaTags.EQUIPO, 'g'), persona.data.equipo)
        .replace(new RegExp(Plantilla.plantillaTags.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Plantilla.plantillaTags.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(Plantilla.plantillaTags.NUMTRAKLES, 'g'), persona.data.numTrakles)
        .replace(new RegExp(Plantilla.plantillaTags.HISTORIAL, 'g'), persona.data.historialEquipos)
        .replace(new RegExp(Plantilla.plantillaTags.ZONA, 'g'), persona.data.zona)
       
}

Plantilla.sustituyeTags2 = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
}
/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Rugby/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data,campo)
    }
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listar2 = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas2);
}

Plantilla.listar3 = function (campo) {
    Plantilla.recupera(Plantilla.listaAlfabeticamente,campo);
}

Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}
Plantilla.plantillaFormularioPersona = {}

Plantilla.l
// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.FECHA}</td>
        <td>${Plantilla.plantillaTags.EQUIPO}</td>
        <td>${Plantilla.plantillaTags.PESO}</td>
        <td>${Plantilla.plantillaTags.ALTURA}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.NUMTRAKLES}</td>
        <td>${Plantilla.plantillaTags.HISTORIAL}</td>
        <td>${Plantilla.plantillaTags.ZONA}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo2 = `
    <tr title="${Plantilla.plantillaTags.ID}">
      
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
      
       <td>
            <div><a href="javascript:Personas.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar"></a></div>
        </td>
        </tr>
    `;

    Plantilla.mostrar = function (idPersona) {
        this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
    }
    /**
     * Función que recuperar todas las personas llamando al MS Personas.
     * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
     * @param {String} idPersona Identificador de la persona a mostrar
     * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
     */
    Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
        try {
            const url = Frontend.API_GATEWAY + "/Rugby/getPorId/" + idPersona
            const response = await fetch(url);
            if (response) {
                const persona = await response.json()
                callBackFn(persona)
            }
        } catch (error) {
            alert("Error: No se han podido acceder al API Gateway")
            console.error(error)
        }
    }
    
    /**
     * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
     * @param {Persona} persona Datos de la persona a mostrar
     */
    
    Plantilla.imprimeUnaPersona = function (persona) {
        // console.log(persona) // Para comprobar lo que hay en vector
        let msj = Plantilla.personaComoFormulario(persona);
    
        // Borro toda la info de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizar("Mostrar una persona", msj)
    
        // Actualiza el objeto que guarda los datos mostrados
        Plantilla.almacenaDatos(persona)
    }
    
    /**
     * Almacena los datos de la persona que se está mostrando
     * @param {Persona} persona Datos de la persona a almacenar
     */
    
    Plantilla.almacenaDatos = function (persona) {
        Plantilla.personaMostrada = persona;
    }