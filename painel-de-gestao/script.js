/* MÓDULO 1: RELÓGIO E DATA */
// Seleciona os elementos do HTML que vamos manipular
const horaAtualEl = document.getElementById('hora-atual');
const dataAtualEl = document.getElementById('data-atual');

// Função para atualizar o relógio
function atualizarRelogio() {
    const agora = new Date();
    
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundo = String(agora.getSeconds()).padStart(2, '0');
    
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const ano = agora.getFullYear();

    // Atualiza o texto no HTML
    horaAtualEl.textContent = `${hora}:${minuto}:${segundo}`;
    dataAtualEl.textContent = `${dia}/${mes}/${ano}`;
}

// Faz o relógio atualizar a cada segundo (1000 milissegundos)
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); // Chama a função uma vez para não começar vazio


/* MÓDULO 2: COTAÇÃO DO DÓLAR (API) */
const valorDolarEl = document.getElementById('valor-dolar');

// Função assíncrona para buscar os dados na API
async function buscarCotacaoDolar() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();
        
        // Pega o valor de compra (bid) do dólar e formata
        const cotacao = parseFloat(data.USDBRL.bid).toFixed(2);
        
        // Atualiza o texto no HTML
        valorDolarEl.textContent = `R$ ${cotacao}`;

    } catch (error) {
        // Em caso de erro na busca, exibe uma mensagem
        valorDolarEl.textContent = "Erro ao carregar";
        console.error("Erro ao buscar cotação:", error);
    }
}

buscarCotacaoDolar(); // Chama a função para buscar a cotação


/* MÓDULO 3: GERENCIADOR DE TAREFAS */
const inputTarefaEl = document.getElementById('input-tarefa');
const btnAdicionarEl = document.getElementById('btn-adicionar');
const listaTarefasEl = document.getElementById('lista-tarefas');

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefaEl.value;

    // Se o input não estiver vazio
    if (textoTarefa.trim() !== '') {
        // Cria um novo item de lista (li)
        const novaTarefa = document.createElement('li');
        novaTarefa.textContent = textoTarefa;

        // Adiciona um evento de clique para marcar/desmarcar como concluída
        novaTarefa.addEventListener('click', () => {
            novaTarefa.classList.toggle('concluida');
        });

        // Adiciona a nova tarefa na lista
        listaTarefasEl.appendChild(novaTarefa);

        // Limpa o campo de input
        inputTarefaEl.value = '';
    }
}

// Adiciona o evento de clique no botão "Adicionar"
btnAdicionarEl.addEventListener('click', adicionarTarefa);

// Permite adicionar tarefa apertando "Enter"
inputTarefaEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});