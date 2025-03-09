export async function cadastrarProduto(dados){

    const url = "http://localhost:8080/produto/cadastrar";
    console.log(dados);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function listarProduto(){

    const url = "http://localhost:8080/produto/listar";
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.json();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function atualizarStatusUserProduto(id, novoStatus){

    const url = `http://localhost:8080/produto/alterar-status/${id}?status=${novoStatus}`;
    console.log(id);
    console.log(novoStatus);
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function encontrarProdutoId(id){

    const url = `http://localhost:8080/produto/buscar/${id}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.json();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function atualizarUsuario(id, dadosUsuario){

    const url = `http://localhost:8080/user/editar/${id}`;
    console.log(url);
    console.log(dadosUsuario);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario)
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}