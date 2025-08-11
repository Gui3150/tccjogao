const palavras = [
    'carta', 'limpo', 'mundo', 'linha', 'porta', 'navio', 'tempo', 'vento',
    'sonho', 'verde', 'amigo', 'grato', 'brisa', 'trama', 'livro', 'camas',
    'jogos', 'carro', 'dados', 'rosto', 'roupa', 'bolha', 'calmo', 'jeito',
  
    'pular', 'festa', 'salas', 'copos', 'velha', 'águao', 'folha', 'mapas',
    'chuva', 'terno', 'cheio', 'calor', 'farol', 'piano', 'chave', 'troca',
    'balão', 'casas', 'linha', 'treno', 'nuvem', 'ponto', 'botas', 'tigre',
    'reino', 'cinto', 'campo', 'andar', 'claro', 'caixa', 'pente', 'noite',
    'graxa', 'cinza', 'areia', 'leite', 'manto', 'fecho', 'sorte', 'lento',
    'galho', 'feira', 'janes', 'doido', 'vento', 'pedra', 'touro', 'dente',
    'troco', 'molho', 'risco', 'certo', 'perda', 'saldo', 'blusa', 'plano',
    'sinal', 'vazio', 'etapa', 'falar', 'sonar', 'banco', 'pulga', 'bicho',
    'limão', 'nozes', 'tarde', 'vinho', 'pouco', 'amora', 'norte', 'rocha',
    'letra', 'limpa', 'doces', 'gordo', 'selos', 'louro', 'troco', 'mudar'
  ];
  
  const maxTentativas = 6;
  let palavraAlvo = '';
  let tentativas = [];
  
  function novaPalavra() {
    palavraAlvo = palavras[Math.floor(Math.random() * palavras.length)];
  }
  
  function verificarPalavra(palavra, alvo) {
    const feedback = Array(5).fill('errado');
    const letrasUsadas = {};
  
    for (let i = 0; i < 5; i++) {
      if (palavra[i] === alvo[i]) {
        feedback[i] = 'correto';
        letrasUsadas[palavra[i]] = (letrasUsadas[palavra[i]] || 0) + 1;
      }
    }
  
    for (let i = 0; i < 5; i++) {
      if (feedback[i] === 'correto') continue;
      const letra = palavra[i];
      const ocorrencias = alvo.split('').filter((l, idx) => l === letra && feedback[idx] !== 'correto').length;
      const jaUsadas = letrasUsadas[letra] || 0;
      if (alvo.includes(letra) && jaUsadas < ocorrencias) {
        feedback[i] = 'parcial';
        letrasUsadas[letra] = jaUsadas + 1;
      }
    }
  
    return feedback;
  }
  
  function atualizarTentativas() {
    const tentativasDiv = document.getElementById('tentativas');
    tentativasDiv.innerHTML = '';
    for (let t of tentativas) {
      const linha = document.createElement('div');
      linha.classList.add('linha');
      t.palavra.split('').forEach((letra, i) => {
        const span = document.createElement('div');
        span.textContent = letra.toUpperCase();
        span.classList.add('letra', t.feedback[i]);
        linha.appendChild(span);
      });
      tentativasDiv.appendChild(linha);
    }
    const restantes = maxTentativas - tentativas.length;
    for (let i = 0; i < restantes; i++) {
      const linha = document.createElement('div');
      linha.classList.add('linha');
      for (let j = 0; j < 5; j++) {
        const span = document.createElement('div');
        span.classList.add('letra');
        span.style.backgroundColor = '#d1d5db';
        span.textContent = '';
        linha.appendChild(span);
      }
      tentativasDiv.appendChild(linha);
    }
  }
  
  function fimDeJogo(msg) {
    document.getElementById('mensagem').textContent = msg;
    document.getElementById('enviar').disabled = true;
    document.getElementById('entrada').disabled = true;
  }
  
  function reiniciar() {
    tentativas = [];
    novaPalavra();
    atualizarTentativas();
    document.getElementById('mensagem').textContent = '';
    document.getElementById('entrada').value = '';
    document.getElementById('entrada').disabled = false;
    document.getElementById('enviar').disabled = false;
  }
  
  // Eventos principais
  
  document.getElementById('enviar').addEventListener('click', () => {
    const entrada = document.getElementById('entrada').value.toLowerCase();
    if (entrada.length !== 5) {
      document.getElementById('mensagem').textContent = 'Digite uma palavra com 5 letras.';
      return;
    }
    const feedback = verificarPalavra(entrada, palavraAlvo);
    tentativas.push({ palavra: entrada, feedback });
    atualizarTentativas();
    document.getElementById('entrada').value = '';
  
    if (entrada === palavraAlvo) {
      fimDeJogo('Parabéns! Você acertou! 🎉');
    } else if (tentativas.length === maxTentativas) {
      fimDeJogo(`Fim de jogo! A palavra era "${palavraAlvo}".`);
    }
  });
  
  document.getElementById('reiniciar').addEventListener('click', reiniciar);
  
  // Sidebar
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('openSidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const ajudaBtn = document.getElementById('ajudaBtn');
  const email = document.getElementById('contatoEmail');
  
  openBtn.addEventListener('click', () => sidebar.classList.add('show'));
  closeBtn.addEventListener('click', () => sidebar.classList.remove('show'));
  ajudaBtn.addEventListener('click', () => email.classList.toggle('hidden'));
  
  // Tema
  const toggleTema = document.getElementById('temaToggle');
  toggleTema.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });
  
  // Inicialização
  novaPalavra();
  atualizarTentativas();
  