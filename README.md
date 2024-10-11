# Privacy Vault

## Summary

Privacy Vault is an application designed to securely store and manage sensitive information. It provides robust encryption and user-friendly access controls to ensure your data remains private and protected.

## Setup

1. Clone the repository:

```sh
git clone https://github.com/yourusername/privacy-vault.git
```

2. Navigate to the project directory:

```sh
cd privacy-vault
```

3. Install dependencies:

```sh
npm install
```

4. Start the application:

```sh
npm start
```

## Configuration Options (via .env)

- **ENCRYPTION_KEY**: The key which is used to encrypt and decrypt the stored sensitive data.
- **JWT_SECRET**: A secret key to sign and validate JWT.
- **USE_IN_MEMORY_STORE**: If the provided value is 'true' the in-memory storage will be used, otherwise a file storage will be used.
- **PORT**: The port on which the application runs on can be specified. If not specified, port 5000 will be used.

## Notes

- The features for tokenisation and de-tokenisation can be found under the endpoints ‘/vault/tokenize’ and ‘/vault/detokenize’.
- As there was a requirement for service-to-service authentication, I decided in favour of token-based authentication. Usually in reality this token is issued by a third party service (an authentication server).
  For this example, I implemented a custom (fake) endpoint that accepts a set of permissions (‘tokenize’, ‘detokenize’) and returns a signed JWT with these permissions.
  The route is called ‘/fake-authentication’, is of type ‘POST’ and expects an object with the property ‘claims’ in the body. ‘claims’ is an array and can only contain the values ‘tokenize’ and ‘detokenize’. If only one of the rights is assigned, only the corresponding route can be called up; if both rights are assigned, both routes can be called up.
  The JWT is valid for one hour.

**Final words**: I enjoyed the Coding Challenge
