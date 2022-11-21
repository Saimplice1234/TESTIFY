const GUN     = require('gun')
const express = require('express')
const gun     = GUN()
const app     = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello user !')
})

app.post('/subscribe',(req,res)=>{
    gun.get(req.body.sender).set({cohort:req.body.id})
    res.send(200)
})

app.post('/cohort',(req,res)=>{

    const allowance = []
    gun.get(req.body.sender).map().on((data, key) => {
        if(data && !allowance.includes(data.cohort)){
            allowance.push(data.cohort)
        }
    });
    res.json(allowance)
    
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
