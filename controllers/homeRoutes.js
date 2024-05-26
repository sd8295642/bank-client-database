

const router = require ('express').Router ();
const withAuth = require('../utils/auth');

//main route
router.get ('/', withAuth, async (req,res)=>{
    try {
        //if we need info from the database request it here

        //render the view we want to see
        res.render ('workspace',{
            //pass data for the handlebars view here
        }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})
//login route
router.get ('/login', async (req,res)=>{
    try {
        //if we need info from the database request it here

        //render the view we want to see
        res.render ('login',{
            //pass data for the handlebars view here
        }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})
//workspace route
router.get ('/clientProfile', withAuth, async (req,res)=>{
    try {
        //if we need info from the database request it here

        //render the view we want to see
        res.render ('clientProfile',{
            //pass data for the handlebars view here
        }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})

module.exports = router