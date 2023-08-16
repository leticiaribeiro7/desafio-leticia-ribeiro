const cardapio = [
    {
        codigo: "cafe",
        descricao: "Café",
        valor: 3,
        codigoPrincipal: null
    },
    {
        codigo: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.50,
        codigoPrincipal: "cafe"
    },
    {
        codigo: "suco",
        descricao: "Suco Natural",
        valor: 6.20,
        codigoPrincipal: null 
    },
    {
        codigo: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.50,
        codigoPrincipal: null
    },
    {
        codigo: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2,
        codigoPrincipal: "sanduiche"
    },
    {
        codigo: "salgado",
        descricao: "Salgado",
        valor: 7.25,
        codigoPrincipal: null 
    },
    {
        codigo: "combo1",
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.50,
        codigoPrincipal: null 
    },
    {
        codigo: "combo2",
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.50,
        codigoPrincipal: null
    },

]

export default cardapio
