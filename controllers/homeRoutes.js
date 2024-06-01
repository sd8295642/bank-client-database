const router = require ('express').Router ();
const withAuth = require('../utils/auth');
const { Client, Account } = require('../models')


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

router.get('/addClient', withAuth, async (req, res)=>{
    try {
        res.render('newClientForm',{
            logged_in: req.session.logged_in
            })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/addAccount', withAuth, async (req, res)=>{
    try {
        res.render('newAccountForm',{
            logged_in: req.session.logged_in
            })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get ('/clientProfile/:client_number', withAuth, async (req,res)=>{
    try {
        const clientData = await Client.findOne({
            where: { client_number: req.params.client_number },
            include: [Account]
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

router.post("/", withAuth, async (req, res) => {
    try {
        const newClient = await Client.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newClient);
      } catch (err) {
        res.status(400).json(err);
      }
    })
    
module.exports = router