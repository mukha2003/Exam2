const alert = {
    type:'info',
    text:'',
    autoclose:false,
    success:function(text, autoclose = false){
       this.type = 'success';
       this.text = text;
       this.autoclose = autoclose;
       this.showAlert();
    },
    danger:function(text, autoclose = false){
        this.type = 'danger';
        this.text = text;
        this.autoclose = autoclose;
        this.showAlert();
    },
    showAlert:function(){
        let html = `
        <div class="${this.type}" id="alert">
            <p>${this.text}</p>
            ${this.autoclose===false?`<button type="button" onclick="alert.closeAlert()">&times</button>`:''}
        </div>`;
        if(document.getElementById("alert")!==null){
            this.closeAlert();
        }
        document.querySelector("body").insertAdjacentHTML('afterbegin', html);
        if(this.autoclose){
            setTimeout(()=>{
                this.closeAlert();
            }, 3000);
        }
    },
    closeAlert(){
        document.getElementById("alert").remove();
    }
};