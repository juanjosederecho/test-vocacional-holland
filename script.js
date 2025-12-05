// DATA
const questions = [
    { id: 1, text: "Me gusta resolver problemas usando lógica, números o datos.", area: "scientific" },
    { id: 2, text: "Disfruto crear cosas nuevas: dibujos, música, historias o diseños.", area: "artistic" },
    { id: 3, text: "Me siento cómodo ayudando a otros cuando tienen un problema.", area: "social" },
    { id: 4, text: "Me atrae organizar información, documentos o tareas.", area: "admin" },
    { id: 5, text: "Me gustaría trabajar con computadoras, tecnología o programación.", area: "tech" },
    { id: 6, text: "Me veo trabajando en algo donde pueda dirigir o emprender.", area: "entrepreneur" },
    { id: 7, text: "Me interesa entender cómo funcionan los fenómenos naturales.", area: "scientific" },
    { id: 8, text: "Me gusta trabajar en equipo y comunicar ideas.", area: "social" },
    { id: 9, text: "Disfruto realizar actividades prácticas: construir, moverme o usar herramientas.", area: "practical" },
    { id: 10, text: "Prefiero trabajos en los que todo esté bien ordenado y tenga reglas claras.", area: "admin" },
    { id: 11, text: "Me gustaría influir en los demás o liderar grupos.", area: "entrepreneur" },
    { id: 12, text: "Me interesa investigar, leer o aprender cosas nuevas por mi cuenta.", area: "scientific" },
    { id: 13, text: "Me atraen actividades donde pueda expresar creatividad o emociones.", area: "artistic" },
    { id: 14, text: "Me siento motivado cuando ayudo a mejorar la vida de otras personas.", area: "social" },
    { id: 15, text: "Me gustaría trabajar en una oficina, con tareas administrativas.", area: "admin" },
    { id: 16, text: "Me imagino trabajando en algo relacionado con salud, educación o apoyo social.", area: "social" },
    { id: 17, text: "Me gustaría desarrollar apps, juegos o soluciones tecnológicas.", area: "tech" },
    { id: 18, text: "Prefiero trabajos que requieran análisis más que fuerza física.", area: "scientific" },
    { id: 19, text: "Me gustaría tener mi propio negocio en el futuro.", area: "entrepreneur" },
    { id: 20, text: "Siento que tengo buena capacidad para organizar proyectos o eventos.", area: "entrepreneur" }
];

const areasInfo = {
    scientific: {
        name: "Científica / Investigativa",
        careers: ["Ingeniería (civil, industrial, mecánica, sistemas)", "Medicina / Biología / Química", "Matemáticas / Estadística", "Investigación científica"]
    },
    artistic: {
        name: "Artística / Creativa",
        careers: ["Diseño gráfico / Diseño de modas", "Arquitectura", "Comunicación audiovisual", "Artes plásticas / Música", "Marketing creativo"]
    },
    social: {
        name: "Social / Servicio",
        careers: ["Psicología", "Educación", "Trabajo social", "Enfermería / Obstetricia", "Comunicación / Recursos humanos"]
    },
    admin: {
        name: "Administrativa / Organizacional",
        careers: ["Administración de empresas", "Contabilidad", "Gestión pública", "Logística", "Secretariado / Gestión documental"]
    },
    tech: {
        name: "Tecnológica / Digital",
        careers: ["Ingeniería de software", "Desarrollo de videojuegos", "Ciberseguridad", "Ciencia de datos", "Redes y telecomunicaciones"]
    },
    entrepreneur: {
        name: "Emprendimiento / Liderazgo",
        careers: ["Administración", "Negocios internacionales", "Marketing", "Economía", "Gestión empresarial / Startups"]
    },
    practical: {
        name: "Práctica / Operativa",
        careers: ["Mecatrónica", "Electricidad / Electrónica industrial", "Gastronomía", "Mecánica automotriz", "Construcción / Topografía"]
    }
};

// STATE
let currentQuestionIndex = 0;
let scores = {
    scientific: 0,
    artistic: 0,
    social: 0,
    admin: 0,
    tech: 0,
    entrepreneur: 0,
    practical: 0
};
// To normalize scores (since some areas have more questions), we track max possible score per area
let maxScores = {
    scientific: 0,
    artistic: 0,
    social: 0,
    admin: 0,
    tech: 0,
    entrepreneur: 0,
    practical: 0
};

// Initialize max scores based on question count * 4 (max points per question)
questions.forEach(q => {
    if (maxScores[q.area] !== undefined) {
        maxScores[q.area] += 4;
    }
});

let userName = "";

// DOM ELEMENTS
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const currentQuestionNum = document.getElementById('current-question-num');
const progressBar = document.getElementById('progress-bar');
const answerBtns = document.querySelectorAll('.answer-btn');

const resultName = document.getElementById('result-name');
const topAreaText = document.getElementById('top-area');
const careersList = document.getElementById('careers-suggestions');
const restartBtn = document.getElementById('restart-btn');

// EVENT LISTENERS
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', resetQuiz);

answerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Handle click on button or its children
        const target = e.currentTarget;
        const value = parseInt(target.getAttribute('data-value'));
        handleAnswer(value);
    });
});

// FUNCTIONS
function startQuiz() {
    const name = usernameInput.value.trim();
    if (!name) {
        alert("Por favor, ingresa tu nombre para comenzar.");
        return;
    }
    userName = name;
    
    // Switch screens
    startScreen.classList.add('hidden');
    startScreen.classList.remove('active');
    quizScreen.classList.remove('hidden');
    setTimeout(() => quizScreen.classList.add('active'), 50);

    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.text;
    currentQuestionNum.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleAnswer(points) {
    const q = questions[currentQuestionIndex];
    
    // Add points to the specific area
    if (scores[q.area] !== undefined) {
        scores[q.area] += points;
    }

    // Animation for selection (optional visual feedback)
    
    // Next question
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('hidden');
    setTimeout(() => resultScreen.classList.add('active'), 50);

    // Calculate winner
    // We normalize by dividing score by maxPossibleScore to be fair
    let maxRatio = -1;
    let winningArea = "";

    for (const [area, score] of Object.entries(scores)) {
        const maxPossible = maxScores[area];
        // Avoid division by zero if an area has no questions (though all do)
        const ratio = maxPossible > 0 ? score / maxPossible : 0;
        
        if (ratio > maxRatio) {
            maxRatio = ratio;
            winningArea = area;
        }
    }

    // Display Data
    resultName.textContent = userName;
    const winnerInfo = areasInfo[winningArea];
    topAreaText.textContent = winnerInfo.name;
    
    careersList.innerHTML = "";
    winnerInfo.careers.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        careersList.appendChild(li);
    });

    // Confetti Effect
    launchConfetti();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    // Reset scores
    for (let key in scores) {
        scores[key] = 0;
    }
    
    usernameInput.value = "";
    
    resultScreen.classList.add('hidden');
    resultScreen.classList.remove('active');
    startScreen.classList.remove('hidden');
    setTimeout(() => startScreen.classList.add('active'), 50);
}

function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
