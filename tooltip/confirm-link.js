class ConfirmLink extends HTMLAnchorElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.addEventListener('click',event=>{
            if(!confirm('Do you really want to Leave!')){
                event.preventDefault()
            }
        })
    }
    
}

customElements.define('sb3-confirm-link',ConfirmLink,{
    extends:'a'
})