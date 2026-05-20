
export default class Modal {
    constructor(id){
        this.modal = document.createElement('dialog');
        this.modal.id = id;
        document.body.appendChild(this.modal);
        this.form = null;
        this.modal.addEventListener('cancel', (e) => {
            e.preventDefault();
            this.close();
        });
    }

    open(){
        this.modal.showModal();
    }

    close(){
        console.log('close fired');
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