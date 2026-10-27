const formProduto = document.getElementById("formProduto");
const precoCusto = document.getElementById("precoCusto");
const precoVenda = document.getElementById("precoVenda");
const margemLucro = document.getElementById("margemLucro");
const mensagemProduto = document.getElementById("mensagemProduto");

function calcularMargem(){
    const custo = Number(precoCusto.value);
    const venda = Number(precoVenda.value);

    if (precoCusto.value === "" ||
        precoVenda.value === "" ||
        custo <= 0 ||
        venda <= 0 ) {
            margemLucro.value = "-";
            return;
        }

        const margem = ((venda - custo) / custo) * 100;

        margemLucro.value = margem.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + "%"; 
    
}

precoCusto.addEventListener("input", calcularMargem);
precoVenda.addEventListener("input", calcularMargem);

formProduto.addEventListener("reset", function () {
    setTimeout(() =>{
        margemLucro.value = "0,00%"
        mensagemProduto.textContent = "";
    }, 0);
})

formProduto.addEventListener("submit", function(event){
    event.preventDefault();

    const codigo = document.getElementById("codigoBarras").value.trim();
    const descricao = document.getElementById("descricaoProduto").value.trim();
    const venda = Number(precoVenda.value);
    const custo = Number(precoCusto.value);
    const unidade = document.querySelector('input[name="unidade"]:checked');

    if(!/^\d+$/.test(codigo)){
        mensagemProduto.textContent = "Informe um codigo valido.";
        return;
    }

    if(!descricao || !Number.isFinite(custo) || !Number.isFinite(venda) || custo <=0 || venda <=0){
        mensagemProduto.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    if(!unidade){
        mensagemProduto.textContent = "Selecione uma unidade.";
        return;
    }
    
    let produtos;

    try {
        produtos = JSON.parse(localStorage.getItem("produtos") || "[]")

        if(!Array.isArray(produtos)){
            produtos = [];
        }
    } catch {
        produtos = [];
    }

    if(produtos.some(p =>
        String(p.codigosBarras) === codigo
    )) {
        mensagemProduto.textContent = "Ja existe um produto com esse codigo de barras.";
        return;
    }

    const margem = ((venda - custo) / custo) * 100;

    const produto = {
        codigobarras: codigo,
        descricaoProduto: descricao,
        precoCusto: custo,
        precoVenda: venda,
        margem: margem,
        unidade: unidade.value
    };

    produtos.push(produto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    mensagemProduto.style.color = "green";
    mensagemProduto.textContent = "Produto cadastrado com sucesso!";

    setTimeout(() => {
        window.location.href= "produtos.html";
    }, 700);

    
});