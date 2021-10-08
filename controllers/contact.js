
var Model = require('../models')


const contact = {

    // CREATE list
    //Create new contact
    postContact: async (req, res) => {
        let contacts = {}
        try {
          
            contacts = await Model.Contacts.create({
                name: req.body.name,                //contact name
                CategoryId: req.body.CategoryId,    //category id (as foreign key) from category table
                favourite: req.body.favourite       // mark the contact as favourite or not
                
            });

        } catch (error) {
            console.log(error)
        }
        res.json(contacts)
    },
    
    //add phone number to contact id
    addPhone: async (req, res) => {
        let phone = {}
        try {
            phone = await Model.Phone.create({
                number: req.body.number,    //contact's phone number
                ContactId: req.params.id    // parameters contact id (as FK for phone) from contact table
            })
        } catch (error) {
            console.log(error)
        }
        res.json(phone)
    },

    //add address to contact id
    addAddress: async (req, res) => {
        let address = {}
        try {
            address = await Model.Address.create({
                country: req.body.country,      //country contact's live
                city: req.body.city,            //city contact's live
                street: req.body.street,        //street contact's live
                ContactId: req.params.id        // parameters contact id (as FK for address) from contact table
            })
        } catch (error) {
            console.log(error)
        }
        res.json(address)
    },



    //READ/GET list
    //get all contacts information include phone & address
    getAllContacts: async (_req, res) => {
        let contacts = []
         try {
            
            contacts = await Model.Contacts.findAll({
                order: [        // takes an array of items to order the query 
                    ['favourite' , 'DESC' ],    //order contact list by favourite first
                    ['name' , 'ASC']    // order contact list by aplphabet ascending (A-Z)
                ],
                include: [      //include associated model
                    {
                    model: Model.Phone  //associate with phone table include number
                },
                Model.Address   // associate with address table include city,country, street
            ]
           
            })
        } catch(error) {
            console.log(error)
        }

        res.json(contacts)
    },

    //get one contact by specific contact id
    getContacts: async (req, res) => {
        let contacts = []
         try {

            contacts = await Model.Contacts.findOne({
                    where: {        //filter query
                         id: req.params.id  //parameters contact id
                        },

                    include: [      ////include associated model
                        {
                        model: Model.Phone  //associate with phone table include number
                    },
                    Model.Address   // associate with address table include city,country, street
                ]

                    
            })
        } catch(error) {
            console.log(error)
        }

        res.json(contacts)
    },

    //get all contacts that marks as favourite
    getFavContacts: async (req, res) => {
        let contacts = []
         try {

            contacts = await Model.Contacts.findAll({
                where: {            //filter query with WHERE clause
                    favourite: 1  //SELECT name FROM contact WHERE favourite = 1
                },                 // 1 = true (marks as fav) , 0 = false (not fav)

                order: [        // takes an array of items to order the query 
                    ['name' , 'ASC']    // order contact list by aplphabet ascending (A-Z)
                ]

            })
        } catch(error) {
            console.log(error)
        }

        res.json(contacts)
    },
    
   
   
    //UPDATE list
    //update all information for specific contact id
    updateContact: async (req, res) =>{
        let contacts = {}
        try {
            contacts = await Model.Contacts.update(
                req.body, {          //inlcude name, favourite, category
                    where: {        //filter query
                        id: req.params.id   //parameters contact id
                    }
            });
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({
            status: 'Contact updated'   //message
        })
    },

    //update contact's phone number by specific id
    updatePhone: async (req, res) =>{
        let phone = {}
        try {
            phone = await Model.Phone.update(
                req.body, {     //include phone number
                    where: {    //filter query
                        id: req.params.id   //parameters contact id
                    }
            });
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({
            status: 'Phone number updated'  //message
        })
    },

    //update contact's address by specific id
    updateAddress: async (req, res) =>{
        let address = {}
        try {
            address = await Model.Address.update(
                req.body, {     //include country, city, street
                    where: {    //filter query
                        id: req.params.id //parameters contact id
                    }
            });
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({
            status: 'Address updated'   //message
        })
    },

    //DELETE list
    //delete specific contact
    deleteContacts: async (req, res) => {
        await Model.Contacts.destroy({
            where: {    //filter query
                id: req.params.id   //by contact id
            }
        })

        res.status(200).json({
            status: 'Contact deleted'   //message
        })
    },

    //delete phone number for specific id
    deletePhone: async (req, res) => {
        await Model.Phone.destroy({
            where: {    //filter query
                id: req.params.id   //by phone id
            }
        })

        res.status(200).json({
            status: 'Phone number deleted'  //message
        })
    },

    //delete address for specific id
    deleteAddress: async (req, res) => {
        await Model.Address.destroy({
            where: {    //filter query
                id: req.params.id   //by address id
            }
        })

        res.status(200).json({
            status: 'Address deleted' //message
        })
    }


    

}

module.exports = contact;