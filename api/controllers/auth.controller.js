import bcrypt from 'bcrypt'

export const register = (req, res) => {
    const { username, email, password } = req.body;

    //Hashing password
    const hashedPassword = bcrypt.hash(password, 10);
};

export const login  = (req, res) => {

}

export const logout = (req, res) => {

}