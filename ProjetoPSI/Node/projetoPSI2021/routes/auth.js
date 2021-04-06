const router = require('express').Router();

router.post('/register', (req, res) => {

    console.log(req.body);

    res.send('Registado');
});

module.exports = router;