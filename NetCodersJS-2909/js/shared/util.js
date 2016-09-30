// 1ª JS - shared/util.js

// Esse function (anônima) será executada assim que for carregada
(function () {
    // Função que será executada assim que a página for carregada!
    //window.onload = SetYearFooter;    // era usada assim... qdo ajustar apenas o ano do rodapé
    window.onload = ExecutarTodasFuncoes;
})();

// Função Nomeada (SetYearFooter)
function SetYearFooter() {
    // Use a palavra reservada debugger para debugar o código. 
    // Quando o console do navegador estiver aberto, vai parar a interpretação para realizar a depuração    
    // debugger;

    var lblFooter = document.getElementById('lblAnoFooter');
    // O método getFullYear() retorna o ano de um objeto do tipo Date, instanciado pelo new.
    // veja: http://www.w3schools.com/js/js_date_methods.asp
    lblFooter.textContent = new Date().getFullYear().toString();
}


function ExecutarTodasFuncoes() {
    SetYearFooter();
    PreencheDDLCategorias();
}

// ----
// Variável Global com o uma lista de objetos do tipo Categoria, que contém as propriedades texto e valor.
// O texto é exibido na lista de categorias exibidas na lista. O valor é o que será guardado no "BD"
var Categorias = [
    { texto: "Celulares", valor: "10" },
    { texto: "Informática", valor: "20" },
    { texto: "Eletrodomésticos", valor: "30" },
    { texto: "Livros", valor: "40" },
    { texto: "DVD/BluRay", valor: "50" }
];

// Função que irá preencher as opções do DropDownList (tegs <option>)
function PreencheDDLCategorias() {
    var ddlCategoria = document.getElementById('ddlCategoria');

    var options = '<option value="0">--- Selecione ---</option>';    
    var index = 0;
    do {
        options += '<option value="';
        options += Categorias[index].valor;
        options += '">';
        options += Categorias[index].texto;
        options += '</option>';
        index++;
    } while (Categorias.length > index);
    // ao invés de do...while poderia ser feito com "for(var index=0; index<Categorias.length; index++)"

    // insere as opções geradas, dentro do objeto <select> usando a propriedade innerHTML
    ddlCategoria.innerHTML = options;
}