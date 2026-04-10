class API{
    constructor(){
    }

    async init(){
        const dados = await this.lerLista();
        if (dados){
            tabela.atualizarTabela(dados);
            cabecalho.atualizarVeiculosSelecao(dados)
            cabecalho.filtrarTabela();
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
            ferramentas.exibirErroConexao();
        } 
    }

    async salvarVeiculo(veiculo){
        const rota = "http://127.0.0.1:5000/salvar-veiculo";
        const resposta = await this.salvar(veiculo, rota);
        if (resposta){
            return resposta;
        }
    }

    async salvarItem(item){
        const rota = "http://127.0.0.1:5000/salvar-item";
        const resposta = await this.salvar(item, rota);
        if (resposta){
            return resposta;
        }
    }

    async salvar(dados, rota) {
        try {
            const response = await fetch(rota, {
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
            ferramentas.exibirErroConexao();
            return 'aplicativo offline';
            
        }
    }

    async alterarItem(id, item){
        const rota = `http://127.0.0.1:5000/alterar-item/${id}`;
        const resposta = await this.alterar(rota, item);
        if (resposta){
            return resposta;
        }
    }

    async alterarVeiculo(id, item){
        const rota = `http://127.0.0.1:5000/alterar-veiculo/${id}`;
        const resposta = await this.alterar(rota, item);
        if (resposta){
            return resposta;
        }
    }

    async alterar(rota, dados) {
         try { const response = await fetch(rota, {
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
            return resultado; 
        } catch (erro) {
            console.error("Erro na requisição:", erro); 
            ferramentas.exibirErroConexao();
            return null;
            
        } 
    }

    async deletarVeiculo(id){
        const rota = `http://127.0.0.1:5000/deletar-veiculo/${id}`;
        const resposta = await this.deletar(rota);
        if (resposta){
            return resposta;
        }
    }    

    async deletarItem(id){
        const rota = `http://127.0.0.1:5000/deletar-item/${id}`;
        const resposta = await this.deletar(rota);
        if (resposta){
            return resposta;
        }
    }   

    async deletar(rota) {
        try {
            const response = await fetch(rota, {
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
            ferramentas.exibirErroConexao();
        }
    }
}

class Cabecalho{
    
    constructor(){
        this.veiculoSelecionar = document.getElementById("veiculos-selecionar");
        this.veiculo = document.getElementById("veiculo");
        this.veiculoId = document.getElementById("veiculo-id");
        this.btnIncluir =  document.getElementById("veiculo-btn-incluir");
        this.btnEditar =  document.getElementById("veiculo-btn-editar");
        this.btnCancelar =  document.getElementById("veiculo-btn-cancelar");
        this.btnSalvar =  document.getElementById("veiculo-btn-salvar");
        this.btnExcluir =  document.getElementById("veiculo-btn-excluir");

        this.atualizarData();

        this.veiculoSelecionar.addEventListener("change", () => {
            this.filtrarTabela();
        });

        this.btnIncluir.addEventListener("click", (event) => {
            this.incluirVeiculo();
        });

        this.btnEditar.addEventListener("click", (event) => {
            this.editarVeiculo();
        });

        this.btnCancelar.addEventListener("click", (event) => {
            this.cancelarEdicao();
        });

        this.btnSalvar.addEventListener("click", (event) => {
            this.salvarVeiculo();
        });
        
        this.btnExcluir.addEventListener("click", (event) => {
            this.excluirVeiculo();
        });
    }

    filtrarTabela(){
            const id = this.veiculoSelecionar.value;
            const linhas = document.querySelectorAll("#tabela tbody tr");
            tabela.filtrar(id, linhas);
    }

    alternarIcones(){
            ferramentas.alternarExibicao (this.btnIncluir, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.btnEditar, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.btnCancelar, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.btnSalvar, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.btnExcluir, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.veiculoSelecionar, "invisivel", "visivel");
            ferramentas.alternarExibicao (this.veiculo, "invisivel", "visivel");
    }

    listarVeiculos(){
        const veiculos = this.veiculoSelecionar
    }

    incluirVeiculo(){
            this.veiculo.value = "";
            this.veiculoId.value = "#";
            this.alternarIcones();
    }

    editarVeiculo(){
            if (this.ler().veiculoID == '#'){
                alert('Selecione um veículo');
            }
            else{
            
                this.veiculo.value = this.ler().veiculoDescricao;
                this.veiculoId.value = this.ler().veiculoID;
                this.alternarIcones();
            }
    }
    
    cancelarEdicao(){
        this.alternarIcones(); 
    }

    salvarVeiculo(){
        
        let id = this.veiculoId.value;
        const veiculo = {descricao: this.veiculo.value};
        const selecao = this.veiculoSelecionar;
        const opcoes = [...document.querySelectorAll("#veiculos-selecionar option")]
                .map(opt => opt.textContent);

        const erros = [];
        if (opcoes.includes(veiculo.descricao)){
            erros.push('* Já existe um veículo cadastrado com esse nome.')
        }

        if (veiculo.descricao == ''){
            erros.push('* Preencha o nome do veículo.')
        }

        if (erros.length > 0){
            alert(erros);
        }
        else{

            if (id == "#"){
                this.salvamento(selecao, veiculo);
            }
            
            else {
                api.alterarVeiculo(id, veiculo);
                document.querySelector(`#veiculos-selecionar option[value='${id}']`).
                    textContent = veiculo.descricao;
            }
            this.alternarIcones();
        }
    }

    async salvamento(selecao, veiculo){
        const resposta = await api.salvarVeiculo(veiculo);
        if (resposta){
            let id = 0;
            if (resposta == 'aplicativo offline'){
                const ids = [...document.querySelectorAll("#veiculos-selecionar option")]
                .map(opt => opt.value);
                const numeros = ids.filter(item => !isNaN(item)).map(Number);
                if (numeros.length == 0){
                    id = 1;
                }

                else if (numeros.length > 0){
                    const maior = Math.max(...numeros);
                    id = maior + 1;
                }
            }
            
            else if (resposta != 'aplicativo offline') {
                 id = Number(resposta["id"]);
            }
            selecao.add(new Option(veiculo.descricao, id));
            selecao.value = id;
        }
    }

    excluirVeiculo(){
            const erros = [];
            const id = this.ler().veiculoID;
            const linhas = document.querySelectorAll("#tabela tbody tr td:nth-child(9)");

            let j = 0;
            for (let celula of linhas){
                if (id == celula.textContent){
                    j+=1;
                }
            }
            if (Number(j) != 0){
                erros.push('\n\n* Não é possível excluir um veículo com ítens de manutenção cadastrados.');
            }

            if (this.ler().veiculoID == '#'){
                erros.push('\n\n* Selecione um veículo');
            }

            if (erros.length != 0){
                alert(erros);
            }

            else{
            const id = this.ler().veiculoID
            api.deletarVeiculo(id);
            this.veiculoSelecionar.querySelector(`option[value = "${id}"]`).remove();
        }
    }

    ler(){
        const conteudo = {
            veiculoID: this.veiculoSelecionar.selectedOptions[0].value,
            veiculoDescricao: this.veiculoSelecionar.selectedOptions[0].label,
            data: document.getElementById("data").value,
            km: document.getElementById("km").value
        };
        return conteudo;
    }

    atualizarData(){
        let dataAtual = new Date().toISOString().slice(0,10);
        document.getElementById("data").value = dataAtual;
    }

    atualizarVeiculosSelecao(dados){
        let veiculos = dados.veiculo;
        for (let i in veiculos){
            const selecao = this.veiculoSelecionar;
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
            tabela.cadastrarItem(tabela.tabela.insertRow(), this.ler());
        });

        this.botaoFlutuante.addEventListener("click", (event) => {
            ferramentas.alternarExibicao(this.formulario, "invisivel", "visivel");
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
}

class Tabela{

    constructor(){
        this.tabela = document.getElementById('tabela');
        this.tbody = this.tabela.querySelector("tbody");

        api.init();

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

            const linha = document.getElementById('tabela').insertRow();
            let valores = dados.itens[i];
            const item = {
                id: valores.id,
                descricao: valores.descricao,
                intervalo_km: valores.intervalo_km,
                intervalo_prazo: valores.intervalo_prazo,
                ultima_troca_km: valores.ultima_troca_km,
                ultima_troca_data: valores.ultima_troca_data,
                veiculo: valores.veiculo,
            }

            this.incluirLinha(linha, item);

        }
    }

    filtrar(id, linhas){
        linhas.forEach(linha => {
            
            if (linha.children[8]){
                const valorColuna = linha.children[8].textContent;
                if (valorColuna === id) {
                    linha.style.display = "";
                } else {
                    linha.style.display = "none";
                }
            }
        });
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

    cadastrarItem(linha, valores){
        const erros = [];

        if (cabecalho.ler().veiculoID =='#'){
            erros.push('* Selecione um veículo');
        }

        if (valores.descricao ==''){
            erros.push('\n\n* O campo item precisa ser preenchido');
        }

        if (valores.intervalo_km <= 0 || 
            typeof Number(valores.intervalo_km) != 'number' ||
            Number(valores.intervalo_km) >999999
        ){
            erros.push('\n\n* O campo km para troca precisa ser preenchido com um número entre 1 e 999.999');
        }

        if (valores.intervalo_prazo <= 0 || 
            typeof Number(valores.intervalo_prazo) != 'number' ||
            Number(valores.intervalo_prazo) >240
        ){
            erros.push('\n\n* O campo prazo para troca precisa ser preenchido com um número entre 1 e 240');
        }
        if (Number(valores.ultima_troca_km) < 0 || 
            typeof Number(valores.ultima_troca_km) != 'number' ||
            Number(valores.ultima_troca_km) >999999
        ){
            erros.push('\n\n* O campo km da última troca precisa ser preenchido com um número entre 0 e 999.999');
        }

        if (new Date(valores.ultima_troca_data) == "Invalid Date"){
            erros.push('\n\n* O campo data precisa ser preenchido com uma data válida.');
        }

        if (erros.length != 0){
            alert(erros);
        }

        else{
            const resposta = this.salvarItem(linha, valores);
        }
    }

    async salvarItem(linha, valores){
        const resposta = await api.salvarItem(valores);
        if (resposta){
            valores.id = resposta.id;
            tabela.incluirLinha(linha, valores);
            return resposta;
        }
    }

    incluirLinha(linha, valores){
        this.incluirCelula(linha, 'invisivel', valores.id);
        this.incluirCelula(linha, 'item', valores.descricao);
        this.incluirCelula(linha, 'especificacao-km', valores.intervalo_km);
        this.incluirCelula(linha, 'prazo', valores.intervalo_prazo);
        this.incluirCelula(linha, 'ultima-km', valores.ultima_troca_km);
        this.incluirCelula(linha, 'ultima-data', this.formatarDataBr(valores.ultima_troca_data));
        this.incluirCelula(linha, 'proxima-km', this.somarKm(valores.intervalo_km, valores.ultima_troca_km));
        this.incluirCelula(linha, 'proxima-data', this.somarPrazo(valores.intervalo_prazo, valores.ultima_troca_data));
        this.incluirCelula(linha, 'invisivel', valores.veiculo);
        this.incluirCelula(linha, 'acoes', '<button class = "icone i-atualizar"></button><button class = "icone i-deletar"></button>');
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
        const resposta = api.deletarItem(id);
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

        const erros =[];
        const linha = botao.closest("tr");
        const dados = this.lerLinha(linha)

        const data_proposta = new Date(trocaAtual.data);
        const data_anterior = new Date(this.formatarDataISO(dados.ultima_troca_data));
        
        if (data_proposta < data_anterior) {
            erros.push("* Não é possível registrar revisão anterior à última realizada");
        }

        if (new Date(data_proposta) == "Invalid Date"){
            erros.push('* O campo data precisa ser preenchido com uma data válida');
        }

        if (Number(trocaAtual.km) < Number(dados.ultima_troca_km)){
            erros.push("\n\n* Não é possível registrar revisão com quilometragem inferior à última realizada.");
        } 

        if (erros.length != 0){
            alert(erros);
        }
        else{
            dados.ultima_troca_km = trocaAtual.km;
            dados.ultima_troca_data = trocaAtual.data;
            const id = dados.id;
            delete dados.id;

            const resposta = api.alterarItem(id, dados)

            dados.id = id;
            dados.ultima_troca_data = this.formatarDataBr(dados.ultima_troca_data);
            dados.proximaTrocaKm = this.somarKm(trocaAtual.km, dados.intervalo_km);
            dados.proximaTrocaData = this.somarPrazo(dados.intervalo_prazo, trocaAtual.data);

            this.atualizarLinha(linha, dados);
        }
    }
}

class Ferramentas{
    alternarExibicao(elemento, classe1, classe2){
        let classes = elemento.classList;

        if (classes.contains(classe1)){
            classes.replace(classe1, classe2);
        }

        else if (classes.contains(classe2)){
            classes.replace(classe2, classe1);
        }
    }

    exibirErroConexao(){
        alert("O App está off line, nenhuma alteração será salva");
        }

}

const api = new API();
const cabecalho = new Cabecalho();
const formulario = new Formulario();
const tabela = new Tabela(formulario.ler());
const ferramentas = new Ferramentas();
