// @ts-nocheck

function redirigirPagProductoPorID(){
    const idProducto = document.getElementById("idProducto")
    window.location.href = `http://localhost:8080/api/products/${idProducto.value}`;
}

function redirigirPagProductos(){
    const limit = document.getElementById("limit")
    const page = document.getElementById("page")
    window.location.href = `http://localhost:8080/api/views/products?limit=${limit.value}&page=${page.value}`;
}

function redirigirPagCarritos(){
    const limitCart = document.getElementById("limitCart")
    const pageCart = document.getElementById("pageCart")
    window.location.href = `http://localhost:8080/api/views/carts?limit=${limitCart.value}&page=${pageCart.value}`;
}


function redirigirPagCarritosPorID(){
    const idCart = document.getElementById("idCart")
    window.location.href = `http://localhost:8080/api/views/carts/${idCart.value}`;
}
