# Frontend (Angular) Setup Instructions
## Prerequisites
### Install Node.js (v16.x or higher is recommended)
Verify installation:
```bash
node -v
npm -v
```
### Install Angular CLI globally
```bash
npm install -g @angular/cli
```
## Steps to Set Up and Run the Frontend
### Clone the frontend repository:
```bash
git clone <frontend-repo-url>
cd <frontend-repo-folder>
```
### Install dependencies:
```bash
npm install
```
### Configure the backend API URL:
Open the environment configuration file (src/environments/environment.ts).
Replace the API URL with your backend API base URL:
```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5024/api/InsurancePolicies'
};
```
### Start the Angular development server:
```bash
ng serve
```
The application will be accessible at http://localhost:4200.

