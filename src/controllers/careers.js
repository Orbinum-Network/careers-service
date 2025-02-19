const careerService = require('../services/careers');
const { validationResult } = require('express-validator')

const getAllCareers = async (req, res) => {
    try {
        const careers = await careerService.getAllCareers();
        res.json(careers);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCareerById = async (req, res) => {
    const { id } = req.params;
    try {
        const career = await careerService.getCareerById(id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(career);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCareer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const career = await careerService.createCareer(req.body);
        res.json(career);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCareer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const careerData = req.body;

    try {
        const updatedCareer = await careerService.updateCareer(id, careerData);
        if (!updatedCareer) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(updatedCareer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCareer = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await careerService.deleteCareer(id);
        if (result === null) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer
}