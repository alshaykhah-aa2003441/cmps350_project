// Import the required modules
import fs from 'fs';

// Define the path to the users JSON file
const usersFilePath = './data/users.json';

// Function to get all users
export async function getUsers() {
  // Read the users JSON file
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  return usersData;
}

// Function to add a new user
export async function addUser(newUser) {
  // Read the users JSON file
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  // Generate a unique ID for the new user
  const maxId = Math.max(...usersData.map(user => user.id));
  newUser.id = maxId + 1;

  // Add the new user to the users data
  usersData.push(newUser);

  // Write the updated users data back to the users JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

  return newUser;
}
