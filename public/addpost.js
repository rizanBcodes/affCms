// CKEDITOR.replace('postDescr');

// let addPost = document.getElementById('addPost'); 
let shoutTitleStatus = document.getElementById('shoutTitleStatus');
let shoutDescriptionStatus = document.getElementById('shoutDescriptionStatus');


let shoutStatus = document.getElementById('shoutStatus');
let form = document.getElementById('form');

function clearForm() {
    postTitle.value = '';
    clearInvalidTitleMessage();
    postDescr.value = '';
    clearInvalidDescriptionMessage();
    postSlug.value = '';
}

function postSubmitted() {
    shoutStatus.textContent = 'Post submitted successfully!';
}

function shoutInvalidTitle() {
    shoutTitleStatus.textContent = 'title cannot be blank. Please enter valid inputs.';
}

function shoutInvalidDescription() {
    shoutDescriptionStatus.textContent = 'description cannot be blank';
}

function clearInvalidTitleMessage(){
    shoutTitleStatus.textContent = '';
}

function clearInvalidDescriptionMessage(){
    shoutDescriptionStatus.textContent = '';
}

function submitForm() {
    form.submit();
    console.log('sent post request to backend');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let postTitle = document.getElementById('postTitle').value;
    let postDescr = document.getElementById('postDescr').value;
    let postSlug = document.getElementById('postSlug').value;

    if (postTitle == '' && postDescr == '') {
        shoutInvalidTitle();
        shoutInvalidDescription();
    } else if (postTitle == '' && postDescr !== '' ) {
        shoutInvalidTitle();
        clearInvalidDescriptionMessage();
    } else if (postDescr == '' && postTitle !== '') {
        shoutInvalidDescription();
        clearInvalidTitleMessage();
    } else {
        submitForm();
        clearForm();
        postSubmitted();
    }

    // if(postTitle!== '' && postDescr !== ''){
    //     submitForm();
    //     clearForm();
    //     postSubmitted();
    //     console.log('form cleared');
    // } else{
    //     shoutInvalid();
    // }
})

let testingLink = document.getElementById('testingLink');
let testingTag = document.getElementById('testingTag');
let affTagMaker = document.getElementById('affTagMaker');
let affTag = document.getElementById('affTag');

affTagMaker.addEventListener(
    'click',
    () => {
        console.log('clickeeedd');
        if (testingLink.value !== '' && testingTag.value !== '') {
            let affLink = testingLink.value + '?tag=' + testingTag.value;
            affTag.textContent = 'Link: ' + affLink;
            navigator.clipboard.writeText(affLink);
            affTagStatus.textContent = 'Copied to clipboard!';
            testingLink.value = ''; //clear link field
            testingTag.value = testingTag.value; //clear tag field
        } else {
            affTagStatus.textContent = 'please enter valid links/tag';
            affTag.textContent = '';
        }
    }
)

