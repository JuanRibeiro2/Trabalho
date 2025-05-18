import express from "express";

const host = "0.0.0.0";
const port = 3000;
var lista = [];
const app = express();


app.use(express.urlencoded({extended: true}));

app.get("/", (requisicao, resposta)=>{
   resposta.send(`
   
            <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Página Inicial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <style>
        .navbar-custom {
            background-color: #343a40;
        }

        .navbar-custom .navbar-brand,
        .navbar-custom .nav-link,
        .navbar-custom .dropdown-toggle {
            color: #ffffff;
        }

        .navbar-custom .nav-link:hover,
        .navbar-custom .dropdown-menu a:hover {
            background-color: #495057;
            color: #ffffff;
        }

        .dropdown-menu {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
        }

        .dropdown-item {
            color: #212529;
        }

        .dropdown-item:hover {
            background-color: #f8f9fa;
        }
    </style>
</head>
<body>
    <!-- Menu com estilização -->
    <nav class="navbar navbar-expand-lg navbar-custom shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Menu</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastrar
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/cadastroVendas">Cadastro de Vendas</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</body>
</html>

    `); 
    resposta.end();

})

app.get("/cadastroVendas", (requissicao, resposta)=> {
    resposta.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            </head>
            <body>
                <div class="container w-50 mt-5">
                    <form method="POST" action="/cadastroVendas" class="border p-4" novalidate>
                        <fieldset>
                            <legend>Cadastro de Produto</legend>

                            <div class="mb-3">
                                <label for="nomeProduto" class="form-label">Nome do Produto</label>
                                <input type="text" class="form-control" id="nomeProduto" name="produto" required>
                            </div>

                            <div class="mb-3">
                                <label for="valorProduto" class="form-label">Valor</label>
                                <input type="number" class="form-control" id="valorProduto" step="0.01" name="valor" required>
                            </div>

                            <div class="mb-3">
                                <label for="quantidadeProduto" class="form-label">Quantidade</label>
                                <input type="number" class="form-control" id="quantidadeProduto" min="1" name="quantidade" required>
                            </div>

                            <div class="mb-3">
                                <label for="tipoProduto" class="form-label">Tipo</label>
                                <input type="text" class="form-control" id="tipoProduto" name="tipo" required>
                            </div>

                            <div class="mb-3">
                                <label for="descricaoProduto" class="form-label">Descrição</label>
                                <textarea class="form-control" id="descricaoProduto" rows="3" name="descricao" required></textarea>
                            </div>

                            <div class="mb-3">
                                <label for="categoriaProduto" class="form-label">Categoria</label>
                                <select class="form-select" id="categoriaProduto" name="categoria" required>
                                    <option selected disabled value="">Escolher...</option>
                                    <option>Alimento</option>
                                    <option>Bebida</option>
                                    <option>Eletrônico</option>
                                    <option>Vestuário</option>
                                    <option>Outro</option>
                                </select>
                            </div>

                            <button class="btn btn-primary w-100" type="submit">Enviar</button>
                            <a class="btn btn-primary w-100 mt-3" href="/">Voltar</a>
                        </fieldset>
                    </form>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </body>
            </html>

   
            
            `);

});
app.post("/cadastroVendas", (requisicao, resposta) => {
    const { produto, valor, quantidade, tipo, descricao, categoria } = requisicao.body;

    if (
        !produto.trim() ||
        !valor.trim() ||
        !quantidade.trim() ||
        !tipo.trim() ||
        !descricao.trim() ||
        !categoria.trim()
    ) {
        
        return resposta.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Erro no Cadastro</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container mt-5">
                    <div class="alert alert-danger" role="alert">
                        Todos os campos devem ser preenchidos! <a href="/cadastroVendas" class="alert-link">Voltar ao formulário</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }

    lista.push({ produto, valor, quantidade, tipo, descricao, categoria });
    resposta.redirect("/lista");
});


app.get("/lista", (requisicao, resposta) => {
    let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Lista de Produtos</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h2 class="mb-4">Lista de Produtos Cadastrados</h2>
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>`;

    if (lista.length === 0) {
        html += `
                    <tr>
                        <td colspan="6" class="text-center">Nenhum produto cadastrado.</td>
                    </tr>`;
    } else {
        for (let item of lista) {
            html += `
                    <tr>
                        <td>${item.produto}</td>
                        <td>R$ ${parseFloat(item.valor).toFixed(2)}</td>
                        <td>${item.quantidade}</td>
                        <td>${item.tipo}</td>
                        <td>${item.descricao}</td>
                        <td>${item.categoria}</td>
                    </tr>`;
        }
    }

    html += `
                </tbody>
            </table>
            <a href="/" class="btn btn-primary">Voltar ao início</a>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>`;

    resposta.send(html);
});



app.listen(port, host, () => {
    console.log(`Servido em execucao em http://${host}:${port}/`);
});