const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const form = document.getElementById("formulario");
const listaClientes = document.getElementById("listaClientes");

if (form && nomeInput && emailInput && listaClientes) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !email) {
      return;
    }

    const novoCliente = {
      nome,
      email
    };

    fetch("https://crudcrud.com/api/e2cfc9e771374b4b8396df84cec9afb0/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoCliente)
    })
      .then(response => response.json())
      .then(resultado => {
        console.log("Cliente adicionado com sucesso:", resultado);
        form.reset();

        fetch("https://crudcrud.com/api/e2cfc9e771374b4b8396df84cec9afb0/clientes", {
          method: "GET"
        })
          .then(response => response.json())
          .then(clientes => {
            console.log("Clientes recuperados:", clientes);

            listaClientes.innerHTML = "";

            clientes.forEach(cliente => {
              const item = document.createElement("li");
              item.textContent = `${cliente.nome} - ${cliente.email} `;

              const botaoExcluir = document.createElement("button");
              botaoExcluir.type = "button";
              botaoExcluir.textContent = "Excluir";

              botaoExcluir.addEventListener("click", () => {
                fetch(`https://crudcrud.com/api/e2cfc9e771374b4b8396df84cec9afb0/clientes/${cliente._id}`, {
                  method: "DELETE"
                })
                  .then(() => {
                    item.remove();
                    console.log("Cliente excluído com sucesso:", cliente);
                  })
                  .catch((erro) => {
                    console.error("Erro ao excluir cliente:", erro);
                  });
              });

              item.appendChild(botaoExcluir);
              listaClientes.appendChild(item);
            });
          })
          .catch((erro) => {
            console.error("Erro ao carregar clientes:", erro);
          });
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar cliente:", erro);
      });
  });
}