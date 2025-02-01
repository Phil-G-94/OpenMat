const getAnswers = (req, res, next) => {};
const postAnswer = (req, res, next) => {
    const data = req.body;
    console.log(data);
    res.status(200).json({ data });
};
export { getAnswers, postAnswer };
