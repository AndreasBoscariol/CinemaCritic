# Cinema Critic

Cinema Critic is a React-based web application designed to humorously critique your movie tastes with sarcastic responses based on your Letterboxd reviews.

## Overview

This application takes a user's Letterboxd username, fetches their recent movie reviews, and generates comical and sarcastic critiques. It showcases dynamic responses and a user interface that interacts engagingly through typewriter effects.

## Features

- **Dynamic Responses**: Connects to an external API to generate custom responses based on the user's movie reviews.
- **Interactive User Interface**: Offers an engaging user experience with dynamic typing animations and responsive design.
- **AWS Amplify**: Manages the deployment and hosting of the web application, facilitating smooth operation and scalability.

## API Configuration

The application relies on an external API to process the movie reviews. Ensure that the `API_URL` in the `InputFunction` component is set to your corresponding API endpoint:

## Technologies
- **React**: Used for building the user interface.
- **Axios**: Employed for making HTTP requests to the external API.

## AWS Architecture

- **AWS Lambda**: The backend logic is implemented in Lambda functions, which handle API requests to process user reviews. This serverless approach allows the application to scale automatically based on the request load.
- **API Gateway**: API Gateway is used as the front door for the Lambda functions, managing HTTP requests from the client-side application and routing them to the appropriate Lambda function.
- **AWS Amplify**: Used for deploying the React application, Amplify simplifies the setup of a continuous deployment pipeline from a code repository to a global content delivery network.
