

const router = require ('express').Router ();

//homepage route
router.get ('/', async (req,res)=>{
    try {
        //if we need info from the database request it here

        //render the view we want to see
        res.render ('homepage',{
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
router.get ('/workspace', async (req,res)=>{
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

module.exports = router