const formsLink = "https://docs.google.com/forms/d/e/1FAIpQLSeRJhf2iOjfhqh10TB5WJncisghHzHLT-mLzdt03fj-wVRf_w/formResponse"

const entryIds: string[] = [
    '71325918',
    '880103459',
    '1850418402',
    '1491649448',
    '590868237',
    '138117532',
    '552183304',
    '1053092384',
    '666696910',
    '223181799',
    '793056860',
    '386421153',
    '939034330',
    '1101531089',
    '1569190901',
    '1982255003',
    '1291829504',
    '1073969767',
    '2018656802',
    '382719986',
    '1476129227',
    '1223626966',
    '770773923',
    '1597995629',
    '321709361',
    '88993123',
    '641713620'
]


type formData = {
    name?: string;
    result: string;
    answers: number[];
}

export async function submitForm({ name, result, answers }: formData) {
    const formData = new URLSearchParams();

    console.log("Submitting form with data:", { name, result, answers });

    if (name) {
        formData.append(`entry.${entryIds[0]}`, name);
    } else {
        formData.append(`entry.${entryIds[0]}`, "Anonymous");
    }

    formData.append(`entry.${entryIds[1]}`, result);

    answers.forEach((answer, idx) => {
        formData.append(`entry.${entryIds[idx+2]}`, answer.toString());
    });

    const response = await fetch(formsLink, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
    });

    if (!response.ok && response.type !== 'opaque') {
        throw new Error(`Form submission failed with status ${response.status}.`);
    }
}
