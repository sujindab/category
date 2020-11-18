var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./spark.sqlite3');
/* GET home page. */
router.get('/category', function(req, res, next) {
  db.all("SELECT * FROM category", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.status(200).json(rows);
  });
});
router.get('/product', function(req, res, next) {
  db.all("SELECT * FROM product", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.status(200).json(rows);
  });
});
router.get('/category/:id', (req, res, next) => {
  var params = [req.params.id]
  db.all(`SELECT * FROM product where category_id = ?`, [req.params.id], (err, row) => {
      console.log(row)
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      
      res.status(200).json(row);
    });
});
router.post('/category/', async(req, res, next) => {
  var reqBody = req.body;
  db.run(`INSERT INTO category (name) VALUES (?)`,
      [reqBody.name],
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": err.message })
              return;
          }
          res.status(201).json()
      });
});
router.post('/category/:id/product', async(req, res, next) => {
  var reqBody = req.body;
  db.run(`INSERT INTO product (name,price,quantity,category_id) VALUES (?,?,?,?)`,
      [reqBody.name,reqBody.price,reqBody.quantity,req.params.id],
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": err.message })
              return;
          }
          res.status(201).json()
      });
});
router.put('/category/product/:id', async(req,res,next) => {
  var pid = req.params.id;
  var reqBody = req.body;
  db.run(`UPDATE product set  price = ?, quantity = ? WHERE id = ?`,
      [reqBody.price, reqBody.quantity, pid],
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json();
      });
})
router.delete('/category/product/:id', async(req, res, next) =>{
  db.run(`DELETE FROM product WHERE id = ?`,
      req.params.id,
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json()
      });
})

module.exports = router;
