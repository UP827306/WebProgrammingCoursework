'use strict';

const el = {};

function prepareHandles() {
    el.upload = document.querySelector('#upload');
    el.detail = document.querySelector('#detail');
    el.file = document.querySelector('#file');
    el.list = document.querySelector('#filesList')
}

function addEventListeners() {
    el.upload.addEventListener('click', uploadFile);
}

function pageLoaded() {
    prepareHandles();
    addEventListeners();
}

function uploadFile() {
    const p = document.createElement('p');
    if (el.file.files.length) {
        sendFile(el.file.files[0]);
    }
    else {
        p.textcontent = 'error: file not found'
    }
    p.textcontent = ""
    el.detail.append(p);
}

async function sendFile(file) {

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async function () {
        const payload = { file: reader.result, title: file.name };
        const response = await fetch('files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const updatedFiles = await response.json();
            showFiles(null, updatedFiles);
        } else {
            console.log('failed', response);
        }
    };

}

function showFiles(fileCompare, files) {
    el.list.textContent = ""
    for (const file of files) {
        const tr = document.createElement('tr');
        const title = document.createElement('th');
        const sim = document.createElement('th');
        title.textContent = file.title;
        tr.dataset.id = file.id;

        if (fileCompare) {
            sim.textContent = stringSimilarity.compareTwoStrings(fileCompare, file.file)
        }

        const button = document.createElement('button');
        button.innerHTML = 'compare me';
        button.onclick = function () {
            showFiles(file.file, files)
        }.bind(this)
        tr.append(sim,title,button);

        el.list.append(tr);
    }
}

window.addEventListener('load', pageLoaded);
