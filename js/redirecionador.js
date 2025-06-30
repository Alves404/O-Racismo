// Garante que o script só rode depois que a página principal (index.html) carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Onde o conteúdo será injetado
    const placeholder = document.getElementById('content-placeholder');

    // Busca o arquivo 'conteudo.html'
    fetch('conteudo.html')
        .then(response => {
            // Verifica se a requisição foi bem sucedida
            if (!response.ok) {
                throw new Error('Erro na rede ao carregar o conteúdo.');
            }
            // Converte a resposta em texto
            return response.text();
        })
        .then(html => {
            // Injeta o HTML buscado dentro do nosso placeholder
            placeholder.innerHTML = html;

            // IMPORTANTE: Após injetar o conteúdo, você precisa "reativar" os scripts
            // que dependem dos elementos que acabaram de ser carregados.
            // Vamos chamar uma função para isso.
            executarScriptsDoConteudo();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            placeholder.innerHTML = '<p>Desculpe, não foi possível carregar o conteúdo.</p>';
        });
});

// Esta função contém todo o JavaScript que precisa manipular os elementos de "conteudo.html"
function executarScriptsDoConteudo() {
    
    // --- CÓDIGO JS QUE VOCÊ JÁ TINHA ---
    // (Movido para dentro desta função)

    // FUNCIONALIDADE 1: TROCA DE FRASES NA ABERTURA
    const heroTextElement = document.getElementById('hero-text');
    if (heroTextElement) {
        const phrases = [
            "Tudo começa com uma ideia simplificada.",
            "Que se transforma em um sentimento injusto.",
            "E termina em uma ação que exclui."
        ];
        let currentIndex = 0;

        setInterval(() => {
            heroTextElement.style.opacity = 0;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % phrases.length;
                heroTextElement.textContent = phrases[currentIndex];
                heroTextElement.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    // FUNCIONALIDADE 2: ACORDEÃO INTERATIVO
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const content = button.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // FUNCIONALIDADE 3: ANIMAÇÃO AO ROLAR
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // ... qualquer outro script que manipule o conteúdo injetado ...
}