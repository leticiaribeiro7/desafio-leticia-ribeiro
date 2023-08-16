import cardapio from "./cardapio.js";

class CaixaDaLanchonete {

    validarCondicoes(pedido, produto, qtd, pagamentosAceitos, metodoDePagamento, itens) {
        const conditions = [
            { check: pedido.length < 2 || !produto, errorMessage: "Item inválido!" },
            { check: qtd == 0, errorMessage: "Quantidade inválida!" },
            { check: !pagamentosAceitos.includes(metodoDePagamento), errorMessage: "Forma de pagamento inválida!" },
            { check: produto?.codigoPrincipal && itens.findIndex(item => item.includes(produto?.codigoPrincipal)) === -1, errorMessage: "Item extra não pode ser pedido sem o principal" }
        ];

        for (const condition of conditions) {
            if (condition.check) {
                return condition.errorMessage;
            }
        }

        return null; // Retorna nulo se todas as condições forem atendidas
    }
	
    aplicarAjusteDeValor(metodoDePagamento, valorTotal) {
        return metodoDePagamento === 'credito' ? valorTotal += (valorTotal*0.03) 
            : metodoDePagamento === 'dinheiro' ? valorTotal -= (valorTotal*0.05) 
            : valorTotal
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (!itens.length) return "Não há itens no carrinho de compra!"

        const pagamentosAceitos = ["credito", "debito", "dinheiro"]
        let valorTotal = 0;

        for (const item of itens) {
			
            const pedido = item.split(',');
            const [codigo, qtd] = pedido;
            let produto = cardapio.find(item => {
                return codigo == item.codigo
            })
			
            let message = this.validarCondicoes(pedido, produto, qtd, pagamentosAceitos, metodoDePagamento, itens);
            if (message) return message;
            
            valorTotal += produto?.valor * qtd;
            
        }
		
        const valorFinal = this.aplicarAjusteDeValor(metodoDePagamento, valorTotal)
        return "R$ " + valorFinal.toFixed(2).replace(".", ",")  
    }
}

export { CaixaDaLanchonete };
