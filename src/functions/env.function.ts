export const env = (name: string, defValue?: string) => {
    const value = process.env[name];
    if (!value) {
        if (defValue) {
            return defValue;
        }
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
    
}