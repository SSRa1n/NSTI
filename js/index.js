const api = "http://127.0.0.1:8000";

function arrow_scroll(){
    document.getElementById(`description-title`).scrollIntoView()
}

async function show_quiz() {
    let response = await fetch("./json/quiz_list.json");
    let quizdata = await response.json();
    const quiz_list = document.getElementById('quiz-list');
    let content = ""
    for (let i = 0; i < quizdata.length; i++){
        let question = quizdata[i]['question']
        content += `
            <div id="question-${i}" class="question container align-content-center">
                <div class="row">
                <div class="col-lg-12 text-center mb-4">
                    <p id="question-no-title" class="question-title fw-semibold mt-5">${question}</p>
                </div>
                <div class="col-lg-12 text-center d-flex align-items-center justify-content-center">
                    <span class="question-choice-label" style="color: rgb(160, 32, 32);">Hell naw</span>
                    <!-- Big Red -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="-2">
                    <span class="circle big red"></span>
                    </label>
                    
                    <!-- Small Red -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="-1">
                    <span class="circle small red"></span>
                    </label>
                    
                    <!-- Tiny Gray -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="0">
                    <span class="circle tiny gray"></span>
                    </label>
                    
                    <!-- Small Green -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="1">
                    <span class="circle small green"></span>
                    </label>
                    
                    <!-- Big Green -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="2">
                    <span class="circle big green"></span>
                    </label>
                    <span class="question-choice-label" style="color: rgb(51, 164, 116);">Hell yea</span>
                </div>
                </div>
            </div>
            <div class="line-thin"></div>
        `;
    }
    quiz_list.innerHTML = content;
}

async function load_result_page(data){
    data = btoa(data)

    history.pushState({page: 'result', data}, '', `?q=${data}`);

    const iframe = document.createElement('iframe');
    iframe.src = `result.html?q=${data}`;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';

    container.innerHTML = '';
    container.appendChild(iframe);
    container.style.display = 'block';

    document.getElementById('body').style.display = 'none';
}

async function show_result(){
    let data = [];
    const questions = document.querySelectorAll('.question'); // Select all question elements
    console.log(questions)
    for (let index = 0; index < questions.length; index++) {
        let question = questions[index];
        let selectedValue = question.querySelector(`input[name="choice-${index}"]:checked`);
        if (selectedValue) {
            data.push(parseInt(selectedValue.value)); // Push the selected value into the data array
        } else {
            console.log(`Question ${index + 1}: no answer selected`); // Log which question has no answer
            document.getElementById(`question-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    };
    data = data.join();
    load_result_page(data);
}

submit_button = document.getElementById('quiz-submit');

submit_button.addEventListener("click", show_result);

const container = document.getElementById('resultContainer');

window.onpopstate = function(event) {
    if (!event.state || event.state.page !== 'result') {
    container.style.display = 'none';
    document.getElementById('body').style.display = 'block';
    }
}

show_quiz();