## Dashboard page
![Screenshot from 2025-01-15 18-30-44](https://github.com/user-attachments/assets/e0f9b212-b1c2-45dc-9f55-49084fcc584b)
## Policies page
![Screenshot from 2025-01-15 18-32-21](https://github.com/user-attachments/assets/b2626761-e7d7-491f-8e07-21d72e7b1b8e)
## Add new policy
![Screenshot from 2025-01-15 18-33-18](https://github.com/user-attachments/assets/c99f65c7-ec90-479c-ba26-678a6ee9ac0f)

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
git clone https://github.com/christopheromosa/insurance-dashboard-frontend.git
cd insurance-dashboard-frontend
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

