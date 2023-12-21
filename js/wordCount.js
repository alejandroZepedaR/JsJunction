const textArea = document.getElementById('text');

let text = '';

textArea.addEventListener('input', (e) => {
    text = e.target.value;

    if (text === '') {
        displayValue(0, 'word-count');
        displayValue(0, 'character-count');
        displayValue(0, 'sentence-count');
        displayValue(0, 'paragraph-count');
        return;
    }
    
    let wordCount = getWordCount(text);
    displayValue(wordCount, 'word-count');

    let characterCount = getCharacterCount(text);
    displayValue(characterCount, 'character-count');

    let sentencesCount = getSentencesCount(text);
    displayValue(sentencesCount, 'sentence-count');

    let paragraphCount = getParagraphCount(text);
    displayValue(paragraphCount, 'paragraph-count');
});

function getWordCount(text) {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount;
}

function getCharacterCount(text) {
    const getCharacterCount = text.trim().length;
    return getCharacterCount;
}

function getSentencesCount(text) {
    const sentencesCount = text.trim().split(/[.!?]+/).length;
    return sentencesCount;
}

function getParagraphCount(text) {
    const paragraphCount = text.trim().split(/\n\n+/).length;
    return paragraphCount;
}

function displayValue(value, elementId){
    const element = document.getElementById(elementId);
    element.innerHTML = value;
}