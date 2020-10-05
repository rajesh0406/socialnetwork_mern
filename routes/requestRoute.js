
const express=require('express');
const router=express.Router();
const authorize=require('../middleware/authorize')
const requestController=require('../Controller/requestController');
router.get('/people',authorize,requestController.people);
router.get('/following',authorize,requestController.following);
router.get('/followers',authorize,requestController.followers);
router.get('/view_request',authorize,requestController.view_request);
router.put('/accept_request',authorize,requestController.accept_request);
router.put('/follow_request',authorize,requestController.follow_request);
router.put('/deny',authorize,requestController.deny_request);
router.get('/check/:id',authorize,requestController.check_existing);
router.put('/unfollow',authorize,requestController.unfollow_user);

module.exports=router;