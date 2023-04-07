// @ts-nocheck
const serverSocket = io();

const button = document.querySelector('#btnEnviar')

Swal.fire({
    title: "Identificate",
    input: "text",
    inputValidator: (value)=>{
        return !value && "Nesecitas escribir un nombre de usuario para comenzar a chatear!"
    },
    allowOutsideClick: false
}).then(result=>{
    const inputUser = document.querySelector('#inputUser')
    if (!(inputUser instanceof HTMLInputElement)) return
    inputUser.value = result.value    
    serverSocket.emit('newUser', inputUser.value)
})

if (button){
    button.addEventListener ('click', e => {
        const inputUser = document.querySelector('#inputUser')
        const inputMessage = document.querySelector('#inputMessage')

        if (!(inputUser instanceof HTMLInputElement) || !(inputMessage instanceof HTMLInputElement)) return

        const user = inputUser.value
        const message = inputMessage.value

        if(!user || !message) return
        
        const dataMessage =  {user, message}
        serverSocket.emit('newMessage', dataMessage)
        
    })
}


const plantillaMensajes = `
{{#if hayMensajes }}
<ul>
    {{#each mensajes}}
    <li>{{this.user}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes...</p>
{{/if}}
`

const armarHtml = Handlebars.compile(plantillaMensajes)

serverSocket.on('newChatClient', mensajes => {
    const divMensajes = document.getElementById("mensajes")
    if(divMensajes){
        divMensajes.innerHTML = armarHtml({mensajes, hayMensajes: mensajes.length > 0 })
    }
})

serverSocket.on('updateMessages', mensajes => {
    const divMensajes = document.getElementById("mensajes")
    if(divMensajes){
        divMensajes.innerHTML = armarHtml({mensajes, hayMensajes: mensajes.length > 0 })
    }
})

serverSocket.on('newUser', user => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        title:`${user} se unio al chat`,
        icon: 'success'
    })
})


