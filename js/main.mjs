'use strict';
import postApi from './api/postApi.js';
import utils from './utils.js';


const buildToDoItem = (getList) => {
  const todoItemTeampLate = document.querySelector('#postItemTemplate');
  const todoItemFragment = todoItemTeampLate.content.cloneNode(true);

  const todoItemElement = todoItemFragment.querySelector('li');

  //set image
  const imgItem = todoItemFragment.querySelector('#postItemImage');
  if (imgItem) {
    imgItem.src = getList.imageUrl;
  }

  //set title
  const titleItem = todoItemFragment.querySelector('#postItemTitle');
  if (titleItem) {
    titleItem.innerText = getList.title;
  }

  //set Description
  const descriptionItem = todoItemFragment.querySelector('#postItemDescription');
  if (descriptionItem) {
    descriptionItem.innerText = utils.truncateTextlength(getList.description, 120);
  }

  //set author
  const authorItem = todoItemFragment.querySelector('#postItemAuthor');
  if (authorItem) {
    authorItem.innerText = getList.author;
  }
  //utils.setTextByElementId('#postItemAuthor', getList.author);

  //set timeDate
  const timeDateItem = todoItemFragment.querySelector('#postItemTimeSpan');
  if (timeDateItem) {
    timeDateItem.innerText = utils.formatDate(getList.updatedAt);
  }

  //add event click going to post detail
  if (todoItemElement) {
    todoItemElement.addEventListener(
      'click',
      (e) => {
        const postURL = `post-detail.html?postId=${getList.id}`;
        window.location.href = postURL;
      }
    )
  }

  //add event remove item click
  const removeButtonItem = todoItemFragment.querySelector('#postItemRemove');
  if (removeButtonItem) {
    removeButtonItem.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        handlerRemoveButtonClick(getList.id);
      }
    );
    removeButtonItem.removeAttribute('id');
  }

  //add event update item click
  const editButtonItem = todoItemFragment.querySelector('#postItemEdit');
  if (editButtonItem) {
    editButtonItem.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        const postURL = `add-edit-post.html?postId=${getList.id}`;
        window.location.href = postURL;
      }
    );
    editButtonItem.removeAttribute('id');
  }


  return todoItemElement;
}

//render post list
const getListElemnet = () => document.querySelector('ul#postsList');
const renderList = (postList) => {
  const postListElement = getListElemnet();

  if (postListElement) {
    for (const getList of postList) {
      const postItemElement = buildToDoItem(getList);
      postListElement.appendChild(postItemElement);
    }
  }
};

//handler remove item
const handlerRemoveButtonClick = async (id) => {
  //console.log(id);
  const confirmMessenger = "This item will be deleted";
  if (window.confirm(confirmMessenger)) {
    await postApi.remove(id);
    window.location.reload();
  }
}

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....

  const postList = await postApi.getAll();
  // console.log(postList);
  renderList(postList);

  // hidden loader
  const loader = document.querySelector('.postLoader');
  loader.classList.add('invisible');

  anime({
    targets: '#postsList li',
    translateY: [
      { value: 100, duration: 0 },
      { value: 0, duration: 500 },
    ],
    delay: anime.stagger(200),
    easing: 'linear'
  });

};

init();
