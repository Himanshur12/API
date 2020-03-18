// Import Routes And Modules
var product = require('../models/product');

try {
// Create Product Function
exports.create_product = (req,res)=>{

   
    var obj = new product({
        p_id: req.body.p_id,
        p_name: req.body.p_name,
        p_desc: req.body.p_desc,
        p_image: req.body.p_image
    
    })

    var product_data=req.body;
    obj.save((err,data)=>{
        if (!err) {      
                if (err) res.send(err);
                p_id = product_data.p_id,
                p_name = product_data.p_name,
                p_desc =  product_data.p_desc,
                p_image = product_data.p_image
                    res.json({
                        success:true,
                        message: 'product added successfully',
                        data:{
                            p_id:product_data.p_id,
                            p_name:product_data.p_name,
                            p_desc:product_data.p_desc,
                            p_image:product_data.p_image
                    
                        }
                    })
        }else{
            res.send(err);
        }
    })
}

// Delete Product
exports.delete_product = (req,res)=>{
    var _id = req.params.id;
    product.deleteOne({_id: _id},function (err, doc) {
        if (doc.deletedCount === 0) {
            res.json({
                success : false ,
                message : "product does not exist"
            });
        }else{
            res.json({
                success : true ,
                message : "product deleted"
            });
        }
    })
}

// Update Product
exports.update_product = (req,res)=>{
    var p_id = req.params.id;
    var Product_data = req.body;
    product.findOneAndUpdate({_id: p_id },Product_data,{new: true},function (err, p_id) {
        if (p_id === null) {
            res.json({
                success : false ,
                message : "Product does not exist"
            });
        }else {
            res.json({
                success : true ,
                message : "Product Updated"
            });
            
        }
    })
}

// Details Of User Product
exports.show_user_products = (req,res)=>{
    var p_id = req.params.id;
    product.findOne({_id:p_id})
    .exec()
    .then(result=>{
            res.json({
            p_id:result._id,
            p_name:result.p_name,
            p_desc:result.p_desc,
            p_image:result.p_image
        })
    })
}

// Product Lists
exports.show_all_products = (req, res) => {    
        product.find({}, function (err, data) {
            res.json({
                success : true ,
                message : "Product List", 
                data      
            })
        });
  }
}
catch(err){
    console.log(err)
};