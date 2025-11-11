// variáveis:
let root = document.documentElement;
let ano = document.querySelector("#ano");
let buttonTema = document.querySelector(".btnAlterarTema");
let inputNome = document.querySelector("#inputNome");
let inputEmail = document.querySelector("#inputEmail");
let form = document.querySelector(".divAreaFormulario");
// mensagens de erro de cada input;
let msgErrorName = document.querySelector(".errorN");
let msgErrorEmail = document.querySelector(".errorE");

// configurando ano:
ano.textContent = new Date().getFullYear();

// tema light/dark:
// add evento 'click' no botão de troca de tema:
buttonTema.addEventListener("click", trocandoTema);

// função para trocar o tema:
// var escuro recebe a verificação: atributo do elemento root é igual a escuro;
// é feita a verificação com essa var, se sim -> o elemento remove esse atributo. Se não -> o elemento é setado e recebe o atributo;

function trocandoTema() {
    let escuro = root.getAttribute("data-tema") === "escuro";
    if (escuro) {
        root.removeAttribute("data-tema");
    } else {
        root.setAttribute("data-tema", "escuro")
    }
}

// validação de formulários:
// add o evento 'submit' ao form, previna o evento padrão dele(enviar formulário) e chama a função "checkForm()";
form.addEventListener("submit",  (event) => {
        event.preventDefault();
        checkForm();
    });

// add eventos nos inputs:
inputNome.addEventListener("input", checkName);
inputEmail.addEventListener("input", checkEmail);

// função que verifica se valor de nome é válido:
function checkName() {
        let nameValue = inputNome.value;
        
        if (nameValue === "" || nameValue === null) {
            msgErrorName.textContent = 'digite um nome válido.';
            // se for vazio ou nulo, o elemento com a mensagem de erro, recebe uma class; 
            msgErrorName.className = "msgError";
            console.log("erro");

        } else {
            console.log("valor válido");
            // se não for vazio ou nulo, o elemento com a mensagem de erro, recebe a class padrão; 
            msgErrorName.className = "errorN";
            
        }
    }


// função que verifica se valor do email é válido: 
function checkEmail() {
    let emailValue = inputEmail.value;
    // verifica se email está dentro do padrão esperado(usando regex);
    // texto@texto.texto
    let regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    let emailValid = regex.test(emailValue);

    // se o valor do email for vazio ou null, o elemento com a mensagem de erro recebe uma class específica e um textContent;
    if (emailValue === "" || emailValue === null) {
        msgErrorEmail.textContent = "digite um email.";
        msgErrorEmail.className = "msgError";
        
    // se o email não estiver dentro do padrão esperado(do regex), elemento com a mensagem de erro recebe uma class específica e um textContent;  
    } else if (!emailValid) {
        msgErrorEmail.textContent = "digite um email válido."
        msgErrorEmail.className = "msgError";
        
    // se não, o elemento da mensagem de erro recebe a class padrão;
    } else {
        msgErrorEmail.className = 'errorE';
        console.log("tudo certo");
    }
}


// função checkForm(): verificar se formulário é válido;
function checkForm() {
    checkName();
    checkEmail();

    // verifica se a mensagem de erro de cada input tem a class que é própria para quando o valor do input for inválido;
    let nameValid = msgErrorName.className !== "msgError";
    let emailValid = msgErrorEmail.className !== "msgError";

    // var elemento recebe a referência do elemento no html, dessa forma será possível manipulá-lo;
    let elemento = document.querySelector(".msgLogin");

    // criando elemento 'span'
     let messageLogin = document.createElement("span");
    //  aplicando uma class a esse elemento criado;
     messageLogin.className = "msgLogin";

    //  verifica se input nome e input email são válidos: Os dois não possuem class de erro;
    if (nameValid === true && emailValid === true) {

        // se o valor('span') de dentro da var não existir no HTML, aplique ele dentro de alguma tag do html e o recebe uma mensagem no textContent; 
        if(elemento === null) {
            form.appendChild(messageLogin);
            elemento.textContent = "Inscrição validada com sucesso"
            console.log(messageLogin)
        }  

        // se valor('span') de dentro da var existir, ele apenas recebe um "novo" valor para o textContent;
        else if (elemento !== null){
               elemento.textContent = "Inscrição validada com sucesso"; 
        }

    // verifica se o valor do input nome ou do input email são inválidos:
    } else if (nameValid === false || emailValid === false) {

        // se o valor de dentro da var('span') não existir no HTML, aplique ele dentro de alguma tag do HTML e seu textContent recebe um valor; 
        if (elemento === null) {
            form.appendChild(messageLogin);
            elemento.textContent = "Inscrição inválida"

        // se o valor de dentro da var('span') já existir, ele apenas recebe um "novo" valor no seu textContent; 
        } else if(elemento !== null) {
            elemento.textContent = "Inscrição inválida";
            
        }
    }

}
