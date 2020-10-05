const express=require('express');
const router=express.Router();
const postController=require('../Controller/postController');
const authorize=require('../middleware/authorize')
router.get('/allpost',authorize,postController.all_post);
router.get('/mypost',authorize,postController.my_post);
router.get('/mypost/:id',authorize,postController.others_post);
router.post('/new',authorize,postController.post_new);
router.put('/comment',authorize,postController.post_comment_put);
router.put('/like',authorize,postController.like);
router.put('/unlike',authorize,postController.unlike);
router.put('/delete',authorize,postController.deletePost)
module.exports=router;