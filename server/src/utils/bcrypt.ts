import bcrypt from "bcryptjs";

export const hashValue = async  (password: string): Promise<string> => {
    return bcrypt.hash(password, 8);
}

export const comparePassword = async (candidatePassword: string, password: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, password);
}