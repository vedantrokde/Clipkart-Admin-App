 const baseUrl = "https://clipkart-backend.herokuapp.com/"

export const api = baseUrl+'api';
export const generatePublicURL = (fileName) => {
    return baseUrl+`/public/${fileName}`;
}