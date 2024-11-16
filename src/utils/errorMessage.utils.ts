export const cleanErrorMessage = (errorMessage: string) => {
    console.log(errorMessage,"errorMessage")
    console.log(typeof errorMessage,"errorMessage")
    return errorMessage.replace(/"/g, '');
}
