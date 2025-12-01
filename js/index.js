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

// --- Testing helpers -------------------------------------------------
// Auto-select the same answer for every question (default: 2)
function autoFillAnswers(value = 2) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, idx) => {
        const selector = `input[name="choice-${idx}"][value="${value}"]`;
        const input = q.querySelector(selector);
        if (input) {
            input.checked = true;
        } else {
            // fallback: check first available option
            const any = q.querySelector('input[type="radio"]');
            if (any) any.checked = true;
        }
    });
}

// Fill with random answers (useful for quick variability)
function autoFillRandom() {
    const values = ['-2', '-1', '0', '1', '2'];
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, idx) => {
        const val = values[Math.floor(Math.random() * values.length)];
        const input = q.querySelector(`input[name="choice-${idx}"][value="${val}"]`);
        if (input) input.checked = true;
    });
}

// Add a small debug button next to the submit button to trigger autofill
function enable_autofill() {
    const submit = document.getElementById('quiz-submit');
    if (submit && !document.getElementById('auto-fill-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'auto-fill-btn';
        btn.className = 'btn btn-secondary ms-2';
        btn.textContent = 'Auto-fill answers';
        btn.title = 'Auto-fill all questions with the strongest positive answer (for testing)';
        btn.addEventListener('click', () => autoFillAnswers(2));
        submit.parentNode.appendChild(btn);

        // optional quick random-fill via right-click (for testing)
        btn.addEventListener('contextmenu', (e) => { e.preventDefault(); autoFillRandom(); });
    };
}

show_quiz();