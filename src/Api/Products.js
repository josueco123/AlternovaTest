
const baseUrl = 'https://489a19f7-f7d2-426a-8361-230148034a79.mock.pstmn.io/';

const getAllProducts = async () =>{

    const response = await fetch(baseUrl+'all-products');
    const data = await response.json();
    return data;

};

const getProduct = async (id) =>{

    const response = await fetch(baseUrl+'detail/' + id);
    const data = await response.json();
    return data;

};

const buyProduct = async () =>{

    const response = await fetch(baseUrl+'buy',{
        method: 'POST', 
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const dataResponse = await response.json();
    return dataResponse;

};

export { getAllProducts, getProduct, buyProduct}