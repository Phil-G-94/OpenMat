import { User } from "../model/user.js";
const getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await User.find(
            {},
            "username answerCount reputation"
        )
            .sort({ answerCount: -1 })
            .limit(10);
        res.status(200).json({ leaderboard });
    } catch (err) {
        next(err);
    }
};
export { getLeaderboard };
