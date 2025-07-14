How to Run the Project:

1. First, make sure Node.js and MongoDB are installed on your computer.

2. Open the terminal and go to the project folder.

3. Run the command npm install to install all required node modules.

4. Inside the root of the project, create a .env file and add the following:
   PORT=8000
   MONGODB\_URI=<mongouri string>

5. Set the mongodb uri by logging into mongodb site and creating connection.

6. Then run the project with the command npm start.

7. To create a short URL, make a POST request to http://localhost:8000/shorturls with a JSON body like:
   {
   "url": "https://example.com",
   "validity": 30,
   "shortcode": "custom1"
   }

8. To get redirected to the original URL, open this in your browser:
   http://localhost:3000/r/custom1
9. To get usage stats, make a GET request to:
   http://localhost:3000/shorturls/custom1

10. All logs are stored in the logs/app.log file inside the project directory.


### Screenshots 

![alt text](<Screenshot 2025-07-14 112145-2.png>)
![alt text](<Screenshot 2025-07-14 112627.png>)
![alt text](<Screenshot 2025-07-14 114102.png>)
![alt text](<Screenshot 2025-07-14 114447.png>)

