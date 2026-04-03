const botaoMenu = document.getElementById('menu-button');
const painelMenu = document.getElementById('header-menu');

if (botaoMenu && painelMenu) {
    // Centraliza abertura/fechamento e atributos de acessibilidade.
    const definirEstadoMenu = (estaAberto) => {
        painelMenu.classList.toggle('open', estaAberto);
        botaoMenu.setAttribute('aria-expanded', String(estaAberto));
        painelMenu.setAttribute('aria-hidden', String(!estaAberto));
    };

    botaoMenu.addEventListener('click', () => {
        const estaAberto = painelMenu.classList.contains('open');
        definirEstadoMenu(!estaAberto);
    });

    // Fecha ao clicar fora do botão.
    document.addEventListener('click', (evento) => {
        const alvo = evento.target;
        if (!(alvo instanceof Node)) {
            return;
        }

        if (botaoMenu.contains(alvo) || painelMenu.contains(alvo)) {
            return;
        }

        definirEstadoMenu(false);
    });
}