import cardapio from "./cardapio.js";

class CaixaDaLanchonete {

    validarCondicoes(campo) {
        const messages = {
            carrinhoVazio: "Não há itens no carrinho de compra!",
            itemInvalido: "Item inválido!",
            quantidadeInvalida: "Quantidade inválida!",
            pagamentoInvalido: "Forma de pagamento inválida!",
            itemExtra: "Item extra não pode ser pedido sem o principal"
        }
        return messages[campo]
    }
    
    aplicarAjusteDeValor(metodoDePagamento, valorTotal) {
        return metodoDePagamento === 'credito' ? valorTotal += (valorTotal*0.03) 
            : metodoDePagamento === 'dinheiro' ? valorTotal -= (valorTotal*0.05) 
            : valorTotal
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (!itens.length) return this.validarCondicoes("carrinhoVazio")

        const pagamentosAceitos = ["credito", "debito", "dinheiro"]
        let valorTotal = 0;
        let message = "";

        itens.forEach((item) => {
            const pedido = item.split(',');
            const [codigo, qtd] = pedido;
            
            let produto = cardapio.find(item => {
                return codigo == item.codigo
            })

            if (pedido.length < 2 || !produto) {
                message = this.validarCondicoes("itemInvalido")
            } else if (qtd == 0) {
                message = this.validarCondicoes("quantidadeInvalida")
            } else if (!(pagamentosAceitos.includes(metodoDePagamento))){
                message = this.validarCondicoes("pagamentoInvalido")
            } else if (produto.codigoPrincipal &&
                       itens.findIndex(item => item.includes(produto.codigoPrincipal)) == -1) {
                message = this.validarCondicoes("itemExtra")  
            } else {
                valorTotal += produto?.valor * qtd;
            }
        })

        if (message) return message;
            
        let valorFinal = this.aplicarAjusteDeValor(metodoDePagamento, valorTotal)
        return "R$ " + valorFinal.toFixed(2).replace(".", ",")
    }
}
export { CaixaDaLanchonete };
