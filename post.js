async function getPost(id) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${id}`);
    return await response.json();
}

async function getComments(id) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${id}/comments`);
    return await response.json();
}

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function createPost(id) {
    const post = await getPost(id);
    const comments = await getComments(id);
    const container = document.querySelector('#container');

    const title = document.createElement('h1');
    title.textContent = post.title;
    const text = document.createElement('span');
    text.textContent = post.body;
    const content = document.createElement('div');
    content.classList.add('list-group-item');
    container.append(content);
    content.append(title);
    content.append(text);

    for (let comment of comments) {
        const name = document.createElement('h5');
        name.textContent = comment.name;
        const text = document.createElement('span');
        text.textContent = comment.body;
        const content = document.createElement('div');
        content.classList.add('list-group-item');
        content.append(name);
        content.append(text);
        container.append(content);
    }
}

createPost(getId());