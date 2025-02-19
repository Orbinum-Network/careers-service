const CareerModel = require('../models/careers');
const { v4: uuidv4 } = require('uuid');

const getAllCareers = async () => {
    try {
        return await CareerModel.getAll();
    } catch (error) {
        throw new Error(`Error fetching careers: ${error.message}`);
    }
};

const getCareerById = async (id) => {
    try {
        const career = await CareerModel.getById(id);
        return career;
    } catch (error) {
        throw new Error(`Error getting career: ${error.message}`);
    }
}

const createCareer = async (careerData) => {
    const newCareerData = { ...careerData, id: uuidv4() };
    try {
        const career = await CareerModel.create(newCareerData);
        return career;
    } catch (error) {
        throw new Error(`Error creating career: ${error.message}`);
    }
};

const updateCareer = async (id, careerData) => {
    const newCareerData = { ...careerData, id };
    try {
        await getCareerById(id);
        const career = await CareerModel.update(newCareerData);
        return career;
    } catch (error) {
        throw new Error(`Error creating career: ${error.message}`);
    }
};

const deleteCareer = async (id) => {
    try {
        const result = await CareerModel.delete(id);
        return result;
    } catch (error) {
        throw new Error(`Error deleting career: ${error.message}`);
    }
};

module.exports = {
    getAllCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer
};