const chatContainer = document.getElementById("chat-container");

fetch('./api/dados_historico.json')
.then(response => response.json())
.then(data => {
  data.registros.forEach(registro => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat-registros");

    const operadorInfo = `${registro.operador.nome}`;
    const clienteInfo = `${registro.cliente.telefone}`;
    const parte1 = clienteInfo.substring(0, 2); 
    const parte2 = clienteInfo.substring(2, 7); 
    const parte3 = clienteInfo.substring(7, 11);

    const numeroFormatado = `(${parte1})${parte2}-${parte3}`;

    const dataHora = new Date(registro.data_e_hora).toLocaleString();
    const dataHoraSemVirgula = dataHora.replace(/,/g, ' às')

    const paragrafoInfo = document.createElement("p");
    paragrafoInfo.innerHTML = `${dataHoraSemVirgula} Operador: ${operadorInfo} Telefone: ${numeroFormatado}`;
    chatDiv.appendChild(paragrafoInfo);

    const historicoDiv = document.createElement("div");
    registro.historico.forEach(mensagem => {
      const mensagemP = document.createElement("p");

      const operadorMensagem = `<strong>Operador</strong>: ${mensagem.mensagem_enviada}`;
      const clienteMensagem = `<strong>Cliente</strong>: ${mensagem.mensagem_recebida}`;

      mensagemP.innerHTML = `${operadorMensagem}<br>${clienteMensagem}`;
      historicoDiv.appendChild(mensagemP);
    });

    chatDiv.appendChild(historicoDiv);
    chatContainer.appendChild(chatDiv);
  });
})
.catch(error => console.error('Erro na requisição:', error));

const ligacoesContainer = document.getElementById("ligacoes-container");

fetch('./api/dados_chamadas_gravadas.json')
.then(response => response.json())
.then(data => {
  const primeirasLigacoes = data.registros.slice(0, 6);

  primeirasLigacoes.forEach(ligacao => {
    const ligacaoDiv = document.createElement("div");
    ligacaoDiv.classList.add("ligacao-registros");

    const operadorInfo = `${ligacao.nomeOperador}`;
    const clienteInfo = `${ligacao.numero_de_origem}`;

    const remover = clienteInfo.substring(3)
    const parte1 = remover.substring(0, 2); 
    const parte2 = remover.substring(2, 7); 
    const parte3 = remover.substring(7, 11);
    const numeroFormatado = `(${parte1})${parte2}-${parte3}`;

    const dataInicio = new Date(ligacao.data_inicio).toLocaleString();
    const dataInicioSemVirgula = dataInicio.replace(/,/g, ' às')

    const paragrafoInfo = document.createElement("p");
    paragrafoInfo.innerHTML = `Telefone: ${numeroFormatado} <br> Operador: ${operadorInfo} <br> ${dataInicioSemVirgula}`;
    ligacaoDiv.appendChild(paragrafoInfo);

    if (ligacao.url_da_gravacao) {
      const audioElement = document.createElement("audio");
      audioElement.controls = true;
      audioElement.src = ligacao.url_da_gravacao;
      ligacaoDiv.appendChild(audioElement);
    }

    ligacoesContainer.appendChild(ligacaoDiv);
  });
})
.catch(error => console.error('Erro na requisição:', error));

const filteredChatContainer = document.getElementById("filtered-chat");

const fetchChatData = async () => {
  const response = await fetch('./api/dados_historico.json');
  const data = await response.json();
  return data.registros;
};

const renderChatData = (data) => {
  filteredChatContainer.innerHTML = "";
  chatContainer.innerHTML = "",

  data.forEach(registro => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat-registros");

    const operadorInfo = `${registro.operador.nome}`;

    const clienteInfo = `${registro.cliente.telefone}`;
    const parte1 = clienteInfo.substring(0, 2); 
    const parte2 = clienteInfo.substring(2, 7); 
    const parte3 = clienteInfo.substring(7, 11);

    const numeroFormatado = `(${parte1})${parte2}-${parte3}`;

    const dataHora = new Date(registro.data_e_hora).toLocaleString();
    const dataHoraSemVirgula = dataHora.replace(/,/g, ' às')

    const paragrafoInfo = document.createElement("p");
    paragrafoInfo.innerHTML = `${dataHoraSemVirgula} Operador: ${operadorInfo} Telefone: ${numeroFormatado}`;
    chatDiv.appendChild(paragrafoInfo);

    const historicoDiv = document.createElement("div");
    registro.historico.forEach(mensagem => {
      const mensagemP = document.createElement("p");

      const operadorMensagem = `<strong>Operador</strong>: ${mensagem.mensagem_enviada}`;
      const clienteMensagem = `<strong>Cliente</strong>: ${mensagem.mensagem_recebida}`;

      mensagemP.innerHTML = `${operadorMensagem}<br>${clienteMensagem}`;
      historicoDiv.appendChild(mensagemP);
    });

    chatDiv.appendChild(historicoDiv);
    filteredChatContainer.appendChild(chatDiv);
  });
};

const filterChatByOperator = (operatorId) => {
  fetchChatData().then(registros => {
    const filtered = registros.filter(registro => registro.operador.id === operatorId);
    renderChatData(filtered);
  });
};

document.querySelectorAll(".filter-chat-operator").forEach(button => {
  button.addEventListener("click", () => {
    const operatorId = button.getAttribute("data-operator");
    filterChatByOperator(operatorId);
  });
});

const filteredDataContainer = document.getElementById("filtered-calls");

const fetchData = async () => {
  const response = await fetch('./api/dados_chamadas_gravadas.json');
  const data = await response.json();
  return data.registros;
};

const renderData = (data) => {
  filteredDataContainer.innerHTML = "";
  ligacoesContainer.innerHTML = "",

  data.forEach(ligacao => {
    const ligacaoDiv = document.createElement("div");
    ligacaoDiv.classList.add("ligacao-registros");
    
    const operadorInfo = `${ligacao.nomeOperador}`;
    const clienteInfo = `${ligacao.numero_de_origem}`;

    const remover = clienteInfo.substring(3)
    const parte1 = remover.substring(0, 2); 
    const parte2 = remover.substring(2, 7); 
    const parte3 = remover.substring(7, 11);
    const numeroFormatado = `(${parte1})${parte2}-${parte3}`;

    const dataInicio = new Date(ligacao.data_inicio).toLocaleString();
    const dataInicioSemVirgula = dataInicio.replace(/,/g, ' às')

    const paragrafoInfo = document.createElement("p");
    paragrafoInfo.innerHTML = `Telefone: ${numeroFormatado} <br> Operador: ${operadorInfo} <br> ${dataInicioSemVirgula}`;
    ligacaoDiv.appendChild(paragrafoInfo);

    if (ligacao.url_da_gravacao) {
      const audioElement = document.createElement("audio");
      audioElement.controls = true;
      audioElement.src = ligacao.url_da_gravacao;
      ligacaoDiv.appendChild(audioElement);
    }

    ligacoesContainer.appendChild(ligacaoDiv);

    filteredDataContainer.appendChild(ligacaoDiv);
  });
};

const filterCallsByOperator = (operatorId) => {
  fetchData().then(registros => {
    const filtered = registros.filter(item => item.idOperador === operatorId);
    renderData(filtered);
  });
};

document.querySelectorAll(".filter-calls-operator").forEach(button => {
  button.addEventListener("click", () => {
    const operatorId = button.getAttribute("data-operator");
    filterCallsByOperator(operatorId);
  });
});

const botaoVerTodosChat = document.getElementById("botao-ver-todos-chat");

botaoVerTodosChat.addEventListener("click", () => {

  filteredChatContainer.innerHTML = "";
  chatContainer.innerHTML = "",

  fetch('./api/dados_historico.json')
  .then(response => response.json())
  .then(data => {
    
    data.registros.forEach(registro => {
      const chatDiv = document.createElement("div");
      chatDiv.classList.add("chat-registros");
  
      const operadorInfo = `${registro.operador.nome}`;
  
      const clienteInfo = `${registro.cliente.telefone}`;
      const parte1 = clienteInfo.substring(0, 2); 
      const parte2 = clienteInfo.substring(2, 7); 
      const parte3 = clienteInfo.substring(7, 11);
  
      const numeroFormatado = `(${parte1})${parte2}-${parte3}`;
  
      const dataHora = new Date(registro.data_e_hora).toLocaleString();
      const dataHoraSemVirgula = dataHora.replace(/,/g, ' às')
  
      const paragrafoInfo = document.createElement("p");
      paragrafoInfo.innerHTML = `${dataHoraSemVirgula} Operador: ${operadorInfo} Telefone: ${numeroFormatado}`;
      chatDiv.appendChild(paragrafoInfo);
  
      const historicoDiv = document.createElement("div");
      registro.historico.forEach(mensagem => {
        const mensagemP = document.createElement("p");
  
        const operadorMensagem = `<strong>Operador</strong>: ${mensagem.mensagem_enviada}`;
        const clienteMensagem = `<strong>Cliente</strong>: ${mensagem.mensagem_recebida}`;
  
        mensagemP.innerHTML = `${operadorMensagem}<br>${clienteMensagem}`;
        historicoDiv.appendChild(mensagemP);
      });
  
      chatDiv.appendChild(historicoDiv);
      chatContainer.appendChild(chatDiv);
    });
  })
  .catch(error => console.error('Request error:', error));
});

const botaoVerTodasLigacoes = document.getElementById("botao-ver-todas-ligacoes");

botaoVerTodasLigacoes.addEventListener("click", () => {

  filteredDataContainer.innerHTML = "";
  ligacoesContainer.innerHTML = "",

  fetch('./api/dados_chamadas_gravadas.json')
  .then(response => response.json())
  .then(data => {
    const primeirasLigacoes = data.registros.slice(0, 6);

    primeirasLigacoes.forEach(ligacao => {
      const ligacaoDiv = document.createElement("div");
      ligacaoDiv.classList.add("ligacao-registros");
  
      const operadorInfo = `${ligacao.nomeOperador}`;
      const clienteInfo = `${ligacao.numero_de_origem}`;
  
      const remover = clienteInfo.substring(3)
      const parte1 = remover.substring(0, 2); 
      const parte2 = remover.substring(2, 7); 
      const parte3 = remover.substring(7, 11);
      const numeroFormatado = `(${parte1})${parte2}-${parte3}`;
  
      const dataInicio = new Date(ligacao.data_inicio).toLocaleString();
      const dataInicioSemVirgula = dataInicio.replace(/,/g, ' às')
  
      const paragrafoInfo = document.createElement("p");
      paragrafoInfo.innerHTML = `Telefone: ${numeroFormatado} <br> Operador: ${operadorInfo} <br> ${dataInicioSemVirgula}`;
      ligacaoDiv.appendChild(paragrafoInfo);
  
      if (ligacao.url_da_gravacao) {
        const audioElement = document.createElement("audio");
        audioElement.controls = true;
        audioElement.src = ligacao.url_da_gravacao;
        ligacaoDiv.appendChild(audioElement);
      }
  
      ligacoesContainer.appendChild(ligacaoDiv);
    });

  })
  .catch(error => console.error('Request error:', error));
});