# Cloud Deployment Guide

This guide provides detailed instructions for deploying the Aashu application to various cloud platforms.

## Prerequisites

Before deploying to the cloud, ensure you have:

- A complete build of the Aashu application
- Docker and Docker Compose installed (for containerized deployment)
- Access to your chosen cloud platform
- Domain name (optional but recommended for production)

## Docker Deployment

The Aashu application is containerized using Docker, making it easy to deploy to any platform that supports Docker containers.

### Deployment with Docker Compose

1. Clone the repository on your server:
   ```bash
   git clone https://github.com/yourusername/aashu.git
   cd aashu
   ```

2. Create a `.env` file in the project root with production settings:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb://admin:password@mongo:27017/aashu?authSource=admin
   JWT_SECRET=your_production_jwt_secret
   JWT_EXPIRE=30d
   ```

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at:
   - Frontend: http://your-server-ip:3000
   - Backend API: http://your-server-ip:5000

## AWS Deployment

### EC2 Deployment

1. Launch an EC2 instance with Amazon Linux 2 or Ubuntu.

2. Install Docker and Docker Compose:
   ```bash
   # For Amazon Linux 2
   sudo yum update -y
   sudo amazon-linux-extras install docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   
   # For Ubuntu
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl enable --now docker
   sudo usermod -aG docker ubuntu
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Log out and log back in to apply the group changes.

4. Clone the repository and deploy using Docker Compose as described above.

5. Configure security groups to allow traffic on ports 80, 443, 3000, and 5000.

### Setting up with Elastic Beanstalk

1. Install the AWS CLI and EB CLI:
   ```bash
   pip install awscli awsebcli
   ```

2. Configure AWS credentials:
   ```bash
   aws configure
   ```

3. Initialize Elastic Beanstalk in your project:
   ```bash
   eb init
   ```

4. Create a `Dockerrun.aws.json` file in your project root:
   ```json
   {
     "AWSEBDockerrunVersion": "3",
     "containerDefinitions": [
       {
         "name": "mongo",
         "image": "mongo:latest",
         "essential": true,
         "memory": 512,
         "portMappings": [
           {
             "hostPort": 27017,
             "containerPort": 27017
           }
         ],
         "environment": [
           {
             "name": "MONGO_INITDB_ROOT_USERNAME",
             "value": "admin"
           },
           {
             "name": "MONGO_INITDB_ROOT_PASSWORD",
             "value": "password"
           }
         ]
       },
       {
         "name": "backend",
         "image": "yourusername/aashu-backend:latest",
         "essential": true,
         "memory": 512,
         "portMappings": [
           {
             "hostPort": 5000,
             "containerPort": 5000
           }
         ],
         "links": [
           "mongo"
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           },
           {
             "name": "PORT",
             "value": "5000"
           },
           {
             "name": "MONGO_URI",
             "value": "mongodb://admin:password@mongo:27017/aashu?authSource=admin"
           },
           {
             "name": "JWT_SECRET",
             "value": "your_production_jwt_secret"
           },
           {
             "name": "JWT_EXPIRE",
             "value": "30d"
           }
         ]
       },
       {
         "name": "frontend",
         "image": "yourusername/aashu-frontend:latest",
         "essential": true,
         "memory": 256,
         "portMappings": [
           {
             "hostPort": 80,
             "containerPort": 80
           }
         ],
         "links": [
           "backend"
         ]
       }
     ]
   }
   ```

5. Create the Elastic Beanstalk environment:
   ```bash
   eb create aashu-production
   ```

6. Deploy the application:
   ```bash
   eb deploy
   ```

## Google Cloud Platform (GCP) Deployment

### Google Kubernetes Engine (GKE)

1. Install the Google Cloud SDK and kubectl:
   ```bash
   # Follow instructions at https://cloud.google.com/sdk/docs/install
   ```

2. Configure gcloud:
   ```bash
   gcloud init
   gcloud auth login
   ```

3. Create a Kubernetes cluster:
   ```bash
   gcloud container clusters create aashu-cluster --num-nodes=3
   ```

4. Get authentication credentials:
   ```bash
   gcloud container clusters get-credentials aashu-cluster
   ```

5. Create Kubernetes configuration files in a `k8s` directory:

   **mongo-deployment.yaml**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mongo
   spec:
     selector:
       matchLabels:
         app: mongo
     template:
       metadata:
         labels:
           app: mongo
       spec:
         containers:
         - name: mongo
           image: mongo:latest
           ports:
           - containerPort: 27017
           env:
           - name: MONGO_INITDB_ROOT_USERNAME
             value: admin
           - name: MONGO_INITDB_ROOT_PASSWORD
             value: password
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: mongo
   spec:
     selector:
       app: mongo
     ports:
     - port: 27017
       targetPort: 27017
   ```

   **backend-deployment.yaml**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: backend
   spec:
     selector:
       matchLabels:
         app: backend
     template:
       metadata:
         labels:
           app: backend
       spec:
         containers:
         - name: backend
           image: yourusername/aashu-backend:latest
           ports:
           - containerPort: 5000
           env:
           - name: NODE_ENV
             value: production
           - name: PORT
             value: "5000"
           - name: MONGO_URI
             value: mongodb://admin:password@mongo:27017/aashu?authSource=admin
           - name: JWT_SECRET
             value: your_production_jwt_secret
           - name: JWT_EXPIRE
             value: 30d
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: backend
   spec:
     selector:
       app: backend
     ports:
     - port: 5000
       targetPort: 5000
   ```

   **frontend-deployment.yaml**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: frontend
   spec:
     selector:
       matchLabels:
         app: frontend
     template:
       metadata:
         labels:
           app: frontend
       spec:
         containers:
         - name: frontend
           image: yourusername/aashu-frontend:latest
           ports:
           - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: frontend
   spec:
     type: LoadBalancer
     selector:
       app: frontend
     ports:
     - port: 80
       targetPort: 80
   ```

6. Apply the configurations:
   ```bash
   kubectl apply -f k8s/
   ```

7. Get the external IP for the frontend service:
   ```bash
   kubectl get service frontend
   ```

## Setting up HTTPS with Let's Encrypt

For production deployments, it's recommended to set up HTTPS:

1. Install Certbot:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. Update your nginx configuration to use the SSL certificates.

## Continuous Deployment

### GitHub Actions

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v2
       
       - name: Login to DockerHub
         uses: docker/login-action@v1
         with:
           username: ${{ secrets.DOCKER_USERNAME }}
           password: ${{ secrets.DOCKER_PASSWORD }}
       
       - name: Build and push backend
         uses: docker/build-push-action@v2
         with:
           context: ./backend
           push: true
           tags: yourusername/aashu-backend:latest
       
       - name: Build and push frontend
         uses: docker/build-push-action@v2
         with:
           context: ./frontend
           push: true
           tags: yourusername/aashu-frontend:latest
       
       - name: Deploy to server
         uses: appleboy/ssh-action@master
         with:
           host: ${{ secrets.SSH_HOST }}
           username: ${{ secrets.SSH_USERNAME }}
           key: ${{ secrets.SSH_PRIVATE_KEY }}
           script: |
             cd /path/to/aashu
             git pull
             docker-compose pull
             docker-compose up -d
   ```

2. Add the required secrets to your GitHub repository.

## Monitoring and Maintenance

1. Set up monitoring with Prometheus and Grafana:
   ```bash
   # Install Prometheus
   docker run -d -p 9090:9090 --name prometheus -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

   # Install Grafana
   docker run -d -p 3000:3000 --name grafana grafana/grafana
   ```

2. Set up regular database backups:
   ```bash
   # Create a backup script
   echo '#!/bin/bash
   TIMESTAMP=$(date +"%Y%m%d%H%M%S")
   docker exec aashu-mongodb mongodump --out=/data/backup_$TIMESTAMP
   docker cp aashu-mongodb:/data/backup_$TIMESTAMP /path/to/backup/location
   ' > /usr/local/bin/backup-mongodb.sh
   
   chmod +x /usr/local/bin/backup-mongodb.sh
   
   # Add to crontab
   (crontab -l 2>/dev/null; echo "0 0 * * * /usr/local/bin/backup-mongodb.sh") | crontab -
   ```

## Troubleshooting

- **Container startup issues**: Check logs with `docker-compose logs`
- **Database connection issues**: Verify MongoDB container is running and credentials are correct
- **Network issues**: Ensure all required ports are open in your firewall/security groups
- **SSL certificate issues**: Check Certbot logs and nginx configuration
