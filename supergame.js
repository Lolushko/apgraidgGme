let $izi = document.querySelector('#izi')
let $normal = document.querySelector('#normal')
let $hard = document.querySelector('#hard')
let $superHard = document.querySelector('#superhard')
let $gamer = document.querySelector('#gamer')
let $option = document.querySelector('#but')
let $subGame = document.querySelector('#subgame')



let $superHardName = document.querySelector('#superhardname')
let $superHardTime = document.querySelector('#superhardtime')
let $superHardResult = document.querySelector('#superhardresult')

let $hardName = document.querySelector('#hardname')
let $hardTime = document.querySelector('#hardtime')
let $hardResult = document.querySelector('#hardresult') 

let $normalName = document.querySelector('#normalname')
let $normalTime = document.querySelector('#normaltime')
let $normalResult = document.querySelector('#normalresult')

let $iziTime = document.querySelector('#izitime')
let $iziResult = document.querySelector('#iziresult')
let $iziName = document.querySelector('#iziname')

let $gamername = document.querySelector('#gamername')
let $save = document.querySelector('#save')
let $nickname = document.querySelector('#nickname')
let $clear = document.querySelector('#clear')



let $start = document.querySelector('#start')
let $game = document.querySelector('#game')  
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false
let gameLevel


let translateX = 1



$gamername.addEventListener('click', returnName)

$izi.addEventListener('click', startIziGame)
$normal.addEventListener('click', startNormalGame)
$hard.addEventListener('click', startHardGame)
$superHard.addEventListener('click', startSuperHardGame)
$option.addEventListener('click', remov)

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBloxClick)
$gameTime.addEventListener('input', setGameTime)

$save.addEventListener('click', setNameUser)
$clear.addEventListener('click', clearRecord)



hide($option)
hide($subGame)
hide($save)
hide($nickname)


function hide($el) {
    $el.classList.add('hide')
}

function show($el) {
    $el.classList.remove('hide')
}



function remov() {
    hide($option)
    hide($subGame)
    show($gamer)
}

function startIziGame() {
    setNameUser()
    hide($gamer)
    show($option)
    show($subGame)
    getGameLevel(1)
}

function startNormalGame() {
    setNameUser()
    hide($gamer)
    show($option)
    show($subGame)
    getGameLevel(2)
}

function startHardGame() {
    setNameUser()
    hide($gamer)
    show($option)
    show($subGame)
    getGameLevel(3)}

function startSuperHardGame() {
    setNameUser()
    hide($gamer)
    show($option)
    show($subGame)
    getGameLevel(4)
}

function getGameLevel(key) {
    gameLevel = key
}

function startGame() {
    score = 0
    who = 1
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    currentTime()
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)
    hide($option)

    let interval = setInterval(function(){
        let time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    whichRenderBox()
    
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    hide($resultHeader)
    show($timeHeader)
}


function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled', 'false')
    game.style.backgroundColor = '#ccc'
    game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    getCurrentRecordGamelevel()
    setTimeout('show($start)', 999)
    setTimeout('show($option)', 1000)
    getRecordGameLexel() 
}

function getCurrentRecordGamelevel() {
    if (gameLevel === 1 ) {
        setCurrentRecord()
    } else if (gameLevel === 2){
        setCurrentRecordNormal()
    } else if (gameLevel === 3) {
        setCurrentRecordHard()
    } else if (gameLevel === 4) {
        setCurrentRecordSuperHard()
    }
}

function getRecordGameLexel() {
    if (gameLevel === 1 ) {
        getRecord()
    } else if (gameLevel === 2){
        getRecordNormal()
    } else if (gameLevel === 3) {
        getRecordHard()
    } else if (gameLevel === 4) {
        getRecorSuperHard()
    }
}


function handleBloxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        whichRenderBox()
    }
}




function renderBox() {
    
    $game.innerHTML = ''

    let box = document.createElement('div')

    renderBoxGameLexel()

    let gameSize = $game.getBoundingClientRect()

    let maxTop = gameSize.height -  boxSize
    let maxleft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxleft) + 'px'
    box.style.cursor = 'pointer'


    box.setAttribute('data-box', 'true')
    
    $game.insertAdjacentElement('afterbegin', box)

}



function moveDiv() {

    let $hubbe = {}

   if (gameLevel === 4) {
    $hubbe.renderBox = function() {
      
    $game.innerHTML = ''
  
    let box = document.createElement('div')
  
    boxSize = (getRandom(15, 20 ))
  
    let gameSize = $game.getBoundingClientRect()
  
    let maxTop = gameSize.height -  boxSize
    let maxleft = gameSize.width - boxSize
    
  
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxleft) + 'px'
    box.style.cursor = 'pointer'
  
  
    box.setAttribute('data-box', 'true')
    box.setAttribute('id', 'box')
    $game.insertAdjacentElement('afterbegin', box)
    
    
  
    $hubbe.move = function() {	
        if (isGameStarted === true)	{
     
      if(parseFloat(box.style.left) <= 2) {
        translateX = 1;
      } if(parseFloat(box.style.left) >= (298 - boxSize)) {
        translateX = -1;
      } 

      box.style.left = parseFloat(box.style.left) + translateX + 'px';

      setTimeout($hubbe.move, 19)
    
     }  
    }
        $hubbe.move()
   }
    $hubbe.renderBox()
  } 
 
}


function whichRenderBox() {
    if (gameLevel === 4) {
        moveDiv()
    } else {
        renderBox()
    }
}

//проверяет уровень и задает нужные значения в min и max
function renderBoxGameLexel() {
    if (gameLevel === 1 ) {
        boxSize = (getRandom(30, 50 ))
    } else if (gameLevel === 2){
        boxSize = (getRandom(20, 30))
    } else if (gameLevel === 3) {
        boxSize = (getRandom(10, 20))
    } else if (gameLevel === 4) {
        boxSize = (getRandom(10, 10))

    }
}
//задает рандомное число от min до max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
//создает новые цвета
function getRandomColor() {
    var color = []
    while (color.length < 3) color.push(Math.floor(Math.random() * 255))
    return 'rgb('+color.join(', ')+')'
}
// отчистка всех рекордов из хранилища 
function clearRecord(){  
    let name = $gamername.textContent

    localStorage.clear()
    localStorage.setItem('nickname', name )
    

    $iziName.textContent = 'Имя'
    $iziResult.textContent = 0
    $iziTime.textContent = '0.0'

    $normalName.textContent = 'Имя'
    $normalResult.textContent = 0
    $normalTime.textContent = '0.0'

    $hardName.textContent = 'Имя'
    $hardResult.textContent = 0
    $hardTime.textContent = '0.0'

    $superHardName.textContent = 'Имя'
    $superHardResult.textContent = 0
    $superHardTime.textContent = '0.0'

}
// сохраенение нового имени в хранилище на время игры + корекция до 10 символов
function setNameUser() {
    hide($nickname)
    hide($save)
    show($gamername)
   if ($nickname.value === '') {
        localStorage.setItem('nickname', 'Аноним')
        saveNickname()
 } else if ($nickname.value.length > 10) {
        $nickname.value.slice(0,10)

        localStorage.setItem('nickname', $nickname.value.slice(0,10))

        saveNickname()
         
    } else {
        localStorage.setItem('nickname', $nickname.value)
        saveNickname()

    }   

} 
//запись никнейма в строку над полем натроек + в value input
saveNickname()
function saveNickname() {
    if (localStorage.getItem('nickname') !== null) {
    $gamername.textContent = localStorage.getItem('nickname')
    $nickname.value = localStorage.getItem('nickname')
  } else {
        $nickname.value = 'Аноним'
}
}
//возвращение окна для изминения никнейма
function returnName() {
    hide($gamername)
    show($save)
    show($nickname)
}
// запись времени текущей игры 
function currentTime() {
    let time = $gameTime.value
    return time
}
// запись новых рекордов в хранилище 
function setCurrentRecord() {
    currentRecord()
    let rec = currentTime() / score;
        
    if (+rec < +currentRecord()) {
        localStorage.setItem('currentRecord', rec)
        localStorage.setItem('iziName',  localStorage.getItem('nickname'))
        localStorage.setItem('iziResult', +score)
        localStorage.setItem('iziTime', currentTime())
        
    } 
} function setCurrentRecordNormal() {
    currentRecordNormal()
    let rec = currentTime() / score;
        
    if (+rec < +currentRecordNormal()) {
        localStorage.setItem('currentRecordNormal', rec)
        localStorage.setItem('normalName',  localStorage.getItem('nickname'))
        localStorage.setItem('normalResult', +score)
        localStorage.setItem('normalTime', currentTime())
        
    } 
} function setCurrentRecordHard() {
    currentRecordHard()
    let rec = currentTime() / score;
        
    if (+rec < +currentRecordHard()) {
        localStorage.setItem('currentRecordHard', rec)
        localStorage.setItem('hardName',  localStorage.getItem('nickname'))
        localStorage.setItem('hardResult', +score)
        localStorage.setItem('hardTime', currentTime())
        
    } 
} function setCurrentRecordSuperHard() {
    currentRecordSuperHard()
    let rec = currentTime() / score;
        
    if (+rec < +currentRecordSuperHard()) {
        localStorage.setItem('currentRecordSuperHard', rec)
        localStorage.setItem('superHardName',  localStorage.getItem('nickname'))
        localStorage.setItem('superHardResult', +score)
        localStorage.setItem('superHardTime', currentTime())
        
    } 
} 
// проверка предыдущих рекордов в таблице( если таких нет, то использую число 100)
function currentRecord(){
    if (localStorage.getItem('currentRecord') === null) {
        localStorage.setItem('currentRecord', 100)
    } else {
        return localStorage.getItem('currentRecord')
    }
} function currentRecordNormal(){
    if (localStorage.getItem('currentRecordNormal') === null) {
        localStorage.setItem('currentRecordNormal', 100)
    } else {
        return localStorage.getItem('currentRecordNormal')
    }
} function currentRecordHard(){
    if (localStorage.getItem('currentRecordHard') === null) {
        localStorage.setItem('currentRecordHard', 100)
    } else {
        return localStorage.getItem('currentRecordHard')
    }
} function currentRecordSuperHard(){
    if (localStorage.getItem('currentRecordSuperHard') === null) {
        localStorage.setItem('currentRecordSuperHard', 100)
    } else {
        return localStorage.getItem('currentRecordSuperHard')
    }
}
// запись рекордов в таблицу из хранилища( если таких нет, то по шаблону)
recorTable() 
function recorTable(){
getRecord()
getRecordNormal()
getRecordHard()
getRecorSuperHard() 
} function getRecord() {
    if (localStorage.getItem('iziName') !== null) {
        $iziName.textContent = localStorage.getItem('iziName')
        $iziResult.textContent = localStorage.getItem('iziResult')
        $iziTime.textContent = localStorage.getItem('iziTime')
    } else {
        $iziName.textContent = 'Имя'
        $iziResult.textContent = 0
        $iziTime.textContent = '0.0'
  }
} function getRecordNormal() {

    if (localStorage.getItem('normalName') !== null) {
        $normalName.textContent = localStorage.getItem('normalName')
        $normalResult.textContent = localStorage.getItem('normalResult')
        $normalTime.textContent = localStorage.getItem('normalTime')
    } else {
        $normalName.textContent = 'Имя'
        $normalResult.textContent = 0
        $normalTime.textContent = '0.0'
  }
} function getRecordHard() {
    if (localStorage.getItem('hardName') !== null) {
        $hardName.textContent = localStorage.getItem('hardName')
        $hardResult.textContent = localStorage.getItem('hardResult')
        $hardTime.textContent = localStorage.getItem('hardTime')
    } else {
        $hardName.textContent = 'Имя'
        $hardResult.textContent = 0
        $hardTime.textContent = '0.0'
  }
} function getRecorSuperHard() {

    if (localStorage.getItem('superHardName') !== null) {
        $superHardName.textContent = localStorage.getItem('superHardName')
        $superHardResult.textContent = localStorage.getItem('superHardResult')
        $superHardTime.textContent = localStorage.getItem('superHardTime')
    } else {
        $superHardName.textContent = 'Имя'
        $superHardResult.textContent = 0
        $superHardTime.textContent = '0.0'
  }  
}
 


