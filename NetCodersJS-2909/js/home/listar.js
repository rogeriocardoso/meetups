// 4º JS home/listar.js

// A função ListarProdutos listar todos os produtos que estão no Objeto listProdutos, criado no arquivo index.js.

function ListarProdutos() {
    // Valida com um IF Ternário: 
    // (Se o listProdutos !== undefined ? Então retorna listProdutos, senão (:) retorna um array vázio)
    // Detalhes em: http://www.w3schools.com/js/js_operators.asp
    var produtos = (listProdutos !== undefined ? listProdutos : []);

    var tagsTbody = '';

    for (var i = 0; i < produtos.length; i++) {
        tagsTbody += '<tr onMouseOver="javascript: onProdutoAtivoMouseOver(this);"' +
                         'onMouseOut="javascript: onProdutoAtivoMouseOut(this);">';

        // Índice 
        tagsTbody += '<td>';
        tagsTbody += (i + 1).toString();
        tagsTbody += '</td>';

        // Nome
        tagsTbody += '<td>';
        tagsTbody += produtos[i].nome;
        tagsTbody += '</td>';

        // Código
        tagsTbody += '<td>';
        tagsTbody += produtos[i].codigo;
        tagsTbody += '</td>';

        // Categoria
        tagsTbody += '<td>';
        tagsTbody += produtos[i].categoria;
        tagsTbody += '</td>';

        // Promoção? S/N
        tagsTbody += '<td>';
        tagsTbody += produtos[i].promocao;
        tagsTbody += '</td>';

        // Data Final de Promoção
        tagsTbody += '<td>';
        tagsTbody += produtos[i].txtDataFimPromocao;
        tagsTbody += '</td>';

        // Estoque
        tagsTbody += '<td>';
        tagsTbody += produtos[i].estoque;
        tagsTbody += '</td>';

        // Ações que poderemos fazer
        tagsTbody += '<td>';
        tagsTbody += "<a href='javascript:void(0)' onclick=\"javascript: ExcluirProduto(" + i.toString() + ");\">Excluir</a>";
        tagsTbody += '</td>';
        tagsTbody += '</tr>';
    }

    var tbodyprodutos = document.getElementById('tbodyListaProduto');
    tbodyprodutos.innerHTML = tagsTbody;
}

// Função para Excluir o produto da listProdutos (variável Global dentro do arquivo index.js
function ExcluirProduto(index) {
    if (listProdutos !== undefined && listProdutos.length > index) {
        // confirm : É uma função parecida com o alert mas retorna um booleano! 
        // Se o usuário clicar em "Sim", retorna um true; se clicar em "Não" retorna false.
        // Detalhes em: http://www.w3schools.com/jsref/met_win_confirm.asp
        if (confirm('Tem realmente certeza que seja excluir esse produto?')) {
            // splice é um método (função) do objeto Array para adicionar/excluir itens. 
            // Detalhes em: http://www.w3schools.com/jsref/jsref_splice.asp

            // Neste caso, a partir da posição index, exclui 1 elemento.
            listProdutos.splice(index, 1);
        }
    }

    // Listamos os produtos novamente
    ListarProdutos();
}

// Exemplos de uso da função do MouseOver
function onProdutoAtivoMouseOver(domHtml) {
        //domHtml.style.border = 'red 1px dashed';   // se desejar demonstrar uso de bordas
        domHtml.style.color  = 'red';
        domHtml.style.fontWeight = 'bold';
}

// Exemplos de uso da função do MouseOut
function onProdutoAtivoMouseOut(domHtml) { 
        domHtml.style.color = '';
        domHtml.style.fontWeight = 'normal';
}
