import express from "express";

const host = "0.0.0.0";
const port = 4000;
const app = express();

let fornecedores = [];
let clientes = [];
let usuarioLogado = false;

app.use(express.urlencoded({ extended: true }));

const menu = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Menu</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/cadastrarFornecedor">Cadastrar Fornecedor</a></li>
        <li class="nav-item"><a class="nav-link" href="/cadastrarCliente">Cadastrar Cliente</a></li>
        <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
        <li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
`;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html><head>
      <meta charset="UTF-8">
      <title>Home</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5"><h1>Bem-vindo!</h1></div>
    </body></html>
  `);
});

// ---------------- FORNECEDOR ----------------
app.get("/cadastrarFornecedor", (req, res) => {
  res.send(`
    <!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Cadastro de Fornecedor</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5">
      <form method="POST" action="/cadastrarFornecedor" class="border p-4">
        <fieldset><legend>Cadastro de Fornecedor</legend>
          <div class="mb-3"><label>CNPJ</label><input type="text" name="cnpj" class="form-control"></div>
          <div class="mb-3"><label>Razão Social</label><input type="text" name="razao" class="form-control"></div>
          <div class="mb-3"><label>Nome Fantasia</label><input type="text" name="fantasia" class="form-control"></div>
          <div class="mb-3"><label>Endereço</label><input type="text" name="endereco" class="form-control"></div>
          <div class="mb-3"><label>Cidade</label><input type="text" name="cidade" class="form-control"></div>
          <div class="mb-3"><label>UF</label><input type="text" name="uf" class="form-control"></div>
          <div class="mb-3"><label>CEP</label><input type="text" name="cep" class="form-control"></div>
          <div class="mb-3"><label>Email</label><input type="email" name="email" class="form-control"></div>
          <div class="mb-3"><label>Telefone</label><input type="text" name="telefone" class="form-control"></div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </fieldset>
      </form></div></body></html>
  `);
});

app.post("/cadastrarFornecedor", (req, res) => {
  const campos = ["cnpj", "razao", "fantasia", "endereco", "cidade", "uf", "cep", "email", "telefone"];
  const dados = {};
  const erros = [];

  campos.forEach(campo => {
    dados[campo] = req.body[campo]?.trim();
    if (!dados[campo]) erros.push(campo);
  });

  if (erros.length > 0) {
    return res.send(`
      <!DOCTYPE html><html><head>
      <meta charset="UTF-8"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head><body>${menu}
      <div class="container mt-5">
        <div class="alert alert-danger">
          Os seguintes campos são obrigatórios: ${erros.join(", ")}<br>
          <a href="/cadastrarFornecedor">Voltar</a>
        </div>
      </div></body></html>
    `);
  }

  fornecedores.push(dados);
  res.redirect("/listaFornecedores");
});

app.get("/listaFornecedores", (req, res) => {
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Fornecedores</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5"><h2>Fornecedores Cadastrados</h2>
    <table class="table table-bordered"><thead><tr>
    <th>CNPJ</th><th>Razão</th><th>Fantasia</th><th>Endereço</th>
    <th>Cidade</th><th>UF</th><th>CEP</th><th>Email</th><th>Telefone</th>
    </tr></thead><tbody>`;

  if (fornecedores.length === 0) {
    html += `<tr><td colspan="9" class="text-center">Nenhum fornecedor cadastrado.</td></tr>`;
  } else {
    fornecedores.forEach(f => {
      html += `<tr><td>${f.cnpj}</td><td>${f.razao}</td><td>${f.fantasia}</td>
      <td>${f.endereco}</td><td>${f.cidade}</td><td>${f.uf}</td>
      <td>${f.cep}</td><td>${f.email}</td><td>${f.telefone}</td></tr>`;
    });
  }
  html += `</tbody></table></div></body></html>`;
  res.send(html);
});

// ---------------- CLIENTE ----------------
app.get("/cadastrarCliente", (req, res) => {
  res.send(`
    <!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Cadastro de Cliente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5">
      <form method="POST" action="/cadastrarCliente" class="border p-4">
        <fieldset><legend>Cadastro de Cliente</legend>
          <div class="mb-3"><label>Nome</label><input type="text" name="nome" class="form-control"></div>
          <div class="mb-3"><label>Email</label><input type="email" name="email" class="form-control"></div>
          <div class="mb-3"><label>Telefone</label><input type="text" name="telefone" class="form-control"></div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </fieldset>
      </form></div></body></html>
  `);
});

app.post("/cadastrarCliente", (req, res) => {
  const { nome, email, telefone } = req.body;
  const erros = [];
  if (!nome) erros.push("nome");
  if (!email) erros.push("email");
  if (!telefone) erros.push("telefone");

  if (erros.length > 0) {
    return res.send(`
      <!DOCTYPE html><html><head><meta charset="UTF-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head><body>${menu}
      <div class="container mt-5">
        <div class="alert alert-danger">
          Os seguintes campos são obrigatórios: ${erros.join(", ")}<br>
          <a href="/cadastrarCliente">Voltar</a>
        </div>
      </div></body></html>
    `);
  }

  clientes.push({ nome, email, telefone });
  res.redirect("/listaClientes");
});

app.get("/listaClientes", (req, res) => {
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Clientes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5"><h2>Clientes Cadastrados</h2>
    <table class="table table-bordered"><thead><tr>
    <th>Nome</th><th>Email</th><th>Telefone</th></tr></thead><tbody>`;

  if (clientes.length === 0) {
    html += `<tr><td colspan="3" class="text-center">Nenhum cliente cadastrado.</td></tr>`;
  } else {
    clientes.forEach(c => {
      html += `<tr><td>${c.nome}</td><td>${c.email}</td><td>${c.telefone}</td></tr>`;
    });
  }

  html += `</tbody></table></div></body></html>`;
  res.send(html);
});

// ---------------- LOGIN / LOGOUT ----------------
app.get("/login", (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5">
      <form method="POST" action="/login" class="w-50 mx-auto">
        <fieldset><legend>Login</legend>
          <div class="mb-3"><label>Usuário</label><input type="text" name="usuario" class="form-control"></div>
          <div class="mb-3"><label>Senha</label><input type="password" name="senha" class="form-control"></div>
          <button type="submit" class="btn btn-primary">Entrar</button>
        </fieldset>
      </form></div></body></html>
  `);
});

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  usuarioLogado = (usuario === "admin" && senha === "1234");
  const mensagem = usuarioLogado ? "login efetuado com sucesso!" : "Login está incorreto!";

  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5">
      <h1>${mensagem}</h1>
    </div></body></html>
  `);
});

app.get("/logout", (req, res) => {
  usuarioLogado = false;
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Logout</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    </head><body>${menu}
    <div class="container mt-5">
      <h1>logout efetuado com sucesso!</h1>
    </div></body></html>
  `);
});

app.listen(port, host, () => {
  console.log(`Servidor executando em http://${host}:${port}`);
});
