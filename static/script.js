function Formulario (){
    this.item = document.getElementById("item").value;
    this.especificacaoKm = document.getElementById("especificacao-km").value;
    this.especificacaoPrazo = document.getElementById("especificacao-prazo").value;
    this.ultimaTrocaKm = document.getElementById("ultima-troca-km").value;
    this.ultimaTrocaData = document.getElementById("ultima-troca-data").value;
}


class Tabela{

    constructor(valores){
        this.item = valores.item
        this.especificacaoKm =  valores.especificacaoKm; 
        this.especificacaoPrazo = valores.especificacaoPrazo;
        this.ultimaTrocaKm =  valores.ultimaTrocaKm;
        this.ultimaTrocaData =  valores.ultimaTrocaData;
    }

    atualizarItem(linha, classe, conteudo){
        let cel = linha.insertCell();
        cel.innerHTML = conteudo;
        cel.classList.add(classe);
    }

    atualizar(){
        //let tabela = document.getElementById('tabela');
        let linha = document.getElementById('tabela').insertRow();
        this.atualizarItem(linha, 'item', this.item);
        this.atualizarItem(linha, 'km', this.especificacaoKm);
        this.atualizarItem(linha, 'prazo', this.especificacaoPrazo);
        this.atualizarItem(linha, 'km', this.ultimaTrocaKm);
        this.atualizarItem(linha, 'data', this.ultimaTrocaData);
        this.atualizarItem(linha, 'km', ' ');
        this.atualizarItem(linha, 'data', ' ');
        this.atualizarItem(linha, 'acoes', '<button class = "icone i-atualizar"></button><button class = "icone i-deletar"></button>');
    } 
}

const lerFormulario = () => {
    
    let formulario = new Formulario();
    let tabela = new Tabela(formulario)    
    tabela.atualizar()
};
