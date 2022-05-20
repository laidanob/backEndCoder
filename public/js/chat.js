const socket = io()

let idNav = ""
socket.on("mensajeRespuesta",(data) => {
    console.log(data)
    socket.emit("mensajeCliente", "mensaje de respuesta del cliente")
})
socket.on("mensajes",(data) => {
    console.log(data)
    mensajesRender(data)
    socket.emit("mensajeCliente", "mensajes recibidos")
})
socket.on("id", (id) => {
    idNav = id
})

socket.on("productos", (productos) =>{
    productRender(productos)
    console.log(productos)
})
const mensajesRender = (data) => {
    let html =  data.map((x) => {
        if(x.idNav == idNav){
        return `<div class="row msg_container base_sent">
        <div class="col-md-10 col-xs-10">
        <div class="messages msg_sent">
        <p>${x.mensaje}</p>
        <time datetime="2009-11-13T20:00">${x.email}</time>
        </div>
        </div>
        <div class="col-md-2 col-xs-2 avatar">
        <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
        </div>
        </div>`}
        else{
            return `<div class="row msg_container base_receive">
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                        </div>
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_receive">
                                <p>${x.mensaje}</p>
                                <time datetime="2009-11-13T20:00">${x.email}</time>
                            </div>
                        </div>
                    </div>`
        }
    }).join(" ")
    document.querySelector(".msg_container_base").innerHTML = html
}
const productRender = (productos) => {
    let html =  productos.map((producto) => {
        return ` 
        
      <tr class="alert" role="alert">
          <td>
              <div class="email">
                  <span>${producto.titulo} </span>
                  <!-- <span>descripcion</span> -->
              </div>
          </td>
            <td>${producto.precio}</td>

          <td>
              <img> 
                  <div class="img" style="background-image: url(${producto.img});"></div>
          </td>
      </tr>

     
    `
    }).join(" ")
    document.querySelector("#bodyTabla").innerHTML = html
}
   
 
document.querySelector("#fomulario").addEventListener("submit", (e) =>{
    e.preventDefault()
        let mensaje = document.querySelector("#mensaje")
        let data = {
                    nombre: document.querySelector("#emailNombre").value,
                    mensaje: mensaje.value,
                    idNav
                }
        socket.emit("datosMensajes", data)
        mensaje.value = ""
    
 })
 

 //COMPORTAMIENTO DE VENTANA CHAT
 $(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});

// $(document).on('click', '.icon_close', function (e) {
//     //$(this).parent().parent().parent().parent().remove();
//     $( "#chat_window_1" ).remove();
// });
