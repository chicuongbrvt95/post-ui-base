import utils from "./utils.js";
import postApi from "./api/postApi.js";
import AppConstants from "./appConstants.js";

//--------------------------------------------------------------


//-------------------------------------------------------------------

const changePostImg = async () => {
    const changeImgClick = document.querySelector('#postChangeImage');
    if (changeImgClick) {
        changeImgClick.addEventListener(
            'click',
            () => {
                const number = Math.trunc(Math.random() * 1000);
                // console.log(number);
                utils.setBackgroundImageByElementId(
                    'postHeroImage',
                    `https://picsum.photos/id/${number}/${AppConstants.DEFAULT_IMAGE_WIDTH}/${AppConstants.DEFAULT_IMAGE_HEIGHT}`
                );
            }
        );
    }
}

//---------------add-------------------------------------------

const addPostItem = async (e) => {
    utils.setTextByElementId('postDetailTitle', 'Add a post');
    utils.setBackgroundImageByElementId('postHeroImage', AppConstants.DEFAULT_HERO_IMAGE_URL);
    changePostImg();

    const submitForm = document.querySelector('#postForm');
    if (submitForm) {
        submitForm.addEventListener('submit', checkFormValueAdd);
    }
}

const checkFormValueAdd = async (e) => {
    e.preventDefault();
    const title = document.querySelector('#postTitle');
    const author = document.querySelector('#postAuthor');

    //get value form add
    const imgValue = utils.getBackgroundImageByElementId('postHeroImage');
    const titleValue = utils.getValueByElementId('postTitle');
    const authorValue = utils.getValueByElementId('postAuthor');
    const decsValue = utils.getValueByElementId('postDescription');

    if (titleValue === '' && authorValue === '') {
        title.classList.add('is-invalid');
        author.classList.add('is-invalid');
    } else if (titleValue === '') {
        title.classList.add('is-invalid');
        author.classList.remove('is-invalid');
    } else if (authorValue === '') {
        title.classList.remove('is-invalid');
        author.classList.add('is-invalid');
    } else {
        title.classList.remove('is-invalid');
        author.classList.remove('is-invalid');

        const body = {
            title: titleValue,
            author: authorValue,
            description: decsValue,
            imageUrl: imgValue,
        }

        //console.log(body);
        const addPost = await postApi.add(body);
        alert('Edit successfully');

        // console.log(addPost.id);
        const postURL = `add-edit-post.html?postId=${addPost.id}`;
        window.location.href = postURL;

    }
}
//------------------------------------------------------------------

//---------------edit-----------------------------------------------
const editPostItem = async (item) => {
    renderDetailLink(item)

    //set value form update
    utils.setTextByElementId('postDetailTitle', 'Edit a post');
    utils.setBackgroundImageByElementId('postHeroImage', item.imageUrl);
    utils.setValueByElementId('postTitle', item.title);
    utils.setValueByElementId('postAuthor', item.author);
    utils.setValueByElementId('postDescription', item.description);

    changePostImg();
    const submitForm = document.querySelector('#postForm');
    if (submitForm) {
        submitForm.addEventListener(
            'submit',
            (e) => {
                checkFormValueEdit(item);
                e.preventDefault();
            }
        );
    }
}

const checkFormValueEdit = async (e) => {
    const title = document.querySelector('#postTitle');
    const author = document.querySelector('#postAuthor');

    //get value form add
    const imgValue = utils.getBackgroundImageByElementId('postHeroImage');
    const titleValue = utils.getValueByElementId('postTitle');
    const authorValue = utils.getValueByElementId('postAuthor');
    const decsValue = utils.getValueByElementId('postDescription');

    if (titleValue === '' && authorValue === '') {
        title.classList.add('is-invalid');
        author.classList.add('is-invalid');
    } else if (titleValue === '') {
        title.classList.add('is-invalid');
        author.classList.remove('is-invalid');
    } else if (authorValue === '') {
        title.classList.remove('is-invalid');
        author.classList.add('is-invalid');
    } else {
        title.classList.remove('is-invalid');
        author.classList.remove('is-invalid');

        //console.log(e.id);
        const body = {
            id: e.id,
            title: titleValue,
            author: authorValue,
            description: decsValue,
            imageUrl: imgValue,
        }

        const confirmMessenger = "This item will be update";
        if (window.confirm(confirmMessenger)) {
            const editPost = await postApi.update(body);
            alert('Edit successfully');

            const postURL = `add-edit-post.html?postId=${editPost.id}`;
            window.location.href = postURL;
        }

    }
}

//------------------------------------------------------------------

const renderDetailLink = (post) => {
    const detailLink = document.querySelector('#goToDetailPageLink');
    detailLink.href = `post-detail.html?postId=${post.id}`;
    detailLink.innerHTML = '<i class="fas fa-edit">Detail post</i>';
}

// MAIN LOGIC
// -----------------------
const init = async () => {
    try {
        // get postID from query params
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('postId');

        if (!postId) {
            // console.log('add');
            document.title = 'Add a post';
            addPostItem();
        } else {
            // console.log('edit');
            document.title = 'Edit a post';
            const postItem = await postApi.getDetail(postId);
            editPostItem(postItem)
        }

    } catch (error) {
        console.log(error);
    };
};

init();