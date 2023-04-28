{   
    // method to submit the form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    // console.log(data.data.post)
                    let newPost = newPostDom(data.data.post)
                    $('#posts-list-container > ul').prepend(newPost)
                    new Noty({
                        text: data.message,
                        type: 'success',
                        timeout: 1500
                    }).show();
                    let newCommentForm = $('#new-comment-form')
                    createComment(newCommentForm)
                    //createComment()
                    deletePost($(' .delete-post-button', newPost))
                },
                error: function (err) {
                    console.log(err.responseText)
                    new Noty({
                        text: 'An error occurred while creating the post.',
                        type: 'error',
                        timeout: 2000
                    }).show();
                }
            })
        })
    }

    //method to create a post in DOM using ajax
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                    ${post.user.name}
                 <br>
                ${post.content}
        </p>
        <div id="post-comments">
                <form id="new-comment-form" action="/comments/create" method="post">
                    <input type="text" name="content" id="" placeholder="Type Comment Here" required>
                    <input type="hidden" name="post_id" value="${post._id}">
                    <input type="submit" value="Post Comment">
                </form>
                    <div id="post-comments-list">
                        <ul>
                        </ul>
                    </div>
            </div>
        </li>`)
    }
    //method to create a new Comment in DOM using ajax
    let newCommentDom = function (comment) {
        return $(`<li id="comment-${comment._id}">
        <p>
        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">x</a>
        <small>
        ${comment.user.name}
        </small>
        ${comment.content}
        </p>
        </li>`)

    }
    //method to create a new Comment and make a ajax call to route.
    let createComment = function (comment_form) {
        //let newCommentForm = $('#new-comment-form')
        let newCommentForm = $(comment_form)
        newCommentForm.on('submit', function (event) {
        //$('#new-comment-form').on('submit', function (event) {
            event.preventDefault();
            // const formData = $(this).serialize();
            $.ajax({
                url: '/comments/create',
                type: 'POST',
                data: newCommentForm.serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data.data.comment)
                    // $(' #post-comments-list > ul', newPost).prepend(newComment)
                    $(`#post-${data.data.post._id} #post-comments-list > ul`).prepend(newComment)
                    deleteComment($(' .delete-comment-button',newComment))
                    
                },
                error: function (err) {
                    console.log(err.responseText)
                }
            })
        })
    }


    // method to delete post from the DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop("href"),
                success: function (data) {
                    //console.log(data)
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        text: data.message,
                        type: 'success',
                        timeout: 1500
                    }).show();
                },
                error: function (err) {
                    console.log(err.responseText)
                    new Noty({
                        text: 'An error occurred while creating the post.',
                        type: 'error',
                        timeout: 2000
                    }).show();
                }

            })
        })
    }
    // To delete post which are already present before creating the new post.i.e, the newpost created using
    // ajax will be in memory with the variable newPostDom, however to select from the current DOM we need to 
    // do the below.
    $('.delete-post-button').each(function () {
        //console.log($(this))
        deletePost($(this));
    });

    // method to delete post from the DOM
    let deleteComment = function (deleteLink) {
        console.log(deleteLink)
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop("href"),
                success: function (data) {
                    console.log(data.data.comment_id)
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        text: data.message,
                        type: 'success',
                        timeout: 1500
                    }).show();
                },
                error: function (err) {
                    console.log(err.responseText)
                    new Noty({
                        text: 'An error occurred while creating the post.',
                        type: 'error',
                        timeout: 2000
                    }).show();
                }

            })
        })
    }
    createPost()

    $('.comment-form').each(function () {
        // console.log($(this))
        createComment($(this));
    });
    // To delete Comment which are already present before creating the new Post.i.e, the newpost created using
    // ajax will be in memory with the variable newPostDom, however to select from the current DOM we need to 
    // do the below.
    $('.delete-comment-button').each(function () {
        //console.log($(this))
        deleteComment($(this));
    });

}