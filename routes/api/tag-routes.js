const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//find all tags
router.get('/', (req, res) => {

    Tag.findAll({
        include: {
            model: Product,
            attributes: ['product_name', 'price', 'stock', 'catagory_id']
        }
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// find by ID
router.get('/:id', (req, res) => {

    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['product_name', 'price', 'stock', 'catagory_id']
        }
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: 'No tag with ID used found' });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: 'No tag with ID used found' });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;