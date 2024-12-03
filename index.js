// module = require('./calculater.js')
// let y = 280;
// let x = 120
// console.log("sum",x+y)
// let a = module.add(450 , 50)
// let b = module.sub(450 , 50)
// let c = module.Multi(450 , 50)
// let e = module.divi(450 , 50)
// console.log("Add:",a , "Sub :",b ,"Multiflication",c ,"Divided",e)



                //--day 2
// const http = require('http')
// const url = require('url')
// const port = 8000
// const server = http.createServer((req , res) =>{
//     console.log('requst a server')
//     let myUrl = url.parse(req.url,true)
//     if(myUrl.pathname === '/home'){
//         res.render.end('/Home.html')
//     }else if(myUrl.pathname === '/about'){
//         res.end("ABOUT PAGE")
//     }else  if(myUrl.pathname === '/content'){
//         res.end("CONTENT PAGE")
//     }else {
//         res.writeHead( { 'Content-Type': 'text/plain' });
//         res.end("404 - PAGE NOT FOUND");
//     }

// })
// server.listen(port , (e) => console.log(`server is runing on port ${port}`))



const express = require('express')
const app = express()
const users = require('./user.json')
const url = require('url')
const port = 3040
const fs =require ('fs')
app.use(express.urlencoded({extended: false }))

          app.get('/',function (req , res){
              return res.sendFile(__dirname + '/Home.html')
          }) 
          app.get('/about',function (req,res){
            return res.sendFile(__dirname +'/about.html')
          })

          app.get('/api/users',( req, res  ) =>{
                return res.json(users)
          })
          
          app.get('/gellery',function (req,res){
              res.send('GAllER PAGE HELLO !')
              
          })
          app.get('/users',(req , res) =>{
            const html =`
            <ul>
                ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
            </ul>
            `
            res.send(html)
          })
          app
          .route('/api/users')
          .put((req , res) => {
            return res.json({status:"pending"})
          })
          .post((req , res) => {
            const body= req.body
            users.push({...body,id :users.length + 1})
            fs.writeFile('./user.json',JSON.stringify(users),(err,data)=>{
              return res.json({status:"success", id: users.length + 1})
            })
          })
          .delete((req , res) => {
            return res.json({status:"pending"})
          })

         
          app.get("/api/users/:id" , (req , res) =>{
            const id = Number ( req.params.id );
            const user = users.find (user => user.id === id)
            return res.json(user)
          })
          
          app.get('/content',function (res , req){
              res.send('CONTENT PAGE HELLO !')
          })
          
          app.get('/page',function (res , req){
              res.send('PAGE HELLO !')
          })


 app.listen(port , (e) => console.log(`server is runing on port ${port}`))
