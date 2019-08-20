var StudentData = require('./schema/student');


exports.createStudent = function (req, res) {
    var newData = {
        standard: req.body.standard,
        name: req.body.name,
        section: req.body.section,
        markDetails: []
    };

    if (req.body.markDetails) {
        for (var i = 0; i < req.body.markDetails.length; i++) {
            newData.markDetails.push({
                exams: req.body.markDetails[i].exams,
                tamil: req.body.markDetails[i].tamil,
                english: req.body.markDetails[i].english,
                maths: req.body.markDetails[i].maths,
                science: req.body.markDetails[i].science,
                total: req.body.markDetails[i].total

            })
        }
    }
    StudentData.create(newData, function (error, detail) {

        if (error) {
            res.send({ error: error });

        } else {
            res.send({ student: detail });
            console.log(detail);

        }
    });
}

exports.search = function (req, res) {
    console.log('search')
    var query = StudentData.find();
    if (!!req.body.searchDetailstd && !!req.body.searchDetailsec) {
        console.log("inside")
        query.where('$and').equals([

            { section: { '$regex': new RegExp(req.body.searchDetailsec, 'i') } },
            { standard: +req.body.searchDetailstd }

        ]);
    } else {
        if (!!req.body.searchDetails) {
            console.log("inside")
            query.where('$or').equals([
                { name: { '$regex': new RegExp(req.body.searchDetails, 'i') } }

            ]);

        }
    }
    console.log(JSON.stringify(query._conditions));
    query.exec(function (errs, detail) {
        if (errs) {

            res.send({ error: errs });
            console.log('no records found')
        } else {
            res.send({ student: detail });
        }
    });
}
exports.getStudent = function (req, res) {
    console.log(req.params.id);
    StudentData.findById({ "_id": req.params.id }, function (err, data) {
        if (err) {
            res.send({ error: err });
        } else {
            res.send({ student: data });
            console.log(data);
        }
    });
};

exports.show = function (req, res) {
    console.log(req.params.id);
    StudentData.findById({ "_id": req.params.id }, function (err, data) {
        if (err) {
            res.send({ error: err });
        } else {
            res.send({ student: data });
            console.log(data);
        }
    });
};


exports.removeStudent = function (req, res) {
    console.log('remove');

    StudentData.remove({
        "_id": req.params.id
    },

        function (err, deletedDetail) {
            console.log(err);
            if (err) {
                res.send(err);
            } else {

                res.send(deletedDetail);

            }
        })
};

exports.updateStudent = function (req, res) {
    console.log('inside update ');
    StudentData.findById({ "_id": req.body._id }, function (err, data) {
        if (err) res.send({ error: err });
        else {
            data.standard = req.body.standard;
            data.name = req.body.name;
            data.section = req.body.section;
            data.markDetails = req.body.markDetails;

            data.save(function (error, savedata) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({ student: savedata });
                    console.log(savedata);

                }
            })


        }
    });
};

