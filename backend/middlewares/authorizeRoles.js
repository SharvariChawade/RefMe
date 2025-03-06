import {User} from "../models/user.model.js";

const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.id);
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            const flatAllowedRoles = allowedRoles.flat().map(role => role.toLowerCase());
            const userRole = user.role.toLowerCase();
            if (!flatAllowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: `Access denied: Your role is ${user.role}, allowed roles are ${flatAllowedRoles}`,
                    success: false
                });
            }
            next();
        } catch (error) {
            console.error("Error in authorizeRoles middleware:", error);
            return res.status(500).json({ 
                message: "Internal Server Error", 
                success: false 
            });
        }
    };
};

export default authorizeRoles;

// const authorizeRoles =  (...allowedRoles) => {
//     return async (req, res, next) => {
//         try {
//             const user = await User.findById(req.id);
//             if(!user){
//                 return res.status(404).json({
//                     message: "User not found",
//                     success: false
//                 });
//             }
//             console.log(user,user.role);
//             if (!allowedRoles.includes(user.role)) {
//                 return res.status(403).json({
//                     message: `Access denied: Insufficient permissions,req.user.role ${req.user.role }allowed roles ${req.user.role , allowedRoles}`,
//                     success: false
//                 });
//             }
//             next();
//         }catch (error){
//             console.log(error);
//         }
//     };
// };

// export default authorizeRoles;