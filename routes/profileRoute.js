
const express=require('express');
const router=express.Router();
const authorize=require('../middleware/authorize')
const profileController=require('../Controller/profileController');
router.get('/profile',authorize,profileController.profile);
router.get('/profile/:id',authorize,profileController.others_profile);
router.post('/profile/edit',authorize,profileController.profile_edit);
router.put('/profile/edit/pic',authorize,profileController.edit_profile_pic);
router.get('/status',authorize,profileController.status)
router.put('/status',authorize,profileController.update_story)
module.exports=router;