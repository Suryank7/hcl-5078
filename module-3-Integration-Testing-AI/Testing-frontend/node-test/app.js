export const greet = (name) => {
    return `Hello, ${name}`;
};

// export const sum = (a, b) =>
//     a+b

export const greetInHindi = (name) => {
    // return `Hi, ${name}`;
    return `Ram Ram, bhai ${name} ne!`;
};

export const processOrder = (data, dependency) => {
    //apply logic
    //call payment gateway
    
    const paymentinfo = dependency.processPayment(data.amount);
    return paymentinfo;
};

const processPayment = (amount) =>{
    //API call to external payment gateway
    console.log('i am original processPayment');
    return {id:123,amount}
    
}