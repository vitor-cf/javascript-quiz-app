const question = document.querySelector('#question'); 
const choices = Array.from(document.querySelectorAll('.choice-text')); 
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0 ; 
let questionCounter = 0;
let avaibleQuestions = [];

let questions = [
    {
        question: 'Quanto é 2 + 2?', 
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    }, 
    {
        question: 'Em qual Estado fica a cidade de Salvador?', 
        choice1: 'Bahia',
        choice2: 'Rio de Janeiro',
        choice3: 'Canadá',
        choice4: 'Páris',
        answer: 1,
    }, 
    {
        question: 'Qual a cor do cavalo branco de Napoleão?', 
        choice1: 'Branco',
        choice2: 'Preto',
        choice3: 'Cinza',
        choice4: 'Marrom',
        answer: 4,
    },
    {
        question: 'Esporte favorito de Vitor' ,
        choice1: 'Calistenia',
        choice2: 'Skate',
        choice3: 'Basquete',
        choice4: 'altinha',
        answer: 2,
    }
] 

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0; 
    score = 0
    avaibleQuestions = [...questions] 
    getNewQuestion()
} 

getNewQuestion = () => {
    if(avaibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score) 
        
        return window.location.assign('/end.html')
    } 

    questionCounter++ 
    progressText.innerText = `Questão ${questionCounter} of ${MAX_QUESTIONS}` 
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * avaibleQuestions.length)
    currentQuestion = avaibleQuestions[questionsIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    }) 

    avaibleQuestions.splice(questionsIndex, 1) 

    acceptingAnswers = true 
} 

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false 
        const selectedChoice = e.target 
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } 

        selectedChoice.parentElement.classList.add(classToApply) 

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            
            getNewQuestion() 
        }, 1000)
    })
}) 

incrementScore = num => {
    score +=num 
    scoreText.innerText = score
} 

startGame()