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


  return todoItemElement;
}


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

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....

  const postList = await postApi.getAll();
  console.log(postList);
  renderList(postList);



};

init();
