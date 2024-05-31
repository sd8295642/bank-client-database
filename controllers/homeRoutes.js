const router = require ('express').Router ();
const withAuth = require('../utils/auth');
const { Client } = require('../models')


router.get ('/', withAuth, async (req,res)=>{
    try {
        res.render ('workspace',{
        logged_in: req.session.logged_in
        }) 
    } catch (error) {
    res.status (500).json(error)    
    }
})

router.get ('/login', async (req,res)=>{
    try {
        res.render ('login') 
    } catch (error) {
    res.status (500).json(error)    
    }
})

router.get('/signup', async (req, res)=>{
    try {
        res.render('signup')
    } catch (error) {
        res.status(500).json(error)
    }
})

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