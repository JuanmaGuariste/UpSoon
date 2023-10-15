# coder-backend

## environment variables

Create a file named `.env` in the root of your project with the following content:

```dotenv
PORT=8080
ENVIRONMENT = production or environment
MONGO_URL=mongodb+srv://user:user@cluster0.d1.mongodb.net/?retryWrites=true&w=majority
ADMIN_NAME=user@user.com
ADMIN_PASSWORD=password
EMAIL=google account
EMAIL_PASSWORD=google account password for aplications
BASE_URL=http://localhost si se corre localmente o https://upsoon.up.railway.app si se corre en railway
SECRET_KEY=insert the secret key
GITHUB_CREDENTIAL=insert the GitHub Credentials
GITHUB_URL=Insert the GitHub URL Callback like http://.../api/users/githubcallback
GITHUB_CLIENT_ID=Insert the GitHub Client ID# UpSoon
MAX_CPU_COUNT=4 (depende de los recursos del servidor donde se haga el host)
