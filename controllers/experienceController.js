const Experience = require('../models/experience');

exports.createExperience = async (req, res) => {
    try {
        const { title, company, startDate, endDate, description } = req.body;

        const experience = await Experience.create({ title, company, startDate, endDate, description });
        res.status(201).json({ message: 'Experiencia laboral creada', experience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, startDate, endDate, description } = req.body;

        const experience = await Experience.findByPk(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experiencia laboral no encontrada' });
        }

        await experience.update({ title, company, startDate, endDate, description });
        res.status(200).json({ message: 'Experiencia laboral actualizada', experience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await Experience.findByPk(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experiencia laboral no encontrada' });
        }

        await experience.destroy();
        res.status(200).json({ message: 'Experiencia laboral eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
