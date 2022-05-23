/*!
 * Start Bootstrap - Scrolling Nav v5.0.5 (https://startbootstrap.com/template/scrolling-nav)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
 */

// Declaro las constantes globales
const CC = "Cuenta Corriente";
const CP = "Caja de Ahorro en Pesos";
const CD = "Caja de Ahorro en Dólares";

// Declaro los estados globales
const ls = localStorage.getItem("arrayClientes") || "[]";
const arrayClientes = JSON.parse(ls);
let ss = sessionStorage.getItem("usuario") || "{}";
let cliente = JSON.parse(ss);

// Función display de menúes
function abrirMenu(menu) {
  if (menu == "menuNuevoCliente") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuNuevoCliente").style.display = "block";
  } else if (menu == "menuLogin") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuLogin").style.display = "block";
  } else if (menu == "menuClave") {
    document.querySelector("#menuPrincipal").style.display = "none";
    document.querySelector("#menuClave").style.display = "block";
  } else {
    document.querySelector("#menuClave").style.display = "none";
    document.querySelector("#menuNuevoCliente").style.display = "none";
    document.querySelector("#menuLogin").style.display = "none";
    document.querySelector("#menuPrincipal").style.display = "block";
  }
}
// Fin función display menúes

// Evento click ingresar
if (document.querySelector("#loginCliente")) {
  document
    .querySelector("#loginCliente")
    .addEventListener("click", () => abrirMenu("menuLogin"));
}

// Evento click registrarme
if (document.querySelector("#nuevoRegistro")) {
  document
    .querySelector("#nuevoRegistro")
    .addEventListener("click", () => abrirMenu("menuNuevoCliente"));
}
// Evento click recuperar clave
if (document.querySelector("#recuperoClave")) {
  document
    .querySelector("#recuperoClave")
    .addEventListener("click", () => abrirMenu("menuClave"));
}

// Función nuevo cliente y control evento
if (document.querySelector("#formNuevoCliente")) {
  document
    .querySelector("#formNuevoCliente")
    .addEventListener("submit", nuevoCliente);
}

// Declaro un header para mostrar los saldos actualizados de las cuentas 
const header = `<h2 class="mt-4">Saldos</h2>
  <div class="row mb-3">
    <div class="col-md-3 themed-grid-col">Cuenta corriente<br>$ ${cliente.hasOwnProperty("saldo")
    ? new Intl.NumberFormat("de-DE").format(
      parseInt(cliente.saldo.CC).toFixed(2)
    )
    : ""
  }</div>
    <div class="col-md-3 themed-grid-col">Caja de ahorro en pesos<br>$ ${cliente.hasOwnProperty("saldo")
    ? new Intl.NumberFormat("de-DE").format(
      parseInt(cliente.saldo.CP).toFixed(2)
    )
    : ""
  }</div>
    <div class="col-md-3 themed-grid-col">Caja de ahorro en dólares<br>U$S ${cliente.hasOwnProperty("saldo")
    ? new Intl.NumberFormat("de-DE").format(
      parseInt(cliente.saldo.CD).toFixed(2)
    )
    : ""
  }</div>
  </div><hr>`;
// Fin header

// Función para registrar un nuevo cliente
function nuevoCliente(e) {
  // Detengo el envío del formulario submit
  e.preventDefault();
  // Recupero la información de los inputs
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const dni = document.querySelector("#dni").value;
  const edad = document.querySelector("#edad").value;
  const clave = document.querySelector("#clave").value;
  const saldo = { CC: 1000000, CP: 0, CD: 0 };
  const operaciones = [];
  // Creación del objeto cliente
  const cliente = {
    nombre,
    apellido,
    dni,
    edad,
    clave,
    saldo,
    operaciones,
  };
  // Pregunto si la edad de la persona es mayor a 18
  if (edad >= 18) {
    // Pregunto si no existe un cliente con el DNI suministrado
    if (!arrayClientes.find((elemento) => elemento.dni == cliente.dni)) {
      // Pusheo en el array y disparo un sweet alert para informar que el cliente fue registrado exitosamente
      arrayClientes.push(cliente);
      Swal.fire({
        title: "Nuevo cliente registrado",
        icon: "success",
        imageWidth: 400,
        imageHeight: 200,
        showConfirmButton: true,
      });
    } else {
      // Disparo un sweet alert para informar que el DNI ingresado ya existe
      Swal.fire({
        title: "Error",
        text: "El número de DNI ya existe",
        icon: "error",
        imageWidth: 400,
        imageHeight: 200,
        showConfirmButton: true,
      });
    }
    // Guardo el array en localstorage y lo convierto en JSON
    localStorage.setItem("arrayClientes", JSON.stringify(arrayClientes));
    document.querySelector("#menuPrincipal").style.display = "block";
    document.querySelector("#menuNuevoCliente").style.display = "none";
  } else {
    // Disparo un sweet alert en el caso de que la persona sea menor a 18 años
    Swal.fire({
      title: "Debe ser mayor a 18 años",
      icon: "warning",
      imageWidth: 400,
      imageHeight: 200,
      showConfirmButton: true,
    });
  }
  // Incorporo un operador ternario para segmentar los clientes según sean activos o jubilados
  const jubilado = cliente.edad > 65 ? true : false;
  jubilado
    ? console.log("Nuevo cliente segmento jubilados")
    : console.log("Nuevo cliente segmento activos");
  // Incorporo un operador lógico AND y desestructuro la variable "edad" para guardar en consola. Si es activo, no guardo el registro de la fecha; si es jubilado sí lo guardo.
  const registroIngreso = cliente.edad >= 65 && new Date();
  console.log(registroIngreso);
  console.log(edad);
  console.log(...arrayClientes);
}
// Fin función para registrar un nuevo cliente

// Función recuperar clave
if (document.querySelector("#formRecuperarClave")) {
  document
    .querySelector("#formRecuperarClave")
    .addEventListener("submit", recuperarClave);
}
function recuperarClave(e) {
  // Detengo el envío del formulario submit
  e.preventDefault();
  // Busco la información input DNI
  const dniBuscar = document.querySelector("#dniBuscar").value;
  // Busco en el localstorage
  const arrayParaBuscar = JSON.parse(localStorage.getItem("arrayClientes"));
  const resultadoBuscar = arrayParaBuscar.find(
    (personita) => personita.dni == dniBuscar
  );
  let textoPersonaEncontrada;
  if (resultadoBuscar != undefined) {
    textoPersonaEncontrada = `<h2>${resultadoBuscar.nombre} ${resultadoBuscar.apellido}</h2>
                                <span><p>DNI ${new Intl.NumberFormat("de-DE").format(resultadoBuscar.dni)}</p></span><br>
                                <strong>Clave:</strong>
                                <span class="claveRecuperada">${resultadoBuscar.clave}</span><br>
                                <a href="./principal.html" class="btnOp ingreso" id="ingresar">Ir al menú principal</a><br>`;
  } else {
    textoPersonaEncontrada = `<h4>El número de DNI ingresado no existe</h4>
                                <br><br><a href="./principal.html" class="btnOp volverPpal" id="volver">Volver</a>`;
  }
  // Modifico el HTML a través de los id correspondiente (borro y luego escribo)
  let borrarMenuClave = `<p></p>`;
  document.querySelector("#borrarMenuClave").innerHTML = borrarMenuClave;
  document.querySelector("#clienteEncontrado").innerHTML =
    textoPersonaEncontrada;
}
// Fin función recuperar clave

// Función ingresar
if (document.querySelector("#formLogin")) {
  document
    .querySelector("#formLogin")
    .addEventListener("submit", ingresoCliente);
}
function ingresoCliente(e) {
  // Paramos el envio del formulario submit
  e.preventDefault();
  const arrayParaBuscar = JSON.parse(localStorage.getItem("arrayClientes"));
  if (arrayParaBuscar) {
    // Buscar información input DNI
    const dniLogin = document.querySelector("#dniLogin").value;
    const claveLogin = document.querySelector("#claveLogin").value;
    // Buscar en localstorage
    const resultadoBuscar = arrayParaBuscar.find(
      (personita) => personita.dni == dniLogin
    );
    let textoLogin = document.getElementById("#menuLogin");
    if (resultadoBuscar?.clave == claveLogin) {
      sessionStorage.setItem("usuario", JSON.stringify(resultadoBuscar));
      console.info("Cliente logueado:", cliente);
      textoLogin = `<h3 class="bienvenido">Bienvenido</h3>
                    <span class="bienvenido2">${resultadoBuscar.nombre} ${resultadoBuscar.apellido}</span><br>
                    <a href="./operaciones.html" class="btnOp operacion" id="operar">Operar</a><br>
                    <a href="./principal.html" class="btnOp salir" id="salir">Salir</a><br>`;
      // Disparo de un sweet alert en el caso de que el ingreso del cliente sea correcto
      Swal.fire({
        icon: "success",
        title: "Ingreso exitoso",
        showConfirmButton: true,
      });
      // Si algún dato ingresado es incorrecto, se le avisa al cliente
    } else {
      textoLogin = `<span class="alerta"><h3 class="alert1">Alguno de los datos ingresados es incorrecto</h3><br><br><h3 class="alert2">Intente nuevamente</span></h4><br>
                    <a href="./principal.html" class="btnOp volver" id="volver">Volver</a><br>`;
    }
    let borrarMenuLogin = `<p></p>`;
    document.querySelector("#borrarMenuLogin").innerHTML = borrarMenuLogin;
    document.querySelector("#clienteLogin").innerHTML = textoLogin;
  } else {
    // Disparo de un sweet alert en el caso de que no haya clientes registrados
    Swal.fire({
      position: "down-center",
      icon: "warning",
      title: "No hay clientes registrados",
      showConfirmButton: true,
    });
  }
}
// Fin función ingresar

// Función display de menúes de operaciones
function abrirMenuOp(menu) {
  // Función transferencia entre cuentas propias
  if (menu == "transfPropia0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#transfPropia0").style.display = "block";
    const element = document.querySelector("#encabezadoMenuOp");
    element.remove();
    document.querySelector("#transfPropia0").innerHTML =
      header +
      `<h2 class="dolarTitulo0">Transferencia entre cuentas propias</h2>
                                                                <form id="transfPropia">
                                                                    <span id="origen">
                                                                        <label for="cuenta">Seleccione la cuenta de <strong>origen:</strong></label>
                                                                            <span>
                                                                                <select name="cuentas" id="cuentaOrigen">
                                                                                    <option value=""></option>
                                                                                    <option value="${CC}">Cuenta Corriente</option>
                                                                                    <option value="${CP}">Caja de Ahorro</option>
                                                                                </select>
                                                                            </span>
                                                                            <br><br>
                                                                    </span>    
                                                                    <div class="inputTransfPropia">
                                                                        <span>
                                                                          <h4 class="ingresarImporteTransf">Ingrese el importe a transferir</h4>
                                                                          <input type="number" name="inputMonto" id="inputMonto" class="inputMonto" required>
                                                                        </span>
                                                                    </div>
                                                                    <br>
                                                                    <input type="submit" class="btnOp confirmTransfPropia" id="confimTransfPropia" value="Confirmar">
                                                                    <a href="./operaciones.html" class="btnOp volverTransf" id="volver">Volver</a>
                                                                </form>`;
    let origen = document.getElementById("cuentaOrigen");
    origen.onchange = () => {
      if (origen.value === CC) {
        document.querySelector(
          "#origen"
        ).innerHTML = `<strong>Origen</strong>: ${CC}<br><br>
                        <strong>Destino</strong>: ${CP}<br><br>`;
      } else if (origen.value === CP) {
        document.querySelector(
          "#origen"
        ).innerHTML = `<strong>Origen</strong>:${CP}<br><br>
                        <strong>Destino</strong>:${CC}<br><br>`;
      }
    };
    // LOS COMENTARIOS SON VÁLIDOS PARA TODAS LAS FUNCIONES VINCULADAS A OPERACIONES
    // Función confirmar transferencia entre cuentas propias
    if (document.querySelector("#transfPropia")) {
      document
        .querySelector("#transfPropia")
        .addEventListener("submit", confTransfPropia);
    }
    function confTransfPropia(e) {
      // Paramos el envio del formulario submit
      e.preventDefault();
      // Recuperación de la información de los selects
      const tipo = "Transferencia a Cuenta Propia";
      const importe = Number(document.querySelector("#inputMonto").value);
      // Creación del objeto
      const operacion = {
        tipo,
        origen: origen.value,
        destino: origen.value === CC ? CP : CC,
        importe,
      };
      // Actualización de saldos
      switch (origen.value) {
        case CC:
          // Validación del saldo
          if (cliente.saldo.CC - importe >= 0) {
            // Modificación del cliente en memoria
            cliente.saldo.CC = cliente.saldo.CC - importe;
            cliente.saldo.CP = cliente.saldo.CP + importe;

            // Pusheo en el array operaciones del cliente en memoria
            cliente.operaciones.push(operacion);
            // Guardado del cliente modificado en sessionStorage
            sessionStorage.setItem("usuario", JSON.stringify(cliente));
            // Traer el array de clientes del localStorage
            const arrayClientes = JSON.parse(
              localStorage.getItem("arrayClientes")
            );
            // Buscar en ese array al cliente que está en memoria
            const oldCliente = arrayClientes.find(
              (elemento) => elemento.dni == cliente.dni
            );
            const index = arrayClientes.indexOf(oldCliente);
            // Borrar el cliente que se teníam
            arrayClientes.splice(index, 1);
            // Reemplazo por el cliente modificado
            arrayClientes.push(cliente);
            // Guardado del nuevo dato del cliente en localStorage
            localStorage.setItem(
              "arrayClientes",
              JSON.stringify(arrayClientes)
            );
            // Si la operación se realiza sin inconvenites, se dispara un sweet alert
            Swal.fire({
              title: "Operación realizada",
              icon: "success",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            }).then(() => {
              window.location.reload();
              window.open("./comprobante.html");
            });
          } else {
            // Si la operación no se puede realizar, se dispara un sweet alert
            Swal.fire({
              title: "Error",
              text: "No tiene saldo suficiente en su cuenta para realizar esta operación",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
          }
          break;
        case CP:
          if (cliente.saldo.CP - importe >= 0) {
            cliente.saldo.CC = cliente.saldo.CC + importe;
            cliente.saldo.CP = cliente.saldo.CP - importe;
            cliente.operaciones.push(operacion);
            const arrayClientes = JSON.parse(
              localStorage.getItem("arrayClientes")
            );
            const oldCliente = arrayClientes.find(
              (elemento) => elemento.dni == cliente.dni
            );
            sessionStorage.setItem("usuario", JSON.stringify(cliente));
            const index = arrayClientes.indexOf(oldCliente);
            arrayClientes.splice(index, 1);
            arrayClientes.push(cliente);
            localStorage.setItem(
              "arrayClientes",
              JSON.stringify(arrayClientes)
            );
            Swal.fire({
              title: "Operación realizada",
              icon: "success",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            }).then(() => {
              window.location.reload();
              window.open("./comprobante.html");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No tiene saldo suficiente en su cuenta para realizar esta operación",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
          }
          break;
        default:
          // Si no selecciona la cuenta de origen, se dispara un sweet alert
          Swal.fire({
            title: "Error",
            text: "La cuenta de origen no está seleccionada",
            icon: "error",
            imageWidth: 400,
            imageHeight: 200,
            showConfirmButton: true,
          });
          break;
      }
    }
    // Fin función confirmar transferencia entre cuentas propias
    // Fin operación transferencia entre cuentas propias
  }
  // Función transferencia a terceros
  else if (menu == "transfTerceros0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#transfTerceros0").style.display = "block";
    const element = document.querySelector("#encabezadoMenuOp");
    element.remove();
    document.querySelector("#transfTerceros0").innerHTML =
      header +
      `<h2 class="dolarTitulo0">Transferencia a cuenta de terceros</h2>
                                                                <form id="transfTerceros">
                                                                  <span id="origenTerceros">
                                                                      <label for="cuenta">Seleccione la cuenta de origen:</label>
                                                                        <span>
                                                                        <select name="cuentas" id="cuentaOrigen">
                                                                          <option value=""></option>
                                                                          <option value="${CC}">Cuenta Corriente</option>
                                                                          <option value="${CP}">Caja de Ahorro</option>
                                                                        </select>
                                                                        </span>   
                                                                        <br><br>
                                                                  </span>   
                                                                    <label for="cuenta">Ingrese CBU de la cuenta de destino:</label>
                                                                    <input type="text" name="montoTransf" id="CBUDestino" class="input" pattern=".{22}" title="Debe contener 22 números" required><br>
                                                                    <div class="inputTransfTerceros">
                                                                      <h4 class="ingresarImporteTransf">Ingrese el importe a transferir</h4>
                                                                      <input type="number" name="inputMonto" id="inputMonto" class="inputMonto" required><br>
                                                                    </div>
                                                                    <input type="submit" class="btnOp confirmTransfPropia" id="confimTransfPropia" value="Confirmar">
                                                                    <a href="./operaciones.html" class="btnOp volverTransf" id="volver">Volver</a>
                                                                </form>`;
    let origen = document.getElementById("cuentaOrigen");
    origen.onchange = () => {
      if (origen.value === CC) {
        document.querySelector(
          "#origenTerceros"
        ).innerHTML = `<strong>Origen</strong>: ${CC}<br><br>`;
      } else if (origen.value === CP) {
        document.querySelector(
          "#origenTerceros"
        ).innerHTML = `<strong>Origen</strong>:${CP}<br><br>`;
      }
    };
    if (document.querySelector("#transfTerceros")) {
      document
        .querySelector("#transfTerceros")
        .addEventListener("submit", confTransfTerceros);
    }
    // Función confirmar transferencia a terceros
    function confTransfTerceros(e) {
      e.preventDefault();
      {
        const tipo = "Transferencia a Cuenta de Terceros";
        const importe = Number(document.querySelector("#inputMonto").value);
        const operacion = {
          tipo,
          origen: origen.value,
          destino: document.querySelector("#CBUDestino").value,
          importe,
        };
        switch (origen.value) {
          case CC:
            if (cliente.saldo.CC - importe >= 0) {
              cliente.saldo.CC -= importe;
              cliente.operaciones.push(operacion);
              const arrayClientes = JSON.parse(
                localStorage.getItem("arrayClientes")
              );
              const oldCliente = arrayClientes.find(
                (elemento) => elemento.dni == cliente.dni
              );
              sessionStorage.setItem("usuario", JSON.stringify(cliente));
              const index = arrayClientes.indexOf(oldCliente);
              arrayClientes.splice(index, 1);
              arrayClientes.push(cliente);
              localStorage.setItem(
                "arrayClientes",
                JSON.stringify(arrayClientes)
              );
              Swal.fire({
                title: "Operación realizada",
                icon: "success",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              }).then(() => {
                window.location.reload();
                window.open("./comprobante.html");
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No tiene saldo suficiente en su cuenta para realizar esta operación",
                icon: "error",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              });
            }
            break;
          case CP:
            if (cliente.saldo.CP - importe >= 0) {
              cliente.saldo.CP -= importe;
              cliente.operaciones.push(operacion);
              const arrayClientes = JSON.parse(
                localStorage.getItem("arrayClientes")
              );
              const oldCliente = arrayClientes.find(
                (elemento) => elemento.dni == cliente.dni
              );
              sessionStorage.setItem("usuario", JSON.stringify(cliente));
              const index = arrayClientes.indexOf(oldCliente);
              arrayClientes.splice(index, 1);
              arrayClientes.push(cliente);
              localStorage.setItem(
                "arrayClientes",
                JSON.stringify(arrayClientes)
              );
              Swal.fire({
                title: "Operación realizada",
                icon: "success",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              }).then(() => {
                window.location.reload();
                window.open("comprobante.html");
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No tiene saldo suficiente en su cuenta para realizar esta operación",
                icon: "error",
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: true,
              });
            }
            break;
          default:
            Swal.fire({
              title: "Error",
              text: "La cuenta de origen no está seleccionada",
              icon: "error",
              imageWidth: 400,
              imageHeight: 200,
              showConfirmButton: true,
            });
            break;
        }
      }
    }
    // Fin función confirmar transferencia a terceros
    // Fin función transferencia a terceros
  }
  // Función comprar de dólares
  else if (menu == "cvDolares0") {
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#cvDolares0").style.display = "block";
    // Utilizo el método fetch para hacer peticiones HTTP a un servicio externo
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "global-currency.p.rapidapi.com",
        "X-RapidAPI-Key": "a839f95f45msh1aa3f23a9d629f0p1ffae6jsn4b11b3fd1b1d",
      },
    };
    const tipoDeCambio = document.querySelector("#tipoDeCambio");
    fetch("https://global-currency.p.rapidapi.com/currency/USD/ARS/1", options)
      .then((resp) => resp.json())
      .then((data) => {
        return data["rateCurrency"].amount * 1.047; // Aplica el coeficiente para pasar de dólar mayorista a minorista
      })
      .then((data) => {
        precioDolar = data;
        const element = document.querySelector("#encabezadoMenuOp");
        element.remove();
        document.querySelector("#cvDolares0").innerHTML =
          header +
          `<h2 class="dolarTitulo0">Compra de dólares</h2>
           <h4 class="normativaBCRA">Le recordamos que la operatoria de compra de dólares se encuentra regulada por la normativa de Exterior y Cambios del BCRA y la Ley Penal Cambiarla. La compra es sólo para atesoramiento personal. <strong>El cupo de U$S 200 es mensual y por persona.</strong> Se encuentra prohibido tanto ceder y/o vender el cupo mensual. No se puede comprar dólares a favor de o por cuentas de terceros. En el caso de que se detecte la violación a la normativa vigente, el banco se reserva el derecho de cerrar las cuentas, efectuar la correspondiente denuncia al BCRA y tomar cualquier medida que estime necesaria.</h4>                               
           <h3 class="dolarTitulo1">Compra a $${new Intl.NumberFormat("de-DE").format(data.toFixed(2))} sin impuestos ni retenciones</h3>
           <h4 class="cotizacionDolar">Cotización dólar por unidad en el Mercado Libre de Cambios, ámbito de aplicación y vigencia para operaciones por banca online al momento de su consulta</h4>
           <h4 class="ingresarImporte">Ingrese el importe en U$S</h4>
              <form id="formCompraDolares">
                  <input type="hidden" name="precioDolar" id="precioDolar" class="precioDolae" value=${data} />
                  <input type="number" name="cupoDolares" id="inputMonto" class="inputMonto"  min="0" max="200" step = "0.01" required><span class="simularTotal" id="simularTotal"><span class="simularTotalDolares">Total con impuesto ley Nº27.541 y Percepción RG 4815/20 $<span id="costoOperacion">0</span></span><br>
                  <input type="submit" class="btnOp compraDolares" id="compraDolares" value="Confirmar">
                  <a href="./operaciones.html" class="btnOp volverDolares" id="volver">Volver</a>
              </form>`;
        // Evento que simula la compra de dólares cuando se ingresa el monto en el input
        if (document.querySelector("#cvDolares0")) {
          document
            .querySelector("#inputMonto")
            .addEventListener("change", (ev) => {
              const montoDolar = Number.parseFloat(ev.target.value);
              console.log(montoDolar);
              const precioDolar = Number.parseFloat(
                document.querySelector("#precioDolar").value
              );
              const costoOperacion = montoDolar * precioDolar * 1.65;
              document.querySelector(
                "#costoOperacion"
              ).textContent = `${new Intl.NumberFormat("de-DE").format(
                ((costoOperacion * 100) / 100).toFixed(2)
              )}`;
            });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "No se puede realizar la operación en estos momentos, por favor intente más tarde",
          icon: "error",
          imageWidth: 400,
          imageHeight: 200,
          showConfirmButton: true,
        });
        console.log('error', error)
      })
    // Fin de la petición
    // Función confirmar compra de dólares
    if (document.querySelector("#cvDolares0")) {
      document
        .querySelector("#cvDolares0")
        .addEventListener("submit", confCompraDolares);
    }
    // Función confirmar compra de dólares
    function confCompraDolares(e) {
      e.preventDefault();
      const tipo = "Compra de dólares";
      const importe = Number(document.querySelector("#inputMonto").value);
      const precioDolar = Number(document.querySelector("#precioDolar").value);
      // Validación del cupo mensual (puede comprar hasta U$S 200 mensuales)
      if (cliente.saldo.CD + importe <= 200) {
        // Validación del saldo (puede comprar si tiene saldo suficiente en la Caja de Ahorro en Pesos)
        if (cliente.saldo.CP - importe * precioDolar * 1.65 >= 0) {
          const operacion = {
            tipo,
            origen: CP,
            destino: CD,
            importe,
          };
          cliente.saldo.CP -= importe * precioDolar * 1.65; // Se aplica el coeficiente 0.65 porque se suman el impuesto y la retención
          cliente.saldo.CD += importe;
          cliente.operaciones.push(operacion);
          const arrayClientes = JSON.parse(
            localStorage.getItem("arrayClientes")
          );
          const oldCliente = arrayClientes.find(
            (elemento) => elemento.dni == cliente.dni
          );
          sessionStorage.setItem("usuario", JSON.stringify(cliente));
          const index = arrayClientes.indexOf(oldCliente);
          arrayClientes.splice(index, 1);
          arrayClientes.push(cliente);
          localStorage.setItem("arrayClientes", JSON.stringify(arrayClientes));
          Swal.fire({
            title: "Operación realizada",
            icon: "success",
            imageWidth: 400,
            imageHeight: 200,
            showConfirmButton: true,
          }).then(() => {
            window.location.reload();
            window.open("comprobante.html");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No tiene saldo suficiente en su caja de ahorro para realizar esta operación",
            icon: "error",
            imageWidth: 400,
            imageHeight: 200,
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "No puede comprar más de U$S 200 mensuales",
          icon: "error",
          imageWidth: 400,
          imageHeight: 200,
          showConfirmButton: true,
        });
      }
    }
    // Fin función confirmar compra de dólares
  } else if (menu == "consSaldos") {
    // Función resumen de operaciones
    document.querySelector("#menuOperaciones").style.display = "none";
    document.querySelector("#consSaldos").style.display = "block";
    const element = document.querySelector("#encabezadoMenuOp");
    element.remove();
    let content =
      header +
      `<table class="table table-striped">
      <thead>
          <th class="tituloColumna">Transacción</th>
          <th class="tituloColumna">Tipo</th>
          <th class="tituloColumna">Monto</th>
          <th class="tituloColumna">Origen</th>
          <th class="tituloColumna">Destino</th>
      </thead>
      <tbody>`;
    cliente.operaciones.map((op, index) => {
      content += `<tr>
                    <td class="celda">${index + 1}</td>
                    <td class="celda">${op.tipo}</td>
                    <td class="montoResumen">${new Intl.NumberFormat("de-DE").format(op.importe)}</td>
                    <td class="celda">${op.origen}</td>
                    <td class="celda">${op.destino}</td></tr>
                    `;
    });
    content += "</table></table>";
    document.querySelector("#transfTerceros0").innerHTML =
      content +
      `<a href="./operaciones.html" class="btnOp volverDolares" id="volver">Volver</a>`;
    // Fin función resumen de operaciones
  } else {
    document.querySelector("#cvDolares0").style.display = "none";
    document.querySelector("#transfTerceros0").style.display = "none";
    document.querySelector("#transfPropia0").style.display = "none";
    document.querySelector("#consSaldo").style.display = "none";
    document.querySelector("#menuOperaciones").style.display = "block";
  }
}
// Fin función display de menu de operaciones

// Evento click transferir a cuenta propia
if (document.querySelector("#TransfPropia")) {
  document
    .querySelector("#TransfPropia")
    .addEventListener("click", () => abrirMenuOp("transfPropia0"));
}

// Evento click transferir a cuenta de terceros
if (document.querySelector("#TransfTerceros")) {
  document
    .querySelector("#TransfTerceros")
    .addEventListener("click", () => abrirMenuOp("transfTerceros0"));
}

// Evento click comprar dólares
if (document.querySelector("#cvDolares")) {
  document
    .querySelector("#cvDolares")
    .addEventListener("click", () => abrirMenuOp("cvDolares0"));
}

// Evento click resumen de operaciones
if (document.querySelector("#saldos")) {
  document
    .querySelector("#saldos")
    .addEventListener("click", () => abrirMenuOp("consSaldos"));
}

// Generación del comprobante de la operación
if (!!document.querySelector("#comprobante")) {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  console.log(usuario);
  const operacion = usuario.operaciones[usuario.operaciones.length - 1];
  document.querySelector("#idComprobante").textContent =
    usuario.operaciones.length;
  document.querySelector("#origen").textContent = operacion.origen;
  document.querySelector("#destino").textContent = operacion.destino;
  document.querySelector("#importe").textContent = new Intl.NumberFormat("de-DE").format(parseInt(operacion.importe).toFixed(2));
}
// Fin generación del comprobante de la operación

// Alert para cuando hace click en Salir
if (document.querySelector("#salirMenuPpal")) {
  document.querySelector("#salirMenuPpal").addEventListener("click", () =>
    Swal.fire({
      title: "Espere...",
      text: "¿Está seguro que quiere salir del simulador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No, quiero quedarme",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem("usuario", "");
        window.location.assign("../index.html");
      }
    })
  );
}
// Fin del alert para cuando hace click en Salir
