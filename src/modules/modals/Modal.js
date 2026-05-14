
export default class Modal {
    constructor(id){
        this.modal = document.createElement('dialog');
        this.modal.id = id;
        document.body.appendChild(this.modal);
        this.form = null;
    }

    open(){
        this.modal.showModal();
    }

    close(){
        this.modal.close();
        this.form.reset();
    }

    isValid(){
        if(!this.form.checkValidity()){
            this.form.reportValidity();
            return false;
        }
        return true;
    }
}