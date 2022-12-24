
const getAllProducts = async () =>{

    const response = await fetch('https://525aa86b-e6ee-4e67-bbdf-f4d543d5701a.mock.pstmn.io/all-products');
    const data = await response.json();
    return data;

};

const getProduct = async (id) =>{

    const response = await fetch('https://525aa86b-e6ee-4e67-bbdf-f4d543d5701a.mock.pstmn.io/detail/' + id);
    const data = await response.json();
    return data;

};

const buyProduct = async (data) =>{

    const response = await fetch('https://525aa86b-e6ee-4e67-bbdf-f4d543d5701a.mock.pstmn.io/buy',{
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const dataResponse = await response.json();
    return dataResponse;

};

export { getAllProducts, getProduct, buyProduct}