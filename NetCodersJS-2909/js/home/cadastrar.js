// 2º JS - home/cadastrar.js

// Aqui no JS cadastrar, vamos manipular o DOM para validar o cadastrado do produto. 
// E mostrar a mensagem de sucesso se estiver tudo de acordo com as regras de negócios, que são:
// nome, código e categoria com preenchimento obrigatório!

function Validar() {
    // pega cada objeto do formulário e guarda em variáveis
    var txtNome = document.getElementById('txtNome');
    var txtCodigo = document.getElementById('txtCodigo');    
    var ddlCategoria = document.getElementById('ddlCategoria');
    var ckbPromocao = document.getElementById('ckbPromocao');
    var txtDataFimPromocao = document.getElementById('txtDataFimPromocao');

    // esta variável (flag) controla se está tudo OK, ou não. 
    isValido = true;

    // === : Compara tipo e valor. Neste caso não faz conversão de tipos para saber o valor. Recomendado!
    // == : Compara apenas o valor. Ele converte um dos valores com base no outro, e assim faz a verificação dos valores.
    // Veja: http://dorey.github.io/JavaScript-Equality-Table/
    //       http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons

    if (txtNome.value === '') {
        isValido = false;
        txtNome.classList.add('errorInput');
    }

    if (txtCodigo.value === '') {
        isValido = false;
        txtCodigo.classList.add('errorInput');
    }

    if (ddlCategoria.value === '0') {
        isValido = false;
        ddlCategoria.classList.add('errorInput');
    }

    if (txtDataFimPromocao.value === '') {
        isValido = false;
        txtDataFimPromocao.classList.add('errorInput');
    }

    if (isValido === false) {
        // a validação falhou! então, gera/exibe uma mensagem de erro!
        var divAlerta = document.getElementById('divAlert');
        var mensagem = '<strong>Atenção: </strong>Preencha os campos em destaque abaixo.'
        divAlerta.innerHTML = mensagem;
        divAlerta.classList.add('alert');
        divAlerta.classList.add('alert-danger');
    }

    return isValido;
}

function LimparMensagensErros() {
    // a função getElementsByClassName serve para pegar TODOS os campos do formulário que estão
    // usando a classe 'errorInput' (ou seja, aqueles que estão com erro de preenchimento)
    var listClassErrorInput = document.getElementsByClassName('errorInput');

    // primeiro remove a classe errorInput desses elementos
    while (listClassErrorInput.length > 0) {      
        listClassErrorInput[0].classList.remove('errorInput');
    }

    // se a divAlert possui classes de alerta, remove também. E limpa a mensagem (via innerHTML)
    var divAlerta = document.getElementById('divAlert');
    if (divAlerta.classList.contains('alert') || divAlerta.classList.contains('alert-danger')) {
        divAlerta.classList.remove('alert');
        divAlerta.classList.remove('alert-danger');
        divAlerta.innerHTML = '';
    }
}

// como o campo de estoque é do tipo "radio"; não dá para pegar direto pelo value.
// é necessário verifical qual opção está checada para pegar seu value.
// neste caso, não foi especificado um value no hmtl. Então está usando a posição relativa (0,1,2)
function getValorEstoque(){
    var objRadio = document.getElementsByName("estoque");
    var txtEstoque = -1;
    for (var i = objRadio.length - 1; i >= 0; i--) {
        if (objRadio[i].checked){
            txtEstoque = i;
        }
    };
    return txtEstoque;
}

function onCadastrarClick() {
    LimparMensagensErros();

    if (Validar()) {

        var txtNome = document.getElementById('txtNome');
        var txtCodigo = document.getElementById('txtCodigo');    
        var ddlCategoria = document.getElementById('ddlCategoria');
        var ckbPromocao = document.getElementById('ckbPromocao');
        var txtDataFimPromocao = document.getElementById('txtDataFimPromocao');
        var txtEstoque = getValorEstoque();

        // Cria um objeto Produto
        var Produto = {}; // === new Objct();

        Produto.nome = txtNome.value.trim();
        Produto.codigo = txtCodigo.value.trim();
        Produto.categoria = ddlCategoria.value;
        Produto.promocao = ckbPromocao.checked ? "Sim" : "Não";        
        Produto.txtDataFimPromocao = txtDataFimPromocao.value;
        Produto.estoque = txtEstoque;                

        // *** Após criar o 3º Js (index.js) vamos adicionar a linha abaixo:
        // Adicionando o obj Produto na lista de Produtos, só que... esse JS esta acima do index.js. 
        // ** Comentar sobre a forma de leitura do Navegador e a ordem interfere um com o outro...
        AdicionarProduto(Produto);

        MensagemSucesso();
        LimparCampos();

        // Depois de criar o 4º JS (listar.js):
        ListarProdutos();
        return true;
    }

    return false;
}

function MensagemSucesso() {
    var divAlerta = document.getElementById('divAlert');
    var mensagem = '<strong>Sucesso: </strong>Produto cadastrado com sucesso!'
    divAlerta.innerHTML = mensagem;
    
    // Atribui classes especiais à esta div
    divAlerta.classList.add('alert');
    divAlerta.classList.add('alert-success');
    DesaparecerMensagemSucesso();
}

// Função para LimparMensagem da Div Alerta
function LimparMensagem() {
    var divAlerta = document.getElementById('divAlert');
    divAlerta.innerHTML = '';
    
    // Remove da lista de classes da div, as classes adicionadas em razão do sucesso
    divAlerta.classList.remove('alert');
    divAlerta.classList.remove('alert-success');
}

// Função para LimparCampos
function LimparCampos() {
    // Cada seletor de formulário tem sua particularidade para manipular os dados dele
    // Então, a forma de limpar é diferente
    document.getElementById('txtNome').value = '';
    document.getElementById('txtCodigo').value = '';
    document.getElementById('ddlCategoria').selectedIndex = 0;
    document.getElementById('ckbPromocao').checked = false;
    document.getElementById('txtDataFimPromocao').value = '';
    document.getElementById('txtEstoque').checked = true;

    document.getElementById('lblValorDDLCategoria').textContent = '';
    document.getElementById('lblValorKeyPressCodigo').textContent = '';
}

function DesaparecerMensagemSucesso() {
    // setTimeout é uma funcionalidade do DOM que executa uma função após algums tempo(em milisegundos)...
    // Sintaxe: window.setTimeout(função, tempo);

    // Detalhes em: http://www.w3schools.com/jsref/met_win_settimeout.asp
    window.setTimeout(
        // Criando uma function anônima
        function () {
            LimparMensagem();
        }, 5000);
}

// Função executada no evento Blur do seletor da Data de Fim da Promoção
function onValidaDataFimPromocaoBlur(domHtml) {
    if (domHtml.value == '') {
        /* Se desejar configurar como data de hoje 
        var d = new Date();        
        domHtml.value = d.getDate().toString() + "/" +
                         ((d.getMonth()+1).toString().length===1 ? "0" : "") +
                         (d.getMonth()+1).toString() + "/" +
                         d.getFullYear().toString();  */
        domHtml.value = "31/12/2015";  // qualquer data passada, sub entendendo como vencida a promoção

    } else if (domHtml.value !== '') {
        // Validando se o formato da Data esta correta
        var arrayDiaMesAno = domHtml.value.split('/');
        if (arrayDiaMesAno.length == 3) {
            var dia = parseInt(arrayDiaMesAno[0]);
            var mes = parseInt(arrayDiaMesAno[1]);
            var ano = parseInt(arrayDiaMesAno[2]);

            // Validar se o que foi digitado só tem números
            if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
                alert('Por favor, digite uma data válida.');
                domHtml.value = '';
            }
            
            var mesString = (mes.toString().length === 1 ? "0" + mes.toString() : mes.toString());
            var diaString = (dia.toString().length === 1 ? "0" + dia.toString() : dia.toString());
            var dateString = diaString + "/" + mesString + "/" + ano;
            
            if (!ValidaDataRegex(dateString)) {
                alert('Por favor, digite uma data válida.');
                domHtml.value = '';
            }

        }
        else {
            alert('Por favor, adicionar uma data.');
            domHtml.value = '';
        }
    }
}

function ValidaDataRegex(data) {
     var regex = /^((((0?[1-9]|1\d|2[0-8])\/(0?[1-9]|1[0-2]))|((29|30)\/(0?[13456789]|1[0-2]))|(31\/(0?[13578]|1[02])))\/((19|20)?\d\d))$|((29\/0?2\/)((19|20)?(0[48]|[2468][048]|[13579][26])|(20)?00))$/;
     
     var resultado = regex.exec(data);
     return ((!resultado) === false);
}

// Função executada no evento Change do DropDownList (select)
function onShowValorChange(domHtml) {
    var lblValorDDLCategoria = document.getElementById('lblValorDDLCategoria');
    var textDDL = '';
    if (domHtml.selectedIndex > 0) {
        textDDL = domHtml.options[domHtml.selectedIndex].value + " - " +
                  domHtml.options[domHtml.selectedIndex].text;
    }
    lblValorDDLCategoria.textContent = textDDL;
}

// Função que é executado no evento KeyDown
function onValidarCodigoKeyDown(evt) {
    // Em todos os eventos, por tras dos panos, é setado na variável "event" do evento assionado...

    // If Ternário para verificar no objeto event que o JavaScript retorna, se tem o código da tecla 
    // na propriedade keyCode ou na charCode
    var tecla = (evt.keyCode ? evt.keyCode : evt.charCode);
    var lblValorKeyPressCodigo = document.getElementById('lblValorKeyPressCodigo');

    // Teclas com o código entre 48 e 59 ou entre 96 e 105, são númericos
    if ((tecla >= 48 && tecla <= 59) || (tecla >= 96 && tecla <= 105)) {
        lblValorKeyPressCodigo.textContent = 'Numérico';
    }
    else {
        lblValorKeyPressCodigo.textContent = '';
    }
}
