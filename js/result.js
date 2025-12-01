const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('q');
console.log(key);

function arrow_scroll(){
    document.getElementById(`description-title`).scrollIntoView();
}

function get_quiz_score(quiz, answer) {
    return answer * quiz['multiplier'] * quiz['weight']
}

async function get_percentage(key){
    key = atob(key)
    key = key.split(",");
    key = key.map(Number);

    let trait_response = await fetch("./json/trait.json");
    let trait_count = await trait_response.json();

    let quiz_response = await fetch("./json/quiz_list.json");
    let quizdata = await quiz_response.json();

    for (let i = 0; i < key.length; i++){
        const answer = key[i];
        const quiz = quizdata[i];

        trait_count[quiz['type']] += get_quiz_score(quiz, answer);
    }

    // Calculate percentages
    let full_trait_response = await fetch("./json/full_trait.json");
    let full_trait_count = await full_trait_response.json();

    let percentage_dict = {}
    let result_dict = {}
    // SM is a special case where there's "bad" and "worse" instead of positive and negative
    // so if the total score is less than the threshold, the answer is both "bad" and "worse"
    // hence multiplying the score by 2 and flipping the sign
    const SM_threshold = 0.5
    const SM_multiplier = 1 / SM_threshold

    for (let [key, value] of Object.entries(trait_count)) {
        percentage_dict[key] = trait_count[key] / full_trait_count[key]
    }

    for (let [key, value] of Object.entries(percentage_dict)) {
        if (key === 'SM') {
            if (value > -1 && value < -SM_threshold) {
                result_dict[key] = percentage_dict[key]
            }   
            else if (value >= -SM_threshold && value < 0) {
                result_dict[key] = -SM_multiplier * percentage_dict[key]
            }
            else if (value >= 0 && value < SM_threshold) {
                result_dict[key] = -SM_multiplier * percentage_dict[key]
            }
            else {
                result_dict[key] = percentage_dict[key]
            }
        }
        else {
            result_dict[key] = percentage_dict[key]
        }
    }

    return result_dict
}

async function show_detail(){
    const header_name = document.getElementById('header-name');
    const header_type = document.getElementById('header-type');
    const paragraph_text = document.getElementById('paragraph-text')

    let data = await get_percentage(key); // Parse the JSON response
    console.log(data);
    let personality_text = "";
    let percentage_array = []
    for(const [key, value] of Object.entries(data)){
        if(value >= 0){
            personality_text += key[0];
        }
        else{
            personality_text += key[1];
        }
        percentage_array.push(value)
    }   

    let detail_response = await fetch("./json/personality_details.json");
    let detail_data = await detail_response.json();
    for( let i = 0; i < detail_data.length; i++){
        if (detail_data[i]['personality_type'] === personality_text){
            detail_data = detail_data[i];
            break;
        }
    }
    console.log(detail_data)

    header_name.innerHTML = detail_data['name'];
    header_type.innerHTML = detail_data['personality_type'];
    paragraph_text.innerHTML = `
    &nbsp&nbsp&nbsp&nbsp${detail_data['description']}
    `;

    console.log(percentage_array)
    let bg_array = [" bg-info", " bg-danger", "", " bg-warning", " bg-success"]
    for(let i = 0; i < percentage_array.length; i++){
        percentage = percentage_array[i];
        let num, dir;
        if(percentage >= 0){
            num = Math.round(percentage * 100);
            dir = "ltr";
        }
        else{
            num = Math.round(percentage * -100);
            dir = "rtl";
        };
        console.log(num, dir);
        let currentbar = document.getElementById(`bar-${i}`);
        let currentletter = document.getElementById(`bar-${i}-${dir}`);
        let content = `
            <div class="progress-bar rounded-5${bg_array[i]}" role="progressbar" style="width: ${num}%" aria-valuenow="${num}" aria-valuemin="0" aria-valuemax="100">
            ${num}%
            </div>
        `;
        currentbar.style.direction = `${dir}`;
        currentletter.style.color = "rgba(255, 0, 0, 0.75)";
        // currentletter.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        currentletter.style.borderRadius = "10px";
        currentbar.innerHTML = content;
    };
}

async function load_potential() {
    history.pushState({ page: "potential" }, "", "?potential");

    const iframe = document.createElement('iframe');
    iframe.src = `potential.html`;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';

    container.innerHTML = '';
    container.appendChild(iframe);
    container.style.display = 'block';

    document.getElementById('body').style.display = 'none';
}

const container = document.getElementById('potentialContainer');

window.onpopstate = function(event) {
    if (!event.state || event.state.page !== 'potential') {
    container.style.display = 'none';
    document.getElementById('body').style.display = 'block';
    }
}

show_detail();

document.getElementById('quiz-submit').addEventListener('click', load_potential);