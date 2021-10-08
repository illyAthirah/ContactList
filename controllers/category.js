var Model = require('../models')

const category = {

    //POST/Create
    //add category
    addCategory: async (req, res) => {
        let category = {}
        try {
            category = await Model.Category.create({
                categoryName: req.body.categoryName // name for category
            })
        } catch (error) {
            console.log(error)
        }
        res.json(category)
    },

    //GET Category
    //get all category
    getAllCategory: async (_req, res) => {
        let category = []
         try {

            category = await Model.Category.findAll({
                order: [        // takes an array of items to order the query 
                    ['categoryName' , 'ASC']    // order contact list by aplphabet ascending (A-Z)
                ]
            })

        } catch(error) {
            console.log(error)
        }

        res.json(category)
    },

    //get contact information by category
    getContactsByCategory: async (req, res) => {
        let contacts = []
         try { //check if the category id exist or not
             let category = await Model.Category.findOne({ //category table
                 where: {   //filter query
                     id: req.params.category_id     //by category_id parameters
                 }

             });

             if(category === null) (    //if category id not exist or null
                 res.status(400).send({
                     message:"Category not found"   //appear message
                 })
             )
                 //if category id exist, will get all contact information 
            contacts = await Model.Contacts.findAll({ //contact table
                    where: {        //filter query
                        CategoryId: req.params.category_id,  //by category_id (as FK for contact)                        
                    }
                    
            })
        } catch(error) {
            console.log(error)
        }

        res.json(contacts)
    },

    //Update category
    updateCategory: async (req, res) =>{
        let category = {}
        try {
            category = await Model.Category.update(
                req.body, { //all category info category name
                    where: {    //filter query
                        id: req.params.category_id  //by category id
                    }
            });
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({
            status: 'Category updated'
        })
    },

    //Delete category
    deleteCategory: async (req, res) => {
        await Model.Category.destroy({
            where: { //filter query
                id: req.params.category_id //by category id
            }
        })

        res.status(200).json({
            status: 'Category deleted'
        })
    }

}

module.exports = category;