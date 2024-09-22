let carrinho = [];
let saida = document.getElementById("saida");
let totalElement = document.getElementById("total");

class Produto {
    constructor(nome, quantidade, preco) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    addCarrinho() {
        let produtoNome = document.getElementById("nomeProduto").value;
        let quantComprar = parseFloat(document.getElementById("quantidade").value);
        let precoProduto = parseFloat(document.getElementById("precoProduto").value);

        if (produtoNome && quantComprar > 0 && precoProduto > 0) {
            let produtoExistente = carrinho.find(produto => produto.nome === produtoNome);

            if (produtoExistente) {
                produtoExistente.quantidade += quantComprar; 
                produtoExistente.preco = precoProduto; 
            } else {
                let novoProduto = new Produto(produtoNome, quantComprar, precoProduto);
                carrinho.push(novoProduto);
            }

            this.atualizaSaida();
            this.limpaCampos();
        } else {
            alert("Os locais de nome, quantidade ou preço estão vazios.");
        }
    }

    atualizaSaida() {
        saida.innerHTML = ''; 
        let total = 0;

        carrinho.forEach((produto, index) => {
            saida.innerHTML += `
                <div>
                    <span>${produto.nome}:</span>
                    <input type="number" value="${produto.quantidade}" id="quantidade${index}">
                    <input type="text" value="${produto.preco.toFixed(2)}" id="preco${index}">
                    <button onclick="atualizarProduto(${index})">Atualizar</button>
                </div>
            `;
            total += produto.quantidade * produto.preco; 
        });

        totalElement.innerHTML = `Total a Pagar: R$ ${total.toFixed(2)}`; // 
    }

    limpaCampos() {
        document.getElementById("nomeProduto").value = '';
        document.getElementById("quantidade").value = '';
        document.getElementById("precoProduto").value = '';
    }
}

function atualizarProduto(index) {
    let novaQuantidade = parseFloat(document.getElementById(`quantidade${index}`).value);
    let novoPreco = parseFloat(document.getElementById(`preco${index}`).value);

    if (novaQuantidade >= 0 && novoPreco >= 0) {
        carrinho[index].quantidade = novaQuantidade;
        carrinho[index].preco = novoPreco;
    } else {
        alert("Quantidade e preço devem ser valores positivos.");
    }

    let produto = new Produto();
    produto.atualizaSaida();
}

document.getElementById("adicionar").addEventListener("click", function() {
    let produto = new Produto();
    produto.addCarrinho();
});
