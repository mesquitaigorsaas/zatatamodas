/* =====================================================================
   O que a página faz além de mostrar: monta os links do WhatsApp,
   roda o teste de estilo e cuida dos pequenos acabamentos.
   ===================================================================== */

document.documentElement.classList.add('js');

// ---------------------------------------------------------------------
// WhatsApp
//
// O número mora só aqui. Cada botão da página traz no data-zap a
// mensagem que já chega escrita para a loja — assim a vendedora sabe,
// antes de responder, de qual look ou seção a cliente veio.
//
// Os botões também têm um href fixo no HTML, com o número puro: se o
// JavaScript falhar, o clique ainda abre a conversa.
// ---------------------------------------------------------------------
const NUMERO_ZAP = '5535999881111';

function linkZap(mensagem) {
    return `https://wa.me/${NUMERO_ZAP}?text=${encodeURIComponent(mensagem)}`;
}

document.querySelectorAll('[data-zap]').forEach((botao) => {
    botao.href = linkZap(botao.dataset.zap);
});


// ---------------------------------------------------------------------
// Cabeçalho ganha sombra quando a página rola
// ---------------------------------------------------------------------
const cabecalho = document.querySelector('.cabecalho');
const voltarTopo = document.querySelector('.voltar-topo');

function conferirRolagem() {
    cabecalho.classList.toggle('rolou', window.scrollY > 10);
    voltarTopo.classList.toggle('visivel', window.scrollY > 600);
}

window.addEventListener('scroll', conferirRolagem, { passive: true });
conferirRolagem();

voltarTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ---------------------------------------------------------------------
// Menu do celular
//
// Abre logo abaixo do cabeçalho: a altura é medida na hora, porque a
// faixa de cima quebra em duas linhas nas telas estreitas e uma conta
// fixa esconderia o primeiro item.
// ---------------------------------------------------------------------
const botaoMenu = document.querySelector('.abrir-menu');

function fecharMenu() {
    document.body.classList.remove('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
}

botaoMenu.addEventListener('click', () => {
    const baseDoCabecalho = Math.max(cabecalho.getBoundingClientRect().bottom, 0);
    document.documentElement.style.setProperty('--menu-top', baseDoCabecalho + 'px');
    const aberto = document.body.classList.toggle('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
});

document.querySelectorAll('#menu a').forEach((link) => link.addEventListener('click', fecharMenu));


// ---------------------------------------------------------------------
// Foto que ainda não chegou vira espaço reservado, e não ícone quebrado
// ---------------------------------------------------------------------
document.querySelectorAll('img[data-reserva]').forEach((imagem) => {
    imagem.addEventListener('error', () => {
        const [titulo, legenda = ''] = imagem.dataset.reserva.split('|');

        const reserva = document.createElement('div');
        reserva.className = 'reservado';
        reserva.innerHTML = '<b></b>';
        reserva.querySelector('b').textContent = titulo;
        reserva.append(legenda);

        imagem.replaceWith(reserva);
    });
});


// ---------------------------------------------------------------------
// Entrada suave das seções
// ---------------------------------------------------------------------
const aoAparecer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            aoAparecer.unobserve(entrada.target);
        }
    });
}, { rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.surgir').forEach((el) => aoAparecer.observe(el));


// ---------------------------------------------------------------------
// Teste: qual tendência do verão é a sua?
//
// As quatro tendências saíram do post da própria loja de 11/09/2026
// (listras náuticas, poá, frutas, alfaiataria, candy com vermelho,
// peplum, renda e artesanal), agrupadas em quatro estilos.
//
// O teste existe por dois motivos: quem responde três perguntas já se
// comprometeu um pouco e clica no WhatsApp com mais facilidade, e o
// resultado vem com botão de compartilhar — é o que faz a página
// circular entre amigas sem anúncio pago.
// ---------------------------------------------------------------------
const ESTILOS = {
    nautica: {
        nome: 'Náutica Chic',
        texto: 'Você é daquelas que parecem sempre prontas para um fim de semana no Lago de Furnas: leve, fresca e sem esforço.',
        combina: 'Listras náuticas, azul-marinho com branco, linho e jeans claro.',
        foto: 'assets/img/verao-vai-ser-assim.jpg'
    },
    romantica: {
        nome: 'Romântica Delicada',
        texto: 'Seu charme está nos detalhes. Você escolhe peças com textura e feminilidade, que ficam lindas em qualquer foto.',
        combina: 'Renda, poá, peplum, crochê e tons off-white.',
        foto: 'assets/img/colecao-linho-croche.jpg'
    },
    colorida: {
        nome: 'Verão Cheio de Cor',
        texto: 'Você não passa despercebida, e nem quer. Seu verão tem cor, brilho e acessório que vira assunto.',
        combina: 'Estampas de frutas, cores candy com vermelho e acessórios dourados.',
        foto: 'assets/img/acessorios-concha.jpg'
    },
    elegante: {
        nome: 'Elegância Atemporal',
        texto: 'Você investe em peças que duram muitos verões. Um bom corte resolve o look do trabalho ao jantar.',
        combina: 'Alfaiataria, linho, tons neutros e detalhes artesanais.',
        foto: 'assets/img/look-conjunto-linho.jpg'
    }
};

const PERGUNTAS = [
    {
        titulo: 'Seu programa perfeito de fim de semana:',
        opcoes: [
            ['⛵', 'Um dia no Lago de Furnas', 'nautica'],
            ['☕', 'Café da tarde num lugar charmoso', 'romantica'],
            ['🎉', 'Happy hour animado com as amigas', 'colorida'],
            ['🥂', 'Almoço especial ou evento', 'elegante']
        ]
    },
    {
        titulo: 'A paleta que tem a sua cara:',
        opcoes: [
            ['🤍', 'Azul-marinho, branco e vermelho', 'nautica'],
            ['🌸', 'Off-white, rosa-claro e bege', 'romantica'],
            ['🍋', 'Amarelo-limão, pink e laranja', 'colorida'],
            ['🤎', 'Preto, caramelo e areia', 'elegante']
        ]
    },
    {
        titulo: 'O detalhe de que você não abre mão:',
        opcoes: [
            ['〰️', 'Uma boa listra', 'nautica'],
            ['🧶', 'Renda ou crochê', 'romantica'],
            ['🍓', 'Estampa divertida', 'colorida'],
            ['🧥', 'Um blazer bem cortado', 'elegante']
        ]
    }
];

const areaTeste = document.getElementById('areaTeste');

if (areaTeste) {
    let respostas = [];

    const barra = () => PERGUNTAS
        .map((_, i) => `<i class="${i < respostas.length ? 'feito' : ''}"></i>`)
        .join('');

    function mostrarPergunta() {
        const atual = PERGUNTAS[respostas.length];

        areaTeste.innerHTML = `
            <div class="teste-progresso" aria-hidden="true">${barra()}</div>
            <div class="pergunta">
                <small>Pergunta ${respostas.length + 1} de ${PERGUNTAS.length}</small>
                <h3>${atual.titulo}</h3>
                <div class="opcoes">
                    ${atual.opcoes.map(([emoji, texto, estilo]) => `
                        <button type="button" class="opcao" data-estilo="${estilo}">
                            <span class="emoji" aria-hidden="true">${emoji}</span>
                            <span>${texto}</span>
                        </button>`).join('')}
                </div>
            </div>`;
    }

    /* Empate: vale o estilo da última resposta, que é a pergunta mais
       concreta ("o detalhe de que não abre mão"). */
    function calcularEstilo() {
        const contagem = {};
        respostas.forEach((e) => { contagem[e] = (contagem[e] || 0) + 1; });
        const maior = Math.max(...Object.values(contagem));
        const empatados = respostas.filter((e) => contagem[e] === maior);
        return empatados[empatados.length - 1];
    }

    function mostrarResultado() {
        const estilo = ESTILOS[calcularEstilo()];
        const pedido = `Oi! Fiz o teste no site e meu estilo de verão é *${estilo.nome}* ✨ Me mostra as peças que combinam comigo?`;

        areaTeste.innerHTML = `
            <div class="teste-progresso" aria-hidden="true">${barra()}</div>
            <div class="resultado">
                <div class="resultado-foto"><img src="${estilo.foto}" alt=""></div>
                <small>Seu estilo de verão é</small>
                <h3>${estilo.nome}</h3>
                <p>${estilo.texto}</p>
                <p class="combina"><b>Combina com você:</b> ${estilo.combina}</p>
                <div class="resultado-acoes">
                    <a class="botao largo" href="${linkZap(pedido)}" target="_blank" rel="noopener">
                        <svg class="icone" aria-hidden="true"><use href="#i-zap"></use></svg>
                        Ver peças do meu estilo
                    </a>
                    <button type="button" class="botao contorno largo" id="compartilhar">
                        Desafiar uma amiga
                    </button>
                </div>
                <button type="button" class="refazer" id="refazer">Refazer o teste</button>
            </div>`;

        document.getElementById('refazer').addEventListener('click', () => {
            respostas = [];
            mostrarPergunta();
        });

        document.getElementById('compartilhar').addEventListener('click', () => {
            const endereco = location.href.split('#')[0] + '#estilo';
            const texto = `Meu estilo de verão é ${estilo.nome} ✨ Descobre o seu no teste da Zatata Modas:`;

            /* No celular abre a lista de apps do próprio aparelho
               (WhatsApp, Instagram, Telegram...). No computador, onde
               isso quase nunca existe, abre o WhatsApp para escolher a
               amiga. */
            if (navigator.share) {
                navigator.share({ title: 'Zatata Modas', text: texto, url: endereco }).catch(() => {});
            } else {
                window.open(`https://wa.me/?text=${encodeURIComponent(texto + ' ' + endereco)}`, '_blank', 'noopener');
            }
        });
    }

    areaTeste.addEventListener('click', (e) => {
        const opcao = e.target.closest('.opcao');
        if (!opcao) return;

        respostas.push(opcao.dataset.estilo);

        if (respostas.length < PERGUNTAS.length) {
            mostrarPergunta();
        } else {
            mostrarResultado();
        }

        // No celular o cartão muda de altura; traz o topo dele de volta
        // para a tela, senão a próxima pergunta começa fora da vista.
        const topo = areaTeste.getBoundingClientRect().top;
        if (topo < 70) {
            window.scrollBy({ top: topo - 90, behavior: 'smooth' });
        }
    });

    mostrarPergunta();
}
