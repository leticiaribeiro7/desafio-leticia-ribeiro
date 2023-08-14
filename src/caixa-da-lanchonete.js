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

        let valorTotal = 0;

        itens.map((item) => {
            const separado = item.split(',');
            const [codigo, qtd] = separado;

            let produto = cardapio.find(item => {
                if (codigo == item.codigo) {
                    return item;
                }
            })

            valorTotal += produto?.valor * qtd;
        })

        let valorFinal = this.aplicarAjusteDeValor(metodoDePagamento, valorTotal)
        return "R$ " + valorFinal.toFixed(2).replace(".", ",")
    }
}
export { CaixaDaLanchonete };
