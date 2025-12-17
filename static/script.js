
class Cabecalho{
    
    constructor(){

    }

    ler(){
        const conteudo = {
            veiculo: document.getElementById("veiculo").value,
            data: document.getElementById("data").value,
            km: document.getElementById("km").value
        };
        return conteudo;
    }
}

class Formulario{

    constructor(){
        //let linha = document.getElementById('tabela').insertRow();
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
            item: document.getElementById("item").value,
            especificacaoKm: document.getElementById("especificacao-km").value,
            especificacaoPrazo: document.getElementById("especificacao-prazo").value,
            ultimaTrocaKm: document.getElementById("ultima-troca-km").value,
            ultimaTrocaData: document.getElementById("ultima-troca-data").value,
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

        // Delegação de eventos: escuta cliques no tbody
        this.tbody.addEventListener("click", (event) => {
            if (event.target.classList.contains("i-deletar")) {
                this.deletarLinha(event.target);
            }

            if (event.target.classList.contains("i-atualizar")) {
                this.atualizarLinha(event.target, cabecalho.ler());
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

    incluirLinha(linha, valores){
        //let linha = document.getElementById('tabela').insertRow();
        this.incluirCelula(linha, 'item', valores.item);
        this.incluirCelula(linha, 'especificacao-km', valores.especificacaoKm);
        this.incluirCelula(linha, 'prazo', valores.especificacaoPrazo);
        this.incluirCelula(linha, 'ultima-km', valores.ultimaTrocaKm);
        this.incluirCelula(linha, 'ultima-data', this.formatarDataBr(valores.ultimaTrocaData));
        this.incluirCelula(linha, 'proxima-km', this.somarKm(valores.especificacaoKm, valores.ultimaTrocaKm));
        this.incluirCelula(linha, 'proxima-data', this.somarPrazo(valores.especificacaoPrazo, valores.ultimaTrocaData));
        this.incluirCelula(linha, 'acoes', '<button class = "icone i-atualizar"></button><button class = "icone i-deletar"></button>');
    }
    
    // Função para deletar uma linha
    deletarLinha(botao) {
        const linha = botao.closest("tr");
        if (linha) {
            linha.remove();
        }
    }

    atualizarLinha(botao, trocaAtual) {
        const linha = botao.closest("tr");
        const celulas = linha.querySelectorAll("td");

        const especificacaoKm =  celulas[1].textContent;
        const especificacaoPrazo = celulas[2].textContent;

        celulas[3].innerHTML = trocaAtual.km;
        celulas[4].innerHTML = this.formatarDataBr(trocaAtual.data);
        celulas[5].innerHTML = this.somarKm(trocaAtual.km, especificacaoKm);
        celulas[6].innerHTML = this.somarPrazo(especificacaoPrazo, trocaAtual.data); 
    }
}

const cabecalho = new Cabecalho();
const formulario = new Formulario();
const tabela = new Tabela(formulario.ler());

