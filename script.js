
const experience = document.querySelector(".experience");
const screens = [...document.querySelectorAll(".screen")];

let currentScreen = 0;

function goToScreen(index) {
    // Impede a navegação para telas inexistentes
    if (index < 0 || index >= screens.length) return;

    currentScreen = index;

    // Cada tela ocupa 100% da largura do contêiner
    experience.style.transform = `translateX(-${index * 100}%)`;
}

// Botões para avançar
document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
        goToScreen(currentScreen + 1);
    });
});

// Botões para voltar
document.querySelectorAll("[data-prev]").forEach(button => {
    button.addEventListener("click", () => {
        goToScreen(currentScreen - 1);
    });
});

// Voltar ao jardim
document.querySelectorAll("[data-home]").forEach(button => {
    button.addEventListener("click", () => {
        goToScreen(0);
    });
});

// Navegação pelo teclado
document.addEventListener("keydown", event => {
    // Não rouba as setas se alguém estiver digitando
    if (
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, [contenteditable='true']")
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        goToScreen(currentScreen + 1);
    }

    if (event.key === "ArrowLeft") {
        goToScreen(currentScreen - 1);
    }
});

/* ========================================
   EFEITOS MÁGICOS: PÉTALAS E LUZINHAS
   ======================================== */

function createMagicEffects() {
    const screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
        // Evita criar a mesma camada duas vezes.
        if (screen.querySelector(".magic-effects")) return;

        const effects = document.createElement("div");
        effects.className = "magic-effects";
        effects.setAttribute("aria-hidden", "true");

        const petalsContainer = document.createElement("div");
        petalsContainer.className = "floating-petals";

        const particlesContainer = document.createElement("div");
        particlesContainer.className = "light-particles";

        effects.append(petalsContainer, particlesContainer);

        // A camada fica dentro da tela, mas atrás do conteúdo.
        screen.prepend(effects);

        // Cria 12 pétalas por tela.
        for (let i = 0; i < 12; i++) {
            const petal = document.createElement("span");
            petal.className = "petal";

            petal.style.setProperty(
                "--left",
                `${Math.random() * 100}%`
            );

            petal.style.setProperty(
                "--size",
                `${7 + Math.random() * 8}px`
            );

            petal.style.setProperty(
                "--duration",
                `${12 + Math.random() * 12}s`
            );

            petal.style.setProperty(
                "--delay",
                `${-Math.random() * 24}s`
            );

            petal.style.setProperty(
                "--drift",
                `${-50 + Math.random() * 100}px`
            );

            petal.style.setProperty(
                "--petal-opacity",
                `${0.35 + Math.random() * 0.4}`
            );

            petalsContainer.appendChild(petal);
        }

        // Cria 22 pontos luminosos por tela.
        for (let i = 0; i < 22; i++) {
            const particle = document.createElement("span");
            particle.className = "particle";

            particle.style.setProperty(
                "--left",
                `${Math.random() * 100}%`
            );

            particle.style.setProperty(
                "--top",
                `${Math.random() * 100}%`
            );

            particle.style.setProperty(
                "--size",
                `${2 + Math.random() * 3}px`
            );

            particle.style.setProperty(
                "--duration",
                `${2 + Math.random() * 4}s`
            );

            particle.style.setProperty(
                "--delay",
                `${-Math.random() * 6}s`
            );

            particle.style.setProperty(
                "--particle-opacity",
                `${0.3 + Math.random() * 0.6}`
            );

            particlesContainer.appendChild(particle);
        }
        
        // Cria 5 coraçõezinhos por tela.
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement("span");
            heart.className = "floating-heart";
            heart.textContent = "♡";
            heart.setAttribute("aria-hidden", "true");

            heart.style.setProperty(
                "--left",
                `${Math.random() * 100}%`
            );

            heart.style.setProperty(
                "--size",
                `${12 + Math.random() * 10}px`
            );

            heart.style.setProperty(
                "--duration",
                `${14 + Math.random() * 10}s`
            );

            heart.style.setProperty(
                "--delay",
                `${-Math.random() * 20}s`
            );

            petalsContainer.appendChild(heart);
        }
    });
}

/* ========================================
   ABERTURA DO ENVELOPE
   ======================================== */

/* ABERTURA DO ENVELOPE */



/* ========================================
   ABERTURA E ESCRITA GRADUAL DA CARTA
   ======================================== */

const letterScene = document.getElementById("letterScene");
const openLetterButton = document.getElementById("openLetter");
const envelopeHint = document.getElementById("envelopeHint");

const letterGreeting = document.querySelector(".letter-greeting");
const letterContent = document.querySelector(".letter-content");

let letterStarted = false;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeElement(element, speed = 24, sourceText = null) {
    if (!element) return;

    const originalText = sourceText ?? element.textContent;

    // Esconde o texto original e limpa o elemento.
    element.replaceChildren();
    element.setAttribute("aria-label", originalText);
    element.style.visibility = "visible";

    const characters = [...originalText];

    for (const character of characters) {
        const span = document.createElement("span");

        span.className = "typed-char";
        span.textContent = character;
        span.setAttribute("aria-hidden", "true");

        element.appendChild(span);

        await new Promise(resolve => requestAnimationFrame(resolve));

        span.classList.add("is-visible");

        const delay = /[,.!?;:]/.test(character)
            ? speed * 5
            : speed;

        await wait(delay);
    }
}

async function writeLetter() {
    if (letterStarted) return;

    letterStarted = true;

    const paragraphs = [
        ...document.querySelectorAll(".letter-content p")
    ];

    // Guarda os textos antes de limpar todos os parágrafos.
    const paragraphTexts = paragraphs.map(
        paragraph => paragraph.textContent
    );

    // Impede que os textos originais apareçam duplicados.
    paragraphs.forEach(paragraph => {
        paragraph.replaceChildren();
        paragraph.style.visibility = "hidden";
    });

    await wait(850);

    await typeElement(letterGreeting, 35);

    await wait(350);

    letterContent.classList.add("is-typing");

    for (let i = 0; i < paragraphs.length; i++) {
        await typeElement(
            paragraphs[i],
            22,
            paragraphTexts[i]
        );

        await wait(300);
    }

    letterContent.classList.remove("is-typing");
}
if (letterScene && openLetterButton) {
    openLetterButton.addEventListener("click", () => {
        if (letterStarted) return;

        letterScene.classList.add("is-open");

        openLetterButton.setAttribute("aria-expanded", "true");
        openLetterButton.setAttribute("aria-label", "Carta aberta");

        if (envelopeHint) {
            envelopeHint.textContent = "Feito com carinho, para você ♡";
        }

        writeLetter();
    });
}
createMagicEffects();

/* ========================================
   ESTRELAS: MENSAGENS DO UNIVERSO
   ======================================== */

/* ========================================
   CARTINHAS SECRETAS DAS ESTRELAS
   ======================================== */

const starLetters = [
    {
        title: "se sentir sozinha",
        message: `Awn, sinto muito minha princesinha. Queria poder estar mais próximo de você hoje, pra poder te tirar dessa sua solidão
        Mas você nunca vai estar sozinha de verdade. Mesmo à distância que eu esteja, eu sempre vou estar disponível para você (menos quando eu tô dormindo)
        Você sempre poderá contar comigo, com nossos amigos(as), sempre que precisar! Sempre aqui ♡
        
        Musiquinha(copia e cola): https://www.youtube.com/watch?v=-9RrHWs4-e4`
    },
    {
        title: "estiver triste",
        message: `Dia difícil bebê? Te entendo. Sinto muito...
        Por enquanto, foque em relaxar um pouco, tome um banhozinho, coloca uma jazz legal que você goste, e relaxa um tico.
        Momentos ruins sempre passam, não importa quão ruim seja, ou o quanto pareça que dessa vez não vai passar. Mas eles sempre passam.
        E sempre que estiver em um momento ruim assim, não hesite em me mandar um "ei, tá ai?" ou me ligar. Vou sempre tentar arrumar tempo para você.
        Sempre aqui ♡
        
        Musiquinha(copia e cola): https://youtu.be/bZTwKUJDU1M?si=JKivgDbNFQGVqVFk`
    },
    {
        title: "duvidar de si mesma",
        message: `Talvez existam dias em que você não consiga enxergar em si mesma as coisas bonitas que eu vejo.
        E eu queria mesmo que pudesse se ver como eu vejo, você é absurdamente incrível bebê. Você é uma das pessoas mais inteligentes, fortes e corajosas que eu conheço!
        Tudo que você passou fariam uma pessoa qualquer desistir, e vejo como você não se deixou levar por isso tudo. 
        E na maior honestidade, eu fico muito orgulhoso de saber disso. 
        Se tem alguém que tem potencial nesse mundo, acredito que seja você! Não duvide de si mesma,
        já que você é capaz de fazer tudo que se propõe a fazer. Me deixe orgulhoso,
        mais do que eu já sou! 
        Sempre aqui ♡
        
        Musiquinha(copia e cola): https://youtu.be/ysqTr9XNrqs?si=EInfRVO5ioOvC5IG`
    },
    {
        title: "tiver um dia maravilhoso",
        message: `EBAAAAAAAAAAAAAAA!!! Que bom minha princesinha!! Tô muito feliz!
        Me manda uma mensagem me falando do seu dia, pra gente gritar junto sobre ele! Toda comemoração sua é uma comemoração minha,
        fico muito feliz que você tenha tido um dia tão bom assim! Queria poder estar juntinho de você pra te dar um abração de "EEEEEEEEEEEEEEEEEEEEE"
        pessoalmente (e ver seu sorriso que me deixa doido por você)!!! 
        Sempre aqui ♡
        
        Musiquinha(copia e cola): https://youtu.be/0dLX40UMUKo?si=Gwm_9QjWXYyuK2O-`
    },
    {
        title: "sentir minha falta",
        message: `Se você abriu esta carta porque está sentindo minha falta, saiba que gostaria de poder encurtar essa distância.
        Eu não consigo aparecer magicamente aí, te abraçar e ficar pertinho de você agora. Mas posso deixar estas palavras para que tenha um pedacinho do meu carinho por perto
        sempre que sentir isso.
        Quero que você pense nas nossas conversas, nas nossas risadas juntos e nos momentos que ainda vamos viver, juntinhos. Eu amo você demais demais demais! E provavelmente,
        eu também estou morrendo de saudades de você.
        Da próxima vez que a gente se ver, eu te dou um abraço apertado e quentinho (independente do calor que faça, lide com isso). 
        E, quando a saudade apertar, pode me procurar. Você já sabe,
        Sempre aqui ♡
        
        Musiquinha(copia e cola): https://youtu.be/1nF6_VC0lOE?si=MHS_3A4eWBDk8SkH`
    }
];

const memoryStars = document.querySelectorAll("[data-star-message]");
const letterOverlay = document.getElementById("letterOverlay");
const starLetterTitle = document.getElementById("starLetterTitle");
const starLetterText = document.getElementById("starLetterText");
const closeStarLetter = document.getElementById("closeStarLetter");
console.log("Estrelas encontradas:", memoryStars.length);
console.log("Camada da carta:", letterOverlay);
console.log("Título da carta:", starLetterTitle);
console.log("Texto da carta:", starLetterText);

let lastStarFocused = null;

function openStarLetter(index, star) {
    console.log("1. Função de abertura iniciada:", index);

    const letter = starLetters[index];

    if (!letter || !letterOverlay) {
        console.log("2. Faltou a carta ou a camada:", {
            letter,
            letterOverlay
        });
        return;
    }

    lastStarFocused = star;

    starLetterTitle.textContent = `Abra quando ${letter.title}`;
    starLetterText.textContent = letter.message;

    letterOverlay.hidden = false;

    console.log("3. Propriedade hidden após abrir:", letterOverlay.hidden);

    letterOverlay.style.display = "grid";
    letterOverlay.style.zIndex = "999999";

    document.body.style.overflow = "hidden";

    console.log("4. Estado final:", {
        hidden: letterOverlay.hidden,
        display: getComputedStyle(letterOverlay).display,
        zIndex: getComputedStyle(letterOverlay).zIndex
    });

    closeStarLetter.focus();
}

function closeStarLetterWindow() {
    const overlay = document.getElementById("letterOverlay");

    if (!overlay) {
        return;
    }

    overlay.hidden = true;
    overlay.style.display = "none";

    document.body.style.overflow = "";

    if (lastStarFocused) {
        lastStarFocused.focus();
    }

    console.log("Cartinha fechada:", overlay.hidden);
}

memoryStars.forEach((star) => {
    star.addEventListener("click", () => {
        const index = Number(star.dataset.starMessage);

        console.log("Estrela clicada:", index);
        console.log("Carta correspondente:", starLetters[index]);

        openStarLetter(index, star);

        console.log("Camada visível:", !letterOverlay.hidden);
    });
});

if (closeStarLetter) {
    closeStarLetter.addEventListener("click", closeStarLetterWindow);
    
}

if (letterOverlay) {
    letterOverlay.addEventListener("click", (event) => {
        if (event.target === letterOverlay) {
            closeStarLetterWindow();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && letterOverlay && !letterOverlay.hidden) {
        closeStarLetterWindow();
    }
});

/* ========================================
   POTINHO DE BILHETES
   ======================================== */

const drawMessageButton = document.getElementById("drawMessage");
const messageTicket = document.getElementById("messageTicket");
const ticketText = document.getElementById("ticketText");
const jarHint = document.getElementById("jarHint");

const jarMessages = [
    "Posso não ser a melhor pessoa desse mundo, mas você me faz querer ser, pelo menos para você. ♡",

    "Se você se visse pelos meus olhos, veria quão incrível você é. ♡",

    "Você é uma pessoa que me orgulho dizer que amo. Nunca deixe ninguém diminuir isso. ♡",

    "Lembrete: tome água, coma bem e pise nos inimigos, diva. ♡",

    "Só de te ver, já sei que meu dia vai ficar melhor. E sei que tem muita gente que pensa assim de você também. (ciúmes) ♡",

    "Sua força e determinação são de se admirar, nem todos conseguem passar por tudo que você passou e ainda dar tanto brilho na vida dos outros. ♡",

    "Seu aniversário é só uma data, mas você estar viva mais um ano implica sua força! Estou eternamente orgulhoso de você, princesa. ♡"
];

if (drawMessageButton && messageTicket && ticketText && jarHint) {
    
    drawMessageButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * jarMessages.length);

        // Prepara o bilhete escolhido
        ticketText.textContent = jarMessages[randomIndex];
        messageTicket.hidden = true;

        // Reinicia a animação do pote
        drawMessageButton.classList.remove("is-drawing");
        void drawMessageButton.offsetWidth;
        drawMessageButton.classList.add("is-drawing");

        jarHint.textContent = "Um bilhetinho está a caminho... ♡";

        // Revela o bilhete depois que ele começa a sair do pote
        setTimeout(() => {
            messageTicket.hidden = false;

            messageTicket.classList.remove("ticket-unfold");
            void messageTicket.offsetWidth;
            messageTicket.classList.add("ticket-unfold");

            jarHint.textContent = "Um novo pedacinho de carinho para você. ♡";
        }, 600);

        // Prepara o pote para a próxima retirada
        setTimeout(() => {
            drawMessageButton.classList.remove("is-drawing");
        }, 1100);
    });
}