class API{
    constructor(){
        this.init();
    }

    async init(){
        const dados = await this.lerLista();
        if (dados){
            tabela.atualizarTabela(dados);
            cabecalho.atualizarVeiculos(dados)
        }
    }
    
    async lerLista() {
        try { 
            const resposta = await fetch("http://127.0.0.1:5000/recuperar"); 
            
            if (!resposta.ok) { 
                throw new Error("Erro na requisição: " + resposta.status); 
            } 

            const dados = await resposta.json(); 
            return dados;
        } 
        catch (erro) { 
            console.error("Falha ao recuperar lista:", erro);
        } 
    }

    async salvarItem(dados) {
        try {
            const response = await fetch("http://127.0.0.1:5000/salvar-item", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro ao salvar: ${response.status} - ${response.statusText}`);
            }

            const resposta = await response.json();
            return resposta;

        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    }

    async salvarVeiculo(dados) {
        try {
            const response = await fetch("http://127.0.0.1:5000/salvar-veiculo", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro ao salvar: ${response.status} - ${response.statusText}`);
            }

            const resposta = await response.json();
            return resposta;

        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    }

    async alterarItem(id, dados) {
         try { const response = await fetch(`http://127.0.0.1:5000/alterar-item/${id}`, {
             method: "PUT", headers: {
                 "Accept": "application/json", 
                 "Content-Type": "application/json" 
                }, 
                body: JSON.stringify(dados) 
            }); 
            if (!response.ok) {
                 console.error("Erro ao alterar registro:",
                     response.status, response.statusText); 
                     return null; 
            } 
            const resultado = await response.json(); 
            console.log("Registro alterado com sucesso:", resultado); 
            return resultado; 
        } catch (erro) {
            console.error("Erro na requisição:", erro); 
            return null; 
        } 
    }

    async alterarVeiculo(id, dados) {
         try { const response = await fetch(`http://127.0.0.1:5000/alterar-veiculo/${id}`, {
             method: "PUT", headers: {
                 "Accept": "application/json", 
                 "Content-Type": "application/json" 
                }, 
                body: JSON.stringify(dados) 
            }); 
            if (!response.ok) {
                 console.error("Erro ao alterar registro:",
                     response.status, response.statusText); 
                     return null; 
            } 
            const resultado = await response.json(); 
            console.log("Registro alterado com sucesso:", resultado); 
            return resultado; 
        } catch (erro) {
            console.error("Erro na requisição:", erro); 
            return null; 
        } 
    }

    async deletarItem(id) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/deletar-item/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
            } else {
                console.error("Erro ao deletar registro:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
}

class Cabecalho{
    
    constructor(){
        this.veiculo = document.getElementById("veiculos-selecionar");
        this.btnIncluir =  document.getElementById("veiculo-btn-incluir");
        this.btnEditar =  document.getElementById("veiculo-btn-editar");
        this.btnCancelar =  document.getElementById("veiculo-btn-cancelar");
        this.btnSalvar =  document.getElementById("veiculo-btn-salvar");
        
        this.atualizarData();
        this.filtrarTabela();
        this.incluirVeiculo();
        this.editarVeiculo();
        this.cancelarEdicao();
        this.salvarVeiculo();

    }

    filtrarTabela(){
        this.veiculo.addEventListener("change", function () {
            const id = this.value;
            const linhas = document.querySelectorAll("#tabela tbody tr");
            tabela.filtrar(id, linhas);
        });
    }

    async incluirVeiculo(){
        this.btnIncluir.addEventListener("click", (event) => {
            document.getElementById("veiculo").value = "";
            document.getElementById("veiculo-id").value = "#";

            console.log(document.getElementById("veiculo").value);
            console.log(document.getElementById("veiculo-id").value);

            this.exibir(event, this.btnIncluir);
            this.exibir(event, this.btnEditar);
            this.exibir(event, this.btnCancelar);
            this.exibir(event, this.btnSalvar);

            this.exibir(event, document.getElementById("veiculos-selecionar"));
            this.exibir(event, document.getElementById("veiculo"));

        });
    }

    editarVeiculo(){
        this.btnEditar.addEventListener("click", (event) => {
            document.getElementById("veiculo").value = 
                this.ler().veiculoDescricao;
            document.getElementById("veiculo-id").value = 
                this.ler().veiculoID;

            console.log(document.getElementById("veiculo").value);
            console.log(document.getElementById("veiculo-id").value);

            this.exibir(event, this.btnIncluir);
            this.exibir(event, this.btnEditar);
            this.exibir(event, this.btnCancelar);
            this.exibir(event, this.btnSalvar);

            //let veiculo = document.getElementById("veiculo");
            //veiculo.value = this.ler().veiculoDescricao;

            this.exibir(event, document.getElementById("veiculos-selecionar"));
            this.exibir(event, document.getElementById("veiculo"));

        });
    }
    
    cancelarEdicao(){
        this.btnCancelar.addEventListener("click", (event) => {
            this.exibir(event, this.btnIncluir);
            this.exibir(event, this.btnEditar);
            this.exibir(event, this.btnCancelar);
            this.exibir(event, this.btnSalvar);

            this.exibir(event, document.getElementById("veiculos-selecionar"));
            this.exibir(event, document.getElementById("veiculo"));
        });
    }

    salvarVeiculo(){
        this.btnSalvar.addEventListener("click", (event) => {
            const id = document.getElementById("veiculo-id").value;
            const veiculo = {descricao: document.getElementById("veiculo").value};
            
            if (id == "#"){
                api.salvarVeiculo(veiculo);
            }
            
            
            else {
                api.alterarVeiculo(id, veiculo);
            }
            
            
        });
    }

    exibir(event, elemento){
        let classes = elemento.classList;

        if (classes.contains("invisivel-desktop")){
            classes.replace("invisivel-desktop", "visivel-desktop");
        }

        else if (classes.contains("visivel-desktop")){
            classes.replace("visivel-desktop", "invisivel-desktop");
        }
    }



    ler(){
        const conteudo = {
            veiculoID: document.getElementById("veiculos-selecionar").selectedOptions[0].value,
            veiculoDescricao: document.getElementById("veiculos-selecionar").selectedOptions[0].label,
            data: document.getElementById("data").value,
            km: document.getElementById("km").value
        };
        return conteudo;
    }

    atualizarData(){
        let dataAtual = new Date().toISOString().slice(0,10);
        document.getElementById("data").value = dataAtual;
    }

    atualizarVeiculos(dados){
        let veiculos = dados.veiculo;
        for (let i in veiculos){
            const selecao = document.getElementById("veiculos-selecionar");
            selecao.add(new Option(veiculos[i].descricao, veiculos[i].id));
        }
    }
}

class Formulario{

    constructor(){
        this.formulario = document.getElementById('formulario');
        this.botao = document.getElementById('btnFormulario');
        this.botaoFlutuante = document.getElementById('botao-flutuante');
        
        this.botao.addEventListener("click", (event) => {
            tabela.incluirLinha(tabela.tabela.insertRow(), this.ler());
        });

        this.botaoFlutuante.addEventListener("click", (event) => {
            this.exibir(event, this.formulario);
        });
    }

    ler(){
        const conteudo = {
            descricao: document.getElementById("item").value,
            intervalo_km: document.getElementById("especificacao-km").value,
            intervalo_prazo: document.getElementById("especificacao-prazo").value,
            ultima_troca_km: document.getElementById("ultima-troca-km").value,
            ultima_troca_data: document.getElementById("ultima-troca-data").value,
            veiculo: cabecalho.ler().veiculoID

        };
        return conteudo;
    }

    exibir(event, formulario){
        let classes = formulario.classList;

        if (classes.contains("invisivel")){
            classes.replace("invisivel", "visivel");
        }

        else if (classes.contains("visivel")){
            classes.replace("visivel", "invisivel");
        }
    }
}

class Tabela{

    constructor(){
        this.tabela = document.getElementById('tabela');
        this.tbody = this.tabela.querySelector("tbody");

        this.tbody.addEventListener("click", (event) => {
            if (event.target.classList.contains("i-deletar")) {
                this.deletarLinha(event.target);
            }

            if (event.target.classList.contains("i-atualizar")) {
                this.atualizarProximaTroca(event.target, cabecalho.ler());
            }
        });
    }

    atualizarTabela(dados){

        for (let i in dados.itens){

            let valores = dados.itens[i];
            let id = valores.id;
            let descricao = valores.descricao;
            let intervaloKm = valores.intervalo_km;
            let intervaloPrazo = valores.intervalo_prazo;
            let ultimaTrocaKm = valores.ultima_troca_km;
            let ultimaTrocaData = valores.ultima_troca_data;
            let veiculo = valores.veiculo;

            let linha = document.getElementById('tabela').insertRow();
            this.incluirCelula(linha, 'id', id);
            this.incluirCelula(linha, 'item', descricao);
            this.incluirCelula(linha, 'especificacao-km', intervaloKm);
            this.incluirCelula(linha, 'prazo', intervaloPrazo);
            this.incluirCelula(linha, 'ultima-km', ultimaTrocaKm);
            this.incluirCelula(linha, 'ultima-data', this.formatarDataBr(ultimaTrocaData));
            this.incluirCelula(linha, 'proxima-km', this.somarKm(ultimaTrocaKm, intervaloKm));
            this.incluirCelula(linha, 'proxima-data', this.somarPrazo(intervaloPrazo, ultimaTrocaData));
            this.incluirCelula(linha, 'veiculo', veiculo);
            this.incluirCelula(linha, 'acoes', `<button class = "icone i-atualizar">
                </button><button class = "icone i-deletar"></button>`);
        }
    }

    formatarDataBr(data){
        let dia = data.slice(8,10);
        let mes = data.slice(5,7);
        let ano = data.slice (0,4);
        return `${dia}/${mes}/${ano}`;
    }

    formatarDataISO(date){
        let day = date.slice(0,2);
        let month = date.slice(3,5);
        let year = date.slice (6,10);
        return `${year}-${month}-${day}`;
    }

    somarKm(km1, km2){
        let soma = Number(km1) + Number(km2);
        return soma.toString();
    }

    somarPrazo(prazo, data){
        let dataISO = new Date(data);
        let mes = dataISO.getMonth();
        let diasMes = mes == 1 ? 27 : 29;
        let mesCalculado = new Date(dataISO.setMonth(mes+Number(prazo)));
        let dataCalculada = new Date(mesCalculado.setDate(diasMes)).toISOString();
        let dataFormatada = this.formatarDataBr(dataCalculada.slice(0,10));
        return dataFormatada;
    }

    incluirCelula(linha, classe, conteudo){
        let cel = linha.insertCell();
        cel.innerHTML = conteudo;
        cel.classList.add(classe);
    }

    async incluirLinha(linha, valores){

        const resposta = await api.salvarItem(valores);

        if (valores){
            const id = resposta["ID"];
            this.incluirCelula(linha, 'id', id);
            this.incluirCelula(linha, 'item', valores.descricao);
            this.incluirCelula(linha, 'especificacao-km', valores.intervalo_km);
            this.incluirCelula(linha, 'prazo', valores.intervalo_prazo);
            this.incluirCelula(linha, 'ultima-km', valores.ultima_troca_km);
            this.incluirCelula(linha, 'ultima-data', this.formatarDataBr(valores.ultima_troca_data));
            this.incluirCelula(linha, 'proxima-km', this.somarKm(valores.intervalo_km, valores.ultima_troca_km));
            this.incluirCelula(linha, 'proxima-data', this.somarPrazo(valores.intervalo_prazo, valores.ultima_troca_data));
            this.incluirCelula(linha, 'veiculo', valores.veiculo);
            this.incluirCelula(linha, 'acoes', '<button class = "icone i-atualizar"></button><button class = "icone i-deletar"></button>');
        }
    }

    atualizarLinha(linha, valores){
        const celulas = linha.querySelectorAll("td");
        celulas[0].innerHTML = valores.id
        celulas[1].innerHTML = valores.descricao
        celulas[2].innerHTML = valores.intervalo_km
        celulas[3].innerHTML = valores.intervalo_prazo
        celulas[4].innerHTML = valores.ultima_troca_km
        celulas[5].innerHTML = valores.ultima_troca_data;
        celulas[6].innerHTML = valores.proximaTrocaKm;
        celulas[7].innerHTML = valores.proximaTrocaData;
        celulas[8].innerHTML = valores.veiculo
        
    }

    deletarLinha(botao) {
        const linha = botao.closest("tr");
        const id = linha.cells[0].textContent;
        api.deletarItem(id);
        if (linha) {
            linha.remove();
        }
    }

    lerLinha(linha){
        const celulas = linha.querySelectorAll("td");

        const valores = {
            id: celulas[0].textContent,
            descricao: celulas[1].textContent,
            intervalo_km: celulas[2].textContent,
            intervalo_prazo: celulas[3].textContent,
            ultima_troca_km: celulas[4].textContent,
            ultima_troca_data: celulas[5].textContent,
            veiculo: celulas[8].textContent,
        }
        return valores
    }

    atualizarProximaTroca(botao, trocaAtual) {
        const linha = botao.closest("tr");
        const celulas = linha.querySelectorAll("td");

        const dados = this.lerLinha(linha)
        dados.ultima_troca_km = trocaAtual.km;
        dados.ultima_troca_data = trocaAtual.data;
        const id = dados.id;
        delete dados.id;

        api.alterarItem(id, dados)

        dados.id = id;
        dados.ultima_troca_data = this.formatarDataBr(dados.ultima_troca_data);
        dados.proximaTrocaKm = this.somarKm(trocaAtual.km, dados.intervalo_km);
        dados.proximaTrocaData = this.somarPrazo(dados.intervalo_prazo, trocaAtual.data);

        this.atualizarLinha(linha, dados);
    }

    filtrar(id, linhas){
            linhas.forEach(linha => {
            const valorColuna = linha.children[8].textContent;

            if (id === "" || valorColuna === id) {
                linha.style.display = "";
            } else {
                linha.style.display = "none";
            }
        });

    }

}

const api = new API();
const cabecalho = new Cabecalho();
const formulario = new Formulario();
const tabela = new Tabela(formulario.ler());

