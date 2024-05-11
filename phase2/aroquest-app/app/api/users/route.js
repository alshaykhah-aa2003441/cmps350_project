// Import the required modules
import usersRepo from "@/app/repo/users-repo";

// Handle GET requests for users
export async function GET(request) {
  // Get users from the repository
  const users = await usersRepo.getUsers();

  // Return the users as a JSON response
  return Response.json(users, { status: 200 });
}

// Handle POST requests to add a new user
export async function POST(request) {
  try {
    // Get the user data from the request body
    const userData = await request.json();

    // Add the new user to the repository
    const newUser = await usersRepo.addUser(userData);

    // Return the new user as a JSON response
    return Response.json(newUser, { status: 200 });
  } catch (error) {
    // Handle any errors
    console.error('Error adding user:', error);
    return new Response('Error adding user.', { status: 500 });
  }
}
