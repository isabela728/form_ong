const botaoMenu = document.getElementById('menu-button');
const painelMenu = document.getElementById('header-menu');
const formularioAdocao = document.getElementById('form');

if (botaoMenu && painelMenu) {
    const definirEstadoMenu = (estaAberto) => {
        painelMenu.classList.toggle('open', estaAberto); // Alterna a classe 'open' no painel do menu
        botaoMenu.setAttribute('aria-expanded', String(estaAberto)); //Define o estado do botão, indicando se o menu está aberto (e expandindo o menu)
        painelMenu.setAttribute('aria-hidden', String(!estaAberto)); //Define o estado do botão, indicando se o menu está fechado (e escondendo o menu)
    };

    botaoMenu.addEventListener('click', () => {
        const estaAberto = painelMenu.classList.contains('open'); // Verifica se o menu está atualmente aberto "escutando" o click
        definirEstadoMenu(!estaAberto);
    });
}


if (formularioAdocao) {
    formularioAdocao.addEventListener('submit', validarDados); // "Escuta" o evento de envio do formulário e executa função de validação
}

function expandir_moradia(){
    const campoExtra = document.getElementById('permite_animais');
    const ap = document.getElementById('ap');
    const casa = document.getElementById('casa');
    const opcoesPermiteAnimais = document.querySelectorAll('input[name="permite_animais"]');

    if (!campoExtra || !ap || !casa) {
        return;
    }

    if (ap.checked) {
        campoExtra.hidden = false; // Exibe o campo "permite_animais" quando a opção "Apartamento" é selecionada
        opcoesPermiteAnimais.forEach((opcao) => {
            opcao.required = true; // Torna as opções "permite_animais" obrigatórias quando a opção "Apartamento" é selecionada
        });
        return;
    }

    if (casa.checked) {
        campoExtra.hidden = true; // Oculta o campo "permite_animais" quando a opção "Casa" é selecionada
        opcoesPermiteAnimais.forEach((opcao) => {
            opcao.required = false; // Torna as opções "permite_animais" não obrigatórias quando a opção "Casa" é selecionada
            opcao.checked = false;
        });
    }
}

const opcoesMoradia = document.querySelectorAll('input[name="moradia"]');
opcoesMoradia.forEach((opcao) => { //cada vez que a opção de moradia mudar, ele vai "escutar" e espandir ou ocultar o campo extra
    opcao.addEventListener('change', expandir_moradia);
});

expandir_moradia();

function validarDados(evento) {

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const cpf = document.getElementById('cpf');
    const idade = document.getElementById('idade');
    const cidade = document.getElementById('cidade');
    const horas = document.getElementById('horas');
    const mensagem = document.getElementById('menssagem');
    const termo = document.getElementById('termo');
    const moradiaSelecionada = document.querySelector('input[name="moradia"]:checked');
    const permiteAnimaisSelecionado = document.querySelector('input[name="permite_animais"]:checked');
    const quintalSelecionado = document.querySelector('input[name="quintal"]:checked');
    const petSelecionado = document.querySelector('input[name="pet"]:checked');

    if (
        !nome.value.trim() || // Verifica se o campo nome está vazio ou contém apenas espaços
        !email.value.trim() ||
        !telefone.value.trim() ||
        !cpf.value.trim() ||
        !idade.value.trim() ||
        !cidade.value.trim() ||
        !moradiaSelecionada || // Verifica se alguma opçãofoi selecionada
        !quintalSelecionado ||
        !petSelecionado ||
        !horas.value.trim() ||
        !mensagem.value.trim() ||
        !termo.checked
    ) {
        evento.preventDefault();
        alert('Preencha todos os campos obrigatorios antes de enviar.');
        return false;
    }

    if (moradiaSelecionada.value === 'ap' && !permiteAnimaisSelecionado) {
        evento.preventDefault();
        alert('Informe se o apartamento permite animais.');
        return false;
    }

    const idadeRegex=/[^0-9]/; //regex valida se a idade contém apenas números

    const idadeNum = parseInt(idade.value, 10); //verifica se é número inteiro

    if (idadeRegex.test(idade.value) || idadeNum > 120 || idadeNum < 0) {
        evento.preventDefault();
        alert('Informe uma idade válida.');
        return false;
    }

    if (idadeNum < 18) {
        evento.preventDefault();
        alert('Infelizmente, para adotar um pet, é necessário ter pelo menos 18 anos.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex valida se o email tem formato correto

    if (!email.value.includes('@')) {
        evento.preventDefault();
        alert('O email deve conter o símbolo "@" para ser válido.');
        return false;
    }

    if (!emailRegex.test(email.value)) {
        evento.preventDefault();
        alert('Informe um email válido.');
        return false;
    }

    const nomeRegex = /^[a-zA-Z\s]+$/;

    if (!nomeRegex.test(nome.value)) {
        evento.preventDefault();
        alert('O nome deve conter apenas letras e espaços.');
        return false;
    }

    if (nome.value.trim().length <= 3) { //verifica se o nome (sem os espa~ços) tem pelo menos 3 caracteres
        evento.preventDefault();
        alert('O nome deve ter pelo menos 3 caracteres.');
        return false;
    }

    telefone.value = telefone.value.replace(/[()\s-]/g, ''); // Remove parênteses e espaços do telefone caso tenha sido inserido pelo usuário
    const telefoneRegex = /^\d{10,11}$/; //valida se o telefone tem 10 ou 11 digitos
    const telefoneValido = parseInt(telefone.value.trim());

    if (!telefoneRegex.test(telefone.value.trim()) || isNaN(telefoneValido)){
        evento.preventDefault();
        alert('Informe um telefone válido ');
        return false;
    }

    const horasRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; //regex valida se o horário tem formato HH:MM

    if (!horasRegex.test(horas.value.trim())){
        evento.preventDefault();
        alert('Informe um horário válido no formato HH:MM.');
        return false;
    }


    if (mensagem.value.trim().length <= 10) {
        evento.preventDefault();
        alert('A mensagem deve conter pelo menos 10 caracteres.');
        return false;
    }

    cpf.value = cpf.value.replace(/[-.()\s-]/g, ''); // Remove pontos, traços, parenteses e espaços
    const cpfRegex = /^\d{11}$/; //valida se o cpf tem 11 digitos
    const cpfValido = parseInt(cpf.value.trim());

    if (!cpfRegex.test(cpf.value.trim()) || isNaN(cpfValido)) {
        evento.preventDefault();
        alert('informe um CPF válido.');
        return false;
    }


    




    return true;
}