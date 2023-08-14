import cardapio from "./cardapio.js";

class CaixaDaLanchonete {

    aplicarAjusteDeValor(metodoDePagamento, valorTotal) {
        if (metodoDePagamento === 'credito') {
            return valorTotal += (valorTotal*0.03)
        } else if (metodoDePagamento === 'dinheiro') {
            return valorTotal -= (valorTotal*0.05)
        } else {
            return valorTotal
        }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const pagamentosAceitos = [
            "credito",
            "debito",
            "dinheiro"
        ]

        let valorTotal = 0;
        let resultado;

        itens.forEach((item) => {
            const separado = item.split(',');
            const [codigo, qtd] = separado;

            let produto = cardapio.find(item => {
                return codigo == item.codigo
            })

            if (separado.length < 2 || !produto) {
                resultado = "Item inválido!";
            } else if (qtd == 0) {
                resultado = "Quantidade inválida!";
            } else if (!(pagamentosAceitos.includes(metodoDePagamento))){
                resultado = "Forma de pagamento inválida!";
            } else {
                valorTotal += produto?.valor * qtd;
                resultado = valorTotal;
            }
        })

        if (typeof resultado == "string") {
            return resultado
        } else {
            let valorFinal = this.aplicarAjusteDeValor(metodoDePagamento, valorTotal)
            return "R$ " + valorFinal.toFixed(2).replace(".", ",")
        }
    }
}
export { CaixaDaLanchonete };
