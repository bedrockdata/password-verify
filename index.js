const crypto = require('crypto');

class PasswordVerify {
    constructor(options = {}) {
        this.algorithm  = options.algorithm || 'sha256';
        this.saltLength = options.saltLength || 16;
    }

    hashPassword(password) {
        const salt = crypto.randomBytes(this.saltLength).toString('hex').substring(this.saltLength);
        
        return this.generateHash(this.algorithm, salt, password);
    }

    verifyPassword(clearPassword, hashedPassword) {
        const [algorithm, saltLength] = hashedPassword.split('.', 2);
        const saltAndHash = hashedPassword.substring(`${algorithm}.${saltLength}.`.length);

        const salt = saltAndHash.substring(0, saltLength);
        const hash = saltAndHash.substring(saltLength);
        
        return hashedPassword == this.generateHash(algorithm, salt, clearPassword);
    }

    generateHash(algorithm, salt, password) {
        const hash = crypto.createHash(algorithm);

        hash.update(salt + password);

        return `${algorithm}.${salt.length}.${salt}` + hash.digest('hex');
    }
}

module.exports = PasswordVerify;