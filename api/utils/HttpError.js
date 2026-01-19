class HttpError extends Error {

    #name;
    #statusCode;

    constructor(message, code){
        // super appelle le constructeur de la classe parente Error
        super(message);

        this.#name = 'HttpError';

        this.#statusCode = code;
    }

    get name(){
        return this.#name;
    }

    get statusCode(){
        return this.#statusCode;
    }

    set statusCode(value){
        this.#statusCode = value;
    }
    
}

export default HttpError;