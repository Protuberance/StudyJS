class Validator {
    constructor({
        selector,
        pattern,
        method
    }) {
        this.form = document.querySelector(selector)  ;
        this.pattern = pattern;
        this.method = method;
    }

    init() {
        console.log(this.form);
    }

    showError(elem) {

    }

    showSuccess(elem) {}
}