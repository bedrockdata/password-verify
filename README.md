# Password Verify

## Summary

A light-weight salty password generator and verifier that does not use 3rd party libraries and is written entirely with Javascript.

## Testing

```sh
npm run test
```

## Usage

### Create a hashed password to put in your DB

```javascript
const PasswordVerify = new (require('password-verify'))();

const hashedPassword = PasswordVerify.hashPassword('Some user password');
// Returns something like: sha256.16.5a0272aaed8285fe03e56ba4ea9b01a7b48ab5829ad39499f8adf9eddbce31e3ab53b900b75b3f91
```

### Verify that a clear password matches the hashed password

```javascript
const PasswordVerify = new (require('password-verify'))();

const hashedPassword = PasswordVerify.verifyPassword('Some user password', 'sha256.16.5a0272aaed8285fe03e56ba4ea9b01a7b48ab5829ad39499f8adf9eddbce31e3ab53b900b75b3f91');
// Returns true

const hashedPassword = PasswordVerify.verifyPassword('Some user password', 'password1');
// Returns false
```
