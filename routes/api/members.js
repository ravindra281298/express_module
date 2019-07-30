const express=require('express');
const router =express.Router();
const uuid=require('uuid');
const members=require('../../members');


router.get('/:id',(req,res)=>{
    const found=members.some(members=>members.id===req.params.id);        //parse
    if(found){
        res.json(members.filter(members => members.id===req.params.id));  //parse
    }
    else{
        res.status(400).json({msg:`Id ${req.params.id} is invalid !!`});
    }
});

router.get('/',(req,res)=>{
    // res.send(`<html><body><h1>Hello World!!</h1></body></html>`);
    // to load a file from public folder
    // res.sendFile(path.join(__dirname,'public','index.html'));
    res.json(members);
});

// insert members
router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }
    if(!req.body.name || !req.body.email){
        return res.status(400).json({msg:'Name and Email cannot be blank'});
    }
    members.push(newMember);
});


//update members
router.put('/:id',(req,res)=>{
    const found=members.some(members=>members.id===req.params.id);   //parse
    if(found){
        const up_member=req.body;
        members.forEach(member=>{
            if(member.id===req.params.id){                   //parse
                member.name=up_member.name ? up_member.name:member.name;
                member.email=up_member.email ? up_member.email:member.email;
                res.json({msg: 'member updated',member});
            }
        });
    }
    else{
        res.status(400).json({msg:`Id ${req.params.id} is invalid !!`});
    }
});

//delete member
router.delete('/:id',(req,res)=>{
    const found=members.some(members=>members.id===req.params.id);    //parse
    if(found){
        // res.json({msg:'Member deleted',members:members.filter(member => member.id !== parseInt(req.params.id))});
        var num=0;
        members.forEach(member=>{
            if(member.id===req.params.id){           //parse
                delete members.splice(num,1);
                return res.json({msg: 'deleted '+num+'size: '+members.length,members});
            }
            num+=1;
        });
    }
    else{
        res.status(400).json({msg:`Id ${req.params.id} is invalid !!`});
    }
});

module.exports=router;