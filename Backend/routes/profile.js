var express = require('express');
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');


var kafka = require('../kafka/client');




//Getting User Profile
router.get('/:username', function (req, res) {

    
    kafka.make_request('getprofile',req.params, function(err,response){
        
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
           
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        }
        else
        {
            consoele.log("No response");
        }
       
    })



    // users.findOne({ username: req.params.username }, function (err, user) {

    //     if (err) {
    //         console.log(err);

    //     } else if (user) {
    //         console.log(user.name);
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         });

    //         res.end(JSON.stringify(user));
    //     }
    //     else {
    //         console.log(req.params.username, " not found");
    //     }
    // }
    // )
}
);


router.get('/experience/:username', function (req, res) {
    console.log("Profile Get request");
    console.log(req.params.username);
    users.findOne({ email: req.params.username }, { experience: 1 }, function (err, user) {

        if (err) {
            console.log(err);

        } else if (user) {
            console.log(user);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(user));
        }
        else {
            console.log(req.params.username, " not found");
        }
    }
    )
}
);


router.get('/education/:username', function (req, res) {
    console.log("Profile Get request");
    console.log(req.params.username);
    users.findOne({ email: req.params.username }, { education: 1 }, function (err, user) {

        if (err) {
            console.log(err);

        } else if (user) {
       //     console.log(user);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(user));
        }
        else {
            console.log(req.params.username, " not found");
        }
    }
    )
}
);

router.post('/education', function (req, res) {

    users.updateOne({ email: req.body.username }, { $addToSet: { education: { school: req.body.school, degree: req.body.degree, field: req.body.field, fromYear: req.body.fromYear, toYear: req.body.toYear } } }, function (err, response) {

        if (err) {
            console.log(err);

        }
        else if (response) {
            console.log("Profile Updated - Education - " + req.body.username);
            res.end("Updated");
        }
        else {

            callback(null, false);

        }

    })

}
);

router.post('/experience', function (req, res) {

    users.updateOne({ email: req.body.username }, { $addToSet: { experience: { title: req.body.title, company: req.body.company, location: req.body.location, fromMonth: req.body.fromMonth, fromYear: req.body.fromYear, toMonth: req.body.toMonth, toYear: req.body.toYear } } }, function (err, response) {

        if (err) {
            console.log(err);

        }
        else if (response) {
            console.log("Profile Updated - Experience - " + req.body.username);
            res.end("Updated");
        }
        else {

            callback(null, false);

        }

    })

}
);

router.put('/intro', function (req, res) {
    var firstName, lastName, contact, industry, location, current_position;


    var updatedIntro = {};
    if (req.body.firstName)
        updatedIntro.firstName = req.body.firstName;
    if (req.body.lastName)
        updatedIntro.lastName = req.body.lastName;
    if (req.body.contact)
        updatedIntro.contact = req.body.contact;
    if (req.body.industry)
        updatedIntro.industry = req.body.industry;
    if (req.body.location)
        updatedIntro.location = req.body.location;
    if (req.body.current_position)
        updatedIntro.current_position = req.body.current_position;
    if (req.body.headline)
        updatedIntro.headline = req.body.headline;

    console.log(updatedIntro.current_position);
    updatedIntro = { $set: updatedIntro };  
   

    users.updateOne({ email: req.body.username }, updatedIntro, function (err, response) {

        if (err) {
            console.log(err);

        }
        else if (response) {
            console.log("Profile Updated - intro - " + req.body.username);
            console.log(response);
            console.log("UI: ", updatedIntro);
            //  console.log(response);
            req.body.updated = true;
            res.end(JSON.stringify(req.body));
        }
        else {

            callback(null, false);

        }

    })

}
);




router.put('/education', function (req, res) {
    console.log("Education" , req.body);
    var updatedEducation = {};
  
    if (req.body.school)
        updatedEducation['education.$.school'] = req.body.school;
    if (req.body.degree)
        updatedEducation['education.$.degree'] = req.body.degree;
    if (req.body.field)
        updatedEducation['education.$.field'] = req.body.field;
    if (req.body.fromYear)
        updatedEducation['education.$.fromYear'] = req.body.fromYear;
    if (req.body.toYear)
        updatedEducation['education.$.toYear'] = req.body.toYear;

    updatedEducation = { $set:  updatedEducation };
     
    users.updateOne({ email: req.body.username, "education._id" :req.body.id  }, updatedEducation, function (err, response) {
        if (err) {
            console.log(err);
        }
        else if (response) {
            req.body.updated = true;
      
          console.log("Updated Education - " + req.body.username);
          res.end("Updated");
        }
        else {

            callback(null, false);

        }

    })

}
);



router.put('/experience', function (req, res) {
    console.log("Experience" , req.body);
    var updatedExperience = {};
  
    if (req.body.title)
    updatedExperience['experience.$.title'] = req.body.title;
    if (req.body.location)
    updatedExperience['experience.$.location'] = req.body.location;
    if (req.body.company)
    updatedExperience['experience.$.company'] = req.body.company;
    if (req.body.fromYear)
    updatedExperience['experience.$.fromYear'] = req.body.fromYear;
    if (req.body.toYear)
    updatedExperience['experience.$.toYear'] = req.body.toYear;

    if (req.body.fromMonth)
    updatedExperience['experience.$.fromMonth'] = req.body.fromMonth;
    if (req.body.toMonth)
    updatedExperience['experience.$.toMonth'] = req.body.toMonth;

    updatedExperience = { $set:  updatedExperience };
     
    users.updateOne({ email: req.body.username, "experience._id" :req.body.id  }, updatedExperience, function (err, response) {
        if (err) {
            console.log(err);
        }
        else if (response) {
            req.body.updated = true;
      
          console.log("Updated Experience - " + req.body.username);
          res.end("Updated");
        }
        else {

            callback(null, false);

        }

    })

}
);



router.delete('/experience', function (req, res) {
    console.log("Deleting Experience" , req.body);
  const data = {};
  // db.users.updateOne({"name" : "myTest", "_id" : ObjectId("5bf33e9a3a5fe6240b1dc8fb")},{ $pull: { "experience": {"name" : "myTestEdu"} }})
 /* var updatedIntro = {};
    if (req.body.firstName)
        updatedIntro.firstName = req.body.firstName;
    if (req.body.lastName)
        updatedIntro.lastName = req.body.lastName;
    if (req.body.contact)
        updatedIntro.contact = req.body.contact;
    if (req.body.industry)
        updatedIntro.industry = req.body.industry;
    if (req.body.location)
        updatedIntro.location = req.body.location;
    if (req.body.current_position)
        updatedIntro.current_position = req.body.current_position;

    console.log(updatedIntro.current_position);
    updatedIntro = { $set: updatedIntro };  
   */
  var updatedExperience = {};
  var updatedExpID ={};
  updatedExpID["experience._id"] = req.body.id;
  updatedExperience["experience"] = updatedExpID;
  updatedExperience = {$pull : updatedExperience};
  console.log(updatedExperience);
    users.updateOne({email : req.body.username, "experience._id" : req.body.id },{ $pull: { "experience" : {"experience._id" : req.body.id} }  , function (err, response){
            console.log("Enterting Update");
           
            if(err)
            {
                console.log(err);
            }
            else if(response)
            {
                console.log("res: ", response);
            }
            else
            {
                console.log("No response");
            }
        } }
    )
/*
    
     
    users.updateOne({ username: req.body.username, "experience._id" :req.body.id  }, updatedExperience, function (err, response) {
        if (err) {
            console.log(err);
        }
        else if (response) {
            req.body.updated = true;
      
          console.log("Updated");
          res.end("Updated");
        }
        else {

            callback(null, false);

        }

    })*/
    
}
);

router.delete('/education', function (req, res) {
    console.log("Deleting Education" , req.body);
    res.end();
}
);

module.exports = router;








