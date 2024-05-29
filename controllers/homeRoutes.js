const router = require ('express').Router ();
const withAuth = require('../utils/auth');
const { Client } = require('../models')

//main route
router.get ('/', withAuth, async (req,res)=>{
    try {
        res.render ('workspace',{
        logged_in: req.session.logged_in
        }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})
//login route
router.get ('/login', async (req,res)=>{
   // if (req.session.logged_in) go to homepage
   // else
    try {
        res.render ('login') 
    } catch (error) {
    res.status (500).json(error)    
    }
})
//client route
router.get ('/clientProfile/:client_number', withAuth, async (req,res)=>{
    try {
        const clientData = await Client.findOne({
            where: { client_number: req.params.client_number }
          });
          if (!clientData) {
            res.status(404).json({ message: "No clients found!" });
            return;
          }
          const client = clientData.get({plain:true})
          res.render ('clientProfile',{ client, logged_in: req.session.logged_in }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})

module.exports = router