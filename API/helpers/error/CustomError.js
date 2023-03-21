class CustomError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
    }
}

// Burada Error classında status olmadığı için onu kalıtım alamadı, kendim belirttim.

module.exports = CustomError;