function getPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return +urlParams.get('page');
}

async function getPosts(page) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}`);
    return await response.json();
}

async function createPosts() {
    const page = getPage();
    const posts = await getPosts(page);
    for (let post of posts) {
        const a = document.createElement('a');
        a.classList.add('list-group-item', 'list-group-item-action');
        a.textContent = post.title;
        a.href = `/post.html?id=${post.id}`;
        const container = document.querySelector('#container');
        container.append(a);
    }
}

async function createButtons() {
    const page = getPage();
    const left = document.createElement('a');
    left.href = `posts.html?page=${page - 1}`;
    if (page === 1) {
        left.classList.add('disabled');
    }
    left.classList.add('btn', 'btn-outline-dark');
    left.textContent = 'Предыдущая страница';
    const right = document.createElement('a');
    right.href = `posts.html?page=${page + 1}`;
    right.classList.add('btn', 'btn-outline-dark');
    right.textContent = 'Следующая страница';

    const buttons = document.createElement('div');
    buttons.classList.add('btn-group');
    buttons.append(left);
    buttons.append(right);
    const container = document.querySelector('#container');
    container.append(buttons);
}

async function main(){
    await createPosts();
    await createButtons();
}
main();