# DashRide

#### DashRide is a sophisticated web application designed to provide seamless ride booking and ride request services and is developed to ensure reliability, scalability, and user-friendly interaction. 

## Key Features:

- Scalability: Developed a containerized fault-tolerant, scalable, and highly available DB using AWS EC2 Instances.
- Architecture: Designed a controller-worker architecture using Zookeeper for fault tolerance, RabbitMQ for communication, and a load balancer to handle 10000 users concurrently.
- User-friendly Interface: Utilizes Vue.js to create a dynamic and responsive frontend that enhances user interaction and experience.
- Booking and Requesting Rides: Enables users to easily book rides or request transportation services through a straightforward UI.
- Real-time Updates: Leverages WebSocket technology to provide real-time updates on ride availability, status, and notifications.
- Secure Authentication: Implements secure authentication mechanisms, including phone number registration with OTP verification for seamless user onboarding.
- Integration with Backend Services: Communicates with backend services via RESTful APIs to manage user profiles, ride creation, information retrieval, and updates.

## Technologies Used:

- Frontend: Vue.js, TailwindCSS
- Backend: Laravel, Laravel WebSockets, Google Maps API
- Database: MYSQL
- Deployment: Docker containers, AWS EC2 for scalability
- Messaging: RabbitMQ for communication
- Authentication: Phone number registration with OTP verification using Twillio API
- Monitoring: Zookeeper for fault tolerance

## App Flow:

### 1. Enter Phone Number to Login

<img width="1694" alt="Screenshot 2024-06-16 at 4 02 33 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/968bb785-e1c7-4d69-ba34-a4dae1b2529d">

### 2. Enter OTP for verification

<img width="1710" alt="Screenshot 2024-06-16 at 4 15 37 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/3f6ea81a-fe7c-4c5f-bdc0-07165bf9a013">

### 3. DashBoard: Decide if you want to Find a Ride or Start Driving

<img width="1692" alt="Screenshot 2024-06-16 at 4 19 53 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/ec75325b-ac69-4fe2-bd64-431c13987132">

### 4. If you Decide to Start Driving, Enter Driver Details

<img width="1708" alt="Screenshot 2024-06-16 at 4 20 13 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/161b5935-a110-4614-99bf-47f8615d10e2">

### 5. Waiting for Ride Requests

<img width="1704" alt="Screenshot 2024-06-16 at 4 21 14 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/da0f4977-49c1-418f-ae96-2065aed52dae">

### 6. If you Decide to Find a Ride

<img width="1707" alt="Screenshot 2024-06-16 at 4 21 55 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/4c624adf-65c2-4598-aca5-add10ee063ae">

### 7. Type in the Destination

<img width="1702" alt="Screenshot 2024-06-16 at 4 52 12 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/7f39bb4a-1e09-437c-9fa1-f938cf32361d">

<img width="1701" alt="Screenshot 2024-06-16 at 4 52 35 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/4ff1a5b6-d8d4-4a97-a8bd-d20c3affc528">

### 8. Type in the Destination

<img width="1703" alt="Screenshot 2024-06-16 at 4 52 47 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/36ab1b40-52e7-463d-982e-fb1eea24122d">

### 9. Drive is Notified and Gets the Option to Accept or Deny the Trip

<img width="1704" alt="Screenshot 2024-06-16 at 4 52 56 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/29271ee8-6483-40ea-8072-ce3f51ce0975">

### 10. Driver Picks Up the Passanger

<img width="1700" alt="Screenshot 2024-06-16 at 4 54 05 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/ed391029-7784-40af-82d3-e4062b258212">

### 11. Once they Reach The destination, Driver can Press Complete Trip

<img width="1701" alt="Screenshot 2024-06-16 at 4 54 22 PM" src="https://github.com/rahulkumarvh/DashRide/assets/66205950/c8e04541-86df-418d-8426-ed8ad4f51e5d">

## API

### POST Phone Number for Login

> http POST localhost/api/login phone=+11234567890

### POST the Login Verification Code

> http POST localhost/api/login/verify phone=+11234567890 login_code=566832  

### GET User Auth Key

> http GET localhost/api/user 'Authorization: {AuthKEY}'

### POST Driver Details

> http POST localhost/api/driver 'Authorization: {AuthKEY}' Accept:application/json color=Black license_plate=IL1817 make=ABC model=M name=Test year=2023

### POST Trip Details

> http POST localhost/api/trip 'Authorization: {AuthKEY}' destination_name=Chicagi destination:='{"lat": 41.8781, "lng": 87.6298}' origin:='{"lat": 41.8181, "lng": 87.6198}'





