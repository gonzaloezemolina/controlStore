const socketClient = io()
socketClient.on("sendProducts", (obj) => {
    updateProducts(obj)
})
