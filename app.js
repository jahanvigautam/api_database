const express = require('express');
const app = express();
const {
    addOrUpdateElements,
    getElements,
    deleteElements,
    getElementsById,
} = require('./dynamo');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/elements', async (req, res) => {
    try {
        const elements = await getElements();
        res.json(elements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.get('/elements/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const element = await getElementsById(id);
        res.json(element);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.post('/elements', async (req, res) => {
    const element = req.body;
    try {
        const newElements = await addOrUpdateElement(element);
        res.json(newElements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.put('/elements/:id', async (req, res) => {
    const element = req.body;
    const { id } = req.params;
    elements.id = id;
    try {
        const newElement = await addOrUpdateElement(element);
        res.json(newElement);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.delete('/elements/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteElement(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port port`);
});
